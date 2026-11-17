import { useEffect, useState } from 'react';
import { fetchOverview } from '../data/mock.js';

export function useOverview() {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let alive = true;
    setState({ status: 'loading', data: null, error: null });
    fetchOverview().then(
      (data) => {
        if (alive) setState({ status: 'success', data, error: null });
      },
      (error) => {
        if (alive) setState({ status: 'error', data: null, error });
      }
    );
    return () => {
      alive = false;
    };
  }, [nonce]);

  return { ...state, reload: () => setNonce((n) => n + 1) };
}
