"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = 5;
const VH_PER_STEP = 120;
const SCALE_MIN = 0.55;
const SCALE_MAX = 1;

export default function HeroShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRef = useRef(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const progress = scrolled / total;
      const newStep = Math.min(STEPS - 1, Math.floor(progress * STEPS));
      if (newStep !== stepRef.current) {
        stepRef.current = newStep;
        setStep(newStep);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scale = SCALE_MIN + (step / (STEPS - 1)) * (SCALE_MAX - SCALE_MIN);

  return (
    <section
      ref={sectionRef}
      data-showcase
      className="relative w-full"
      style={{ height: `${STEPS * VH_PER_STEP}vh` }}
    >
      <div
        className="sticky top-0 flex items-center justify-center overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Mockup card — no clipping, rounds on all sides */}
        <div
          className="relative z-10 w-full max-w-[1100px] mx-auto px-6 sm:px-10"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            data-showcase-anim
            className="relative w-full rounded-2xl overflow-hidden aspect-video lg:aspect-auto lg:min-h-[680px]"
            style={{
              background: "#e8edf5",
              boxShadow: "0 0 80px rgba(25,100,209,0.25), 0 2px 40px rgba(0,0,0,0.3)",
            }}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/hero-showreel.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
