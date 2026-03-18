import React from 'react';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { PluginPage } from '@grafana/runtime';
import { Alert, LoadingBar, useStyles2, useTheme2 } from '@grafana/ui';
import { usePluginAPI } from '../hooks/usePluginAPI';

type PageViewRow = {
  page_name: string;
  views: number;
  unique_visitors: number;
  avg_dwell_secs: number;
};

type LinkClickRow = {
  label: string;
  clicks: number;
};

type PagesResponse = {
  page_views: PageViewRow[];
  link_clicks: LinkClickRow[];
};

const pageIcons: Record<string, string> = {
  gallery: 'Gallery',
  resume: 'Resume',
  github: 'Github',
  swipe: 'Swipe',
};

function HorizBar({ value, max, color }: { value: number; max: number; color?: string }) {
  const theme = useTheme2();
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 600, minWidth: 32 }}>{value}</span>
      <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: 'hidden', minWidth: 80, background: theme.colors.background.canvas }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: color ?? theme.colors.primary.main, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

function PageFive() {
  const s = useStyles2(getStyles);
  const theme = useTheme2();
  const { data, loading, error } = usePluginAPI<PagesResponse>('pages');

  const pageViews = data?.page_views ?? [];
  const linkClicks = data?.link_clicks ?? [];
  const maxViews = Math.max(...pageViews.map(p => p.views), 1);
  const maxClicks = Math.max(...linkClicks.map(l => l.clicks), 1);

  return (
    <PluginPage>
      <div className={s.root}>
        {loading && <LoadingBar width={300} />}
        {error && <Alert title="Query error" severity="error">{error}</Alert>}

        {!loading && !error && (
          <>
            <h2 className={s.heading}>Page views <span className={s.period}>— last 30 days</span></h2>

            {pageViews.length === 0 ? (
              <div className={s.empty}>No page view data yet. Navigate around the gettem site to generate events.</div>
            ) : (
              <div className={s.cardGrid}>
                {pageViews.map((p) => (
                  <div key={p.page_name} className={s.pageCard}>
                    <div className={s.pageCardHeader}>
                      <span className={s.pageName}>{pageIcons[p.page_name] ?? p.page_name}</span>
                      <span className={s.pageViews} style={{ color: theme.colors.primary.text }}>
                        {p.views} <span className={s.viewsLabel}>views</span>
                      </span>
                    </div>
                    <div className={s.pageStats}>
                      <div>
                        <strong>{p.unique_visitors}</strong>
                        <span> unique visitors</span>
                      </div>
                      <div>
                        <strong>{p.avg_dwell_secs}s</strong>
                        <span> avg dwell time</span>
                      </div>
                    </div>
                    <HorizBar value={p.views} max={maxViews} color="#5794f2" />
                  </div>
                ))}
              </div>
            )}

            <h2 className={s.heading} style={{ marginTop: 32 }}>Link clicks <span className={s.period}>— last 30 days</span></h2>

            {linkClicks.length === 0 ? (
              <div className={s.empty}>No link click data yet. Click some links on the Github page to generate events.</div>
            ) : (
              <div className={s.tableWrapper}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Link</th>
                      <th>Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {linkClicks.map((l, i) => (
                      <tr key={l.label}>
                        <td className={s.rank}>{i + 1}</td>
                        <td>
                          <code className={s.linkLabel}>{l.label}</code>
                        </td>
                        <td style={{ width: '50%' }}>
                          <HorizBar value={l.clicks} max={maxClicks} color="#73bf69" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </PluginPage>
  );
}

export default PageFive;

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
  cardGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: ${theme.spacing(2)};
  `,
  pageCard: css`
    background: ${theme.colors.background.secondary};
    border: 1px solid ${theme.colors.border.weak};
    border-radius: ${theme.shape.radius.default};
    padding: ${theme.spacing(2)};
  `,
  pageCardHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: ${theme.spacing(1)};
  `,
  pageName: css`
    font-size: ${theme.typography.h4.fontSize};
    font-weight: ${theme.typography.fontWeightBold};
    text-transform: capitalize;
  `,
  pageViews: css`
    font-size: 1.5rem;
    font-weight: ${theme.typography.fontWeightBold};
  `,
  viewsLabel: css`
    font-size: 0.75rem;
    opacity: 0.7;
  `,
  pageStats: css`
    display: flex;
    gap: ${theme.spacing(3)};
    font-size: ${theme.typography.bodySmall.fontSize};
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing(1.5)};
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
    th { color: ${theme.colors.text.secondary}; font-weight: ${theme.typography.fontWeightMedium}; }
    tr:hover td { background: ${theme.colors.background.secondary}; }
  `,
  rank: css`
    color: ${theme.colors.text.disabled};
    width: 32px;
    font-weight: ${theme.typography.fontWeightBold};
  `,
  linkLabel: css`
    font-family: ${theme.typography.fontFamilyMonospace};
    font-size: 12px;
    background: ${theme.colors.background.secondary};
    padding: ${theme.spacing(0.25, 0.5)};
    border-radius: 3px;
  `,
  empty: css`
    text-align: center;
    color: ${theme.colors.text.disabled};
    padding: ${theme.spacing(4)};
    background: ${theme.colors.background.secondary};
    border-radius: ${theme.shape.radius.default};
  `,
});
