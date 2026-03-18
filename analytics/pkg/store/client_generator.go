package store

import (
	"database/sql"
	"fmt"

	"github.com/grafana/grafana-app-sdk/resource"
	v1alpha1 "github.com/wetcat/gettem/analytics/pkg/generated/engagementevent/v1alpha1"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

// PostgresClientGenerator implements resource.ClientGenerator.
// It returns a Postgres-backed resource.Client for known kinds.
// To migrate to the full App Platform, swap this for k8s.NewClientGenerator()
// — everything else stays the same.
type PostgresClientGenerator struct {
	DB *sql.DB
}

var _ resource.ClientGenerator = (*PostgresClientGenerator)(nil)

func (g *PostgresClientGenerator) ClientFor(kind resource.Kind) (resource.Client, error) {
	if kind.Kind() == "EngagementEvent" && kind.Group() == v1alpha1.APIGroup {
		return NewPostgresClient(g.DB), nil
	}
	return nil, fmt.Errorf("unsupported kind: %s.%s", kind.Kind(), kind.Group())
}

func (g *PostgresClientGenerator) GetCustomRouteClient(_ schema.GroupVersion, _ string) (resource.CustomRouteClient, error) {
	return nil, fmt.Errorf("custom route client not implemented for Postgres")
}
