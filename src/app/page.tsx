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
          {/* HeroShowcase is a scroll-jacked, JS-measured pin section (5-step
              grow animation) — spacer sibling instead of padding, same
              reasoning as Work/Process/Portfolio below. */}
          <div className="section-gap-md-spacer" aria-hidden="true" />
          <Ticker />
          <Services />
          <Work />
          {/* Work is a scroll-jacked, JS-measured pin section — adding padding
              to it directly could throw off its scroll-distance math, so the
              uniform 80px desktop gap is added as an inert sibling instead. */}
          <div className="section-gap-md-spacer" aria-hidden="true" />
          <Evolve />
        </div>
        {/* ── Second macro-section: unified dark canvas ── */}
        <div style={{ background: "linear-gradient(180deg, #0c1e40 0%, #060f28 40%, #020a1c 100%)" }}>
          <About />
          <Process />
          {/* Same reasoning as Work above — Process's height drives its own
              scroll-jacked step animation via getBoundingClientRect(). */}
          <div className="section-gap-md-spacer" aria-hidden="true" />
          <Industries />
          <Testimonials />
          <Stats />
          <Portfolio />
          {/* Portfolio has a fixed pixel height with absolutely-positioned
              children keyed off it — same reasoning, spacer instead of padding. */}
          <div className="section-gap-md-spacer" aria-hidden="true" />
          <FAQ />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
