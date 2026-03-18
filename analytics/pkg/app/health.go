package app

import (
	"context"
	"database/sql"
)

// dbHealthCheck implements health.Check by pinging Postgres.
type dbHealthCheck struct {
	db *sql.DB
}

func (h *dbHealthCheck) HealthCheck(ctx context.Context) error {
	return h.db.PingContext(ctx)
}

func (h *dbHealthCheck) HealthCheckName() string {
	return "postgres"
}
