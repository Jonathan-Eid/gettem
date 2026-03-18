import React from 'react';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { PluginPage } from '@grafana/runtime';
import { Alert, LoadingBar, useStyles2, useTheme2 } from '@grafana/ui';
import { usePluginAPI } from '../hooks/usePluginAPI';

interface OverviewResponse {
  sessions: number;
  swipes: number;
  right_pct: number;
  detail_opens: number;
}

interface TrendRow {
  day: string;
  sessions: number;
  impressions: number;
  swipes: number;
  right_pct: number;
  detail_opens: number;
  page_views: number;
  link_clicks: number;
  avg_dwell_ms: number;
}

interface CardRow {
  card_id: string;
  card_name: string;
  card_category: string;
  impressions: number;
  swipe_left: number;
  swipe_right: number;
  total_swipes: number;
  right_pct: number;
  detail_opens: number;
  engagement: number;
  avg_dwell_ms: number;
  sessions: number;
}

interface RecentEvent {
  time: string;
  event_type: string;
  card: string;
  direction: string;
  dwell_time_ms: number;
  device_type: string;
  language: string;
}

// ── sparkline helper ──────────────────────────────────────────────────────────

function MiniSparkline({ values, color, width = 80, height = 28 }: { values: number[]; color: string; width?: number; height?: number }) {
  if (values.length < 2) { return null; }
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * width},${height - (v / max) * (height - 2)}`).join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${pts} ${width},${height}`}
        fill={`url(#grad-${color.replace('#', '')})`}
      />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

// ── stat card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, unit, color, sparkValues, sparkColor }: {
  label: string; value: string | number | null; unit?: string;
  color?: string; sparkValues?: number[]; sparkColor?: string;
}) {
  const s = useStyles2(getStyles);
  const theme = useTheme2();
  const accentColor = color ?? theme.colors.text.primary;

  return (
    <div className={s.statCard}>
      <div className={s.statValue} style={{ color: accentColor }}>
        {value ?? '—'}
        {unit && <span className={s.statUnit}>{unit}</span>}
      </div>
      <div className={s.statLabel}>{label}</div>
      {sparkValues && sparkValues.length > 1 && (
        <div className={s.sparkContainer}>
          <MiniSparkline values={sparkValues} color={sparkColor ?? accentColor} width={120} height={32} />
        </div>
      )}
    </div>
  );
}

// ── event badge ───────────────────────────────────────────────────────────────

const eventColors: Record<string, string> = {
  swipe: '#5794f2',
  card_impression: '#73bf69',
  detail_open: '#ff9830',
  detail_close: '#b877d9',
  session_start: '#8ab8ff',
  session_end: '#f2495c',
  undo: '#ff6600',
};

function EventBadge({ type }: { type: string }) {
  const s = useStyles2(getStyles);
  const bg = eventColors[type] ?? '#666';
  return <span className={s.eventBadge} style={{ background: bg }}>{type.replace('_', ' ')}</span>;
}

// ── page ──────────────────────────────────────────────────────────────────────

