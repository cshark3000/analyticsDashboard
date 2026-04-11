import { useState, useEffect, useCallback, useRef } from 'react';

export type ApiState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

/**
 * Generic data-fetching hook. Re-fetches whenever `deps` change.
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): ApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<ApiState<T>>({ status: 'idle' });
  const mountedRef = useRef(true);

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const data = await fetcher();
      if (mountedRef.current) setState({ status: 'success', data });
    } catch (err) {
      if (mountedRef.current)
        setState({ status: 'error', message: (err as Error).message });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => { mountedRef.current = false; };
  }, [load]);

  return { ...state, refetch: load };
}
