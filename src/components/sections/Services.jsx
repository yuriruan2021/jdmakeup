import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check, Clock, Info, Sparkles } from 'lucide-react';
import { services } from '../../data/content';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { useReveal } from '../../hooks/useReveal';
import { useCountUp } from '../../hooks/useCountUp';
import { useParallax } from '../../hooks/useParallax';
import BlurReveal from '../ui/BlurReveal';
import Button from '../ui/Button';
import Ornament from '../ui/Ornament';
import Reveal from '../ui/Reveal';
import { WhatsAppIcon } from '../ui/Icons';
import styles from './Services.module.css';

const detailIcons = { clock: Clock, sparkles: Sparkles, info: Info, check: Check };
const tabId = (id) => `servicos-${id}`;
const panelId = (id) => `painel-${id}`;

/** Preço que conta até o valor ao aparecer; o valor real fica no texto acessível. */
function Price({ value, label, prefix, active }) {
  const current = useCountUp(value, active);
  return (
    <p className={styles.price}>
      <span className="visually-hidden">{label}</span>
      <span aria-hidden="true" className={styles.priceVisual}>
        {prefix && <span className={styles.pricePrefixCard}>{prefix}</span>}
        <span className={styles.currency}>R$</span>
        <span className={styles.amount}>{current}</span>
      </span>
    </p>
  );
}

