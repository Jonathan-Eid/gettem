import React from 'react';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { PluginPage } from '@grafana/runtime';
import { Alert, LoadingBar, useStyles2, useTheme2 } from '@grafana/ui';
import { usePluginAPI } from '../hooks/usePluginAPI';

type SessionRow = {
  session_id: string;
  fingerprint: string;
  ip: string;
  device_type: string;
  screen_resolution: string;
  language: string;
  timezone: string;
  started: string;
  duration_secs: number;
  event_count: number;
  swipes: number;
  detail_opens: number;
};

type VisitorRow = {
  fingerprint: string;
  ip: string;
  device_type: string;
  language: string;
  timezone: string;
  screen_resolution: string;
  session_count: number;
  event_count: number;
  swipes: number;
  detail_opens: number;
  total_duration_secs: number;
  first_seen: string;
  last_seen: string;
};

type VisitorsResponse = {
  unique_visitors: number;
  return_rate_pct: number;
  top_visitors: VisitorRow[];
};

type AudienceRow = { label: string; sessions: number; pct?: number };

type AudienceResponse = {
  devices: AudienceRow[];
  timezones: AudienceRow[];
  languages: AudienceRow[];
};

function formatDuration(secs: number): string {
  if (secs < 60) { return `${Math.round(secs)}s`; }
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m`;
  }
  return `${m}m ${s}s`;
}

// ── bar components ────────────────────────────────────────────────────────────

function HorizBar({ value, max, color }: { value: number; max: number; color?: string }) {
  const theme = useTheme2();
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 600, minWidth: 40 }}>{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}</span>
      <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: 'hidden', minWidth: 60, background: theme.colors.background.canvas }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: color ?? theme.colors.primary.main, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

// ── audience card ─────────────────────────────────────────────────────────────

function AudienceCard({ title, data, showPct }: { title: string; data: AudienceRow[]; showPct?: boolean }) {
  const s = useStyles2(getStyles);
  const max = Math.max(...data.map(r => r.sessions), 1);
  return (
    <div className={s.card}>
      <h4 className={s.cardTitle}>{title}</h4>
      <table className={s.miniTable}>
        <tbody>
          {data.map((row) => (
            <tr key={row.label}>
              <td className={s.audienceLabel}>{row.label}</td>
              <td style={{ width: '60%' }}><HorizBar value={row.sessions} max={max} /></td>
              {showPct && <td className={s.pctCell}>{row.pct}%</td>}
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td colSpan={showPct ? 3 : 2} className={s.empty}>No data yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────

function PageFour() {
  const s = useStyles2(getStyles);
  const theme = useTheme2();
  const sessions = usePluginAPI<SessionRow[]>('sessions');
  const visitors = usePluginAPI<VisitorsResponse>('visitors');
  const audience = usePluginAPI<AudienceResponse>('audience');

  const sessionData = sessions.data ?? [];
  const visitorData = visitors.data?.top_visitors ?? [];
  const maxDuration = Math.max(...sessionData.map(r => r.duration_secs), 1);
  const maxEvents = Math.max(...visitorData.map(r => r.event_count), 1);

  const anyLoading = sessions.loading || visitors.loading || audience.loading;
  const anyError = sessions.error || visitors.error || audience.error;

  return (
    <PluginPage>
      <div className={s.root}>
        {anyLoading && <LoadingBar width={300} />}
        {anyError && <Alert title="Query error" severity="error">{anyError}</Alert>}

        {!anyLoading && !anyError && (
          <>
            {/* ── Unique Visitors Summary ── */}
            <h2 className={s.heading}>Unique visitors <span className={s.period}>— last 30 days</span></h2>
            <div className={s.statRow}>
              <div className={s.statCard}>
                <div className={s.statValue} style={{ color: theme.colors.primary.text }}>
                  {visitors.data?.unique_visitors ?? 0}
                </div>
                <div className={s.statLabel}>Unique visitors</div>
              </div>
              <div className={s.statCard}>
                <div className={s.statValue} style={{ color: theme.colors.warning.text }}>
                  {(visitors.data?.return_rate_pct ?? 0).toFixed(1)}%
                </div>
                <div className={s.statLabel}>Return rate</div>
              </div>
              <div className={s.statCard}>
                <div className={s.statValue}>{sessionData.length}</div>
                <div className={s.statLabel}>Total sessions</div>
              </div>
            </div>

            {/* ── Top Visitors ── */}
            <h2 className={s.heading}>Top visitors <span className={s.period}>— by activity</span></h2>
            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>IP</th>
                    <th>Device / Screen</th>
                    <th>Sessions</th>
                    <th>Events</th>
                    <th>Swipes</th>
                    <th>Detail opens</th>
                    <th>Total time</th>
                    <th>First seen</th>
                    <th>Last seen</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorData.map((v, i) => (
                    <tr key={v.fingerprint}>
                      <td className={s.rank}>{i + 1}</td>
                      <td className={s.mono}>{v.ip}</td>
                      <td>{v.device_type} / {v.screen_resolution}</td>
                      <td>
                        <span style={{
                          fontWeight: 600,
                          color: v.session_count > 1 ? theme.colors.success.text : theme.colors.text.primary,
                        }}>
                          {v.session_count}
                          {v.session_count > 1 && <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.7 }}>return</span>}
                        </span>
                      </td>
                      <td><HorizBar value={v.event_count} max={maxEvents} color="#5794f2" /></td>
                      <td>{v.swipes}</td>
                      <td>{v.detail_opens}</td>
                      <td className={s.mono}>{formatDuration(v.total_duration_secs)}</td>
                      <td className={s.mono}>{v.first_seen}</td>
                      <td className={s.mono}>{v.last_seen}</td>
                    </tr>
                  ))}
                  {visitorData.length === 0 && (
                    <tr><td colSpan={10} className={s.empty}>No visitor data yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Longest Sessions ── */}
            <h2 className={s.heading} style={{ marginTop: 32 }}>Longest sessions</h2>
            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Visitor</th>
                    <th>Duration</th>
                    <th>Started</th>
                    <th>Events</th>
                    <th>Swipes</th>
                    <th>Detail opens</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionData.map((row, i) => (
                    <tr key={row.session_id}>
                      <td className={s.rank}>{i + 1}</td>
                      <td>
                        <span className={s.mono} style={{ fontSize: 11 }}>{row.ip}</span>
                        <span style={{ opacity: 0.5, margin: '0 4px' }}>/</span>
                        <span style={{ fontSize: 11 }}>{row.device_type} {row.screen_resolution !== 'unknown' ? row.screen_resolution : ''}</span>
                      </td>
                      <td style={{ minWidth: 180 }}>
                        <HorizBar value={row.duration_secs} max={maxDuration} color={`linear-gradient(90deg, ${theme.colors.primary.main}, #73bf69)`} />
                      </td>
                      <td className={s.mono}>{row.started}</td>
                      <td>{row.event_count}</td>
                      <td>{row.swipes}</td>
                      <td>{row.detail_opens}</td>
                      <td>{row.timezone}</td>
                    </tr>
                  ))}
                  {sessionData.length === 0 && (
                    <tr><td colSpan={8} className={s.empty}>No session data yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Audience Breakdown ── */}
            <h2 className={s.heading} style={{ marginTop: 32 }}>
              Audience breakdown <span className={s.period}>— last 30 days</span>
            </h2>
            <div className={s.grid}>
              <AudienceCard title="Device" data={audience.data?.devices ?? []} showPct />
              <AudienceCard title="Timezone" data={audience.data?.timezones ?? []} />
              <AudienceCard title="Language" data={audience.data?.languages ?? []} />
            </div>
          </>
        )}
      </div>
    </PluginPage>
  );
}

