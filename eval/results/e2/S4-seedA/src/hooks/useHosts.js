import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchHosts } from '../data/mockHosts.js';

// 异步状态机：loading / success / error（generate.md §4 四态默认）
export function useHosts() {
  const [state, setState] = useState({ status: 'loading', rows: [], error: '', code: '' });
  const abortRef = useRef(0);

  const load = useCallback(async () => {
    const token = ++abortRef.current;
    setState((s) => ({ ...s, status: 'loading', error: '', code: '' }));
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mock') || 'ok';
    const rows = Math.min(Math.max(parseInt(params.get('rows') || '10000', 10) || 10000, 0), 100000);
    try {
      const data = await fetchHosts({ mode, rows });
      if (token !== abortRef.current) return;
      setState({ status: 'success', rows: data, error: '', code: '' });
    } catch (e) {
      if (token !== abortRef.current) return;
      setState({ status: 'error', rows: [], error: e.message || '加载失败', code: e.code || 'HOSTS_UNKNOWN' });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // 批量操作后原地修补行数据（不重新拉取）
  const patchRows = useCallback((updater) => {
    setState((s) => ({ ...s, rows: s.rows.map(updater) }));
  }, []);

  return [state, { reload: load, patchRows }];
}
