import { useCallback, useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import styles from './HeroCarousel.module.css';

/**
 * Carrossel de fotos do hero.
 * - Troca a cada `interval` ms: a foto atual sai para a direita e a próxima entra pela esquerda.
 * - O tempo é controlado pela barra de progresso do indicador ativo (animação CSS):
 *   pausar a barra pausa o carrossel, sem dessincronizar.
 * - Pausa com o botão, com o mouse sobre a foto, com foco nos controles e com a aba oculta.
 * - Padrão de carrossel do WAI-ARIA (região, slides rotulados, aria-live só quando pausado).
 */
export default function HeroCarousel({ slides, interval = 5000, className = '' }) {
  const total = slides.length;
  const [{ current, previous }, setState] = useState({ current: 0, previous: null });
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const playing = total > 1 && !userPaused && !hovered && !focused && !tabHidden;

  const goTo = useCallback(
    (index) =>
      setState((s) => (index === s.current ? s : { current: (index + total) % total, previous: s.current })),
    [total],
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const onControlsBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return (
    <div
      className={`${styles.carousel} ${className}`}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos da Julia"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
    >
      <div className={styles.slides} aria-live={playing ? 'off' : 'polite'}>
        {slides.map((slide, i) => {
          const state = i === current ? styles.active : i === previous ? styles.leaving : '';
          return (
            <div
              key={i}
              className={`${styles.slide} ${state}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}`}
              aria-hidden={i !== current}
            >
              <img
                className={styles.photo}
                src={slide.src}
                srcSet={slide.srcSmall ? `${slide.srcSmall} 640w, ${slide.src} 1024w` : undefined}
                sizes="(min-width: 1024px) 50vw, 100vw"
                width={slide.width}
                height={slide.height}
                alt={slide.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchpriority={i === 0 ? 'high' : 'low'}
                decoding="async"
              />
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <div className={styles.controls} onFocus={() => setFocused(true)} onBlur={onControlsBlur}>
          <ul className={styles.dots}>
            {slides.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={styles.dot}
                  aria-label={`Mostrar foto ${i + 1} de ${total}`}
                  aria-current={i === current ? 'true' : undefined}
                  onClick={() => goTo(i)}
                >
                  <span className={styles.track}>
                    {i === current && (
                      <span
                        key={current}
                        className={styles.progress}
                        style={{
                          '--interval': `${interval}ms`,
                          animationDuration: `${interval}ms`,
                          animationPlayState: playing ? 'running' : 'paused',
                        }}
                        onAnimationEnd={next}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* <button
            type="button"
            className={styles.pause}
            aria-label={userPaused ? 'Retomar troca de fotos' : 'Pausar troca de fotos'}
            onClick={() => setUserPaused((v) => !v)}
          >
            {userPaused ? (
              <Play size={16} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Pause size={16} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button> */}
        </div>
      )}
    </div>
  );
}
