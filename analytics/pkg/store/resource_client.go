// Package store provides a Postgres-backed implementation of resource.Client
// from the grafana-app-sdk. This allows the generated EngagementEventClient
// (TypedClient) to work against Postgres instead of a k8s API server —
// same interface, different storage backend.
package store

import (
	"context"
	"database/sql"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/grafana/grafana-app-sdk/resource"
	v1alpha1 "github.com/wetcat/gettem/analytics/pkg/generated/engagementevent/v1alpha1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
)

// PostgresClient implements resource.Client for EngagementEvent against Postgres.
// It maps k8s-style metadata to SQL columns so the generated TypedClient works seamlessly.
type PostgresClient struct {
	db *sql.DB
}

var _ resource.Client = (*PostgresClient)(nil) // compile-time check

func NewPostgresClient(db *sql.DB) *PostgresClient {
	return &PostgresClient{db: db}
}

// ── Get ──────────────────────────────────────────────────────────────────────

func (c *PostgresClient) Get(ctx context.Context, id resource.Identifier) (resource.Object, error) {
	const q = `
		SELECT id, uid, resource_version, created_at,
		       event_type, card_id, swipe_direction, dwell_time_ms, read_time_ms,
		       scroll_depth, session_id, timestamp, user_agent, device_type,
		       ip_address, screen_resolution, viewport_size, language, timezone, referrer,
		       processed
		FROM engagement_events WHERE id = $1
	`
	row := c.db.QueryRowContext(ctx, q, id.Name)
	obj, err := scanEvent(row)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("EngagementEvent %q not found", id.Name)
	}
	return obj, err
}

func (c *PostgresClient) GetInto(ctx context.Context, id resource.Identifier, into resource.Object) error {
	obj, err := c.Get(ctx, id)
	if err != nil {
		return err
	}
	copyInto(obj.(*v1alpha1.EngagementEvent), into)
	return nil
}

// ── Create ───────────────────────────────────────────────────────────────────

func (c *PostgresClient) Create(ctx context.Context, id resource.Identifier, obj resource.Object, opts resource.CreateOptions) (resource.Object, error) {
	event, ok := obj.(*v1alpha1.EngagementEvent)
	if !ok {
		return nil, fmt.Errorf("expected *EngagementEvent, got %T", obj)
	}
	spec := event.Spec

	const q = `
		INSERT INTO engagement_events
			(event_type, card_id, swipe_direction, dwell_time_ms, read_time_ms,
			 scroll_depth, session_id, timestamp, user_agent, device_type,
			 ip_address, screen_resolution, viewport_size, language, timezone, referrer,
			 resource_version, uid, processed)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, 1, gen_random_uuid(), false)
		RETURNING id, uid, resource_version, created_at,
		          event_type, card_id, swipe_direction, dwell_time_ms, read_time_ms,
		          scroll_depth, session_id, timestamp, user_agent, device_type,
		          ip_address, screen_resolution, viewport_size, language, timezone, referrer,
		          processed
	`
	row := c.db.QueryRowContext(ctx, q,
		spec.EventType, spec.CardId, spec.SwipeDirection,
		spec.DwellTimeMs, spec.ReadTimeMs, spec.ScrollDepth,
		spec.SessionId, spec.Timestamp, spec.UserAgent, spec.DeviceType,
		spec.IpAddress, spec.ScreenResolution, spec.ViewportSize,
		spec.Language, spec.Timezone, spec.Referrer,
	)
	return scanEvent(row)
}

func (c *PostgresClient) CreateInto(ctx context.Context, id resource.Identifier, obj resource.Object, opts resource.CreateOptions, into resource.Object) error {
	created, err := c.Create(ctx, id, obj, opts)
	if err != nil {
		return err
	}
	copyInto(created.(*v1alpha1.EngagementEvent), into)
	return nil
}

// ── Update ───────────────────────────────────────────────────────────────────

