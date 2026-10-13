import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './Lightbox.module.css';

/**
 * Foto em tela cheia (dialog nativo: prende o foco, fecha com Esc e devolve o foco).
 * Navega por setas (tela e teclado) e deslizando o dedo; pré-carrega as vizinhas.
 */
export default function Lightbox({ items, index, onClose, onChange }) {
  const ref = useRef(null);
  const touch = useRef(null);
  const [direction, setDirection] = useState(1);
  const open = index !== null;
  const item = open ? items[index] : null;
  const total = items.length;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    // Trava a rolagem da página enquanto aberto
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // Pré-carrega a próxima e a anterior
  useEffect(() => {
    if (!open) return;
    [index - 1, index + 1].forEach((i) => {
      const neighbour = items[(i + total) % total];
      if (neighbour) new Image().src = neighbour.src;
    });
  }, [open, index, items, total]);

  const go = (delta) => {
    setDirection(delta);
    onChange((index + delta + total) % total);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') go(1);
    else if (event.key === 'ArrowLeft') go(-1);
  };

  const onTouchStart = (event) => {
    const t = event.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (event) => {
    if (!touch.current) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-label="Foto ampliada do portfólio"
      onClose={onClose}
      onKeyDown={onKeyDown}
      // Clique fora da foto (no fundo) fecha
      onClick={(event) => event.target === ref.current && onClose()}
    >
      {item && (
        <div className={styles.frame} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button type="button" className={`${styles.control} ${styles.close}`} onClick={onClose} aria-label="Fechar">
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>

          <figure key={index} className={styles.figure} style={{ '--dir': direction }}>
            <img className={styles.image} src={item.src} alt={item.alt} width="800" height="1000" />
            <figcaption className={styles.caption}>
              <span className={styles.category}>{item.category}</span>
              <strong className={styles.title}>{item.title}</strong>
              {total > 1 && (
                <span className={styles.counter} aria-label={`Foto ${index + 1} de ${total}`}>
                  {String(index + 1).padStart(2, '0')} <i>/</i> {String(total).padStart(2, '0')}
                </span>
              )}
            </figcaption>
          </figure>

          {total > 1 && (
            <>
              <button type="button" className={`${styles.control} ${styles.prev}`} onClick={() => go(-1)} aria-label="Foto anterior">
                <ChevronLeft size={26} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => go(1)} aria-label="Próxima foto">
                <ChevronRight size={26} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
