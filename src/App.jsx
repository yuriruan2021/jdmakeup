import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Differentials from './components/sections/Differentials';
import Services from './components/sections/Services';
import Combos from './components/sections/Combos';
import Portfolio from './components/sections/Portfolio';
import Testimonials from './components/sections/Testimonials';
import HowToBook from './components/sections/HowToBook';
import Faq from './components/sections/Faq';
import Location from './components/sections/Location';
import FinalCta from './components/sections/FinalCta';

export default function App() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <About />
        <Differentials />
        <Services />
        <Combos />
        <Portfolio />
        <Testimonials />
        <HowToBook />
        <Faq />
        <Location />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
