import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CalendarDays, Menu, X } from 'lucide-react';
import { contact, nav, hero, finalCta } from '../../data/content';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { useScrolled } from '../../hooks/useScrolled';
import Button from '../ui/Button';
import LuxeBackdrop from '../ui/LuxeBackdrop';
import { InstagramIcon, WhatsAppIcon } from '../ui/Icons';
import Logo from './Logo';
import styles from './Header.module.css';

export default function Header() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  // Menu aberto: bloqueia o scroll, foca o primeiro link, fecha com Esc e mantém o foco no menu.
  useEffect(() => {
    if (!open) return undefined;

    const panel = panelRef.current;
    const toggle = toggleRef.current;
    const focusables = () => Array.from(panel.querySelectorAll('a[href], button:not([disabled])'));

    document.body.style.overflow = 'hidden';

    // Destaca no menu a seção que estava na tela quando ele foi aberto.
    const line = window.innerHeight * 0.35;
    let here = '';
    nav.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= line) here = item.id;
    });
    setCurrent(here);

    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = [toggle, ...focusables()];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // Fecha o menu se a tela crescer até o layout desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const onChange = (event) => event.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeAndRestoreFocus = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <header className={`theme-dark ${styles.header} ${scrolled || open ? styles.solid : ''} ${open ? styles.menuOpen : ''}`}>
      <div className={`container ${styles.bar}`}>
        <Logo onClick={close} />

        <nav className={styles.desktopNav} aria-label="Navegação principal">
          <ul className={styles.navList}>
            {nav.filter((item) => !item.mobileOnly).map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ul className={styles.social}>
            <li>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label={`Instagram ${contact.instagramHandle} (abre em nova aba)`}
              >
                <InstagramIcon size={20} />
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label={`WhatsApp ${contact.whatsappDisplay} (abre em nova aba)`}
              >
                <WhatsAppIcon size={20} />
              </a>
            </li>
          </ul>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => (open ? closeAndRestoreFocus() : setOpen(true))}
          >
            {open ? (
              <X size={24} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div id="menu-mobile" ref={panelRef} className={`${styles.panel} ${open ? styles.panelOpen : ''}`} hidden={!open}>
        <LuxeBackdrop tone="dark" monogram={false} />
        <span className={styles.panelMark} aria-hidden="true" />

        <nav aria-label="Menu" className={`container ${styles.panelInner}`}>
          <p className={styles.panelEyebrow}>
            <span className={styles.pulse} aria-hidden="true" />
            {finalCta.badge}
          </p>

          <ul className={styles.mobileList}>
            {nav.map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <a
                  href={`#${item.id}`}
                  className={styles.mobileLink}
                  aria-current={current === item.id ? 'location' : undefined}
                  onClick={close}
                >
                  <span className={styles.mobileNumber} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.mobileLabel}>{item.label}</span>
                  <ArrowUpRight size={18} strokeWidth={1.5} className={styles.mobileArrow} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.panelActions} style={{ '--i': nav.length }}>
            <Button
              href={contact.bookingUrl}
              external
              icon={<CalendarDays strokeWidth={1.5} aria-hidden="true" />}
              fullWidth
              onClick={close}
              aria-label={`${finalCta.online} (abre em nova aba)`}
            >
              {finalCta.online}
            </Button>
            <Button
              variant="secondary"
              tone="dark"
              href={buildWhatsAppUrl()}
              external
              icon={<WhatsAppIcon />}
              fullWidth
              onClick={close}
              aria-label={`${hero.primaryCta} (abre em nova aba)`}
            >
              {hero.primaryCta}
            </Button>
          </div>

          <div className={styles.panelContacts} style={{ '--i': nav.length + 1 }}>
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={16} />
              {contact.instagramHandle}
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={16} />
              {contact.whatsappDisplay}
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
