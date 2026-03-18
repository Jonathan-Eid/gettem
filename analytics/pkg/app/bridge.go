package app

import (
	"bytes"
	"context"
	"io"
	"net/http"
	"net/url"

	sdkapp "github.com/grafana/grafana-app-sdk/app"
	"github.com/grafana/grafana-app-sdk/resource"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
	v1alpha1 "github.com/wetcat/gettem/analytics/pkg/generated/engagementevent/v1alpha1"
)

// AppBridge adapts an app.App to the grafana-plugin-sdk-go CallResourceHandler.
// This is the same pattern that the Grafana App Platform runner uses internally
// to bridge HTTP requests into app.App.CallCustomRoute calls.
type AppBridge struct {
	app sdkapp.App
}

var _ backend.CallResourceHandler = (*AppBridge)(nil)

func NewBridge(a sdkapp.App) *AppBridge {
	return &AppBridge{app: a}
}

func (b *AppBridge) CallResource(ctx context.Context, req *backend.CallResourceRequest, sender backend.CallResourceResponseSender) error {
	routeReq := &sdkapp.CustomRouteRequest{
		ResourceIdentifier: resource.FullIdentifier{
			Group:   v1alpha1.APIGroup,
			Version: v1alpha1.APIVersion,
		},
		Path:    req.Path,
		Method:  req.Method,
		Headers: req.Headers,
		Body:    io.NopCloser(bytes.NewReader(req.Body)),
	}

	// Reconstruct URL from path + query string if available
	u, _ := url.Parse("/" + req.Path)
	if req.URL != "" {
		if parsed, err := url.Parse(req.URL); err == nil {
			u = parsed
		}
	}
	routeReq.URL = u

	w := &senderWriter{sender: sender}

	err := b.app.CallCustomRoute(ctx, w, routeReq)
	if err == sdkapp.ErrCustomRouteNotFound {
		return sender.Send(&backend.CallResourceResponse{
			Status: http.StatusNotFound,
			Body:   []byte(`{"error":"route not found"}`),
		})
	}
	if err != nil {
		return sender.Send(&backend.CallResourceResponse{
			Status: http.StatusInternalServerError,
			Body:   []byte(err.Error()),
		})
	}

	// If the handler wrote via http.ResponseWriter, flush to sender
	return w.flush()
}

// senderWriter wraps backend.CallResourceResponseSender as http.ResponseWriter,
// which is what app.CustomRouteResponseWriter embeds.
type senderWriter struct {
	sender  backend.CallResourceResponseSender
	headers http.Header
	status  int
	buf     bytes.Buffer
	flushed bool
}

func (w *senderWriter) Header() http.Header {
	if w.headers == nil {
		w.headers = make(http.Header)
	}
	return w.headers
}

func (w *senderWriter) WriteHeader(statusCode int) {
	w.status = statusCode
}

func (w *senderWriter) Write(data []byte) (int, error) {
	return w.buf.Write(data)
}

func (w *senderWriter) flush() error {
	if w.flushed {
		return nil
	}
	w.flushed = true

	status := w.status
	if status == 0 {
		status = http.StatusOK
	}

	return w.sender.Send(&backend.CallResourceResponse{
		Status:  status,
		Headers: w.headers,
		Body:    w.buf.Bytes(),
	})
}
