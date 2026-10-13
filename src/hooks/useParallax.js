import { useEffect, useRef } from 'react';

/**
 * Parallax leve: expõe `--parallax` (px) no elemento conforme ele cruza a tela.
 * Só calcula enquanto o elemento está visível; desligado com "menos movimento".
 */
export function useParallax(strength = 32) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      if (reduced.matches) {
        node.style.setProperty('--parallax', '0px');
        return;
      }
      const rect = node.getBoundingClientRect();
      // -1 (acima do centro da tela) … 1 (abaixo)
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      node.style.setProperty('--parallax', `${(clamped * strength).toFixed(1)}px`);
    };

    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) onScroll();
    });
    observer.observe(node);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    reduced.addEventListener('change', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reduced.removeEventListener('change', update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return ref;
}
