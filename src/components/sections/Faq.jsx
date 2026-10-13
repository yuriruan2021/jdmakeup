import { useState } from 'react';
import { ArrowRight, MessageCircleQuestion, Plus } from 'lucide-react';
import { faq } from '../../data/content';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import BlurReveal from '../ui/BlurReveal';
import Button from '../ui/Button';
import LuxeBackdrop from '../ui/LuxeBackdrop';
import Ornament from '../ui/Ornament';
import Reveal from '../ui/Reveal';
import { WhatsAppIcon } from '../ui/Icons';
import styles from './Faq.module.css';

function FaqItem({ item, index, open, onToggle }) {
  const buttonId = `faq-q-${index}`;
  const panelId = `faq-a-${index}`;

  return (
    <Reveal as="li" delay={index * 90} className={`${styles.item} ${open ? styles.open : ''}`}>
      <h3 className={styles.heading}>
        <button id={buttonId} type="button" className={styles.question} aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={styles.questionText}>{item.q}</span>
          <span className={styles.toggle} aria-hidden="true">
            <Plus size={18} strokeWidth={1.75} />
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel}>
        <div className={styles.panelInner}>
          <p className={styles.answer}>{item.a}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const { aside } = faq;

  return (
    <section id="faq" className={`section bg-nude ${styles.section}`} aria-labelledby="faq-title">
      <LuxeBackdrop monogram={false} />

      <div className="container">
        <header className={styles.header}>
          <BlurReveal id="faq-title" text={faq.title} emphasis={faq.titleEmphasis} className={styles.title} emphasisClassName={styles.emphasis} />
          <Ornament />
        </header>

        <div className={styles.layout}>
          <Reveal className={styles.asideWrap}>
            <aside className={styles.aside} aria-labelledby="faq-aside-title">
              <span className={styles.asideIcon} aria-hidden="true">
                <MessageCircleQuestion size={26} strokeWidth={1.5} />
              </span>
              <h3 id="faq-aside-title" className={styles.asideTitle}>
                {aside.title.replace(aside.titleEmphasis, '')}
                <em>{aside.titleEmphasis}</em>
              </h3>
              <p className={styles.asideText}>{aside.text}</p>
              <div className={styles.asideActions}>
                <Button href={buildWhatsAppUrl()} external icon={<WhatsAppIcon />} aria-label={`${aside.whatsapp} pelo WhatsApp (abre em nova aba)`}>
                  {aside.whatsapp}
                </Button>
                <a href="#portfolio-queridas-clientes" className={styles.asideLink}>
                  {aside.rules}
                  <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </aside>
          </Reveal>

          <ul className={styles.list}>
            {faq.items.map((item, i) => (
              <FaqItem key={item.q} item={item} index={i} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
