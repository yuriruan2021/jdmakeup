import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CircleCheck,
  Hourglass,
  Sparkles,
  Wallet,
} from "lucide-react";
import { contact, howToBook } from "../../data/content";
import { buildWhatsAppUrl } from "../../utils/whatsapp";
import BlurReveal from "../ui/BlurReveal";
import LuxeBackdrop from "../ui/LuxeBackdrop";
import Ornament from "../ui/Ornament";
import Reveal from "../ui/Reveal";
import { WhatsAppIcon } from "../ui/Icons";
import styles from "./HowToBook.module.css";

const icons = {
  sparkles: Sparkles,
  calendar: CalendarDays,
  hourglass: Hourglass,
  wallet: Wallet,
  check: CircleCheck,
};

/**
 * Linha do tempo que se preenche com a rolagem: a linha dourada avança e cada
 * etapa "acende" quando a linha chega nela. Só calcula enquanto está na tela.
 */
function useTimeline(count) {
  const ref = useRef(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const list = ref.current;
    if (!list) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      if (reduced.matches) {
        list.style.setProperty("--fill", "1");
        setActive(count - 1);
        return;
      }
      const rect = list.getBoundingClientRect();
      const line = window.innerHeight * 0.62; // a "ponta" da linha acompanha este ponto da tela
      const fill = Math.max(0, Math.min(1, (line - rect.top) / rect.height));
      list.style.setProperty("--fill", fill.toFixed(3));
      const nodes = list.querySelectorAll("[data-node]");
      let last = -1;
      nodes.forEach((node, i) => {
        const r = node.getBoundingClientRect();
        if (r.top + r.height / 2 <= line) last = i;
      });
      setActive(last);
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) onScroll();
    });
    observer.observe(list);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  return [ref, active];
}

export default function HowToBook() {
  const { steps, card } = howToBook;
  const [listRef, active] = useTimeline(steps.length);

  return (
    <section
      id="como-agendar"
      className={`section theme-dark bg-onix ${styles.section}`}
      aria-labelledby="como-agendar-title"
    >
      <LuxeBackdrop tone="dark" monogram={false} />

      <div className="container">
        <header className={styles.header}>
          <BlurReveal
            id="como-agendar-title"
            text={howToBook.title}
            emphasis={howToBook.titleEmphasis}
            className={styles.title}
            emphasisClassName={styles.emphasis}
          />
          <Ornament />
          <Reveal as="p" className={styles.subtitle} delay={300}>
            {howToBook.subtitle}
          </Reveal>
        </header>

        <div className={styles.layout}>
          {/* Linha do tempo */}
          <div ref={listRef} className={styles.timeline}>
            <span className={styles.track} aria-hidden="true">
              <span className={styles.fill} />
            </span>
            <ol className={styles.steps}>
              {steps.map((step, i) => {
                const Icon = icons[step.icon] ?? Sparkles;
                const on = i <= active;
                return (
                  <li
                    key={step.title}
                    className={`${styles.step} ${on ? styles.on : ""}`}
                  >
                    <span className={styles.node} data-node aria-hidden="true">
                      <span className={styles.nodeNumber}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Check
                        size={16}
                        strokeWidth={2.5}
                        className={styles.nodeCheck}
                      />
                    </span>
                    <div className={styles.stepCard}>
                      <span className={styles.stepIcon} aria-hidden="true">
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                      <div className={styles.stepBody}>
                        <h3 className={styles.stepTitle}>
                          <span className="visually-hidden">
                            Etapa {i + 1}:{" "}
                          </span>
                          {step.title}
                        </h3>
                        <p className={styles.stepText}>{step.text}</p>
                        {step.link && (
                          <a href={step.link.href} className={styles.stepLink}>
                            {step.link.label}
                            <ArrowRight
                              size={15}
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Cartão de reserva */}
          <Reveal className={styles.cardWrap} delay={200}>
            <aside className={styles.card} aria-labelledby="reserva-title">
              <span className={styles.cardEyebrow}>
                <span className={styles.pulse} aria-hidden="true" />
                {card.eyebrow}
              </span>
              <h3 id="reserva-title" className={styles.cardTitle}>
                {card.title.replace(card.titleEmphasis, "")}
                <em>{card.titleEmphasis}</em>
              </h3>
              <p className={styles.cardText}>{card.text}</p>

              <div className={styles.options}>
                <a
                  className={`${styles.option} ${styles.optionPrimary}`}
                  href={contact.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.optionIcon} aria-hidden="true">
                    <CalendarDays size={22} strokeWidth={1.5} />
                  </span>
                  <span className={styles.optionText}>
                    <strong>{card.online.label}</strong>
                    <span>{card.online.hint}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={styles.optionArrow}
                  />
                  <span className="visually-hidden"> (abre em nova aba)</span>
                </a>

                <a
                  className={styles.option}
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.optionIcon} aria-hidden="true">
                    <WhatsAppIcon size={22} />
                  </span>
                  <span className={styles.optionText}>
                    <strong>{card.whatsapp.label}</strong>
                    <span>{card.whatsapp.hint}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={styles.optionArrow}
                  />
                  <span className="visually-hidden"> (abre em nova aba)</span>
                </a>
              </div>

              <ul className={styles.notes}>
                {card.notes.map((note) => (
                  <li key={note}>
                    <Check size={16} strokeWidth={2} aria-hidden="true" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
