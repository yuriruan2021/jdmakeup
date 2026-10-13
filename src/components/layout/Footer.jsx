import { ArrowUp, ArrowUpRight, CalendarClock, CalendarDays, MapPin, Navigation, Star } from 'lucide-react';
import { contact, footer, nav } from '../../data/content';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { InstagramIcon, WhatsAppIcon } from '../ui/Icons';
import Logo from './Logo';
import styles from './Footer.module.css';

const external = { target: '_blank', rel: 'noopener noreferrer' };
const newTab = <span className="visually-hidden"> (abre em nova aba)</span>;

export default function Footer() {
  const contacts = [
    { href: buildWhatsAppUrl(), icon: <WhatsAppIcon size={18} />, label: footer.whatsappLabel, value: contact.whatsappDisplay },
    { href: contact.instagramUrl, icon: <InstagramIcon size={18} />, label: footer.instagramLabel, value: contact.instagramHandle },
    { href: contact.bookingUrl, icon: <CalendarDays size={18} strokeWidth={1.5} aria-hidden="true" />, label: footer.bookingLabel },
    { href: contact.googleReviewUrl, icon: <Star size={18} strokeWidth={1.5} aria-hidden="true" />, label: footer.reviewLabel },
  ];

  return (
    <footer className={`theme-dark ${styles.footer}`}>
      <span className={styles.topLine} aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo variant="stacked" />
          <p className={styles.tagline}>{footer.tagline}</p>
          <div className={styles.socials}>
            <a href={contact.instagramUrl} {...external} className={styles.social} aria-label={`Instagram ${contact.instagramHandle} (abre em nova aba)`}>
              <InstagramIcon size={20} />
            </a>
            <a href={buildWhatsAppUrl()} {...external} className={styles.social} aria-label={`WhatsApp ${contact.whatsappDisplay} (abre em nova aba)`}>
              <WhatsAppIcon size={20} />
            </a>
          </div>
        </div>

        <nav className={styles.col} aria-labelledby="rodape-nav">
          <h2 id="rodape-nav" className={styles.colTitle}>
            {footer.navTitle}
          </h2>
          <ul className={styles.links}>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{footer.contactTitle}</h2>
          <ul className={styles.links}>
            {contacts.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...external} className={styles.contact}>
                  <span className={styles.contactIcon}>{c.icon}</span>
                  <span className={styles.contactText}>
                    {c.value ? <small>{c.label}</small> : c.label}
                    {c.value && <span>{c.value}</span>}
                  </span>
                  <ArrowUpRight size={14} strokeWidth={1.5} className={styles.arrow} aria-hidden="true" />
                  {newTab}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{footer.studioTitle}</h2>
          <address className={styles.studio}>
            <p className={styles.studioRow}>
              <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
              <span>{footer.place}</span>
            </p>
            <p className={styles.studioRow}>
              <CalendarClock size={18} strokeWidth={1.5} aria-hidden="true" />
              <span>{footer.hours}</span>
            </p>
          </address>
          <a href={contact.directionsUrl} {...external} className={styles.directions}>
            <Navigation size={16} strokeWidth={1.5} aria-hidden="true" />
            {footer.directions}
            {newTab}
          </a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>{footer.copyright}</p>
        <a href="#inicio" className={styles.toTop}>
          {footer.backToTop}
          <span className={styles.toTopIcon}>
            <ArrowUp size={16} strokeWidth={1.5} aria-hidden="true" />
          </span>
        </a>
      </div>
    </footer>
  );
}
