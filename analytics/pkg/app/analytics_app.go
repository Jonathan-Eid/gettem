// Package app provides the AnalyticsApp — an implementation of the grafana-app-sdk's
// app.App interface backed by Postgres. The same interface is used by apps running
// on the full Grafana App Platform (k8s). By implementing it against Postgres,
// this code would migrate to App Platform by swapping the ClientGenerator.
package app

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"

	sdkapp "github.com/grafana/grafana-app-sdk/app"
	"github.com/grafana/grafana-app-sdk/health"
	"github.com/grafana/grafana-app-sdk/resource"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	v1alpha1 "github.com/wetcat/gettem/analytics/pkg/generated/engagementevent/v1alpha1"
	"github.com/wetcat/gettem/analytics/pkg/store"
)

// AnalyticsApp implements app.App for the gettem engagement analytics plugin.
type AnalyticsApp struct {
	db          *sql.DB
	clientGen   resource.ClientGenerator
	eventClient *v1alpha1.EngagementEventClient
	runner      sdkapp.Runnable
}

var _ sdkapp.App = (*AnalyticsApp)(nil) // compile-time check

// New creates an AnalyticsApp. If bgJob is non-nil it becomes the app's Runner
// (used in operator mode); pass nil for plugin mode (no background work).
func New(db *sql.DB, bgJob sdkapp.Runnable) *AnalyticsApp {
	a := &AnalyticsApp{
		db:     db,
		runner: bgJob,
	}
	if db != nil {
		gen := &store.PostgresClientGenerator{DB: db}
		a.clientGen = gen
		a.eventClient, _ = v1alpha1.NewEngagementEventClientFromGenerator(gen)
	}
	return a
}

// ── app.App interface ─────────────────────────────────────────────────────────

func (a *AnalyticsApp) ManagedKinds() []resource.Kind {
	return []resource.Kind{v1alpha1.Kind()}
}

func (a *AnalyticsApp) Runner() sdkapp.Runnable {
	return a.runner
}

// Validate performs admission validation on EngagementEvent writes.
func (a *AnalyticsApp) Validate(ctx context.Context, req *sdkapp.AdmissionRequest) error {
	r := resource.AdmissionRequest(*req)
	if r.Kind != "EngagementEvent" || r.Group != v1alpha1.APIGroup {
		return sdkapp.ErrNotImplemented
	}
	return validateEngagementEvent(ctx, req)
}

// Mutate is not needed — return ErrNotImplemented per SDK convention.
func (a *AnalyticsApp) Mutate(_ context.Context, _ *sdkapp.AdmissionRequest) (*sdkapp.MutatingResponse, error) {
	return nil, sdkapp.ErrNotImplemented
}

// Convert is not needed — we only have v1alpha1.
func (a *AnalyticsApp) Convert(_ context.Context, _ sdkapp.ConversionRequest) (*sdkapp.RawObject, error) {
	return nil, sdkapp.ErrNotImplemented
}

// CallCustomRoute dispatches to the analytics route handlers.
// These are the endpoints the frontend calls via getBackendSrv().
func (a *AnalyticsApp) CallCustomRoute(ctx context.Context, w sdkapp.CustomRouteResponseWriter, req *sdkapp.CustomRouteRequest) error {
	// Lazy DB connect: if no DB was available at startup, try connecting
	// using jsonData settings from the plugin config page.
	if a.db == nil {
		if err := a.tryConnectFromContext(ctx); err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(503)
			_, _ = w.Write([]byte(`{"error":"database not configured — set connection details in the plugin config page"}`))
			return nil
		}
	}
	switch req.Path {
	case "overview":
		handleOverview(ctx, a.db, w)
	case "recent":
		handleRecent(ctx, a.db, w)
	case "cards":
		handleCards(ctx, a.db, w)
	case "trends":
		handleTrends(ctx, a.db, w)
	case "audience":
		handleAudience(ctx, a.db, w)
	case "sessions":
		handleSessions(ctx, a.db, w)
	case "visitors":
		handleVisitors(ctx, a.db, w)
	case "pages":
		handlePages(ctx, a.db, w)
	default:
		return sdkapp.ErrCustomRouteNotFound
	}
	return nil
}


func (a *AnalyticsApp) PrometheusCollectors() []prometheus.Collector { return nil }
func (a *AnalyticsApp) HealthChecks() []health.Check                { return nil }

// ── accessors ─────────────────────────────────────────────────────────────────

// EventClient returns the typed EngagementEvent client for external use
// (e.g. operator writing status updates via the resource.Client abstraction).
func (a *AnalyticsApp) EventClient() *v1alpha1.EngagementEventClient {
	return a.eventClient
}

// tryConnectFromContext reads DB settings from Grafana's plugin jsonData
// (set via the AppConfig page) and establishes a Postgres connection.
func (a *AnalyticsApp) tryConnectFromContext(ctx context.Context) error {
	pCfg := backend.PluginConfigFromContext(ctx)
	if pCfg.AppInstanceSettings == nil {
		return fmt.Errorf("no app instance settings in context (PluginConfig: %+v)", pCfg)
	}
	log.DefaultLogger.Info("jsonData from plugin config", "raw", string(pCfg.AppInstanceSettings.JSONData))

	var settings struct {
		Host     string `json:"databaseHost"`
		Port     string `json:"databasePort"`
		User     string `json:"databaseUser"`
		Password string `json:"databasePassword"`
		DBName   string `json:"databaseName"`
		SSLMode  string `json:"databaseSslMode"`
	}
	if err := json.Unmarshal(pCfg.AppInstanceSettings.JSONData, &settings); err != nil {
		return err
	}
	if settings.Host == "" {
		return fmt.Errorf("databaseHost not configured")
	}

	cfg := store.Config{
		Host:     settings.Host,
		Port:     settings.Port,
		User:     settings.User,
		Password: settings.Password,
		DBName:   settings.DBName,
		SSLMode:  settings.SSLMode,
	}

	db, err := store.Open(cfg)
	if err != nil {
		return err
	}
	_ = store.Migrate(db)

	a.db = db
	gen := &store.PostgresClientGenerator{DB: db}
	a.clientGen = gen
	a.eventClient, _ = v1alpha1.NewEngagementEventClientFromGenerator(gen)
	return nil
}
