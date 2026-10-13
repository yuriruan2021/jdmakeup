import { useEffect, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './BlurReveal.module.css';

/**
 * Título que entra palavra por palavra, saindo de um desfoque (receita "blurReveal").
 * O texto continua inteiro e legível para leitores de tela; `emphasis` (o trecho
 * final) recebe o destaque em serifa itálica.
 *
 * - `immediate`: anima ao montar (primeira dobra), sem esperar a rolagem.
 * - `keepOpacity`: as palavras nunca ficam transparentes, só desfocadas e
 *   deslocadas — regra para o h1, que não pode ficar invisível na primeira pintura.
 * - `emphasisInnerClassName`: camada interna do destaque (ex.: reflexo dourado),
 *   separada da camada que recebe desfoque e deslocamento.
 */
export default function BlurReveal({
  as: Tag = 'h2',
  text,
  emphasis,
  immediate = false,
  keepOpacity = false,
  className = '',
  emphasisClassName = '',
  emphasisInnerClassName = '',
  ...rest
}) {
  const [ref, inView] = useReveal({ threshold: 0.4 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!immediate) return undefined;
    // Com a tela de carregamento ativa, espera ela abrir para começar
    const root = document.documentElement;
    if (root.classList.contains('has-intro')) {
      const start = () => setMounted(true);
      window.addEventListener('intro:done', start, { once: true });
      // segurança: mesma trava de 8 s da tela de carregamento
      const failsafe = setTimeout(start, 8000);
      return () => {
        window.removeEventListener('intro:done', start);
        clearTimeout(failsafe);
      };
    }
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, [immediate]);

  const visible = immediate ? mounted : inView;
  const index = emphasis ? text.lastIndexOf(emphasis) : -1;
  const lead = index === -1 ? text : text.slice(0, index);
  const words = lead.split(/\s+/).filter(Boolean);

  const classes = [styles.reveal, visible && styles.visible, keepOpacity && styles.keepOpacity, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {words.map((word, i) => (
        <span key={i}>
          <span className={styles.word} style={{ '--i': i }}>
            {word}
          </span>{' '}
        </span>
      ))}
      {index !== -1 && (
        <em className={`${styles.word} ${emphasisClassName}`} style={{ '--i': words.length }}>
          {emphasisInnerClassName ? <span className={emphasisInnerClassName}>{emphasis}</span> : emphasis}
        </em>
      )}
    </Tag>
  );
}
