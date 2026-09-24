"use client";

import "./HeroBg.css";
// import GhostFibers from "./GhostFibers";

const PARTICLES = [
  { left: "1%",  top: "38%", duration: "4s" },
  { left: "10%", top: "64%", duration: "6s" },
  { left: "19%", top: "27%", duration: "5s" },
  { left: "31%", top: "15%", duration: "7s" },
  { left: "46%", top: "26%", duration: "5s" },
  { left: "58%", top: "18%", duration: "6s" },
  { left: "72%", top: "31%", duration: "4s" },
  { left: "84%", top: "42%", duration: "6s" },
  { left: "95%", top: "29%", duration: "5s" },
  { left: "12%", top: "82%", duration: "7s" },
  { left: "67%", top: "76%", duration: "5s" },
  { left: "89%", top: "69%", duration: "6s" },
];

export default function Hero() {
  return (
    <section
      data-hero
      className="relative w-full"
      style={{ overflowX: "clip" }}
    >
      {/* ── Animated background ── */}
      <div aria-hidden="true" className="hero-bg-container pointer-events-none absolute left-0 right-0 top-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="hero-atmosphere" />
        <div className="hero-wave-left-top" />
        <div className="hero-wave-left-bottom" />
        <div className="hero-wave-right" />
        <div className="hero-blue-haze hero-blue-haze--left" />
        <div className="hero-blue-haze hero-blue-haze--right" />
        <div className="absolute inset-0">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="hero-particle"
              style={{ left: p.left, top: p.top, ["--duration" as string]: p.duration }}
            />
          ))}
        </div>
        <div className="hero-texture" />
      </div>

      <div
        className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 pb-6 sm:pb-8"
        style={{ paddingTop: "clamp(72px, 12vh, 220px)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-12 lg:gap-20">

          <h1
            data-hero-anim
            className="text-white flex-1"
            style={{
              fontFamily: "var(--font-familjen, 'Familjen Grotesk', sans-serif)",
              fontWeight: 400,
              fontSize: "clamp(36px, 4.2vw, 58px)",
              lineHeight: "clamp(34px, 3.9vw, 54px)",
              letterSpacing: "clamp(-1.5px, -0.22vw, -3px)",
              textTransform: "capitalize",
            }}
          >
            Digital Marketing That<br />Turns Attention Into<br />
            <span style={{ color: "#00D4FF" }}>Measurable Growth</span>
          </h1>

          <div className="max-w-[420px] flex flex-col items-start pb-1">
            <p
              data-hero-anim
              className="text-white/70 text-[13.5px] sm:text-[14px] leading-[1.8] mb-6"
              style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
            >
              Build a stronger digital presence with strategy, creative and
              performance marketing designed to attract the right audience,
              generate qualified opportunities and grow your business.
            </p>
            <a
              data-hero-anim
              href="#contact"
              className="inline-flex items-center gap-2 text-white text-[13.5px] font-semibold px-6 py-2.5 rounded-[6px] transition-opacity hover:opacity-90"
              style={{ background: "#0137D7" }}
            >
              Start A Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
