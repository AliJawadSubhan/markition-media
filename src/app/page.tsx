import Hero from "./homepage/sections/Hero";
import HeroShowcase from "./homepage/sections/HeroShowcase";
import Services from "./homepage/sections/Services";
import Work from "./homepage/sections/Work";
import About from "./homepage/sections/About";
import Testimonials from "./homepage/sections/Testimonials";
import Contact from "./homepage/sections/Contact";

export default function HomePage() {
  return (
    <main>
      {/* 1 */}
      <Hero />
      {/* 2 */}
      <HeroShowcase />
      {/* 3 */}
      <Services />
      {/* 4 */}
      <Work />
      {/* 5 */}
      <About />
      {/* 6 */}
      <Testimonials />
      {/* 7 */}
      <Contact />
    </main>
  );
}
