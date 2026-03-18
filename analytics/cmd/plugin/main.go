// Plugin is the Grafana backend plugin process.
// Grafana starts this binary as a subprocess and communicates with it via gRPC.
//
// The plugin is wired through the app-sdk's app.App interface:
//   CallResourceRequest → AppBridge → AnalyticsApp.CallCustomRoute()
// This is the same pattern the Grafana App Platform uses internally.
package main

import (
	"os"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	analyticsapp "github.com/wetcat/gettem/analytics/pkg/app"
	"github.com/wetcat/gettem/analytics/pkg/store"
)

func main() {
	log.DefaultLogger.Info("analytics plugin backend starting")

	// Grafana 12 strips host env vars from plugin subprocesses.
	// DB config is passed through the plugin's jsonData settings (AppConfig page).
	// We also check env vars as a fallback for the operator and local dev.
	cfg := store.ConfigFromEnv()
	log.DefaultLogger.Info("db config from env",
		"host", cfg.Host, "port", cfg.Port, "user", cfg.User, "dbname", cfg.DBName)

	var app *analyticsapp.AnalyticsApp

	db, err := store.Open(cfg)
	if err != nil {
		log.DefaultLogger.Warn("postgres not available at startup — routes will fail until config is set", "err", err)
		// Still start the plugin so the frontend loads. Routes will return errors.
		app = analyticsapp.New(nil, nil)
	} else {
		if err := store.Migrate(db); err != nil {
			log.DefaultLogger.Error("migration failed", "err", err)
		}
		app = analyticsapp.New(db, nil)
	}

	bridge := analyticsapp.NewBridge(app)

	if err := backend.Serve(backend.ServeOpts{
		CallResourceHandler: bridge,
	}); err != nil {
		log.DefaultLogger.Error("plugin serve error", "err", err)
		os.Exit(1)
	}
}
