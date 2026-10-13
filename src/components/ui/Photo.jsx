import { useState } from 'react';
import { brand } from '../../data/brand';
import styles from './Photo.module.css';

/**
 * Foto com proporção fixa e lazy loading.
 * Se o arquivo ainda não existir em /public/images, mostra um espaço reservado
 * com role="img" e o mesmo texto alternativo — a página nunca fica quebrada.
 */
export default function Photo({ src, alt, ratio = '4 / 5', radius = 'md', priority = false, className = '', zoom = false }) {
  const [failed, setFailed] = useState(!src);
  const classes = [styles.frame, styles[radius], zoom && styles.zoom, className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={{ aspectRatio: ratio }}>
      {failed ? (
        <div className={styles.placeholder} role="img" aria-label={alt}>
          <img src={brand.monogram} alt="" className={styles.monogram} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={styles.img}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
