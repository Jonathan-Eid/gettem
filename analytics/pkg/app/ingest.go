package app

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	sdkapp "github.com/grafana/grafana-app-sdk/app"
	"github.com/grafana/grafana-app-sdk/resource"
	v1alpha1 "github.com/wetcat/gettem/analytics/pkg/generated/engagementevent/v1alpha1"
)

// handleIngest accepts POST requests with an EngagementEvent spec, validates
// it through the app-sdk admission path, and creates it via the typed client.
func handleIngest(ctx context.Context, a *AnalyticsApp, w http.ResponseWriter, req *sdkapp.CustomRouteRequest) {
	// CORS — only allow requests from the gettem frontend origin.
	origin := ""
	if origins, ok := req.Headers["Origin"]; ok && len(origins) > 0 {
		origin = origins[0]
	}
	allowed := map[string]bool{
		"https://joneid.dev":     true,
		"http://localhost:3000":  true, // local dev
	}
	if allowed[origin] {
		w.Header().Set("Access-Control-Allow-Origin", origin)
	}
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if req.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	if req.Method != http.MethodPost {
		http.Error(w, `{"error":"method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	// Decode the flat spec from the request body.
	var spec v1alpha1.Spec
	if err := json.NewDecoder(req.Body).Decode(&spec); err != nil {
		http.Error(w, `{"error":"invalid JSON: `+err.Error()+`"}`, http.StatusBadRequest)
		return
	}

	// Capture IP server-side so the frontend cannot spoof it.
	spec.IpAddress = clientIP(req.Headers)

	// Build the EngagementEvent object.
	event := v1alpha1.NewEngagementEvent()
	event.Spec = spec

	// Validate via the same admission path used by App Platform.
	admReq := sdkapp.AdmissionRequest(resource.AdmissionRequest{
		Action: resource.AdmissionActionCreate,
		Kind:   "EngagementEvent",
		Group:  v1alpha1.APIGroup,
		Object: event,
	})
	if err := validateEngagementEvent(ctx, &admReq); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	// Ensure eventClient is available (may be nil if DB connected lazily).
	if a.eventClient == nil {
		http.Error(w, `{"error":"event client not initialized — database may not be connected"}`, http.StatusServiceUnavailable)
		return
	}

	// Persist through the typed client → PostgresClient.Create().
	created, err := a.eventClient.Create(ctx, event, resource.CreateOptions{})
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

// clientIP extracts the client IP from request headers, preferring
// X-Forwarded-For (set by Traefik) over X-Real-Ip.
func clientIP(headers map[string][]string) string {
	if xff, ok := headers["X-Forwarded-For"]; ok && len(xff) > 0 {
		// X-Forwarded-For can contain a comma-separated chain; first entry is the client.
		if parts := strings.SplitN(xff[0], ",", 2); len(parts) > 0 {
			if ip := strings.TrimSpace(parts[0]); ip != "" {
				return ip
			}
		}
	}
	if xri, ok := headers["X-Real-Ip"]; ok && len(xri) > 0 {
		if ip := strings.TrimSpace(xri[0]); ip != "" {
			return ip
		}
	}
	return ""
}
