import { useEffect, useRef } from 'react';

export function useInterval<C extends CallableFunction>(
  callback: C,
  delay: number | null,
): void {
  const saveCallback = useRef<C>();

  useEffect(() => {
    saveCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (saveCallback.current) saveCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
