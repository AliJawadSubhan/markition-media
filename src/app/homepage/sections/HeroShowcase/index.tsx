"use client";

import { useEffect, useRef } from "react";

const STEPS = 5;
const VH_PER_STEP = 40;
const SCALE_MIN = 0.55;
const SCALE_MAX = 1;

export default function HeroShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const scaleElRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    const scaleEl = scaleElRef.current;
    if (!el || !scaleEl) return;

    // Measure once — avoid getBoundingClientRect on every scroll (forces reflow)
    let sectionTop = el.getBoundingClientRect().top + window.scrollY;
    let total = el.offsetHeight - window.innerHeight;
    let rafId = 0;

    function applyScale() {
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, window.scrollY - sectionTop));
      const progress = scrolled / total;
      progressRef.current = progress;
      scaleEl.style.transform = `scale(${SCALE_MIN + progress * (SCALE_MAX - SCALE_MIN)})`;
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(applyScale);
    }

    function onResize() {
      sectionTop = el.getBoundingClientRect().top + window.scrollY;
      total = el.offsetHeight - window.innerHeight;
      applyScale();
    }

    applyScale();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Mobile scroll lock — e.preventDefault in touchmove already kills momentum,
  // so no scrollTo snap is needed (that was the visible flicker source)
  useEffect(() => {
    if (window.innerWidth >= 640) return;

    function onTouchMove(e: TouchEvent) {
      if (progressRef.current >= 0.99) return;
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      // Only lock while section is in sticky zone
      if (top > 0 || top < -(el.offsetHeight - window.innerHeight)) return;
      e.preventDefault();
    }

    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => window.removeEventListener("touchmove", onTouchMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-showcase
      className="relative w-full"
      style={{ height: `${STEPS * VH_PER_STEP}vh`, marginTop: "-120px" }}
    >
      <div
        className="sticky top-0 flex items-start justify-center overflow-hidden"
        style={{ height: "100vh", paddingTop: "clamp(56px, 8vh, 100px)" }}
      >
        {/* Ambient glow — isolated layer so blur doesn't repaint the video */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 mx-auto w-full max-w-[1100px] px-6 sm:px-10"
          style={{ top: "clamp(56px, 8vh, 100px)", bottom: 0, zIndex: 0, transform: "translateZ(0)" }}
        >
          <div className="h-full w-full" style={{
            background: "radial-gradient(ellipse at 50% 30%, rgba(25,100,209,0.45) 0%, transparent 65%)",
            filter: "blur(45px)",
          }} />
        </div>

        <div
          ref={scaleElRef}
          className="relative z-10 w-full max-w-[1100px] mx-auto px-6 sm:px-10"
          style={{
            transform: `scale(${SCALE_MIN})`,
            transformOrigin: "center center",
            willChange: "transform",
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
