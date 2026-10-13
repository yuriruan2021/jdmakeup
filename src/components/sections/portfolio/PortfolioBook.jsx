import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  CreditCard,
  Info,
  Link2,
  MapPin,
  QrCode,
  ZoomIn,
} from 'lucide-react';
import { brand } from '../../../data/brand';
import { contact, portfolio } from '../../../data/content';
import { buildWhatsAppUrl } from '../../../utils/whatsapp';
import Button from '../../ui/Button';
import { InstagramIcon, WhatsAppIcon } from '../../ui/Icons';
import Lightbox from './Lightbox';
import styles from './PortfolioBook.module.css';

const { book } = portfolio;
const CHAPTERS = book.chapters;
const TOTAL = CHAPTERS.length;
const TURN_MS = 900;
const pad = (n) => String(n).padStart(2, '0');
const indexTabId = (id) => `portfolio-indice-${id}`;
const paymentIcons = { pix: QrCode, card: CreditCard, cash: Banknote, link: Link2 };

function MenuRows({ rows }) {
  return (
    <ul className={styles.menu}>
      {rows.map((row) => (
        <li key={row.name} className={styles.menuRow}>
          <span className={styles.menuName}>
            {row.name}
            {row.includes && <small>{row.includes}</small>}
          </span>
          <span className={styles.leader} aria-hidden="true" />
          <span className={styles.menuPrice}>{row.price}</span>
        </li>
      ))}
    </ul>
  );
}

