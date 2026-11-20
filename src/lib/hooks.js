import { useEffect, useRef, useState } from 'react';

/* Countdown in seconds (float). Restarts whenever `key` changes; calls onEnd once at 0. */
export function useCountdown(total, { key, active = true, onEnd } = {}) {
  const [left, setLeft] = useState(total);
  const end = useRef(onEnd); end.current = onEnd;
  useEffect(() => {
    setLeft(total);
    if (!active) return;
    const t0 = performance.now(); let fired = false;
    const id = setInterval(() => {
      const l = Math.max(0, total - (performance.now() - t0) / 1000);
      setLeft(l);
      if (l <= 0 && !fired) { fired = true; clearInterval(id); end.current && end.current(); }
    }, 100);
    return () => clearInterval(id);
  }, [key, active, total]);
  return left;
}

export const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const sample = (a, n) => shuffle(a).slice(0, n);
