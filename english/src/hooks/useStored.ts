import { useCallback, useState } from 'react';
import { loadJSON, saveJSON } from '../lib/storage';

export function useStored<T>(key: string, fallback: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => loadJSON(key, fallback));
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
        saveJSON(key, next);
        return next;
      });
    },
    [key],
  );
  return [value, set];
}
