package store

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

// Config holds Postgres connection parameters read from environment variables.
type Config struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

func ConfigFromEnv() Config {
	sslMode := envWithFallback("DATABASE_SSL_MODE", "disable")
	return Config{
		Host:     envWithFallback("DATABASE_HOST", ""),
		Port:     envWithFallback("DATABASE_PORT", ""),
		User:     envWithFallback("DATABASE_USERNAME", ""),
		Password: envWithFallback("DATABASE_PASSWORD", ""),
		DBName:   envWithFallback("DATABASE_NAME", ""),
		SSLMode:  sslMode,
	}
}

// envWithFallback checks DATABASE_X, then GF_PLUGIN_GETTEM_ANALYTICS_APP_DATABASE_X.
// Grafana 12+ strips host env vars from plugin subprocesses but forwards GF_PLUGIN_* vars.
func envWithFallback(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	if v := os.Getenv("GF_PLUGIN_GETTEM_ANALYTICS_APP_" + key); v != "" {
		return v
	}
	return fallback
}

func Open(cfg Config) (*sql.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName, cfg.SSLMode,
	)
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, fmt.Errorf("open postgres: %w", err)
	}
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("ping postgres: %w", err)
	}
	return db, nil
}

// Migrate runs any SQL needed to set up operator-owned tables and add
// resource metadata columns to the Strapi-managed engagement_events table.
func Migrate(db *sql.DB) error {
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS daily_engagement_summaries (
			id                  SERIAL PRIMARY KEY,
			date                DATE NOT NULL,
			card_id             VARCHAR(255) NOT NULL,
			impressions         INTEGER NOT NULL DEFAULT 0,
			swipe_left_count    INTEGER NOT NULL DEFAULT 0,
			swipe_right_count   INTEGER NOT NULL DEFAULT 0,
			avg_dwell_time_ms   FLOAT NOT NULL DEFAULT 0,
			detail_opens        INTEGER NOT NULL DEFAULT 0,
			avg_read_time_ms    FLOAT NOT NULL DEFAULT 0,
			avg_scroll_depth    FLOAT NOT NULL DEFAULT 0,
			unique_sessions     INTEGER NOT NULL DEFAULT 0,
			created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
			updated_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
			UNIQUE (date, card_id)
		);
		CREATE INDEX IF NOT EXISTS idx_daily_summaries_date    ON daily_engagement_summaries (date DESC);
		CREATE INDEX IF NOT EXISTS idx_daily_summaries_card_id ON daily_engagement_summaries (card_id);

		-- Resource metadata columns on engagement_events (Strapi-managed table).
		-- These enable the resource.Client abstraction (k8s-style CRUD) over Postgres.
		ALTER TABLE engagement_events
			ADD COLUMN IF NOT EXISTS resource_version BIGINT NOT NULL DEFAULT 1,
			ADD COLUMN IF NOT EXISTS uid UUID NOT NULL DEFAULT gen_random_uuid(),
			ADD COLUMN IF NOT EXISTS processed BOOLEAN NOT NULL DEFAULT false;
	`)
	return err
}
