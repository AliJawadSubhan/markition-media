import Hero from "./homepage/sections/Hero";
import Services from "./homepage/sections/Services";
import Work from "./homepage/sections/Work";
import About from "./homepage/sections/About";
import Industries from "./homepage/sections/Industries";
import Testimonials from "./homepage/sections/Testimonials";
import Portfolio from "./homepage/sections/Portfolio";
import FAQ from "./homepage/sections/FAQ";
import Stats from "./homepage/sections/Stats";
import Contact from "./homepage/sections/Contact";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <Work />
        <About />
        <Industries />
        <Testimonials />
        <Stats />
        <FAQ />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
