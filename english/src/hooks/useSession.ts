import { useCallback, useState } from 'react';

export interface SessionStats {
  correct: number;
  wrong: number;
  streak: number;
}

export function useSession() {
  const [stats, setStats] = useState<SessionStats>({ correct: 0, wrong: 0, streak: 0 });
  const mark = useCallback((ok: boolean) => {
    setStats((s) => ({
      correct: s.correct + (ok ? 1 : 0),
      wrong: s.wrong + (ok ? 0 : 1),
      streak: ok ? s.streak + 1 : 0,
    }));
  }, []);
  const reset = useCallback(() => setStats({ correct: 0, wrong: 0, streak: 0 }), []);
  return { stats, mark, reset };
}
