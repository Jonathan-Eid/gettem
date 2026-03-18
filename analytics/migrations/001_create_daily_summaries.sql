-- Daily aggregated engagement summaries per card.
-- Raw engagement_events (written by Strapi) are pruned after aggregation.
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
