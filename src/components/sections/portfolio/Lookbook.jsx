import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { contact, portfolio } from '../../../data/content';
import { useOnScreen } from '../../../hooks/useOnScreen';
import BlurReveal from '../../ui/BlurReveal';
import Button from '../../ui/Button';
import Ornament from '../../ui/Ornament';
import Reveal from '../../ui/Reveal';
import { InstagramIcon } from '../../ui/Icons';
import Lightbox from './Lightbox';
import MakeupPaint from './MakeupPaint';
import styles from './Lookbook.module.css';

const { lookbook } = portfolio;
const ALL = lookbook.filters[0];

/** "Criações em destaque": galeria em mosaico com filtros e foto em tela cheia. */
export default function Lookbook() {
  const [filter, setFilter] = useState(ALL);
  const [openIndex, setOpenIndex] = useState(null);
  const [hintRef, hintOnScreen] = useOnScreen('0px');

  const items = useMemo(
    () => (filter === ALL ? lookbook.items : lookbook.items.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <div className={styles.lookbook}>
      <div className={styles.divider} aria-hidden="true">
        <span />
        <Ornament />
        <span />
      </div>

      <div className={styles.head}>
        <BlurReveal
          as="h3"
          text={lookbook.title}
          emphasis={lookbook.titleEmphasis}
          className={styles.title}
          emphasisClassName={styles.titleEmphasis}
        />
        <Reveal as="p" className={styles.touchHint} delay={250}>
          {lookbook.touchHint}
        </Reveal>
        {/* Demonstração: um círculo passa pela frase e ela ganha cor, como nas fotos */}
        <p ref={hintRef} className={`${styles.hint} ${hintOnScreen ? '' : styles.hintPaused}`}>
          <span className={styles.hintBase}>{lookbook.hint}</span>
          <span className={styles.hintColor} aria-hidden="true">
            {lookbook.hint}
          </span>
          <span className={styles.hintRing} aria-hidden="true" />
        </p>
      </div>

      <div className={styles.filters} role="group" aria-label="Filtrar fotos">
        {lookbook.filters.map((name) => (
          <button
            key={name}
            type="button"
            className={`${styles.filter} ${filter === name ? styles.filterActive : ''}`}
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <ul key={filter} className={styles.grid}>
        {items.map((item, i) => (
          <li key={item.src} className={styles.item} style={{ '--i': i }}>
            <button
              type="button"
              className={styles.tile}
              onClick={() => setOpenIndex(i)}
              aria-label={`${lookbook.openLabel}: ${item.title}`}
            >
              <MakeupPaint src={item.thumb} alt={item.alt} width="480" height="600" />
              <span className={styles.overlay} aria-hidden="true">
                <span className={styles.overlayCategory}>{item.category}</span>
                <span className={styles.overlayTitle}>{item.title}</span>
              </span>
              <span className={styles.expand} aria-hidden="true">
                <Plus size={18} strokeWidth={1.5} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Reveal className={styles.cta}>
        <Button
          variant="secondary"
          href={contact.instagramUrl}
          external
          icon={<InstagramIcon />}
          aria-label={`${lookbook.cta} (abre em nova aba)`}
        >
          {lookbook.cta}
        </Button>
      </Reveal>

      <Lightbox items={items} index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
    </div>
  );
}
