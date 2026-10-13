import { useCallback } from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './SpotlightCard.module.css';

/**
 * Card de vidro fosco com borda de luz dourada e holofote que segue o mouse.
 * Entra com fade + 16 px quando aparece na tela (atraso por `index`).
 */
export default function SpotlightCard({ as: Tag = 'div', index = 0, className = '', children, ...rest }) {
  const [ref, visible] = useReveal({ threshold: 0.2 });

  const onPointerMove = useCallback((event) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${styles.card} ${visible ? `${styles.visible} is-visible` : ''} ${className}`}
      style={{ '--i': index }}
      onPointerMove={onPointerMove}
      {...rest}
    >
      {children}
    </Tag>
  );
}
