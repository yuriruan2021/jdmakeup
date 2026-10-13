import Reveal from './Reveal';
import styles from './SectionHeader.module.css';

/** Título de seção (H2) + subtítulo opcional. Centralizado só quando curto (regra do DS). */
export default function SectionHeader({ id, eyebrow, title, subtitle, align = 'center', className = '' }) {
  return (
    <Reveal className={[styles.header, styles[align], className].filter(Boolean).join(' ')}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="h2">
        {title}
      </h2>
      {subtitle && <p className={`lead ${styles.subtitle}`}>{subtitle}</p>}
      <span className={styles.ornament} aria-hidden="true" />
    </Reveal>
  );
}
