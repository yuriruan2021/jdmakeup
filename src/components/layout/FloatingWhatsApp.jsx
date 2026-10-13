import { floatingCta } from '../../data/content';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { WhatsAppIcon } from '../ui/Icons';
import styles from './FloatingWhatsApp.module.css';

/** Atalho de agendamento sempre visível (mobile e tablet), fixo a 16 px do canto. */
export default function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label={`${floatingCta} pelo WhatsApp (abre em nova aba)`}
    >
      <WhatsAppIcon size={24} />
      <span className={styles.label}>{floatingCta}</span>
    </a>
  );
}
