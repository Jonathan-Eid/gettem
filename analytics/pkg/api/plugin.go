// Package api implements the Grafana app plugin backend.
// It exposes four resource routes over the plugin SDK's CallResource mechanism,
// allowing the frontend pages to call /api/plugins/<id>/resources/<route>
// instead of firing raw SQL through the Postgres data-source proxy.
package api

import (
	"context"
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/resource/httpadapter"
)

// Plugin is the app backend.  It holds a DB connection and a pre-built
// CallResourceHandler so we only wire up the mux once at startup.
type Plugin struct {
	db              *sql.DB
	resourceHandler backend.CallResourceHandler
}

// New constructs a Plugin and registers all resource routes.
// The http.ServeMux uses Go 1.22 method+path patterns ("GET /overview" etc.).
func New(db *sql.DB) *Plugin {
	p := &Plugin{db: db}
	mux := http.NewServeMux()
	mux.HandleFunc("GET /overview", p.handleOverview)
	mux.HandleFunc("GET /recent", p.handleRecent)
	mux.HandleFunc("GET /cards", p.handleCards)
	mux.HandleFunc("GET /trends", p.handleTrends)
	mux.HandleFunc("GET /audience", p.handleAudience)
	p.resourceHandler = httpadapter.New(mux)
	return p
}

// CallResource implements backend.CallResourceHandler, delegating to the mux.
func (p *Plugin) CallResource(ctx context.Context, req *backend.CallResourceRequest, sender backend.CallResourceResponseSender) error {
	return p.resourceHandler.CallResource(ctx, req, sender)
}

// ── response types ────────────────────────────────────────────────────────────

type OverviewResponse struct {
	Sessions    int64   `json:"sessions"`
	Swipes      int64   `json:"swipes"`
	RightPct    float64 `json:"right_pct"`
	DetailOpens int64   `json:"detail_opens"`
}

type CardRow struct {
	CardID         string  `json:"card_id"`
	Impressions    int64   `json:"impressions"`
	TotalSwipes    int64   `json:"total_swipes"`
	RightPct       float64 `json:"right_pct"`
	DetailOpenRate float64 `json:"detail_open_rate"`
	AvgDwellMs     float64 `json:"avg_dwell_ms"`
	AvgReadMs      float64 `json:"avg_read_ms"`
	AvgScrollPct   float64 `json:"avg_scroll_pct"`
	Sessions       int64   `json:"sessions"`
}

type TrendRow struct {
	Day         string  `json:"day"`
	Sessions    int64   `json:"sessions"`
	Impressions int64   `json:"impressions"`
	Swipes      int64   `json:"swipes"`
	RightPct    float64 `json:"right_pct"`
	DetailOpens int64   `json:"detail_opens"`
	AvgDwellMs  float64 `json:"avg_dwell_ms"`
}

type AudienceItem struct {
	Label    string  `json:"label"`
	Sessions int64   `json:"sessions"`
	Pct      float64 `json:"pct,omitempty"`
}

type AudienceResponse struct {
	Devices   []AudienceItem `json:"devices"`
	Timezones []AudienceItem `json:"timezones"`
	Languages []AudienceItem `json:"languages"`
}

// ── handlers ──────────────────────────────────────────────────────────────────

type RecentEvent struct {
	Time        string  `json:"time"`
	EventType   string  `json:"event_type"`
	Card        string  `json:"card"`
	Direction   string  `json:"direction"`
	DwellTimeMs float64 `json:"dwell_time_ms"`
	DeviceType  string  `json:"device_type"`
	Language    string  `json:"language"`
}

func (p *Plugin) handleRecent(w http.ResponseWriter, r *http.Request) {
	const q = `
		SELECT
			TO_CHAR(timestamp, 'HH24:MI:SS')   AS time,
			event_type,
			COALESCE(card_id, '—')             AS card,
			COALESCE(swipe_direction, '—')     AS direction,
			COALESCE(dwell_time_ms, 0)         AS dwell_time_ms,
			COALESCE(device_type, '—')         AS device_type,
			COALESCE(language, '—')            AS language
		FROM engagement_events
		ORDER BY timestamp DESC
		LIMIT 20
	`
	rows, err := p.db.QueryContext(r.Context(), q)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	result := make([]RecentEvent, 0)
	for rows.Next() {
		var e RecentEvent
		if err := rows.Scan(&e.Time, &e.EventType, &e.Card, &e.Direction, &e.DwellTimeMs, &e.DeviceType, &e.Language); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		result = append(result, e)
	}
	writeJSON(w, result)
}

func (p *Plugin) handleOverview(w http.ResponseWriter, r *http.Request) {
	const q = `
		SELECT
			COUNT(DISTINCT session_id)                                       AS sessions,
			COUNT(*) FILTER (WHERE event_type = 'swipe')                     AS swipes,
			COALESCE(ROUND(
				100.0 * COUNT(*) FILTER (WHERE event_type = 'swipe' AND swipe_direction = 'right')
				/ NULLIF(COUNT(*) FILTER (WHERE event_type = 'swipe'), 0)
			, 1), 0)                                                          AS right_pct,
			COUNT(*) FILTER (WHERE event_type = 'detail_open')               AS detail_opens
		FROM engagement_events
		WHERE timestamp >= CURRENT_DATE
	`
	row := p.db.QueryRowContext(r.Context(), q)
	var resp OverviewResponse
	if err := row.Scan(&resp.Sessions, &resp.Swipes, &resp.RightPct, &resp.DetailOpens); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	writeJSON(w, resp)
}