/** Renderiza cada tipo de bloco de conteúdo de uma página. */
function Block({ block, onJump }) {
  switch (block.type) {
    case 'lead':
      return <p className={styles.lead}>{block.text}</p>;
    case 'text':
      return <p className={styles.text}>{block.text}</p>;
    case 'jump':
      return (
        <p className={styles.jump}>
          <span>{block.text}</span>
          <button type="button" className={styles.jumpButton} onClick={() => onJump(block.to)}>
            {block.label}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </p>
      );
    case 'services':
      return (
        <ul className={styles.services}>
          {block.items.map((item) => (
            <li key={item.name + item.emphasis} className={styles.service}>
              <div className={styles.serviceHead}>
                <h4 className={styles.serviceName}>
                  {item.name} <em>{item.emphasis}</em>
                </h4>
                <span className={styles.servicePrice}>{item.price}</span>
              </div>
              <p className={styles.text}>{item.text}</p>
              {item.extras && <MenuRows rows={item.extras} />}
            </li>
          ))}
        </ul>
      );
    case 'menu':
      return (
        <div className={styles.menuBlock}>
          {block.title && <h4 className={styles.blockTitle}>{block.title}</h4>}
          <MenuRows rows={block.rows} />
        </div>
      );
    case 'notice':
      return (
        <p className={styles.notice}>
          <Info size={18} strokeWidth={1.5} aria-hidden="true" />
          <span>{block.text}</span>
        </p>
      );
    case 'alert':
      return (
        <p className={styles.alert}>
          <AlertCircle size={18} strokeWidth={1.5} aria-hidden="true" />
          <span>
            <strong>{block.label}</strong> {block.text}
          </span>
        </p>
      );
    case 'payments':
      return (
        <ul className={styles.payments}>
          {block.items.map((item) => {
            const Icon = paymentIcons[item.icon] ?? Info;
            return (
              <li key={item.method} className={styles.payment}>
                <span className={styles.paymentIcon} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <strong>{item.method}</strong>
                <span>{item.text}</span>
              </li>
            );
          })}
        </ul>
      );
    case 'list':
      return (
        <div className={styles.listBlock}>
          <h4 className={styles.blockTitle}>{block.title}</h4>
          <ul className={styles.list}>
            {block.items.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      );
    case 'rules':
      return (
        <ol className={styles.rules}>
          {block.items.map((text, i) => (
            <li key={text}>
              <span className={styles.ruleNumber} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      );
    case 'address':
      return (
        <div className={styles.address}>
          <p>
            <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
            <span>
              <strong>{block.label}</strong> {block.text}
            </span>
          </p>
          <div className={styles.addressLinks}>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
              Abrir no mapa
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
              <InstagramIcon size={16} />
              {contact.instagramHandle}
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
          </div>
        </div>
      );
    default:
      return null;
  }
}

/** Uma página do portfólio: foto (página da esquerda) + texto (página da direita). */
function Page({ chapter, number, className = '', onJump, onOpenPhoto, ...rest }) {
  // Área de conteúdo com altura fixa: mostra o esmaecimento enquanto houver mais para rolar
  const scrollRef = useRef(null);
  const [more, setMore] = useState(false);
  const check = useCallback(() => {
    const el = scrollRef.current;
    if (el) setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 8);
  }, []);
  useEffect(() => {
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [check]);

  return (
    <article className={`${styles.page} ${className}`} {...rest}>
      <figure className={styles.photo}>
        <img src={chapter.image.src} alt={chapter.image.alt} width="800" height="1000" loading="lazy" decoding="async" />
        <span className={styles.photoNumber} aria-hidden="true">
          {pad(number)}
        </span>
      </figure>

      <div className={styles.paper}>
        <img className={styles.watermark} src={brand.monogram} alt="" aria-hidden="true" />
        <header className={styles.pageHead}>
          <div className={styles.pageHeadText}>
            <span className={styles.pageEyebrow}>Portfólio · {pad(number)}</span>
            <h3 className={styles.pageTitle}>
              {chapter.lead && <>{chapter.lead} </>}
              <em>{chapter.emphasis}</em>
            </h3>
          </div>

          {/* Celular/tablet: miniatura no lugar da foto grande; toque abre em tela cheia */}
          <button type="button" className={styles.thumb} onClick={onOpenPhoto} aria-label={`Ver foto: ${chapter.label}`}>
            <img src={chapter.image.src} alt="" width="800" height="1000" loading="lazy" decoding="async" />
            <span className={styles.thumbIcon} aria-hidden="true">
              <ZoomIn size={14} strokeWidth={2} />
            </span>
          </button>
        </header>

        <div
          ref={scrollRef}
          className={`${styles.blocks} ${more ? styles.hasMore : ''}`}
          onScroll={check}
          tabIndex={0}
          aria-label={`Conteúdo: ${chapter.label}`}
        >
          {chapter.blocks.map((block, i) => (
            <div key={i} className={styles.blockWrap} style={{ '--b': i }}>
              <Block block={block} onJump={onJump} />
            </div>
          ))}
        </div>

        <footer className={styles.pageFoot}>
          {chapter.showcase && (
            <a href={chapter.showcase} className={styles.inlineLink}>
              {book.showcase}
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          )}
          <Button
            href={buildWhatsAppUrl()}
            external
            icon={<WhatsAppIcon />}
            className={styles.bookingButton}
            aria-label={`${book.bookingLabel} (abre em nova aba)`}
          >
            {book.booking}
          </Button>
        </footer>
      </div>
    </article>
  );
}

/**
 * "Folheie o portfólio": índice + páginas que viram como um livro.
 * Clique no índice, setas, teclado (←/→) e deslizar no celular.
 * Link direto por hash: #portfolio-pagamento, #portfolio-preparacao...
 */
export default function PortfolioBook() {
  const [current, setCurrent] = useState(0);
  const [turn, setTurn] = useState(null); // { from, dir }
  const [photoOpen, setPhotoOpen] = useState(false);
  const bookRef = useRef(null);
  const indexRef = useRef(null);
  const touch = useRef(null);
  const timer = useRef(0);
  const currentRef = useRef(0);

  // Estável (lê a página atual por ref), para não reexecutar os efeitos que dependem dele
  const goTo = useCallback(
    (target, { scroll = true } = {}) => {
      const from = currentRef.current;
      const next = Math.max(0, Math.min(TOTAL - 1, target));
      if (next === from) return;
      currentRef.current = next;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      clearTimeout(timer.current);
      setTurn(reduced ? null : { from, dir: next > from ? 1 : -1 });
      setCurrent(next);
      if (!reduced) timer.current = setTimeout(() => setTurn(null), TURN_MS);

      // Se o topo do livro ficou acima da tela (ex.: clicou "próxima" no fim de uma página longa), volta até ele
      if (scroll && bookRef.current) {
        const top = bookRef.current.getBoundingClientRect().top;
        const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
        if (top < headerH) window.scrollTo({ top: window.scrollY + top - headerH - 16, behavior: reduced ? 'auto' : 'smooth' });
      }
    },
    [],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  // Link direto por hash
  useEffect(() => {
    const fromHash = () => {
      const i = CHAPTERS.findIndex((c) => window.location.hash === `#portfolio-${c.id}`);
      if (i !== -1) goTo(i, { scroll: false });
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [goTo]);

  // No índice horizontal (celular), mantém o capítulo ativo visível
  useEffect(() => {
    const list = indexRef.current;
    const active = list?.querySelector('[aria-selected="true"]');
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2, behavior: 'smooth' });
  }, [current]);

  const jump = (id) => goTo(CHAPTERS.findIndex((c) => c.id === id));

  const onIndexKeyDown = (event) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (event.key in keys) next = (current + keys[event.key] + TOTAL) % TOTAL;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = TOTAL - 1;
    if (next === null) return;
    event.preventDefault();
    goTo(next, { scroll: false });
    document.getElementById(indexTabId(CHAPTERS[next].id))?.focus();
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
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
  };

  const chapter = CHAPTERS[current];
  const forward = turn?.dir === 1;
  const backward = turn?.dir === -1;

  return (
    <div className={styles.book}>
      {/* Âncoras para links diretos a cada capítulo */}
      <div className={styles.anchors} aria-hidden="true">
        {CHAPTERS.map((c) => (
          <span key={c.id} id={`portfolio-${c.id}`} />
        ))}
      </div>

      <div className={styles.layout}>
        <nav className={styles.indexWrap} aria-label={book.indexLabel}>
          <div ref={indexRef} className={styles.index} role="tablist" aria-orientation="vertical">
            {CHAPTERS.map((c, i) => (
              <button
                key={c.id}
                id={indexTabId(c.id)}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-controls="portfolio-pagina"
                tabIndex={i === current ? 0 : -1}
                className={`${styles.indexItem} ${i === current ? styles.indexActive : ''}`}
                onClick={() => goTo(i, { scroll: false })}
                onKeyDown={onIndexKeyDown}
              >
                <span className={styles.indexNumber} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div ref={bookRef} className={styles.stage}>
          <div className={styles.spread} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {/* Página saindo (avançar): vira por cima. Voltando: fica por baixo. */}
            {turn && (
              <Page
                key={`turn-${turn.from}`}
                chapter={CHAPTERS[turn.from]}
                number={turn.from + 1}
                className={`${styles.overlay} ${forward ? styles.turnOut : styles.under}`}
                aria-hidden="true"
                inert=""
                onJump={jump}
              />
            )}

            <Page
              key={`page-${current}`}
              id="portfolio-pagina"
              role="tabpanel"
              aria-labelledby={indexTabId(chapter.id)}
              chapter={chapter}
              number={current + 1}
              className={`${styles.currentPage} ${backward ? styles.turnIn : ''} ${turn ? '' : styles.settled}`}
              onJump={jump}
              onOpenPhoto={() => setPhotoOpen(true)}
            />
          </div>

          <div className={styles.controls}>
            <button type="button" className={styles.arrow} onClick={() => goTo(current - 1)} disabled={current === 0} aria-label={book.prev}>
              <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <div className={styles.progress}>
              <span className={styles.counter} aria-live="polite">
                <span className="visually-hidden">Página </span>
                {pad(current + 1)} <i aria-hidden="true">/</i>
                <span className="visually-hidden"> de </span> {pad(TOTAL)}
                <span className="visually-hidden">: {chapter.label}</span>
              </span>
              <span className={styles.bar} aria-hidden="true">
                <span style={{ transform: `scaleX(${(current + 1) / TOTAL})` }} />
              </span>
            </div>

            <button type="button" className={styles.arrow} onClick={() => goTo(current + 1)} disabled={current === TOTAL - 1} aria-label={book.next}>
              <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <Lightbox
        items={[{ src: chapter.image.src, alt: chapter.image.alt, title: chapter.label, category: `Portfólio · ${pad(current + 1)}` }]}
        index={photoOpen ? 0 : null}
        onClose={() => setPhotoOpen(false)}
        onChange={() => {}}
      />
    </div>
  );
}
