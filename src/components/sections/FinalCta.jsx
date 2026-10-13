import { CalendarDays } from 'lucide-react';
import { contact, finalCta } from '../../data/content';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import BlurReveal from '../ui/BlurReveal';
import Button from '../ui/Button';
import LuxeBackdrop from '../ui/LuxeBackdrop';
import Ornament from '../ui/Ornament';
import Reveal from '../ui/Reveal';
import { WhatsAppIcon } from '../ui/Icons';
import styles from './FinalCta.module.css';

/** Chamada final: foto da Julia esmaecida ao fundo, título com brilho e as duas formas de agendar. */
export default function FinalCta() {
  return (
    <section className={`section theme-dark bg-onix ${styles.final}`} aria-labelledby="chamada-final-title">
      <LuxeBackdrop tone="dark" monogram={false} />
      <div className={styles.photo} aria-hidden="true">
        <img src={finalCta.image.src} alt="" loading="lazy" decoding="async" />
      </div>
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <Reveal as="p" className={styles.badge}>
          <span className={styles.pulse} aria-hidden="true" />
          {finalCta.badge}
        </Reveal>

        <BlurReveal
          id="chamada-final-title"
          text={finalCta.title}
          emphasis={finalCta.titleEmphasis}
          className={styles.title}
          emphasisClassName={styles.emphasis}
        />
        <Ornament />

        <Reveal as="p" className={styles.text} delay={200}>
          {finalCta.text}
        </Reveal>

        <Reveal className={styles.actions} delay={320}>
          <Button
            href={contact.bookingUrl}
            external
            icon={<CalendarDays strokeWidth={1.5} aria-hidden="true" />}
            aria-label={`${finalCta.online} (abre em nova aba)`}
          >
            {finalCta.online}
          </Button>
          <Button
            variant="secondary"
            tone="dark"
            href={buildWhatsAppUrl()}
            external
            icon={<WhatsAppIcon />}
            aria-label={`${finalCta.cta} (abre em nova aba)`}
          >
            {finalCta.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

