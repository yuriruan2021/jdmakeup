import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './MakeupPaint.module.css';

const MAX_DPR = 2;
/** Raio da pincelada (px do canvas) para um quadro de w × h */
const brushRadius = (w, h) => Math.max(26, Math.min(w, h) * 0.13);

/**
 * Foto em preto e branco que ganha cor.
 * - Mouse: um círculo dourado (do tamanho da pincelada) segue o cursor e pinta a foto
 *   num canvas; o que foi pintado fica colorido.
 * - Toque (celular/tablet): ao aparecer na tela, um círculo dourado se abre do centro e
 *   revela a foto colorida. É uma transição de CSS, que não trava durante a rolagem
 *   (os quadros de JavaScript pausam enquanto o dedo rola a página no celular).
 * - "Menos movimento": a foto já aparece colorida (só CSS).
 */
export default function MakeupPaint({ src, alt, width, height }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const state = useRef({ img: null, mask: null, w: 0, h: 0, dpr: 1, last: null, frame: 0 });

  // Prepara canvas e máscara no tamanho atual do quadro (só com mouse)
  const setup = useCallback(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return false;
    const s = state.current;
    const rect = root.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (!w || !h) return false;
    if (s.w !== w || s.h !== h) {
      s.w = w;
      s.h = h;
      s.dpr = dpr;
      canvas.width = w;
      canvas.height = h;
      s.mask = document.createElement('canvas');
      s.mask.width = w;
      s.mask.height = h;
      root.style.setProperty('--r', `${brushRadius(w, h) / dpr}px`);
    }
    if (!s.img) {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      s.img = img;
    }
    return true;
  }, [src]);

  // Compõe: máscara pintada × foto colorida (object-fit: cover)
  const render = useCallback(() => {
    const s = state.current;
    s.frame = 0;
    const canvas = canvasRef.current;
    if (!canvas || !s.mask || !s.img?.complete || !s.img.naturalWidth) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, s.w, s.h);
    ctx.drawImage(s.mask, 0, 0);
    ctx.globalCompositeOperation = 'source-in';
    const scale = Math.max(s.w / s.img.naturalWidth, s.h / s.img.naturalHeight);
    const dw = s.img.naturalWidth * scale;
    const dh = s.img.naturalHeight * scale;
    ctx.drawImage(s.img, (s.w - dw) / 2, (s.h - dh) / 2, dw, dh);
  }, []);

  const schedule = useCallback(() => {
    const s = state.current;
    if (!s.frame) s.frame = requestAnimationFrame(render);
  }, [render]);

  // Uma "pincelada" macia de (x0,y0) até (x1,y1), em pixels do canvas
  const stroke = useCallback(
    (x0, y0, x1, y1) => {
      const s = state.current;
      if (!s.mask) return;
      const m = s.mask.getContext('2d');
      const r = brushRadius(s.w, s.h);
      const dist = Math.hypot(x1 - x0, y1 - y0);
      const steps = Math.max(1, Math.ceil(dist / (r * 0.25)));
      for (let i = 0; i <= steps; i++) {
        const x = x0 + ((x1 - x0) * i) / steps;
        const y = y0 + ((y1 - y0) * i) / steps;
        const g = m.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, 'rgba(0,0,0,0.5)');
        g.addColorStop(0.6, 'rgba(0,0,0,0.22)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        m.fillStyle = g;
        m.beginPath();
        m.arc(x, y, r, 0, Math.PI * 2);
        m.fill();
      }
      schedule();
    },
    [schedule],
  );

  const toLocal = (event) => {
    const rect = rootRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onPointerEnter = (event) => {
    if (event.pointerType !== 'mouse') return;
    setup();
    const { x, y } = toLocal(event);
    state.current.last = { x, y };
    rootRef.current.style.setProperty('--bx', `${x}px`);
    rootRef.current.style.setProperty('--by', `${y}px`);
  };

  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    if (!state.current.mask && !setup()) return;
    const { x, y } = toLocal(event);
    const root = rootRef.current;
    root.style.setProperty('--bx', `${x}px`);
    root.style.setProperty('--by', `${y}px`);
    const s = state.current;
    const last = s.last ?? { x, y };
    stroke(last.x * s.dpr, last.y * s.dpr, x * s.dpr, y * s.dpr);
    s.last = { x, y };
  };

  const onPointerLeave = () => {
    state.current.last = null;
  };

  // Toque: revela quando a foto aparece na tela (a animação em si é CSS)
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => cancelAnimationFrame(state.current.frame), []);

  return (
    <span
      ref={rootRef}
      className={`${styles.paint} ${revealed ? styles.revealed : ''}`}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <img className={styles.photo} src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      {/* Desktop: camada pintada pelo mouse */}
      <canvas ref={canvasRef} className={styles.color} aria-hidden="true" />
      {/* Toque: foto colorida revelada pelo círculo */}
      <img className={styles.touchColor} src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <span className={styles.ring} aria-hidden="true" />
    </span>
  );
}
