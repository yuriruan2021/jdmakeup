import { brand } from '../../data/brand';
import styles from './Logo.module.css';

/**
 * Logo JD Makeup (vetorizada a partir da logo original).
 * variant "inline": monograma + MAKEUP lado a lado (header).
 * variant "stacked": logo completa empilhada, como a original (rodapé).
 */
export default function Logo({ href = '#inicio', onClick, variant = 'inline' }) {
  return (
    <a
      href={href}
      className={`${styles.logo} ${styles[variant]}`}
      aria-label="Julia Damascena Makeup — voltar ao início"
      onClick={onClick}
    >
      {variant === 'stacked' ? (
        <img src={brand.fullLogo} alt="" width="808" height="585" className={styles.full} />
      ) : (
        <>
          <img src={brand.monogram} alt="" width="788" height="456" className={styles.mark} />
          <span className={styles.word} aria-hidden="true">
            Makeup
          </span>
        </>
      )}
    </a>
  );
}
