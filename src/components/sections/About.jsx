import { MapPin, Sparkles } from 'lucide-react';
import { about, contact } from '../../data/content';
import { useReveal } from '../../hooks/useReveal';
import { useParallax } from '../../hooks/useParallax';
import BlurReveal from '../ui/BlurReveal';
import LuxeBackdrop from '../ui/LuxeBackdrop';
import Photo from '../ui/Photo';
import Reveal from '../ui/Reveal';
import { InstagramIcon } from '../ui/Icons';
import styles from './About.module.css';

/** Retrato em arco: revela de baixo para cima, contorno dourado se desenha, parallax leve. */
function Portrait() {
  const [ref, visible] = useReveal({ threshold: 0.25 });
  const parallaxRef = useParallax(28);
  const { portrait } = about;

  return (
    <div ref={ref} className={`${styles.portrait} ${visible ? styles.shown : ''}`}>
      <div ref={parallaxRef} className={styles.parallax}>
        <svg className={styles.outline} viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0.5 50 A49.5 49.5 0 0 1 99.5 50 V117 Q99.5 124.5 92 124.5 H8 Q0.5 124.5 0.5 117 Z"
            pathLength="1"
          />
        </svg>

        <div className={styles.arch}>
          <img
            className={styles.photo}
            src={portrait.src}
            srcSet={`${portrait.srcSmall} 480w, ${portrait.src} 800w`}
            sizes="(min-width: 1024px) 40vw, 90vw"
            width={portrait.width}
            height={portrait.height}
            alt={portrait.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <p className={styles.badge}>
        <Sparkles size={18} strokeWidth={1.5} aria-hidden="true" className={styles.badgeIcon} />
        <em>{about.highlight}</em>
      </p>
    </div>
  );
}

/** Foto do estúdio revelada por máscara, em sequência. */
function StudioPhoto({ photo, index }) {
  const [ref, visible] = useReveal({ threshold: 0.2 });
  return (
    <li ref={ref} className={`${styles.studioItem} ${visible ? styles.shown : ''}`} style={{ '--i': index }}>
      <figure className={styles.figure}>
        <div className={styles.studioPhoto}>
          <Photo src={photo.src} alt={photo.alt} ratio="4 / 5" zoom />
        </div>
        <figcaption className={styles.caption}>
          <strong className="h4">{photo.title}</strong>
          <span>{photo.caption}</span>
        </figcaption>
      </figure>
    </li>
  );
}

export default function About() {
  return (
    <section id="sobre" className={`section bg-creme ${styles.about}`} aria-labelledby="sobre-title">
      <LuxeBackdrop />

      <div className="container">
        <div className={styles.grid}>
          <Portrait />

          <div className={styles.text}>
            <Reveal as="p" className={styles.pill}>
              {about.tagline}
            </Reveal>

            <BlurReveal
              id="sobre-title"
              text={about.title}
              emphasis={about.titleEmphasis}
              className={styles.title}
              emphasisClassName={styles.emphasis}
            />

            {about.paragraphs.map((paragraph, i) => (
              <Reveal as="p" key={i} className={`measure ${styles.paragraph}`} delay={120 * (i + 1)}>
                {paragraph}
              </Reveal>
            ))}

            <Reveal className={styles.meta} delay={360}>
              <span className={styles.location}>
                <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
                {about.location}
              </span>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.instagram}
                aria-label={`${about.instagramCta}: ${contact.instagramHandle} (abre em nova aba)`}
              >
                <InstagramIcon size={18} />
                <span>{about.instagramCta}</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>


      {about.showStudioPhotos && (
        <div className="container">
          <ul className={styles.studio}>
            {about.studioPhotos.map((photo, i) => (
              <StudioPhoto key={photo.title} photo={photo} index={i} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
