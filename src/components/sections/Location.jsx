import { CalendarClock, Car, MapPin, Navigation } from 'lucide-react';
import { contact, location } from '../../data/content';
import { useReveal } from '../../hooks/useReveal';
import BlurReveal from '../ui/BlurReveal';
import Button from '../ui/Button';
import LuxeBackdrop from '../ui/LuxeBackdrop';
import Ornament from '../ui/Ornament';
import Reveal from '../ui/Reveal';
import styles from './Location.module.css';

/** Mapa em moldura de arco, com contorno dourado desenhado e pin pulsando no estúdio. */
function MapArch() {
  const [ref, visible] = useReveal({ threshold: 0.25 });
  return (
    <div ref={ref} className={`${styles.mapWrap} ${visible ? styles.shown : ''}`}>
      <svg className={styles.outline} viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0.5 50 A49.5 49.5 0 0 1 99.5 50 V117 Q99.5 124.5 92 124.5 H8 Q0.5 124.5 0.5 117 Z" pathLength="1" />
      </svg>
      <div className={styles.map}>
        <iframe
          title="Mapa com a localização do estúdio Julia Damascena Makeup no Grande Colorado, Brasília"
          src={contact.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        {/* Pin dourado no estúdio (o mapa centraliza o endereço) */}
        <span className={styles.pin} aria-hidden="true">
          <span className={styles.pinRing} />
          <span className={styles.pinDot}>
            <MapPin size={18} strokeWidth={2} />
          </span>
        </span>
        <span className={styles.mapLabel} aria-hidden="true">
          {location.mapLabel}
        </span>
      </div>
    </div>
  );
}

export default function Location() {
  const rows = [
    { icon: MapPin, ...location.address },
    { icon: Car, ...location.tip },
    { icon: CalendarClock, ...location.hours },
  ];

  return (
    <section id="localizacao" className={`section bg-creme ${styles.section}`} aria-labelledby="localizacao-title">
      <LuxeBackdrop monogram={false} />

      <div className={`container ${styles.grid}`}>
        <div className={styles.info}>
          <Reveal as="p" className={styles.eyebrow}>
            {location.eyebrow}
          </Reveal>
          <BlurReveal
            id="localizacao-title"
            text={location.title}
            emphasis={location.titleEmphasis}
            className={styles.title}
            emphasisClassName={styles.emphasis}
          />
          <Ornament className={styles.ornament} />
          <Reveal as="p" className={styles.subtitle} delay={200}>
            {location.subtitle}
          </Reveal>

          <address className={styles.cards}>
            {rows.map(({ icon: Icon, label, text }, i) => (
              <Reveal key={label} className={styles.card} delay={250 + i * 100}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <span className={styles.cardBody}>
                  <strong>{label}</strong>
                  <span>{text}</span>
                </span>
              </Reveal>
            ))}
          </address>

          <Reveal className={styles.actions} delay={550}>
            <Button
              href={contact.directionsUrl}
              external
              icon={<Navigation strokeWidth={1.75} aria-hidden="true" />}
              aria-label={`${location.directions} (abre a rota no Google Maps em nova aba)`}
            >
              {location.directions}
            </Button>
            <Button
              variant="secondary"
              href={contact.mapsUrl}
              external
              icon={<MapPin strokeWidth={1.5} aria-hidden="true" />}
              aria-label={`${location.cta} (abre o Google Maps em nova aba)`}
            >
              {location.cta}
            </Button>
          </Reveal>
        </div>

        <MapArch />
      </div>
    </section>
  );
}
