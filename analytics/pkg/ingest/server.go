// Package ingest provides a standalone HTTP server for receiving engagement
// events from the gettem frontend. Running outside Grafana means no CORS
// issues when Traefik routes joneid.dev/api/ingest to this server (same origin).
package ingest

import (
	"context"
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"strings"

	sdkapp "github.com/grafana/grafana-app-sdk/app"
	"github.com/grafana/grafana-app-sdk/resource"
	v1alpha1 "github.com/wetcat/gettem/analytics/pkg/generated/engagementevent/v1alpha1"
)

// Server accepts POST /ingest requests and persists them via the typed client.
type Server struct {
	eventClient  *v1alpha1.EngagementEventClient
	validate     func(context.Context, *sdkapp.AdmissionRequest) error
	corsOrigins  map[string]bool
	srv          *http.Server
}

// NewServer creates an ingest server. corsOrigins lists origins allowed for
// cross-origin requests (needed in dev where frontend and operator are on
// different ports). In production behind Traefik everything is same-origin
// so this can be empty.
func NewServer(addr string, client *v1alpha1.EngagementEventClient, validate func(context.Context, *sdkapp.AdmissionRequest) error, corsOrigins []string) *Server {
	allowed := make(map[string]bool, len(corsOrigins))
	for _, o := range corsOrigins {
		allowed[o] = true
	}
	s := &Server{
		eventClient: client,
		validate:    validate,
		corsOrigins: allowed,
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/ingest", s.handleIngest)
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status":"ok"}`))
	})
	s.srv = &http.Server{Addr: addr, Handler: mux}
	return s
}

// Run starts the HTTP server and blocks until ctx is cancelled.
// Implements app.Runnable so it can be composed with MultiRunner.
func (s *Server) Run(ctx context.Context) error {
	ln, err := net.Listen("tcp", s.srv.Addr)
	if err != nil {
		return fmt.Errorf("ingest server listen: %w", err)
	}

	errCh := make(chan error, 1)
	go func() { errCh <- s.srv.Serve(ln) }()

	select {
	case <-ctx.Done():
		_ = s.srv.Shutdown(context.Background())
		return nil
	case err := <-errCh:
		return err
	}
}

func (s *Server) setCORS(w http.ResponseWriter, r *http.Request) {
	origin := r.Header.Get("Origin")
	if origin != "" && s.corsOrigins[origin] {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	}
}

func (s *Server) handleIngest(w http.ResponseWriter, r *http.Request) {
	s.setCORS(w, r)

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, `{"error":"method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	var spec v1alpha1.Spec
	if err := json.NewDecoder(r.Body).Decode(&spec); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(map[string]string{"error": "invalid JSON: " + err.Error()})
		return
	}

	// Capture IP server-side so the frontend cannot spoof it.
	spec.IpAddress = clientIP(r)

	event := v1alpha1.NewEngagementEvent()
	event.Spec = spec

	// Validate via the same admission path used by App Platform.
	admReq := sdkapp.AdmissionRequest(resource.AdmissionRequest{
		Action: resource.AdmissionActionCreate,
		Kind:   "EngagementEvent",
		Group:  v1alpha1.APIGroup,
		Object: event,
	})
	if err := s.validate(r.Context(), &admReq); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	created, err := s.eventClient.Create(r.Context(), event, resource.CreateOptions{})
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		_ = json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(map[string]string{
		"id":              created.Name,
		"resourceVersion": created.ResourceVersion,
	})
}

func clientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		if parts := strings.SplitN(xff, ",", 2); len(parts) > 0 {
			if ip := strings.TrimSpace(parts[0]); ip != "" {
				return ip
			}
		}
	}
	if xri := r.Header.Get("X-Real-Ip"); xri != "" {
		return strings.TrimSpace(xri)
	}
	host, _, _ := net.SplitHostPort(r.RemoteAddr)
	return host
}
