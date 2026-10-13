import { brand } from '../../data/brand';
import { useOnScreen } from '../../hooks/useOnScreen';
import { useParallax } from '../../hooks/useParallax';
import styles from './LuxeBackdrop.module.css';

/* Posições fixas (não aleatórias) para os brilhos: mesmo desenho a cada visita. */
const SPARKLES = [
  { top: 8, left: 12, size: 10, delay: 0 },
  { top: 14, left: 46, size: 6, delay: 1.6 },
  { top: 22, left: 88, size: 12, delay: 0.8 },
  { top: 34, left: 6, size: 7, delay: 2.4 },
  { top: 38, left: 62, size: 9, delay: 3.1 },
  { top: 47, left: 94, size: 6, delay: 1.1 },
  { top: 58, left: 30, size: 8, delay: 2.0 },
  { top: 66, left: 74, size: 11, delay: 0.4 },
  { top: 76, left: 14, size: 6, delay: 3.6 },
  { top: 84, left: 52, size: 9, delay: 1.9 },
  { top: 90, left: 86, size: 7, delay: 2.8 },
  { top: 96, left: 36, size: 6, delay: 0.9 },
];

/**
 * Fundo premium para seções claras, com o tema da maquiagem:
 * brilhos difusos rosé e dourado (pó esfumado), grão de papel, monograma JD
 * em marca d'água e pontos de iluminador cintilando.
 * `tone="dark"`: versão para fundos ônix (brilhos dourado e cacau, grão claro).
 * Decorativo (aria-hidden), pausa fora da tela e fica estático com "menos movimento".
 */
export default function LuxeBackdrop({ monogram = true, tone = 'light', className = '' }) {
  const [ref, onScreen] = useOnScreen();
  const watermarkRef = useParallax(-48);

  return (
    <div ref={ref} className={`${styles.backdrop} ${tone === 'dark' ? styles.dark : ''} ${onScreen ? '' : styles.paused} ${className}`} aria-hidden="true">
      <span className={`${styles.glow} ${styles.rose}`} />
      <span className={`${styles.glow} ${styles.gold}`} />
      <span className={`${styles.glow} ${styles.nude}`} />

      {monogram && (
        <div ref={watermarkRef} className={styles.watermark}>
          <img src={brand.monogram} alt="" width="788" height="456" />
        </div>
      )}

      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className={styles.sparkle}
          style={{ top: `${s.top}%`, left: `${s.left}%`, '--size': `${s.size}px`, animationDelay: `${s.delay}s` }}
        />
      ))}

      <span className={styles.grain} />
    </div>
  );
}
