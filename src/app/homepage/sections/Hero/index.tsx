"use client";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "#000218",
      }}
    >
      {/* Blue radial glow — concentrated at bottom center, dark edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, #1964D1 0%, rgba(25,100,209,0.35) 40%, transparent 70%)",
        }}
      />
      {/* ── Two-column text block ────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-14 sm:pt-20 pb-14 sm:pb-18">
        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-16">

          {/* Left — heading */}
          <div className="flex-1">
            <h1
              className="text-[42px] sm:text-[56px] lg:text-[64px] xl:text-[72px] font-bold leading-[1.0] tracking-[-0.03em] text-white"
              style={{ fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)" }}
            >
              Digital Marketing That
              <br />
              Turns Attention Into
              <br />
              <span style={{ color: "#00D4FF" }}>Measurable Growth</span>
            </h1>
          </div>

          {/* Right — description + CTA, pushed to the right edge */}
          <div className="lg:w-[360px] xl:w-[400px] flex-shrink-0 flex flex-col justify-end pb-1">
            <p
              className="text-white/70 text-[14px] sm:text-[15px] leading-[1.8] mb-7"
              style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
            >
              Build a stronger digital presence with strategy, creative and
              performance marketing designed to attract the right audience,
              generate qualified opportunities and grow your business.
            </p>
            <a
              href="#contact"
              className="self-start inline-flex items-center gap-2 text-white text-[13.5px] font-semibold px-6 py-2.5 rounded-[6px] transition-opacity hover:opacity-90"
              style={{ background: "#0137D7" }}
            >
              Start A Project <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Mockup card ─────────────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 pb-0">
        <div
          className="relative w-full rounded-t-2xl overflow-hidden"
          style={{
            background: "#ffffff",
            minHeight: "340px",
            boxShadow: "0 -4px 60px rgba(0,0,0,0.18)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
              style={{ borderTop: "1.5px dashed rgba(25, 100, 209, 0.35)" }}
            />
            <div className="relative z-10">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="2" x2="18" y2="34" stroke="#1964D1" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="2" y1="18" x2="34" y2="18" stroke="#1964D1" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="6.5" y1="6.5" x2="29.5" y2="29.5" stroke="#1964D1" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="29.5" y1="6.5" x2="6.5" y2="29.5" stroke="#1964D1" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
