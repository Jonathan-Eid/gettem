import React from 'react';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { PluginPage } from '@grafana/runtime';
import { Alert, LoadingBar, useStyles2, useTheme2 } from '@grafana/ui';
import { usePluginAPI } from '../hooks/usePluginAPI';

type CardRow = {
  card_id: string;
  card_name: string;
  card_category: string;
  impressions: number;
  swipe_left: number;
  swipe_right: number;
  total_swipes: number;
  right_pct: number;
  detail_open_rate: number;
  detail_opens: number;
  avg_dwell_ms: number;
  avg_read_ms: number;
  avg_scroll_pct: number;
  sessions: number;
  engagement: number;
};

// ── swipe ratio bar ───────────────────────────────────────────────────────────

function SwipeRatioBar({ left, right }: { left: number; right: number }) {
  const theme = useTheme2();
  const total = left + right;
  if (total === 0) { return <span style={{ color: theme.colors.text.disabled }}>No swipes</span>; }
  const rightPct = (right / total) * 100;
  const leftPct = 100 - rightPct;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 200 }}>
      <span style={{ fontSize: 11, color: theme.colors.error.text, width: 28, textAlign: 'right' }}>{left}</span>
      <div style={{
        flex: 1, height: 14, borderRadius: 7, display: 'flex', overflow: 'hidden',
        background: theme.colors.background.canvas,
      }}>
        <div style={{ width: `${leftPct}%`, background: theme.colors.error.main, transition: 'width 0.3s' }} />
        <div style={{ width: `${rightPct}%`, background: theme.colors.success.main, transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: 11, color: theme.colors.success.text, width: 28 }}>{right}</span>
    </div>
  );
}

// ── engagement bar ────────────────────────────────────────────────────────────

function EngagementBar({ value, max }: { value: number; max: number }) {
  const theme = useTheme2();
  const pct = max > 0 ? (value / max) * 100 : 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 600, minWidth: 40 }}>{value.toLocaleString()}</span>
      <div style={{
        flex: 1, height: 8, borderRadius: 4, overflow: 'hidden', minWidth: 80,
        background: theme.colors.background.canvas,
      }}>
        <div style={{
          width: `${pct}%`, height: '100%', borderRadius: 4,
          background: `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.primary.shade})`,
          transition: 'width 0.3s',
        }} />
      </div>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────

function PageTwo() {
  const s = useStyles2(getStyles);
  const theme = useTheme2();
  const { data: rawData, loading, error } = usePluginAPI<CardRow[]>('cards');
  const data = rawData ?? [];
  const maxEngagement = Math.max(...data.map(r => r.engagement), 1);

  return (
    <PluginPage>
      <div className={s.root}>
        <h2 className={s.heading}>Card leaderboard <span className={s.period}>— last 30 days, ranked by engagement</span></h2>

        {loading && <LoadingBar width={300} />}
        {error && <Alert title="Query error" severity="error">{error}</Alert>}

        {!loading && !error && (
          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Card</th>
                  <th>Swipe ratio (left / right)</th>
                  <th>Right %</th>
                  <th>Engagement score</th>
                  <th>Impressions</th>
                  <th>Detail opens</th>
                  <th>Avg dwell</th>
                  <th>Sessions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={row.card_id}>
                    <td className={s.rank}>
                      {i === 0 ? '1' : i + 1}
                    </td>
                    <td>
                      <div>{row.card_name}</div>
                      {row.card_category && (
                        <span className={s.category}>{row.card_category.replace('_', ' ')}</span>
                      )}
                    </td>
                    <td>
                      <SwipeRatioBar left={row.swipe_left} right={row.swipe_right} />
                    </td>
                    <td>
                      <span style={{
                        color: row.right_pct >= 60
                          ? theme.colors.success.text
                          : row.right_pct <= 30
                            ? theme.colors.error.text
                            : theme.colors.text.primary,
                        fontWeight: 600,
                      }}>
                        {row.right_pct}%
                      </span>
                    </td>
                    <td>
                      <EngagementBar value={row.engagement} max={maxEngagement} />
                    </td>
                    <td>{row.impressions?.toLocaleString()}</td>
                    <td>{row.detail_opens?.toLocaleString()}</td>
                    <td>{row.avg_dwell_ms?.toLocaleString()}ms</td>
                    <td>{row.sessions?.toLocaleString()}</td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr><td colSpan={9} className={s.empty}>No summary data yet — the operator runs nightly.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PluginPage>
  );
}

export default PageTwo;

const getStyles = (theme: GrafanaTheme2) => ({
  root: css`padding: ${theme.spacing(2, 0)};`,
  heading: css`
    font-size: ${theme.typography.h3.fontSize};
    font-weight: ${theme.typography.fontWeightMedium};
    margin-bottom: ${theme.spacing(2)};
  `,
  period: css`
    font-size: ${theme.typography.body.fontSize};
    font-weight: normal;
    color: ${theme.colors.text.secondary};
  `,
  tableWrapper: css`overflow-x: auto;`,
  table: css`
    width: 100%;
    border-collapse: collapse;
    font-size: ${theme.typography.bodySmall.fontSize};
    th, td {
      text-align: left;
      padding: ${theme.spacing(1, 1.5)};
      border-bottom: 1px solid ${theme.colors.border.weak};
    }
    th {
      color: ${theme.colors.text.secondary};
      font-weight: ${theme.typography.fontWeightMedium};
      white-space: nowrap;
    }
    tr:hover td { background: ${theme.colors.background.secondary}; }
  `,
  rank: css`
    color: ${theme.colors.text.disabled};
    width: 32px;
    font-size: 14px;
    font-weight: ${theme.typography.fontWeightBold};
  `,
  category: css`
    font-size: 11px;
    color: ${theme.colors.text.secondary};
    text-transform: capitalize;
  `,
  empty: css`
    text-align: center;
    color: ${theme.colors.text.disabled};
    padding: ${theme.spacing(3)} !important;
  `,
});