func (p *Plugin) handleCards(w http.ResponseWriter, r *http.Request) {
	const q = `
		SELECT
			card_id,
			SUM(impressions)                                                              AS impressions,
			SUM(swipe_left_count) + SUM(swipe_right_count)                               AS total_swipes,
			COALESCE(ROUND(
				100.0 * SUM(swipe_right_count)
				/ NULLIF(SUM(swipe_left_count) + SUM(swipe_right_count), 0)
			, 1), 0)                                                                      AS right_pct,
			COALESCE(ROUND(
				100.0 * SUM(detail_opens)
				/ NULLIF(SUM(impressions), 0)
			, 1), 0)                                                                      AS detail_open_rate,
			COALESCE(ROUND(AVG(avg_dwell_time_ms)), 0)                                   AS avg_dwell_ms,
			COALESCE(ROUND(AVG(avg_read_time_ms)), 0)                                    AS avg_read_ms,
			COALESCE(ROUND(AVG(avg_scroll_depth) * 100, 1), 0)                          AS avg_scroll_pct,
			SUM(unique_sessions)                                                          AS sessions
		FROM daily_engagement_summaries
		WHERE date >= CURRENT_DATE - INTERVAL '30 days'
		GROUP BY card_id
		ORDER BY impressions DESC
	`
	rows, err := p.db.QueryContext(r.Context(), q)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	result := make([]CardRow, 0)
	for rows.Next() {
		var c CardRow
		if err := rows.Scan(&c.CardID, &c.Impressions, &c.TotalSwipes, &c.RightPct,
			&c.DetailOpenRate, &c.AvgDwellMs, &c.AvgReadMs, &c.AvgScrollPct, &c.Sessions); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		result = append(result, c)
	}
	writeJSON(w, result)
}

func (p *Plugin) handleTrends(w http.ResponseWriter, r *http.Request) {
	const q = `
		SELECT
			TO_CHAR(date, 'YYYY-MM-DD')               AS day,
			SUM(unique_sessions)                      AS sessions,
			SUM(impressions)                          AS impressions,
			SUM(swipe_left_count + swipe_right_count) AS swipes,
			COALESCE(ROUND(
				100.0 * SUM(swipe_right_count)
				/ NULLIF(SUM(swipe_left_count + swipe_right_count), 0)
			, 1), 0)                                   AS right_pct,
			SUM(detail_opens)                          AS detail_opens,
			COALESCE(ROUND(AVG(avg_dwell_time_ms)), 0) AS avg_dwell_ms
		FROM daily_engagement_summaries
		WHERE date >= CURRENT_DATE - INTERVAL '30 days'
		GROUP BY date
		ORDER BY date DESC
	`
	rows, err := p.db.QueryContext(r.Context(), q)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	result := make([]TrendRow, 0)
	for rows.Next() {
		var t TrendRow
		if err := rows.Scan(&t.Day, &t.Sessions, &t.Impressions, &t.Swipes,
			&t.RightPct, &t.DetailOpens, &t.AvgDwellMs); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		result = append(result, t)
	}
	writeJSON(w, result)
}

func (p *Plugin) handleAudience(w http.ResponseWriter, r *http.Request) {
	since := time.Now().UTC().AddDate(0, 0, -30)

	devices, err := queryAudienceItems(r.Context(), p.db, `
		SELECT
			COALESCE(device_type, 'unknown') AS label,
			COUNT(DISTINCT session_id)       AS sessions,
			ROUND(100.0 * COUNT(DISTINCT session_id) / NULLIF(SUM(COUNT(DISTINCT session_id)) OVER (), 0), 1) AS pct
		FROM engagement_events
		WHERE event_type = 'session_start' AND timestamp >= $1
		GROUP BY device_type
		ORDER BY sessions DESC
	`, since)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	timezones, err := queryAudienceItems(r.Context(), p.db, `
		SELECT
			COALESCE(timezone, 'unknown') AS label,
			COUNT(DISTINCT session_id)    AS sessions,
			0                             AS pct
		FROM engagement_events
		WHERE event_type = 'session_start' AND timestamp >= $1
		GROUP BY timezone
		ORDER BY sessions DESC
		LIMIT 10
	`, since)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	languages, err := queryAudienceItems(r.Context(), p.db, `
		SELECT
			COALESCE(language, 'unknown') AS label,
			COUNT(DISTINCT session_id)    AS sessions,
			0                             AS pct
		FROM engagement_events
		WHERE event_type = 'session_start' AND timestamp >= $1
		GROUP BY language
		ORDER BY sessions DESC
		LIMIT 10
	`, since)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, AudienceResponse{
		Devices:   devices,
		Timezones: timezones,
		Languages: languages,
	})
}

func queryAudienceItems(ctx context.Context, db *sql.DB, q string, args ...any) ([]AudienceItem, error) {
	rows, err := db.QueryContext(ctx, q, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := make([]AudienceItem, 0)
	for rows.Next() {
		var item AudienceItem
		if err := rows.Scan(&item.Label, &item.Sessions, &item.Pct); err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	return items, rows.Err()
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(v); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
