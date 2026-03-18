// Package jobs implements app.Runnable scheduled jobs for the analytics operator.
package jobs

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"
	"time"
)

// AggregationJob implements app.Runnable.
// On each tick it:
//  1. Computes per-card daily summaries from raw engagement_events (written by Strapi)
//  2. Upserts those summaries into daily_engagement_summaries
//  3. Prunes raw events older than RetentionDays to keep disk usage bounded
type AggregationJob struct {
	db            *sql.DB
	interval      time.Duration
	retentionDays int
	log           *slog.Logger
}

func NewAggregationJob(db *sql.DB, interval time.Duration, retentionDays int) *AggregationJob {
	return &AggregationJob{
		db:            db,
		interval:      interval,
		retentionDays: retentionDays,
		log:           slog.Default().With("job", "aggregation"),
	}
}

// Run implements app.Runnable. Blocks until ctx is cancelled.
func (j *AggregationJob) Run(ctx context.Context) error {
	j.log.Info("started", "interval", j.interval, "retention_days", j.retentionDays)

	// Run once immediately on startup, then on every tick.
	if err := j.execute(ctx); err != nil {
		j.log.Error("initial run failed", "err", err)
	}

	ticker := time.NewTicker(j.interval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			j.log.Info("shutting down")
			return nil
		case <-ticker.C:
			if err := j.execute(ctx); err != nil {
				j.log.Error("run failed", "err", err)
				// Don't return — reschedule on next tick.
			}
		}
	}
}

// execute performs one aggregation + prune cycle inside a single transaction.
func (j *AggregationJob) execute(ctx context.Context) error {
	start := time.Now()
	j.log.Info("running aggregation")

	tx, err := j.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("begin tx: %w", err)
	}
	defer tx.Rollback() //nolint:errcheck

	// Step 1: Aggregate yesterday's raw events into daily_engagement_summaries.
	// We use DATE(timestamp AT TIME ZONE 'UTC') so the date grouping is consistent.
	upsertSQL := `
		INSERT INTO daily_engagement_summaries
			(date, card_id, impressions, swipe_left_count, swipe_right_count,
			 avg_dwell_time_ms, detail_opens, avg_read_time_ms, avg_scroll_depth,
			 unique_sessions, updated_at)
		SELECT
			DATE(timestamp AT TIME ZONE 'UTC')                              AS date,
			COALESCE(card_id, '')                                           AS card_id,
			COUNT(*) FILTER (WHERE event_type = 'card_impression')         AS impressions,
			COUNT(*) FILTER (WHERE event_type = 'swipe'
			                   AND swipe_direction = 'left')               AS swipe_left_count,
			COUNT(*) FILTER (WHERE event_type = 'swipe'
			                   AND swipe_direction = 'right')              AS swipe_right_count,
			COALESCE(AVG(dwell_time_ms) FILTER (WHERE event_type = 'swipe'), 0)
			                                                                AS avg_dwell_time_ms,
			COUNT(*) FILTER (WHERE event_type = 'detail_open')            AS detail_opens,
			COALESCE(AVG(read_time_ms)  FILTER (WHERE event_type = 'detail_close'), 0)
			                                                                AS avg_read_time_ms,
			COALESCE(AVG(scroll_depth)  FILTER (WHERE event_type = 'detail_close'), 0)
			                                                                AS avg_scroll_depth,
			COUNT(DISTINCT session_id)                                      AS unique_sessions,
			NOW()                                                           AS updated_at
		FROM engagement_events
		WHERE
			-- Only aggregate events that have aged past today (complete days only)
			DATE(timestamp AT TIME ZONE 'UTC') < CURRENT_DATE
		GROUP BY date, card_id
		ON CONFLICT (date, card_id) DO UPDATE SET
			impressions        = EXCLUDED.impressions,
			swipe_left_count   = EXCLUDED.swipe_left_count,
			swipe_right_count  = EXCLUDED.swipe_right_count,
			avg_dwell_time_ms  = EXCLUDED.avg_dwell_time_ms,
			detail_opens       = EXCLUDED.detail_opens,
			avg_read_time_ms   = EXCLUDED.avg_read_time_ms,
			avg_scroll_depth   = EXCLUDED.avg_scroll_depth,
			unique_sessions    = EXCLUDED.unique_sessions,
			updated_at         = EXCLUDED.updated_at
	`
	if _, err := tx.ExecContext(ctx, upsertSQL); err != nil {
		return fmt.Errorf("upsert summaries: %w", err)
	}

	// Step 2: Prune raw events older than retentionDays.
	cutoff := time.Now().UTC().AddDate(0, 0, -j.retentionDays)
	result, err := tx.ExecContext(ctx,
		`DELETE FROM engagement_events WHERE timestamp < $1`, cutoff,
	)
	if err != nil {
		return fmt.Errorf("prune events: %w", err)
	}

	pruned, _ := result.RowsAffected()

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("commit: %w", err)
	}

	// Step 3: Reclaim disk space freed by the DELETE.
	// VACUUM cannot run inside a transaction, so we do it after commit.
	if _, err := j.db.ExecContext(ctx, `VACUUM engagement_events`); err != nil {
		j.log.Warn("vacuum failed (non-fatal)", "err", err)
	}

	j.log.Info("done",
		"pruned_events", pruned,
		"duration", time.Since(start).Round(time.Millisecond),
	)
	return nil
}