export default PageFour;

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
  statRow: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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
    font-size: 2rem;
    font-weight: ${theme.typography.fontWeightBold};
    line-height: 1.1;
  `,
  statLabel: css`
    font-size: ${theme.typography.bodySmall.fontSize};
    color: ${theme.colors.text.secondary};
    margin-top: ${theme.spacing(0.5)};
    text-transform: uppercase;
    letter-spacing: 0.05em;
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
    th { color: ${theme.colors.text.secondary}; font-weight: ${theme.typography.fontWeightMedium}; white-space: nowrap; }
    tr:hover td { background: ${theme.colors.background.secondary}; }
  `,
  rank: css`
    color: ${theme.colors.text.disabled};
    width: 32px;
    font-weight: ${theme.typography.fontWeightBold};
  `,
  mono: css`font-family: ${theme.typography.fontFamilyMonospace}; font-size: 12px;`,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${theme.spacing(2)};
  `,
  card: css`
    background: ${theme.colors.background.secondary};
    border: 1px solid ${theme.colors.border.weak};
    border-radius: ${theme.shape.radius.default};
    padding: ${theme.spacing(2)};
  `,
  cardTitle: css`
    font-size: 11px;
    font-weight: ${theme.typography.fontWeightMedium};
    margin: 0 0 ${theme.spacing(1.5)};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
  miniTable: css`
    width: 100%;
    border-collapse: collapse;
    font-size: ${theme.typography.bodySmall.fontSize};
    td { padding: ${theme.spacing(0.5, 0.75)}; border-bottom: 1px solid ${theme.colors.border.weak}; }
    tr:last-child td { border-bottom: none; }
  `,
  audienceLabel: css`
    white-space: nowrap;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  pctCell: css`
    text-align: right;
    font-size: 11px;
    color: ${theme.colors.text.secondary};
    white-space: nowrap;
  `,
  empty: css`
    text-align: center;
    color: ${theme.colors.text.disabled};
    padding: ${theme.spacing(3)} !important;
  `,
});
