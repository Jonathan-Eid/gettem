import React, { useState } from 'react';
import { lastValueFrom } from 'rxjs';
import { css } from '@emotion/css';
import { AppPluginMeta, GrafanaTheme2, PluginConfigPageProps } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Button, Field, FieldSet, Input, useStyles2, Alert } from '@grafana/ui';

export type AppPluginSettings = {
  databaseHost?: string;
  databasePort?: string;
  databaseUser?: string;
  databasePassword?: string;
  databaseName?: string;
  databaseSslMode?: string;
};

export interface AppConfigProps extends PluginConfigPageProps<AppPluginMeta<AppPluginSettings>> {}

const AppConfig = ({ plugin }: AppConfigProps) => {
  const s = useStyles2(getStyles);
  const { enabled, pinned, jsonData } = plugin.meta;

  const [cfg, setCfg] = useState<AppPluginSettings>({
    databaseHost: jsonData?.databaseHost ?? 'postgres',
    databasePort: jsonData?.databasePort ?? '5432',
    databaseUser: jsonData?.databaseUser ?? '',
    databasePassword: jsonData?.databasePassword ?? '',
    databaseName: jsonData?.databaseName ?? 'gettem',
    databaseSslMode: jsonData?.databaseSslMode ?? 'disable',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const onChange = (key: keyof AppPluginSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCfg({ ...cfg, [key]: e.target.value });
    setStatus(null);
  };

  const onSubmit = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const response = getBackendSrv().fetch({
        url: `/api/plugins/${plugin.meta.id}/settings`,
        method: 'POST',
        data: {
          enabled: true,
          pinned: pinned,
          jsonData: cfg,
        },
      });
      await lastValueFrom(response);
      setStatus({ type: 'success', msg: 'Settings saved. Navigate to any analytics page to connect.' });
    } catch (err: any) {
      setStatus({ type: 'error', msg: `Save failed: ${err?.message ?? err}` });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <FieldSet label="PostgreSQL Connection">
        <Field label="Host">
          <Input value={cfg.databaseHost} onChange={onChange('databaseHost')} placeholder="postgres" />
        </Field>
        <Field label="Port">
          <Input value={cfg.databasePort} onChange={onChange('databasePort')} placeholder="5432" />
        </Field>
        <Field label="Username">
          <Input value={cfg.databaseUser} onChange={onChange('databaseUser')} placeholder="juna" />
        </Field>
        <Field label="Password">
          <Input type="password" value={cfg.databasePassword} onChange={onChange('databasePassword')} placeholder="enter password" />
        </Field>
        <Field label="Database">
          <Input value={cfg.databaseName} onChange={onChange('databaseName')} placeholder="gettem" />
        </Field>
        <Field label="SSL Mode">
          <Input value={cfg.databaseSslMode} onChange={onChange('databaseSslMode')} placeholder="disable" />
        </Field>

        <div className={s.marginTop}>
          <Button onClick={onSubmit} disabled={saving}>
            {saving ? 'Saving...' : 'Save settings'}
          </Button>
        </div>

        {status && (
          <div className={s.marginTop}>
            <Alert title={status.type === 'success' ? 'Saved' : 'Error'} severity={status.type}>
              {status.msg}
            </Alert>
          </div>
        )}
      </FieldSet>
    </div>
  );
};

export default AppConfig;

const getStyles = (theme: GrafanaTheme2) => ({
  marginTop: css`
    margin-top: ${theme.spacing(3)};
  `,
});
