import { useEffect, useRef, useState } from 'react';

/** true enquanto o elemento estiver na tela (para pausar animações contínuas fora dela). */
export function useOnScreen(rootMargin = '100px') {
  const ref = useRef(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, onScreen];
}
