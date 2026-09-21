"use client";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000218 4%, #1964D1 74.52%, #F5F5F7 87.5%)",
      }}
    >
      {/* ── Top: two-column text block ───────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-20 sm:pt-28 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-start">

          {/* Left — heading */}
          <div className="lg:pr-12">
            <h1
              className="text-[38px] sm:text-[52px] lg:text-[58px] font-bold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)" }}
            >
              Digital Marketing That
              <br />
              Turns Attention Into
              <br />
              <span style={{ color: "#00D4FF" }}>Measurable Growth</span>
            </h1>
          </div>

          {/* Dashed vertical divider (desktop only) */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-20 h-48 w-px"
            style={{
              borderLeft: "1.5px dashed rgba(0, 212, 255, 0.55)",
            }}
          />

          {/* Right — description + CTA */}
          <div className="lg:pl-12 flex flex-col justify-start pt-2 lg:pt-3">
            <p
              className="text-white/70 text-[14px] sm:text-[15px] leading-[1.8] mb-7 max-w-[420px]"
              style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
            >
              Build a stronger digital presence with strategy, creative and
              performance marketing designed to attract the right audience,
              generate qualified opportunities and grow your business.
            </p>
            <div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-white text-[13.5px] font-semibold px-6 py-2.5 rounded-[6px] transition-opacity hover:opacity-90"
                style={{ background: "#0137D7" }}
              >
                Start A Project <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: mockup card ──────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 pb-0 relative">
        <div
          className="relative w-full rounded-t-2xl overflow-hidden"
          style={{
            background: "#ffffff",
            minHeight: "340px",
            boxShadow: "0 -4px 60px rgba(0,0,0,0.18)",
          }}
        >
          {/* Inner crosshair / star placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Horizontal dashed line */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
              style={{
                borderTop: "1.5px dashed rgba(25, 100, 209, 0.35)",
              }}
            />

            {/* Star / asterisk icon */}
            <div className="relative z-10 flex items-center justify-center w-10 h-10">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
