import styles from './Button.module.css';

/**
 * Botão pílula do DS.
 * variant: "primary" (gradiente dourado) | "secondary" (contorno) | "dark" (ônix)
 * tone: "light" | "dark" — fundo em que o botão está (ajusta a cor do secundário)
 * Renderiza <a> quando recebe href.
 */
export default function Button({
  variant = 'primary',
  tone = 'light',
  href,
  icon,
  external = false,
  fullWidth = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [styles.button, styles[variant], tone === 'dark' ? styles.onDark : styles.onLight, fullWidth && styles.full, className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