function PageOne() {
  const s = useStyles2(getStyles);
  const theme = useTheme2();
  const stats = usePluginAPI<OverviewResponse>('overview');
  const trends = usePluginAPI<TrendRow[]>('trends');
  const cards = usePluginAPI<CardRow[]>('cards');
  const recent = usePluginAPI<RecentEvent[]>('recent');

  const trendData = (trends.data ?? []).slice().reverse();
  const topCard = (cards.data ?? [])[0];

  return (
    <PluginPage>
      <div className={s.root}>
        {stats.loading && <LoadingBar width={300} />}
        {stats.error && <Alert title="Query error" severity="error">{stats.error}</Alert>}

        {!stats.loading && !stats.error && stats.data && (
          <>
            <div className={s.statRow}>
              <StatCard
                label="Sessions today"
                value={stats.data.sessions}
                color={theme.colors.primary.text}
                sparkValues={trendData.map(r => r.sessions)}
                sparkColor="#5794f2"
              />
              <StatCard
                label="Swipes today"
                value={stats.data.swipes}
                color={theme.colors.text.primary}
                sparkValues={trendData.map(r => r.swipes)}
                sparkColor="#73bf69"
              />
              <StatCard
                label="Right swipe rate"
                value={stats.data.right_pct}
                unit="%"
                color={stats.data.right_pct >= 50 ? theme.colors.success.text : theme.colors.warning.text}
              />
              <StatCard
                label="Detail opens"
                value={stats.data.detail_opens}
                color={theme.colors.warning.text}
                sparkValues={trendData.map(r => r.detail_opens)}
                sparkColor="#ff9830"
              />
            </div>

            {topCard && (
              <div className={s.heroCard}>
                <div className={s.heroLabel}>Most engaged card</div>
                <div className={s.heroTitle}>{topCard.card_name}</div>
                <div className={s.heroStats}>
                  <div><strong>{topCard.engagement.toLocaleString()}</strong> total engagement</div>
                  <div><strong>{topCard.impressions.toLocaleString()}</strong> impressions</div>
                  <div>
                    <span style={{ color: theme.colors.success.text }}>{topCard.swipe_right} right</span>
                    {' / '}
                    <span style={{ color: theme.colors.error.text }}>{topCard.swipe_left} left</span>
                    {' '}({topCard.right_pct}% right)
                  </div>
                  <div><strong>{topCard.detail_opens}</strong> detail opens</div>
                  <div><strong>{topCard.avg_dwell_ms.toLocaleString()}</strong>ms avg dwell</div>
                </div>
              </div>
            )}
          </>
        )}

        <h3 className={s.subheading}>Recent events</h3>

        {recent.loading && <LoadingBar width={300} />}
        {recent.error && <Alert title="Query error" severity="error">{recent.error}</Alert>}

        {!recent.loading && !recent.error && (
          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Time</th><th>Event</th><th>Card</th>
                  <th>Direction</th><th>Dwell (ms)</th><th>Device</th>
                </tr>
              </thead>
              <tbody>
                {(recent.data ?? []).map((row, i) => (
                  <tr key={i}>
                    <td className={s.mono}>{row.time}</td>
                    <td><EventBadge type={row.event_type} /></td>
                    <td>{row.card}</td>
                    <td>{row.direction}</td>
                    <td>{row.dwell_time_ms}</td>
                    <td>{row.device_type}</td>
                  </tr>
                ))}
                {(recent.data ?? []).length === 0 && (
                  <tr><td colSpan={6} className={s.empty}>No events today yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PluginPage>
  );
}

export default PageOne;

const getStyles = (theme: GrafanaTheme2) => ({
  root: css`padding: ${theme.spacing(2, 0)};`,
  statRow: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${theme.spacing(2)};
    margin-bottom: ${theme.spacing(3)};
  `,
  statCard: css`
    background: ${theme.colors.background.secondary};
    border: 1px solid ${theme.colors.border.weak};
    border-radius: ${theme.shape.radius.default};
    padding: ${theme.spacing(2, 2.5)};
  `,
  statValue: css`
    font-size: 2.2rem;
    font-weight: ${theme.typography.fontWeightBold};
    line-height: 1.1;
  `,
  statUnit: css`
    font-size: 1rem;
    margin-left: 2px;
    opacity: 0.7;
  `,
  statLabel: css`
    font-size: ${theme.typography.bodySmall.fontSize};
    color: ${theme.colors.text.secondary};
    margin-top: ${theme.spacing(0.5)};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
  sparkContainer: css`
    margin-top: ${theme.spacing(1)};
  `,
  heroCard: css`
    background: linear-gradient(135deg, ${theme.colors.background.secondary}, ${theme.colors.background.canvas});
    border: 2px solid ${theme.colors.primary.border};
    border-radius: ${theme.shape.radius.default};
    padding: ${theme.spacing(3)};
    margin-bottom: ${theme.spacing(3)};
  `,
  heroLabel: css`
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${theme.colors.primary.text};
    margin-bottom: ${theme.spacing(0.5)};
  `,
  heroTitle: css`
    font-size: ${theme.typography.h2.fontSize};
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing(1.5)};
  `,
  heroStats: css`
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing(1, 3)};
    font-size: ${theme.typography.body.fontSize};
    color: ${theme.colors.text.secondary};
  `,
  subheading: css`
    font-size: ${theme.typography.h5.fontSize};
    font-weight: ${theme.typography.fontWeightMedium};
    margin: ${theme.spacing(1, 0, 1.5)};
  `,
  tableWrapper: css`overflow-x: auto;`,
  table: css`
    width: 100%;
    border-collapse: collapse;
    font-size: ${theme.typography.bodySmall.fontSize};
    th, td {
      text-align: left;
      padding: ${theme.spacing(0.75, 1.5)};
      border-bottom: 1px solid ${theme.colors.border.weak};
    }
    th { color: ${theme.colors.text.secondary}; font-weight: ${theme.typography.fontWeightMedium}; }
    tr:hover td { background: ${theme.colors.background.secondary}; }
  `,
  eventBadge: css`
    color: #fff;
    border-radius: 3px;
    padding: ${theme.spacing(0.25, 0.75)};
    font-size: 11px;
    font-family: ${theme.typography.fontFamilyMonospace};
    white-space: nowrap;
  `,
  mono: css`font-family: ${theme.typography.fontFamilyMonospace}; font-size: 12px;`,
  empty: css`
    text-align: center;
    color: ${theme.colors.text.disabled};
    padding: ${theme.spacing(3)} !important;
  `,
});
