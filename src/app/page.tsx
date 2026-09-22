import Hero from "./homepage/sections/Hero";
import HeroShowcase from "./homepage/sections/HeroShowcase";
import Ticker from "./homepage/sections/Ticker";
import Services from "./homepage/sections/Services";
import Evolve from "./homepage/sections/Evolve";
import Work from "./homepage/sections/Work";
import About from "./homepage/sections/About";
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
        <div style={{ background: "linear-gradient(180deg, #000218 4%, #1964D1 55%, #0A1A5C 72%, #000028 82%, #F5F5F7 97%)" }}>
          <Hero />
          <HeroShowcase />
          <Ticker />
          <Services />
          <Evolve />
        </div>
        <Work />
        <About />
        <Industries />
        <Testimonials />
        <Stats />
        <Portfolio />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
