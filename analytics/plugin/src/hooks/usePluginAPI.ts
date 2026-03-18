import { useCallback, useEffect, useRef, useState } from 'react';
import { getBackendSrv } from '@grafana/runtime';
import { useRefreshInterval } from './useRefreshInterval';

const PLUGIN_ID = 'gettem-analytics-app';

export type APIState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

/**
 * Calls a custom resource route on the plugin backend:
 *   GET /api/plugins/gettem-analytics-app/resources/<endpoint>
 *
 * Auto-refreshes at the interval set by the global RefreshProvider.
 */
export function usePluginAPI<T>(endpoint: string): APIState<T> {
  const { intervalMs } = useRefreshInterval();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchCount = useRef(0);

  const run = useCallback(async () => {
    if (fetchCount.current === 0) {
      setLoading(true);
    }
    setError(null);
    const id = ++fetchCount.current;

    try {
      const result = await getBackendSrv().get<T>(
        `/api/plugins/${PLUGIN_ID}/resources/${endpoint}`
      );
      if (id !== fetchCount.current) {
        return;
      }
      setData(result);
    } catch (e) {
      if (id === fetchCount.current) {
        setError(e instanceof Error ? e.message : String(e));
      }
    } finally {
      if (id === fetchCount.current) {
        setLoading(false);
      }
    }
  }, [endpoint]);

  useEffect(() => {
    run();
    if (intervalMs > 0) {
      const interval = setInterval(run, intervalMs);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [run, intervalMs]);

  return { data, loading, error, refetch: run };
}