func (c *PostgresClient) Update(ctx context.Context, id resource.Identifier, obj resource.Object, opts resource.UpdateOptions) (resource.Object, error) {
	event, ok := obj.(*v1alpha1.EngagementEvent)
	if !ok {
		return nil, fmt.Errorf("expected *EngagementEvent, got %T", obj)
	}

	// Status-only update (used by operator to mark events as processed)
	if opts.Subresource == "status" {
		const q = `
			UPDATE engagement_events
			SET processed = $1, resource_version = resource_version + 1
			WHERE id = $2
			RETURNING id, uid, resource_version, created_at,
			          event_type, card_id, swipe_direction, dwell_time_ms, read_time_ms,
			          scroll_depth, session_id, timestamp, user_agent, device_type,
			          ip_address, screen_resolution, viewport_size, language, timezone, referrer,
			          processed
		`
		row := c.db.QueryRowContext(ctx, q, event.Status.Processed, id.Name)
		return scanEvent(row)
	}

	spec := event.Spec
	args := []any{
		spec.EventType, spec.CardId, spec.SwipeDirection,
		spec.DwellTimeMs, spec.ReadTimeMs, spec.ScrollDepth,
		spec.SessionId, spec.Timestamp, spec.UserAgent, spec.DeviceType,
		spec.IpAddress, spec.ScreenResolution, spec.ViewportSize,
		spec.Language, spec.Timezone, spec.Referrer,
		id.Name,
	}

	q := `
		UPDATE engagement_events SET
			event_type=$1, card_id=$2, swipe_direction=$3, dwell_time_ms=$4,
			read_time_ms=$5, scroll_depth=$6, session_id=$7, timestamp=$8,
			user_agent=$9, device_type=$10, ip_address=$11, screen_resolution=$12,
			viewport_size=$13, language=$14, timezone=$15, referrer=$16,
			resource_version = resource_version + 1
		WHERE id = $17
	`

	// Optimistic concurrency: if ResourceVersion is set, enforce it
	if opts.ResourceVersion != "" {
		q += " AND resource_version = $18"
		args = append(args, opts.ResourceVersion)
	}

	q += ` RETURNING id, uid, resource_version, created_at,
	       event_type, card_id, swipe_direction, dwell_time_ms, read_time_ms,
	       scroll_depth, session_id, timestamp, user_agent, device_type,
	       ip_address, screen_resolution, viewport_size, language, timezone, referrer,
	       processed`

	row := c.db.QueryRowContext(ctx, q, args...)
	result, err := scanEvent(row)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("EngagementEvent %q not found or resource version conflict", id.Name)
	}
	return result, err
}

func (c *PostgresClient) UpdateInto(ctx context.Context, id resource.Identifier, obj resource.Object, opts resource.UpdateOptions, into resource.Object) error {
	updated, err := c.Update(ctx, id, obj, opts)
	if err != nil {
		return err
	}
	copyInto(updated.(*v1alpha1.EngagementEvent), into)
	return nil
}

// ── Delete ───────────────────────────────────────────────────────────────────

func (c *PostgresClient) Delete(ctx context.Context, id resource.Identifier, opts resource.DeleteOptions) error {
	q := "DELETE FROM engagement_events WHERE id = $1"
	args := []any{id.Name}

	if opts.Preconditions.ResourceVersion != "" {
		q += " AND resource_version = $2"
		args = append(args, opts.Preconditions.ResourceVersion)
	}

	result, err := c.db.ExecContext(ctx, q, args...)
	if err != nil {
		return err
	}
	n, _ := result.RowsAffected()
	if n == 0 {
		return fmt.Errorf("EngagementEvent %q not found or precondition failed", id.Name)
	}
	return nil
}

// ── List ─────────────────────────────────────────────────────────────────────

