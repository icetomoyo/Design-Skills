import { useEffect, useState, useCallback } from 'react';
import { fetchHosts } from '../data/mockHosts';

// 数据四态状态机：loading -> success | error；reload 重新走一遍。
// mock 开关（URL ?mock=slow|error|empty 或页面右上角“演示状态”）真实可触达，不写死成功态。
export function useHosts(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [state, setState] = useState({ status: 'loading', rows: [], error: null, reloadTick: 0 });
  useEffect(() => {
    let alive = true;
    fetchHosts(mode)
      .then((rows) => {
        if (alive) setState({ status: 'success', rows, error: null, loadedAt: new Date() });
      })
      .catch((err) => {
        if (alive) setState({ status: 'error', rows: [], error: err, loadedAt: null });
      });
    return () => {
      alive = false;
    };
  }, [mode, state.reloadTick]);

  const reload = useCallback(() => {
    setState((s) => ({ ...s, reloadTick: (s.reloadTick || 0) + 1 }));
  }, []);

  const changeMode = useCallback((next) => {
    setMode(next);
  }, []);

  return { ...state, mode, reload, changeMode };
}
