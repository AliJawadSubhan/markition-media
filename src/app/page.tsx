import Hero from "./homepage/sections/Hero";
import Services from "./homepage/sections/Services";
import Work from "./homepage/sections/Work";
import About from "./homepage/sections/About";
import Testimonials from "./homepage/sections/Testimonials";
import Contact from "./homepage/sections/Contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Work />
      <About />
      <Testimonials />
      <Contact />
    </main>
  );
}