func (c *PostgresClient) List(ctx context.Context, namespace string, opts resource.ListOptions) (resource.ListObject, error) {
	var where []string
	var args []any
	argN := 1

	// Map field selectors to WHERE clauses (e.g. "spec.eventType=swipe")
	for _, sel := range opts.FieldSelectors {
		col, val, ok := parseFieldSelector(sel)
		if ok {
			where = append(where, fmt.Sprintf("%s = $%d", col, argN))
			args = append(args, val)
			argN++
		}
	}

	// Cursor pagination: continue token is the last seen ID
	if opts.Continue != "" {
		where = append(where, fmt.Sprintf("id > $%d", argN))
		args = append(args, opts.Continue)
		argN++
	}

	q := "SELECT id, uid, resource_version, created_at, " +
		"event_type, card_id, swipe_direction, dwell_time_ms, read_time_ms, " +
		"scroll_depth, session_id, timestamp, user_agent, device_type, " +
		"ip_address, screen_resolution, viewport_size, language, timezone, referrer, " +
		"processed FROM engagement_events"

	if len(where) > 0 {
		q += " WHERE " + strings.Join(where, " AND ")
	}
	q += " ORDER BY id ASC"

	limit := opts.Limit
	if limit > 0 {
		// Fetch one extra to detect if there are more pages
		q += fmt.Sprintf(" LIMIT $%d", argN)
		args = append(args, limit+1)
	}

	rows, err := c.db.QueryContext(ctx, q, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []resource.Object
	for rows.Next() {
		obj, err := scanEventFromRows(rows)
		if err != nil {
			return nil, err
		}
		items = append(items, obj)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	list := &v1alpha1.EngagementEventList{}
	continueToken := ""

	if limit > 0 && len(items) > limit {
		// More pages available — set continue token to last included item's ID
		items = items[:limit]
		lastItem := items[limit-1].(*v1alpha1.EngagementEvent)
		continueToken = lastItem.Name
	}

	// Convert []resource.Object to []*EngagementEvent for SetItems
	list.SetItems(items)
	list.SetContinue(continueToken)

	return list, nil
}

func (c *PostgresClient) ListInto(ctx context.Context, namespace string, opts resource.ListOptions, into resource.ListObject) error {
	result, err := c.List(ctx, namespace, opts)
	if err != nil {
		return err
	}
	into.SetItems(result.GetItems())
	into.SetResourceVersion(result.GetResourceVersion())
	return nil
}

// ── Not implemented ──────────────────────────────────────────────────────────

func (c *PostgresClient) Patch(_ context.Context, _ resource.Identifier, _ resource.PatchRequest, _ resource.PatchOptions) (resource.Object, error) {
	return nil, fmt.Errorf("Patch not implemented for Postgres client")
}

func (c *PostgresClient) PatchInto(_ context.Context, _ resource.Identifier, _ resource.PatchRequest, _ resource.PatchOptions, _ resource.Object) error {
	return fmt.Errorf("Patch not implemented for Postgres client")
}

func (c *PostgresClient) Watch(_ context.Context, _ string, _ resource.WatchOptions) (resource.WatchResponse, error) {
	return nil, fmt.Errorf("Watch not implemented for Postgres client")
}

func (c *PostgresClient) SubresourceRequest(_ context.Context, _ resource.Identifier, _ resource.CustomRouteRequestOptions) ([]byte, error) {
	return nil, fmt.Errorf("SubresourceRequest not implemented for Postgres client")
}

// ── helpers ──────────────────────────────────────────────────────────────────

// scanEvent scans a single row into an EngagementEvent with full k8s metadata.
func scanEvent(row *sql.Row) (*v1alpha1.EngagementEvent, error) {
	var (
		id              int64
		uid             string
		resourceVersion int64
		createdAt       time.Time
		spec            v1alpha1.Spec
		processed       bool
	)
	err := row.Scan(
		&id, &uid, &resourceVersion, &createdAt,
		&spec.EventType, &spec.CardId, &spec.SwipeDirection,
		&spec.DwellTimeMs, &spec.ReadTimeMs, &spec.ScrollDepth,
		&spec.SessionId, &spec.Timestamp, &spec.UserAgent, &spec.DeviceType,
		&spec.IpAddress, &spec.ScreenResolution, &spec.ViewportSize,
		&spec.Language, &spec.Timezone, &spec.Referrer,
		&processed,
	)
	if err != nil {
		return nil, err
	}

	return buildEvent(id, uid, resourceVersion, createdAt, spec, processed), nil
}

// scanEventFromRows scans from *sql.Rows (same columns as scanEvent).
func scanEventFromRows(rows *sql.Rows) (*v1alpha1.EngagementEvent, error) {
	var (
		id              int64
		uid             string
		resourceVersion int64
		createdAt       time.Time
		spec            v1alpha1.Spec
		processed       bool
	)
	err := rows.Scan(
		&id, &uid, &resourceVersion, &createdAt,
		&spec.EventType, &spec.CardId, &spec.SwipeDirection,
		&spec.DwellTimeMs, &spec.ReadTimeMs, &spec.ScrollDepth,
		&spec.SessionId, &spec.Timestamp, &spec.UserAgent, &spec.DeviceType,
		&spec.IpAddress, &spec.ScreenResolution, &spec.ViewportSize,
		&spec.Language, &spec.Timezone, &spec.Referrer,
		&processed,
	)
	if err != nil {
		return nil, err
	}

	return buildEvent(id, uid, resourceVersion, createdAt, spec, processed), nil
}

func buildEvent(id int64, uid string, rv int64, createdAt time.Time, spec v1alpha1.Spec, processed bool) *v1alpha1.EngagementEvent {
	return &v1alpha1.EngagementEvent{
		TypeMeta: metav1.TypeMeta{
			APIVersion: v1alpha1.GroupVersion.Identifier(),
			Kind:       "EngagementEvent",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:              strconv.FormatInt(id, 10),
			Namespace:         "default",
			UID:               types.UID(uid),
			ResourceVersion:   strconv.FormatInt(rv, 10),
			CreationTimestamp: metav1.NewTime(createdAt),
		},
		Spec:   spec,
		Status: v1alpha1.Status{Processed: processed},
	}
}

func copyInto(src *v1alpha1.EngagementEvent, dst resource.Object) {
	if target, ok := dst.(*v1alpha1.EngagementEvent); ok {
		*target = *src
	}
}

// parseFieldSelector maps "spec.fieldName=value" to (postgres_column, value).
var fieldToColumn = map[string]string{
	"spec.eventType":        "event_type",
	"spec.cardId":           "card_id",
	"spec.swipeDirection":   "swipe_direction",
	"spec.sessionId":        "session_id",
	"spec.deviceType":       "device_type",
	"spec.language":         "language",
	"spec.timezone":         "timezone",
	"metadata.name":         "id",
	"status.processed":      "processed",
}

func parseFieldSelector(sel string) (column string, value string, ok bool) {
	parts := strings.SplitN(sel, "=", 2)
	if len(parts) != 2 {
		return "", "", false
	}
	col, exists := fieldToColumn[parts[0]]
	if !exists {
		return "", "", false
	}
	return col, parts[1], true
}
