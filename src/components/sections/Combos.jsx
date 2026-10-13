import { useCallback } from 'react';
import { Plus } from 'lucide-react';
import { combos } from '../../data/content';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { useReveal } from '../../hooks/useReveal';
import { useCountUp } from '../../hooks/useCountUp';
import BlurReveal from '../ui/BlurReveal';
import Button from '../ui/Button';
import LuxeBackdrop from '../ui/LuxeBackdrop';
import Ornament from '../ui/Ornament';
import Reveal from '../ui/Reveal';
import styles from './Combos.module.css';

/** Duo de fotos em arco (maquiagem + cabelo) que deslizam e se encontram ao aparecer. */
function PhotoDuo({ keys, large = false }) {
  return (
    <div className={`${styles.duo} ${large ? styles.duoLarge : ''}`} aria-hidden="true">
      {keys.map((key, i) => (
        <span key={key} className={`${styles.duoItem} ${i === 0 ? styles.duoLeft : styles.duoRight}`}>
          <img src={combos.photos[key].src} alt="" loading="lazy" decoding="async" width="480" height="600" />
        </span>
      ))}
      <span className={styles.duoPlus}>
        <Plus size={large ? 18 : 14} strokeWidth={1.75} />
      </span>
    </div>
  );
}

/** Preço que conta até o valor ao aparecer; o valor real fica no texto acessível. */
function Price({ value, label, active, large }) {
  const current = useCountUp(value, active, 1000);
  return (
    <p className={`${styles.price} ${large ? styles.priceLarge : ''}`}>
      <span className="visually-hidden">{label}</span>
      <span aria-hidden="true" className={styles.priceVisual}>
        <span className={styles.currency}>R$</span>
        <span className={styles.amount}>{current}</span>
      </span>
    </p>
  );
}

function ComboCard({ combo, index }) {
  const [ref, visible] = useReveal({ threshold: 0.25 });
  const titleId = `combo-${index + 1}`;
  const includes = combo.includes.join(' + ');
  const number = String(index + 1).padStart(2, '0');

  // Holofote dourado que segue o mouse
  const onPointerMove = useCallback((event) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <li
      ref={ref}
      className={`${styles.item} ${combo.featured ? styles.featuredItem : ''} ${visible ? `${styles.shown} is-visible` : ''}`}
      style={{ '--i': index }}
    >
      <article
        className={`card-clickable ${styles.card} ${combo.featured ? styles.featured : ''}`}
        aria-labelledby={titleId}
        onPointerMove={onPointerMove}
      >
        {combo.featured && <span className={styles.badge}>{combos.badge}</span>}

        <PhotoDuo keys={combo.photos} large={combo.featured} />

        <div className={styles.info}>
          <h3 id={titleId} className={styles.name}>
            <span className={styles.number} aria-hidden="true">
              {number}
            </span>
            {combo.name}
          </h3>

          <ul className={styles.includes}>
            {combo.includes.map((item, i) => (
              <li key={item}>
                {i > 0 && (
                  <span className={styles.plusInline} aria-hidden="true">
                    +
                  </span>
                )}
                {i > 0 && <span className="visually-hidden">mais </span>}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer}>
          <Price value={combo.priceValue} label={combo.price} active={visible} large={combo.featured} />
          <Button
            variant={combo.featured ? 'primary' : 'secondary'}
            tone="dark"
            href={buildWhatsAppUrl(`o ${combo.name} (${includes})`)}
            external
            fullWidth={combo.featured}
            className={`stretched-link ${styles.button}`}
            aria-label={`${combos.cta}: ${combo.name}, ${includes}, ${combo.price} (abre o WhatsApp em nova aba)`}
          >
            {combos.cta}
          </Button>
        </div>
      </article>
    </li>
  );
}

export default function Combos() {
  return (
    <section id="combos" className={`section theme-dark bg-cacau ${styles.section}`} aria-labelledby="combos-title">
      <LuxeBackdrop tone="dark" monogram={false} />

      <div className="container">
        <header className={styles.header}>
          <BlurReveal
            id="combos-title"
            text={combos.title}
            emphasis={combos.titleEmphasis}
            className={styles.title}
            emphasisClassName={styles.emphasis}
          />
          <Ornament />
          <Reveal as="p" className={styles.subtitle} delay={300}>
            {combos.subtitle}
          </Reveal>
        </header>

        <ul className={styles.grid}>
          {combos.items.map((combo, i) => (
            <ComboCard key={combo.name} combo={combo} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
