import React from 'react';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import { useRefreshInterval } from '../hooks/useRefreshInterval';

export function RefreshPicker() {
  const s = useStyles2(getStyles);
  const { intervalMs, setIntervalMs, intervals } = useRefreshInterval();

  return (
    <div className={s.picker}>
      <span className={s.label}>Auto-refresh:</span>
      {intervals.map((opt) => (
        <button
          key={opt.value}
          className={`${s.btn} ${intervalMs === opt.value ? s.btnActive : ''}`}
          onClick={() => setIntervalMs(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const getStyles = (theme: GrafanaTheme2) => ({
  picker: css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing(0.5)};
    padding: ${theme.spacing(1, 0)};
  `,
  label: css`
    font-size: ${theme.typography.bodySmall.fontSize};
    color: ${theme.colors.text.secondary};
    margin-right: ${theme.spacing(0.5)};
  `,
  btn: css`
    background: ${theme.colors.background.secondary};
    border: 1px solid ${theme.colors.border.weak};
    border-radius: ${theme.shape.radius.default};
    padding: ${theme.spacing(0.25, 1)};
    font-size: 12px;
    color: ${theme.colors.text.secondary};
    cursor: pointer;
    &:hover {
      background: ${theme.colors.background.canvas};
    }
  `,
  btnActive: css`
    background: ${theme.colors.primary.main};
    border-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrastText};
    &:hover {
      background: ${theme.colors.primary.shade};
    }
  `,
});
