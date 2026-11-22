import { useCallback, useEffect, useState } from 'react';
import { fetchOverview } from '../data/mockOverview.js';

// 数据状态机：loading -> success | error，reload 可重入（generate.md 数据页四态硬规则）
export function useOverview(scenario) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => ({ ...prev, status: 'loading', error: null }));
    fetchOverview({ scenario, signal: controller.signal })
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((error) => {
        if (!controller.signal.aborted) {
          setState({ status: 'error', data: null, error });
        }
      });
    return () => controller.abort();
  }, [scenario, reloadToken]);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);
  return { ...state, reload };
}