/** Lista no estilo cardápio: nome ······ preço. Linhas viram links quando há `href`. */
function MenuList({ id, rows, title, compact = false }) {
  const [ref, visible] = useReveal({ threshold: 0.3 });
  const titleId = `${id}-titulo`;
  return (
    <div ref={ref} className={`${styles.menuBlock} ${compact ? styles.menuCompact : ''} ${visible ? styles.shown : ''}`}>
      {title && (
        <h4 id={titleId} className={styles.groupTitle}>
          {title}
        </h4>
      )}
      <ul className={styles.menu} aria-labelledby={title ? titleId : undefined}>
        {rows.map((row, i) => {
          const content = (
            <>
              <span className={styles.menuName}>
                {row.name}
                {row.includes && <small className={styles.menuIncludes}>{row.includes}</small>}
              </span>
              <span className={styles.leader} aria-hidden="true" />
              <span className={styles.menuPrice}>{row.price}</span>
            </>
          );
          return (
            <li key={row.name} className={styles.menuRow} style={{ '--i': i }}>
              {row.href ? (
                <a
                  className={styles.menuLink}
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${services.cta}: ${row.name}, ${row.includes ? `${row.includes}, ` : ''}${row.price} (abre o WhatsApp em nova aba)`}
                >
                  {content}
                </a>
              ) : (
                <div className={styles.menuStatic}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Card "assinatura": foto em arco revelada, inclinação 3D leve seguindo o mouse,
 * holofote dourado, detalhes em sequência e preço que conta.
 */
function ServiceCard({ item, index }) {
  const [ref, visible] = useReveal({ threshold: 0.2 });
  const parallaxRef = useParallax(18);
  const tiltRef = useRef(null);
  const title = `${item.lead} ${item.emphasis}`.trim();
  const titleId = `servico-${item.id}`;

  const onPointerMove = useCallback((event) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = tiltRef.current;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);

  const onPointerLeave = useCallback(() => {
    tiltRef.current.style.setProperty('--rx', '0deg');
    tiltRef.current.style.setProperty('--ry', '0deg');
  }, []);

  return (
    <article
      ref={ref}
      className={`${styles.cardWrap} ${visible ? `${styles.shown} is-visible` : ''}`}
      style={{ '--i': index }}
      aria-labelledby={titleId}
    >
      <div ref={tiltRef} className={`card-clickable ${styles.card}`} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
        <div className={styles.media}>
          <div ref={parallaxRef} className={styles.parallax}>
            <div className={styles.arch}>
              <img
                className={styles.photo}
                src={item.image.src}
                srcSet={`${item.image.srcSmall} 480w, ${item.image.src} 800w`}
                sizes="(min-width: 1024px) 26vw, (min-width: 768px) 40vw, 90vw"
                width="800"
                height="1000"
                alt={item.image.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <h3 id={titleId} className={styles.name}>
            {item.lead && <>{item.lead} </>}
            <em className={styles.nameEmphasis}>{item.emphasis}</em>
          </h3>

          <p className={styles.description}>{item.description}</p>

          <ul className={styles.details}>
            {item.details.map(({ icon, text, muted }, i) => {
              const Icon = detailIcons[icon] ?? Info;
              return (
                <li key={i} className={`${styles.detail} ${muted ? styles.muted : ''}`} style={{ '--d': i }}>
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  <span>{text}</span>
                </li>
              );
            })}
          </ul>

          {item.extras && <MenuList id={`extras-${item.id}`} rows={item.extras} title={services.extrasTitle} compact />}

          <div className={styles.footer}>
            <Price value={item.priceValue} label={item.price} prefix={item.pricePrefix} active={visible} />
            <Button
              variant="dark"
              href={buildWhatsAppUrl(item.booking)}
              external
              className="stretched-link"
              aria-label={`${services.cta}: ${title}, ${item.price} (abre o WhatsApp em nova aba)`}
            >
              {services.cta}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Abas de categoria (padrão WAI-ARIA tabs): clique, setas/Home/End no teclado,
 * deslizar no celular e link direto por hash (#servicos-cilios etc.).
 */
function useServiceTabs(ids) {
  const [active, setActive] = useState(ids[0]);

  // Hash → aba (ao abrir a página e quando um link interno muda o hash)
  useEffect(() => {
    const fromHash = () => {
      const match = ids.find((id) => window.location.hash === `#${tabId(id)}`);
      if (match) setActive(match);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [ids]);

  const move = useCallback(
    (delta) => {
      const next = ids[(ids.indexOf(active) + delta + ids.length) % ids.length];
      setActive(next);
      return next;
    },
    [active, ids],
  );

  return { active, setActive, move };
}

const CATEGORY_IDS = services.categories.map((c) => c.id);

export default function Services() {
  const [sectionRef, sectionVisible] = useReveal({ threshold: 0.05 });
  const { categories } = services;
  const { active, setActive, move } = useServiceTabs(CATEGORY_IDS);
  const tablistRef = useRef(null);
  const touch = useRef(null);

  // Marcador dourado desliza até a aba ativa; no celular, a aba ativa rola para o centro da barra
  useLayoutEffect(() => {
    const list = tablistRef.current;
    if (!list) return undefined;
    const update = () => {
      const button = list.querySelector('[aria-selected="true"]');
      if (!button) return;
      list.style.setProperty('--ind-x', `${button.offsetLeft}px`);
      list.style.setProperty('--ind-w', `${button.offsetWidth}px`);
      const target = button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2;
      list.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    };
    update();
    window.addEventListener('resize', update);
    document.fonts?.ready.then(update);
    return () => window.removeEventListener('resize', update);
  }, [active]);

  const onTabKeyDown = (event) => {
    let next = null;
    if (event.key === 'ArrowRight') next = move(1);
    else if (event.key === 'ArrowLeft') next = move(-1);
    else if (event.key === 'Home') next = CATEGORY_IDS[0];
    else if (event.key === 'End') next = CATEGORY_IDS[CATEGORY_IDS.length - 1];
    if (!next) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(tabId(next))?.focus();
  };

  // Deslizar para o lado no celular troca de aba
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
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
  };

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className={`section bg-creme ${styles.section} ${sectionVisible ? styles.linesIn : ''}`}
      aria-labelledby="servicos-title"
    >
      {/* Fundo: linhas-guia editoriais douradas + brilho rosé */}
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.glow} />
        <div className={`container ${styles.lines}`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} style={{ '--l': i }} />
          ))}
        </div>
      </div>

      <div className="container">
        <header className={styles.header}>
          <BlurReveal
            id="servicos-title"
            text={services.title}
            emphasis={services.titleEmphasis}
            className={styles.title}
            emphasisClassName={styles.emphasis}
          />
          <Ornament />
          <Reveal as="p" className={styles.subtitle} delay={300}>
            {services.subtitle}
          </Reveal>
        </header>

        <div className={styles.tabsBar}>
          <div ref={tablistRef} className={styles.tablist} role="tablist" aria-label={services.tabsLabel}>
            <span className={styles.indicator} aria-hidden="true" />
            {categories.map((category) => {
              const selected = category.id === active;
              return (
                <button
                  key={category.id}
                  id={tabId(category.id)}
                  type="button"
                  role="tab"
                  className={`${styles.tab} ${selected ? styles.tabActive : ''}`}
                  aria-selected={selected}
                  aria-controls={panelId(category.id)}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(category.id)}
                  onKeyDown={onTabKeyDown}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.panels} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {categories.map((category) => (
            <div
              key={category.id}
              id={panelId(category.id)}
              role="tabpanel"
              aria-labelledby={tabId(category.id)}
              className={styles.panel}
              hidden={category.id !== active}
              tabIndex={0}
            >
              <div className={`${styles.cards} ${styles[`count${category.items.length}`]}`}>
                {category.items.map((item, i) => (
                  <ServiceCard key={item.id} item={item} index={i} />
                ))}
              </div>

              {category.note && (
                <p className={styles.note}>
                  <Info size={18} strokeWidth={1.5} aria-hidden="true" />
                  <span>{category.note}</span>
                </p>
              )}

              {category.combos && (
                <MenuList
                  id={`combos-${category.id}`}
                  title={services.combosTitle}
                  rows={category.combos.map((combo) => ({ ...combo, href: buildWhatsAppUrl(`o ${combo.name} (${combo.includes})`) }))}
                />
              )}
            </div>
          ))}
        </div>

        <Reveal className={styles.cta}>
          <Button
            href={buildWhatsAppUrl()}
            external
            icon={<WhatsAppIcon />}
            className={styles.ctaButton}
            aria-label={`${services.cta} pelo WhatsApp (abre em nova aba)`}
          >
            {services.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
