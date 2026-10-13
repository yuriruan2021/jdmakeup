import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Heart, MessageCircle } from 'lucide-react';
import { brand } from '../../data/brand';
import { testimonials } from '../../data/content';
import { useReveal } from '../../hooks/useReveal';
import BlurReveal from '../ui/BlurReveal';
import LuxeBackdrop from '../ui/LuxeBackdrop';
import Ornament from '../ui/Ornament';
import Reveal from '../ui/Reveal';
import { InstagramIcon } from '../ui/Icons';
import styles from './Testimonials.module.css';

/**
 * Um depoimento no formato de post: foto do trabalho, curtidas e legenda reais,
 * e o comentário da cliente em destaque. Ao aparecer: coração "duplo toque" na foto,
 * curtida que fica vinho e o comentário entra depois de um "digitando…".
 */
function PostCard({ item, index }) {
  const [ref, visible] = useReveal({ threshold: 0.35 });
  const { comment } = item;

  return (
    <li ref={ref} className={`${styles.slide} ${visible ? styles.shown : ''}`} style={{ '--i': index }}>
      <article className={styles.post} aria-label={`Depoimento de @${comment.user}: ${item.occasion}`}>
        <header className={styles.postHead}>
          <span className={styles.avatar} aria-hidden="true">
            <img src={brand.monogram} alt="" width="788" height="456" />
          </span>
          <span className={styles.postMeta}>
            <strong>{testimonials.author}</strong>
            <span>{item.occasion}</span>
          </span>
          <InstagramIcon size={20} className={styles.igIcon} />
        </header>

        <figure className={styles.photo}>
          <img
            src={item.image.src}
            srcSet={`${item.image.srcSmall} 400w, ${item.image.src} 640w`}
            sizes="(min-width: 1024px) 380px, 86vw"
            alt={item.image.alt}
            width="640"
            height="800"
            loading="lazy"
            decoding="async"
          />
          <span className={styles.burst} aria-hidden="true">
            <Heart size={84} strokeWidth={0} fill="currentColor" />
          </span>
        </figure>

        <div className={styles.actions}>
          <span className={styles.likeIcon} aria-hidden="true">
            <Heart size={22} strokeWidth={1.75} />
          </span>
          <MessageCircle size={22} strokeWidth={1.75} aria-hidden="true" className={styles.commentIcon} />
          <span className={styles.likes}>{item.likes} curtidas</span>
          <time className={styles.date}>{item.date}</time>
        </div>

        <p className={styles.caption}>
          <strong>{testimonials.author}</strong> {item.caption}
        </p>

        <div className={styles.comment}>
          <span className={styles.commentLabel}>{testimonials.commentLabel}</span>
          <div className={styles.commentRow}>
            <span className={styles.commentAvatar} aria-hidden="true">
              {comment.user.replace(/[^a-z]/gi, '').charAt(0).toUpperCase()}
            </span>
            <div className={styles.bubble}>
              <span className={styles.typing} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <blockquote className={styles.quote}>
                <p>
                  <strong className={styles.user}>@{comment.user}</strong> {comment.text}
                </p>
              </blockquote>
            </div>
          </div>
        </div>

        <a className={styles.viewPost} href={item.url} target="_blank" rel="noopener noreferrer">
          {testimonials.viewPost}
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
          <span className="visually-hidden"> (abre em nova aba)</span>
        </a>
      </article>
    </li>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 1;
    setProgress(p);
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const go = (dir) => {
    const el = trackRef.current;
    const card = el?.querySelector('li');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section id="depoimentos" className={`section bg-nude ${styles.section}`} aria-labelledby="depoimentos-title">
      <LuxeBackdrop monogram={false} />

      <div className="container">
        <header className={styles.header}>
          <BlurReveal
            id="depoimentos-title"
            text={testimonials.title}
            emphasis={testimonials.titleEmphasis}
            className={styles.title}
            emphasisClassName={styles.emphasis}
          />
          <Ornament />
          <Reveal as="p" className={styles.subtitle} delay={300}>
            {testimonials.subtitle}
          </Reveal>
        </header>

        <ul
          ref={trackRef}
          className={styles.track}
          onScroll={update}
          tabIndex={0}
          aria-label="Depoimentos de clientes (role para o lado)"
        >
          {testimonials.items.map((item, i) => (
            <PostCard key={item.url} item={item} index={i} />
          ))}
        </ul>

        <div className={styles.controls}>
          <button type="button" className={styles.arrow} onClick={() => go(-1)} disabled={edges.start} aria-label={testimonials.prev}>
            <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <span className={styles.bar} aria-hidden="true">
            <span style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
          </span>
          <button type="button" className={styles.arrow} onClick={() => go(1)} disabled={edges.end} aria-label={testimonials.next}>
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
