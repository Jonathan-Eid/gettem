package app

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// ── response types ────────────────────────────────────────────────────────────

type PageViewRow struct {
	PageName     string  `json:"page_name"`
	Views        int64   `json:"views"`
	UniqueVisitors int64 `json:"unique_visitors"`
	AvgDwellSec  float64 `json:"avg_dwell_secs"`
}

type LinkClickRow struct {
	Label  string `json:"label"`
	Clicks int64  `json:"clicks"`
}

type PagesResponse struct {
	PageViews  []PageViewRow  `json:"page_views"`
	LinkClicks []LinkClickRow `json:"link_clicks"`
}

type OverviewResponse struct {
	Sessions    int64   `json:"sessions"`
	Swipes      int64   `json:"swipes"`
	RightPct    float64 `json:"right_pct"`
	DetailOpens int64   `json:"detail_opens"`
}

type RecentEvent struct {
	Time        string  `json:"time"`
	EventType   string  `json:"event_type"`
	Card        string  `json:"card"`
	Direction   string  `json:"direction"`
	DwellTimeMs float64 `json:"dwell_time_ms"`
	DeviceType  string  `json:"device_type"`
	Language    string  `json:"language"`
}

type VisitorRow struct {
	Fingerprint    string  `json:"fingerprint"`
	IP             string  `json:"ip"`
	DeviceType     string  `json:"device_type"`
	Language       string  `json:"language"`
	Timezone       string  `json:"timezone"`
	ScreenRes      string  `json:"screen_resolution"`
	SessionCount   int64   `json:"session_count"`
	EventCount     int64   `json:"event_count"`
	Swipes         int64   `json:"swipes"`
	DetailOpens    int64   `json:"detail_opens"`
	TotalDurationS float64 `json:"total_duration_secs"`
	FirstSeen      string  `json:"first_seen"`
	LastSeen       string  `json:"last_seen"`
}

type VisitorsResponse struct {
	UniqueVisitors int64        `json:"unique_visitors"`
	ReturnRate     float64      `json:"return_rate_pct"`
	TopVisitors    []VisitorRow `json:"top_visitors"`
}

type CardRow struct {
	CardID         string  `json:"card_id"`
	CardName       string  `json:"card_name"`
	CardCategory   string  `json:"card_category"`
	Impressions    int64   `json:"impressions"`
	SwipeLeft      int64   `json:"swipe_left"`
	SwipeRight     int64   `json:"swipe_right"`
	TotalSwipes    int64   `json:"total_swipes"`
	RightPct       float64 `json:"right_pct"`
	DetailOpenRate float64 `json:"detail_open_rate"`
	DetailOpens    int64   `json:"detail_opens"`
	AvgDwellMs     float64 `json:"avg_dwell_ms"`
	AvgReadMs      float64 `json:"avg_read_ms"`
	AvgScrollPct   float64 `json:"avg_scroll_pct"`
	Sessions       int64   `json:"sessions"`
	Engagement     int64   `json:"engagement"`
}

type SessionRow struct {
	SessionID   string  `json:"session_id"`
	Fingerprint string  `json:"fingerprint"`
	IP          string  `json:"ip"`
	DeviceType  string  `json:"device_type"`
	ScreenRes   string  `json:"screen_resolution"`
	Language    string  `json:"language"`
	Timezone    string  `json:"timezone"`
	Started     string  `json:"started"`
	DurationSec float64 `json:"duration_secs"`
	EventCount  int64   `json:"event_count"`
	Swipes      int64   `json:"swipes"`
	DetailOpens int64   `json:"detail_opens"`
}

