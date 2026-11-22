import { useCallback, useEffect, useState } from 'react';
import { loadDictionaries } from '../data/dictionaries.js';

/** 字典异步状态机：loading / success / error + reload（禁止同步 import mock 直接充当成功态） */
export function useDictionaries() {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  const reload = useCallback(() => {
    setState((s) => ({ ...s, status: 'loading', error: null }));
    loadDictionaries()
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((error) =>
        setState({ status: 'error', data: null, error: String(error?.message || error) }),
      );
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { ...state, reload };
}
