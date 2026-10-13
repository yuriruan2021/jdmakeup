import { useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { hero } from '../../data/content';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import BlurReveal from '../ui/BlurReveal';
import Button from '../ui/Button';
import LuxeBackdrop from '../ui/LuxeBackdrop';
import Reveal from '../ui/Reveal';
import { WhatsAppIcon } from '../ui/Icons';
import HeroCarousel from './HeroCarousel';
import styles from './Hero.module.css';

export default function Hero() {
  // Holofote dourado que segue o cursor no card de agendamento (só mouse)
  const onBookingPointerMove = useCallback((event) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <section id="inicio" className={`theme-dark bg-onix ${styles.hero}`} aria-labelledby="hero-title">
      <LuxeBackdrop tone="dark" monogram={false} className={styles.backdrop} />

      {/* Palco editorial: nome gigante atrás, foto recortada na frente */}
      <div className={styles.stage}>
        <div className={styles.glow} aria-hidden="true" />

        <p className={styles.coverName} aria-hidden="true">
          {hero.coverName}
        </p>

        <HeroCarousel slides={hero.slides} />

        {/* Detalhes de capa de revista (decorativos) */}
        <div className={styles.details} aria-hidden="true">
          <p className={styles.vertical}>Julia Damascena Makeup</p>
          <p className={styles.caption}>Maquiagem e Penteado</p>
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <BlurReveal
            as="h1"
            id="hero-title"
            text={hero.headline}
            emphasis={hero.headlineEmphasis}
            immediate
            keepOpacity
            className={styles.title}
            emphasisClassName={styles.emphasis}
            emphasisInnerClassName={styles.sheen}
          />

          <Reveal as="p" className={styles.subtitle} delay={420}>
            {hero.subheadline}
          </Reveal>

          <Reveal as="ul" className={styles.chips} delay={500}>
            {hero.chips.map((chip, i) => (
              <li key={chip.label} className={styles.chip} style={{ '--i': i }}>
                <a href={chip.href} className={styles.chipLink}>
                  {chip.label}
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal delay={640} className={styles.bookingWrap}>
            <div className={styles.booking} onPointerMove={onBookingPointerMove}>
              <p className={styles.bookingMessage}>{hero.bookingText}</p>
              <Button
                href={buildWhatsAppUrl()}
                external
                icon={<WhatsAppIcon />}
                className={styles.bookingButton}
                aria-label={`${hero.bookingCta} pelo WhatsApp (abre em nova aba)`}
              >
                {hero.bookingCta}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={720}>
            <a href="#servicos" className={styles.servicesLink}>
              {hero.secondaryCta}
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
