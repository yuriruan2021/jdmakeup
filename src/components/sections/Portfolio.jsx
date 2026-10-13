import { portfolio } from '../../data/content';
import BlurReveal from '../ui/BlurReveal';
import LuxeBackdrop from '../ui/LuxeBackdrop';
import Ornament from '../ui/Ornament';
import Lookbook from './portfolio/Lookbook';
import PortfolioBook from './portfolio/PortfolioBook';
import styles from './Portfolio.module.css';

/**
 * Portfólio digital: "Criações em destaque" (galeria) + o portfólio completo
 * em páginas que viram (serviços, valores, combos, pagamento, preparação e regras).
 */
export default function Portfolio() {
  return (
    <section id="portfolio" className={`section bg-creme ${styles.section}`} aria-labelledby="portfolio-title">
      <LuxeBackdrop monogram={false} />

      <div className="container">
        <header className={styles.header}>
          <BlurReveal
            id="portfolio-title"
            text={portfolio.title}
            emphasis={portfolio.titleEmphasis}
            className={styles.title}
            emphasisClassName={styles.emphasis}
          />
          <Ornament />
        </header>

        <PortfolioBook />
        <Lookbook />
      </div>
    </section>
  );
}
