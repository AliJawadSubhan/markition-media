import Hero from "./homepage/sections/Hero";
import HeroShowcase from "./homepage/sections/HeroShowcase";
import Ticker from "./homepage/sections/Ticker";
import Services from "./homepage/sections/Services";
import Evolve from "./homepage/sections/Evolve";
import Work from "./homepage/sections/Work";
import About from "./homepage/sections/About";
import Process from "./homepage/sections/Process";
import Industries from "./homepage/sections/Industries";
import Testimonials from "./homepage/sections/Testimonials";
import Stats from "./homepage/sections/Stats";
import Portfolio from "./homepage/sections/Portfolio";
import FAQ from "./homepage/sections/FAQ";
import Contact from "./homepage/sections/Contact";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        {/* ── First macro-section: one unified gradient ── */}
        <div style={{ background: "linear-gradient(180deg, #010c28 4%, #1964D1 55%, #0d2258 72%, #06163a 82%, #0c1e40 97%)" }}>
          <Hero />
          <HeroShowcase />
          <Ticker />
          <Services />
          <Evolve />
          <Work />
        </div>
        {/* ── Second macro-section: unified dark canvas ── */}
        <div style={{ background: "linear-gradient(180deg, #0c1e40 0%, #060f28 40%, #020a1c 100%)" }}>
          <About />
          <Process />
          <Industries />
          <Testimonials />
          <Stats />
          <Portfolio />
          <FAQ />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
