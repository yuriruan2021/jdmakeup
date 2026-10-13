import { useReveal } from '../../hooks/useReveal';

/** Animação sutil do DS: fade + 16 px de deslocamento, 400 ms. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, visible] = useReveal();
  const classes = ['reveal', visible && 'is-visible', className].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} className={classes} style={{ '--reveal-delay': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