type TrendRow struct {
	Day         string  `json:"day"`
	Sessions    int64   `json:"sessions"`
	Impressions int64   `json:"impressions"`
	Swipes      int64   `json:"swipes"`
	RightPct    float64 `json:"right_pct"`
	DetailOpens int64   `json:"detail_opens"`
	PageViews   int64   `json:"page_views"`
	LinkClicks  int64   `json:"link_clicks"`
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
// These are standalone functions that accept http.ResponseWriter (which is
// what app.CustomRouteResponseWriter embeds). They use direct SQL for
// aggregate queries — the right tool for GROUP BY. CRUD on individual
// events goes through resource.Client instead.

func handleOverview(ctx context.Context, db *sql.DB, w http.ResponseWriter) {
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
	var resp OverviewResponse
	if err := db.QueryRowContext(ctx, q).Scan(&resp.Sessions, &resp.Swipes, &resp.RightPct, &resp.DetailOpens); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	writeJSON(w, resp)
}

func handleRecent(ctx context.Context, db *sql.DB, w http.ResponseWriter) {
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
	rows, err := db.QueryContext(ctx, q)
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

func handleCards(ctx context.Context, db *sql.DB, w http.ResponseWriter) {
	// UNION ALL: historical summaries + live raw events from today.
	// This ensures the page always shows real-time data even before the
	// nightly operator aggregates today's events into summaries.
	const q = `
		WITH combined AS (
			-- Historical: pre-aggregated daily summaries
			SELECT card_id, impressions, swipe_left_count, swipe_right_count,
			       detail_opens, avg_dwell_time_ms, avg_read_time_ms, avg_scroll_depth, unique_sessions
			FROM daily_engagement_summaries
			WHERE date >= CURRENT_DATE - INTERVAL '30 days'
			UNION ALL
			-- Live: today's raw events, aggregated on the fly (card events only)
			SELECT
				COALESCE(card_id, '')                                           AS card_id,
				COUNT(*) FILTER (WHERE event_type = 'card_impression')         AS impressions,
				COUNT(*) FILTER (WHERE event_type = 'swipe' AND swipe_direction = 'left')  AS swipe_left_count,
				COUNT(*) FILTER (WHERE event_type = 'swipe' AND swipe_direction = 'right') AS swipe_right_count,
				COUNT(*) FILTER (WHERE event_type = 'detail_open')            AS detail_opens,
				COALESCE(AVG(dwell_time_ms) FILTER (WHERE event_type = 'swipe'), 0) AS avg_dwell_time_ms,
				COALESCE(AVG(read_time_ms) FILTER (WHERE event_type = 'detail_close'), 0) AS avg_read_time_ms,
				COALESCE(AVG(scroll_depth) FILTER (WHERE event_type = 'detail_close'), 0) AS avg_scroll_depth,
				COUNT(DISTINCT session_id)                                      AS unique_sessions
			FROM engagement_events
			WHERE DATE(timestamp AT TIME ZONE 'UTC') >= CURRENT_DATE
			  AND event_type IN ('card_impression', 'swipe', 'detail_open', 'detail_close', 'undo')
			GROUP BY card_id
		)
		SELECT
			c.card_id,
			COALESCE(cards.name, 'Card ' || c.card_id)                                   AS card_name,
			COALESCE(cards.category, '')                                                  AS card_category,
			c.impressions,
			c.swipe_left,
			c.swipe_right,
			c.total_swipes,
			c.right_pct,
			c.detail_open_rate,
			c.detail_opens,
			c.avg_dwell_ms,
			c.avg_read_ms,
			c.avg_scroll_pct,
			c.sessions,
			c.engagement
		FROM (
			SELECT
				card_id,
				SUM(impressions)                                                              AS impressions,
				SUM(swipe_left_count)                                                         AS swipe_left,
				SUM(swipe_right_count)                                                        AS swipe_right,
				SUM(swipe_left_count) + SUM(swipe_right_count)                               AS total_swipes,
				COALESCE(ROUND(
					100.0 * SUM(swipe_right_count)
					/ NULLIF(SUM(swipe_left_count) + SUM(swipe_right_count), 0)
				, 1), 0)                                                                      AS right_pct,
				COALESCE(ROUND(
					100.0 * SUM(detail_opens)
					/ NULLIF(SUM(impressions), 0)
				, 1), 0)                                                                      AS detail_open_rate,
				SUM(detail_opens)                                                             AS detail_opens,
				COALESCE(ROUND(AVG(avg_dwell_time_ms)::numeric), 0)                          AS avg_dwell_ms,
				COALESCE(ROUND(AVG(avg_read_time_ms)::numeric), 0)                           AS avg_read_ms,
				COALESCE(ROUND((AVG(avg_scroll_depth) * 100)::numeric, 1), 0)               AS avg_scroll_pct,
				SUM(unique_sessions)                                                          AS sessions,
				SUM(impressions) + SUM(swipe_left_count) + SUM(swipe_right_count) + SUM(detail_opens) AS engagement
			FROM combined
			WHERE card_id != ''
			GROUP BY card_id
		) c
		LEFT JOIN cards ON c.card_id ~ '^\d+$' AND cards.id = CAST(c.card_id AS INTEGER)
		ORDER BY c.engagement DESC
	`
	rows, err := db.QueryContext(ctx, q)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	result := make([]CardRow, 0)
	for rows.Next() {
		var c CardRow
		if err := rows.Scan(&c.CardID, &c.CardName, &c.CardCategory,
			&c.Impressions, &c.SwipeLeft, &c.SwipeRight,
			&c.TotalSwipes, &c.RightPct, &c.DetailOpenRate, &c.DetailOpens,
			&c.AvgDwellMs, &c.AvgReadMs, &c.AvgScrollPct, &c.Sessions, &c.Engagement); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		result = append(result, c)
	}
	writeJSON(w, result)
}

func handleSessions(ctx context.Context, db *sql.DB, w http.ResponseWriter) {
	const q = `
		SELECT
			session_id,
			COALESCE(MAX(ip_address), 'unknown') || '::' ||
			COALESCE(MAX(device_type), 'unknown') || '::' ||
			COALESCE(MAX(screen_resolution), 'unknown')  AS fingerprint,
			COALESCE(MAX(ip_address), 'unknown')         AS ip,
			COALESCE(MAX(device_type), 'unknown')        AS device_type,
			COALESCE(MAX(screen_resolution), 'unknown')  AS screen_res,
			COALESCE(MAX(language), 'unknown')            AS language,
			COALESCE(MAX(timezone), 'unknown')            AS timezone,
			TO_CHAR(MIN(timestamp), 'YYYY-MM-DD HH24:MI') AS started,
			COALESCE(EXTRACT(EPOCH FROM MAX(timestamp) - MIN(timestamp)), 0) AS duration_secs,
			COUNT(*)                                      AS event_count,
			COUNT(*) FILTER (WHERE event_type = 'swipe')       AS swipes,
			COUNT(*) FILTER (WHERE event_type = 'detail_open') AS detail_opens
		FROM engagement_events
		WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days'
		GROUP BY session_id
		HAVING COUNT(*) > 1
		ORDER BY duration_secs DESC
		LIMIT 20
	`
	rows, err := db.QueryContext(ctx, q)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	result := make([]SessionRow, 0)
	for rows.Next() {
		var s SessionRow
		if err := rows.Scan(&s.SessionID, &s.Fingerprint, &s.IP, &s.DeviceType, &s.ScreenRes,
			&s.Language, &s.Timezone,
			&s.Started, &s.DurationSec, &s.EventCount, &s.Swipes, &s.DetailOpens); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		result = append(result, s)
	}
	writeJSON(w, result)
}

func handleVisitors(ctx context.Context, db *sql.DB, w http.ResponseWriter) {
	// Fingerprint = IP + device_type + screen_resolution.
	// More accurate than IP alone (multiple users behind NAT),
	// lighter than full UA string matching.
	const q = `
		WITH visitor AS (
			SELECT
				COALESCE(ip_address, 'unknown') || '::' ||
				COALESCE(device_type, 'unknown') || '::' ||
				COALESCE(screen_resolution, 'unknown')        AS fingerprint,
				COALESCE(ip_address, 'unknown')               AS ip,
				COALESCE(device_type, 'unknown')               AS device_type,
				COALESCE(language, 'unknown')                   AS language,
				COALESCE(timezone, 'unknown')                   AS timezone,
				COALESCE(screen_resolution, 'unknown')         AS screen_res,
				COUNT(DISTINCT session_id)                      AS session_count,
				COUNT(*)                                        AS event_count,
				COUNT(*) FILTER (WHERE event_type = 'swipe')   AS swipes,
				COUNT(*) FILTER (WHERE event_type = 'detail_open') AS detail_opens,
				COALESCE(EXTRACT(EPOCH FROM MAX(timestamp) - MIN(timestamp)), 0) AS total_duration_secs,
				TO_CHAR(MIN(timestamp), 'YYYY-MM-DD HH24:MI') AS first_seen,
				TO_CHAR(MAX(timestamp), 'YYYY-MM-DD HH24:MI') AS last_seen
			FROM engagement_events
			WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days'
			GROUP BY fingerprint, ip, device_type, language, timezone, screen_res
		)
		SELECT * FROM visitor
		ORDER BY event_count DESC
		LIMIT 25
	`
	rows, err := db.QueryContext(ctx, q)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	visitors := make([]VisitorRow, 0)
	for rows.Next() {
		var v VisitorRow
		if err := rows.Scan(&v.Fingerprint, &v.IP, &v.DeviceType, &v.Language, &v.Timezone,
			&v.ScreenRes, &v.SessionCount, &v.EventCount, &v.Swipes, &v.DetailOpens,
			&v.TotalDurationS, &v.FirstSeen, &v.LastSeen); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		visitors = append(visitors, v)
	}

	// Compute summary stats
	var totalVisitors int64
	var returnVisitors int64
	if err := db.QueryRowContext(ctx, `
		SELECT
			COUNT(*),
			COUNT(*) FILTER (WHERE sc > 1)
		FROM (
			SELECT
				COALESCE(ip_address,'') || '::' || COALESCE(device_type,'') || '::' || COALESCE(screen_resolution,'') AS fp,
				COUNT(DISTINCT session_id) AS sc
			FROM engagement_events
			WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days'
			GROUP BY fp
		) t
	`).Scan(&totalVisitors, &returnVisitors); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var returnRate float64
	if totalVisitors > 0 {
		returnRate = float64(returnVisitors) / float64(totalVisitors) * 100
	}

	writeJSON(w, VisitorsResponse{
		UniqueVisitors: totalVisitors,
		ReturnRate:     returnRate,
		TopVisitors:    visitors,
	})
}

func handleTrends(ctx context.Context, db *sql.DB, w http.ResponseWriter) {
	// Two queries:
	// 1. Card metrics: historical summaries + live card events from today
	// 2. Page/link metrics: always from raw engagement_events (not in summaries)
	const q = `
		WITH card_combined AS (
			SELECT date,
			       unique_sessions, impressions, swipe_left_count, swipe_right_count,
			       detail_opens, avg_dwell_time_ms
			FROM daily_engagement_summaries
			WHERE date >= CURRENT_DATE - INTERVAL '30 days'
			UNION ALL
			SELECT
				CURRENT_DATE AS date,
				COUNT(DISTINCT session_id) AS unique_sessions,
				COUNT(*) FILTER (WHERE event_type = 'card_impression') AS impressions,
				COUNT(*) FILTER (WHERE event_type = 'swipe' AND swipe_direction = 'left') AS swipe_left_count,
				COUNT(*) FILTER (WHERE event_type = 'swipe' AND swipe_direction = 'right') AS swipe_right_count,
				COUNT(*) FILTER (WHERE event_type = 'detail_open') AS detail_opens,
				COALESCE(AVG(dwell_time_ms) FILTER (WHERE event_type = 'swipe'), 0) AS avg_dwell_time_ms
			FROM engagement_events
			WHERE DATE(timestamp AT TIME ZONE 'UTC') >= CURRENT_DATE
			  AND event_type IN ('card_impression', 'swipe', 'detail_open', 'detail_close', 'undo')
		),
		card_daily AS (
			SELECT
				date,
				SUM(unique_sessions) AS sessions,
				SUM(impressions) AS impressions,
				SUM(swipe_left_count + swipe_right_count) AS swipes,
				COALESCE(ROUND(
					100.0 * SUM(swipe_right_count)
					/ NULLIF(SUM(swipe_left_count + swipe_right_count), 0)
				, 1), 0) AS right_pct,
				SUM(detail_opens) AS detail_opens,
				COALESCE(ROUND(AVG(avg_dwell_time_ms)::numeric), 0) AS avg_dwell_ms
			FROM card_combined
			GROUP BY date
		),
		page_daily AS (
			SELECT
				DATE(timestamp AT TIME ZONE 'UTC') AS date,
				COUNT(*) FILTER (WHERE event_type = 'page_view' AND COALESCE(dwell_time_ms, 0) > 0) AS page_views,
				COUNT(*) FILTER (WHERE event_type = 'link_click') AS link_clicks
			FROM engagement_events
			WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days'
			GROUP BY DATE(timestamp AT TIME ZONE 'UTC')
		)
		SELECT
			TO_CHAR(COALESCE(c.date, p.date), 'YYYY-MM-DD') AS day,
			COALESCE(c.sessions, 0)     AS sessions,
			COALESCE(c.impressions, 0)  AS impressions,
			COALESCE(c.swipes, 0)       AS swipes,
			COALESCE(c.right_pct, 0)    AS right_pct,
			COALESCE(c.detail_opens, 0) AS detail_opens,
			COALESCE(p.page_views, 0)   AS page_views,
			COALESCE(p.link_clicks, 0)  AS link_clicks,
			COALESCE(c.avg_dwell_ms, 0) AS avg_dwell_ms
		FROM card_daily c
		FULL OUTER JOIN page_daily p ON c.date = p.date
		ORDER BY day DESC
	`
	rows, err := db.QueryContext(ctx, q)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	result := make([]TrendRow, 0)
	for rows.Next() {
		var t TrendRow
		if err := rows.Scan(&t.Day, &t.Sessions, &t.Impressions, &t.Swipes,
			&t.RightPct, &t.DetailOpens, &t.PageViews, &t.LinkClicks, &t.AvgDwellMs); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		result = append(result, t)
	}
	writeJSON(w, result)
}

func handleAudience(ctx context.Context, db *sql.DB, w http.ResponseWriter) {
	since := time.Now().UTC().AddDate(0, 0, -30)

	// Use fingerprint (IP + device + screen) for unique visitor counts instead of just session_id
	fp := `COALESCE(ip_address,'') || '::' || COALESCE(device_type,'') || '::' || COALESCE(screen_resolution,'')`

	devices, err := queryAudienceItems(ctx, db, fmt.Sprintf(`
		SELECT
			COALESCE(device_type, 'unknown') AS label,
			COUNT(DISTINCT %s)               AS visitors,
			ROUND(100.0 * COUNT(DISTINCT %s) / NULLIF(SUM(COUNT(DISTINCT %s)) OVER (), 0), 1) AS pct
		FROM engagement_events
		WHERE timestamp >= $1
		GROUP BY device_type
		ORDER BY visitors DESC
	`, fp, fp, fp), since)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	timezones, err := queryAudienceItems(ctx, db, fmt.Sprintf(`
		SELECT
			COALESCE(timezone, 'unknown') AS label,
			COUNT(DISTINCT %s)            AS visitors,
			0                             AS pct
		FROM engagement_events
		WHERE timestamp >= $1
		GROUP BY timezone
		ORDER BY visitors DESC
		LIMIT 10
	`, fp), since)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	languages, err := queryAudienceItems(ctx, db, fmt.Sprintf(`
		SELECT
			COALESCE(language, 'unknown') AS label,
			COUNT(DISTINCT %s)            AS visitors,
			0                             AS pct
		FROM engagement_events
		WHERE timestamp >= $1
		GROUP BY language
		ORDER BY visitors DESC
		LIMIT 10
	`, fp), since)
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

func handlePages(ctx context.Context, db *sql.DB, w http.ResponseWriter) {
	fp := `COALESCE(ip_address,'') || '::' || COALESCE(device_type,'') || '::' || COALESCE(screen_resolution,'')`

	// Page views grouped by page name (card_id holds the page name for page_view events)
	pvRows, err := db.QueryContext(ctx, fmt.Sprintf(`
		SELECT
			COALESCE(card_id, 'unknown') AS page_name,
			COUNT(*)                     AS views,
			COUNT(DISTINCT %s)           AS unique_visitors,
			COALESCE(ROUND((AVG(dwell_time_ms) / 1000.0)::numeric, 1), 0) AS avg_dwell_secs
		FROM engagement_events
		WHERE event_type = 'page_view'
		  AND timestamp >= CURRENT_DATE - INTERVAL '30 days'
		  AND COALESCE(dwell_time_ms, 0) > 0
		GROUP BY card_id
		ORDER BY views DESC
	`, fp))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer pvRows.Close()

	pageViews := make([]PageViewRow, 0)
	for pvRows.Next() {
		var p PageViewRow
		if err := pvRows.Scan(&p.PageName, &p.Views, &p.UniqueVisitors, &p.AvgDwellSec); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		pageViews = append(pageViews, p)
	}

	// Link clicks grouped by label (card_id holds the link label for link_click events)
	lcRows, err := db.QueryContext(ctx, `
		SELECT
			COALESCE(card_id, 'unknown') AS label,
			COUNT(*)                     AS clicks
		FROM engagement_events
		WHERE event_type = 'link_click'
		  AND timestamp >= CURRENT_DATE - INTERVAL '30 days'
		GROUP BY card_id
		ORDER BY clicks DESC
	`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer lcRows.Close()

	linkClicks := make([]LinkClickRow, 0)
	for lcRows.Next() {
		var l LinkClickRow
		if err := lcRows.Scan(&l.Label, &l.Clicks); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		linkClicks = append(linkClicks, l)
	}

	writeJSON(w, PagesResponse{
		PageViews:  pageViews,
		LinkClicks: linkClicks,
	})
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(v); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
