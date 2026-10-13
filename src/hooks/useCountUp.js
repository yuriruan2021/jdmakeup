import { useEffect, useState } from 'react';

/**
 * Conta de 0 até `target` quando `active` vira true (uma vez).
 * Com "menos movimento", vai direto ao valor final.
 */
export function useCountUp(target, active, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}
