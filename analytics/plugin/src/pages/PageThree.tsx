import React from 'react';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { PluginPage } from '@grafana/runtime';
import { Alert, LoadingBar, useStyles2 } from '@grafana/ui';
import { usePluginAPI } from '../hooks/usePluginAPI';

type TrendRow = {
  day: string;
  sessions: number;
  impressions: number;
  swipes: number;
  right_pct: number;
  detail_opens: number;
  page_views: number;
  link_clicks: number;
  avg_dwell_ms: number;
};

function AreaSparkline({ values, color, label, latest, unit, width = 240, height = 64 }: {
  values: number[]; color: string; label: string; latest: string | number; unit?: string;
  width?: number; height?: number;
}) {
  const s = useStyles2(getStyles);
  if (values.length < 2) { return null; }
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * width},${height - (v / max) * (height - 4)}`).join(' ');

  return (
    <div className={s.sparkCard}>
      <div className={s.sparkHeader}>
        <span className={s.sparkLabel}>{label}</span>
        <span className={s.sparkValue} style={{ color }}>
          {latest}{unit && <span className={s.sparkUnit}>{unit}</span>}
        </span>
      </div>
      <svg width={width} height={height} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`area-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${height} ${pts} ${width},${height}`}
          fill={`url(#area-${color.replace('#', '')})`}
        />
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" />
      </svg>
    </div>
  );
}

function PageThree() {
  const s = useStyles2(getStyles);
  const { data: rawData, loading, error } = usePluginAPI<TrendRow[]>('trends');
  const data = rawData ?? [];
  const chrono = [...data].reverse();
  const latest = data[0];

  return (
    <PluginPage>
      <div className={s.root}>
        <h2 className={s.heading}>Engagement trends <span className={s.period}>— last 30 days</span></h2>

        {loading && <LoadingBar width={300} />}
        {error && <Alert title="Query error" severity="error">{error}</Alert>}

        {!loading && !error && (
          <>
            <div className={s.sparkGrid}>
              <AreaSparkline label="Sessions / day" values={chrono.map(r => r.sessions)} color="#5794f2"
                latest={latest?.sessions ?? 0} />
              <AreaSparkline label="Swipes / day" values={chrono.map(r => r.swipes)} color="#73bf69"
                latest={latest?.swipes ?? 0} />
              <AreaSparkline label="Right swipe %" values={chrono.map(r => r.right_pct)} color="#ff9830"
                latest={latest?.right_pct ?? 0} unit="%" />
              <AreaSparkline label="Detail opens / day" values={chrono.map(r => r.detail_opens)} color="#b877d9"
                latest={latest?.detail_opens ?? 0} />
              <AreaSparkline label="Page views / day" values={chrono.map(r => r.page_views)} color="#8ab8ff"
                latest={latest?.page_views ?? 0} />
              <AreaSparkline label="Link clicks / day" values={chrono.map(r => r.link_clicks)} color="#ff6600"
                latest={latest?.link_clicks ?? 0} />
              <AreaSparkline label="Avg dwell time" values={chrono.map(r => r.avg_dwell_ms)} color="#f2495c"
                latest={latest?.avg_dwell_ms?.toLocaleString() ?? '0'} unit="ms" />
            </div>

            <h3 className={s.subheading}>Daily breakdown</h3>
            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Date</th><th>Sessions</th><th>Impressions</th>
                    <th>Swipes</th><th>Right %</th><th>Detail opens</th>
                    <th>Page views</th><th>Link clicks</th><th>Avg dwell</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.day}>
                      <td className={s.date}>{row.day}</td>
                      <td>{row.sessions?.toLocaleString()}</td>
                      <td>{row.impressions?.toLocaleString()}</td>
                      <td>{row.swipes?.toLocaleString()}</td>
                      <td>{row.right_pct ?? '—'}%</td>
                      <td>{row.detail_opens?.toLocaleString()}</td>
                      <td>{row.page_views?.toLocaleString()}</td>
                      <td>{row.link_clicks?.toLocaleString()}</td>
                      <td>{row.avg_dwell_ms?.toLocaleString()}ms</td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr><td colSpan={7} className={s.empty}>No data yet — the operator runs nightly.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </PluginPage>
  );
}

export default PageThree;

const getStyles = (theme: GrafanaTheme2) => ({
  root: css`padding: ${theme.spacing(2, 0)};`,
  heading: css`
    font-size: ${theme.typography.h3.fontSize};
    font-weight: ${theme.typography.fontWeightMedium};
    margin-bottom: ${theme.spacing(2)};
  `,
  subheading: css`
    font-size: ${theme.typography.h5.fontSize};
    font-weight: ${theme.typography.fontWeightMedium};
    margin: ${theme.spacing(3, 0, 1.5)};
  `,
  period: css`
    font-size: ${theme.typography.body.fontSize};
    font-weight: normal;
    color: ${theme.colors.text.secondary};
  `,
  sparkGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: ${theme.spacing(2)};
    margin-bottom: ${theme.spacing(1)};
  `,
  sparkCard: css`
    background: ${theme.colors.background.secondary};
    border: 1px solid ${theme.colors.border.weak};
    border-radius: ${theme.shape.radius.default};
    padding: ${theme.spacing(2)};
  `,
  sparkHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: ${theme.spacing(1)};
  `,
  sparkLabel: css`
    font-size: ${theme.typography.bodySmall.fontSize};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
  sparkValue: css`
    font-size: 1.4rem;
    font-weight: ${theme.typography.fontWeightBold};
  `,
  sparkUnit: css`
    font-size: 0.75rem;
    margin-left: 2px;
    opacity: 0.7;
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
  date: css`font-family: ${theme.typography.fontFamilyMonospace}; font-size: 12px;`,
  empty: css`
    text-align: center;
    color: ${theme.colors.text.disabled};
    padding: ${theme.spacing(3)} !important;
  `,
});
