import { Clock, Coffee, MapPinned, Palette, Sparkles, UserRound } from 'lucide-react';
import { differentials } from '../../data/content';
import BlurReveal from '../ui/BlurReveal';
import LuxeBackdrop from '../ui/LuxeBackdrop';
import Ornament from '../ui/Ornament';
import SpotlightCard from '../ui/SpotlightCard';
import styles from './Differentials.module.css';

const icons = {
  user: UserRound,
  clock: Clock,
  palette: Palette,
  sparkles: Sparkles,
  coffee: Coffee,
  map: MapPinned,
};

export default function Differentials() {
  return (
    <section id="diferenciais" className={`section bg-nude ${styles.section}`} aria-labelledby="diferenciais-title">
      <LuxeBackdrop monogram={false} />

      <div className="container">
        <header className={styles.header}>
          <BlurReveal
            id="diferenciais-title"
            text={differentials.title}
            emphasis={differentials.titleEmphasis}
            className={styles.title}
            emphasisClassName={styles.emphasis}
          />
          <Ornament />
        </header>

        <ul className={styles.grid}>
          {differentials.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <SpotlightCard as="li" key={item.title} index={i} className={styles.card}>
                <div className={styles.top}>
                  <span className={styles.number} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={26} strokeWidth={1.5} />
                  </span>
                </div>
                <span className={styles.rule} aria-hidden="true" />
                <h3 className={`h4 ${styles.itemTitle}`}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </SpotlightCard>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
