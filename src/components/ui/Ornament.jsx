import styles from './Ornament.module.css';

/** Ornamento decorativo de título: fio — losango — fio, em dourado. */
export default function Ornament({ className = '' }) {
  return (
    <span className={`${styles.ornament} ${className}`} aria-hidden="true">
      <span />
      <i />
      <span />
    </span>
  );
}
