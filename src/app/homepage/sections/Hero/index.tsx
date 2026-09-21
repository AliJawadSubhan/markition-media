"use client";

export default function Hero() {
  return (
    <section
      className="relative w-full"
      style={{
        background: "#000218",
      }}
    >
      {/* Blue radial glow centered at bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, #1964D1 0%, rgba(25,100,209,0.35) 40%, transparent 70%)",
        }}
      />

      {/* Two-column text content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 pt-14 sm:pt-20 pb-14 sm:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-16">

          {/* Left — heading */}
          <div className="flex-1">
            <h1
              className="text-[40px] sm:text-[56px] lg:text-[64px] xl:text-[72px] font-bold leading-[1.0] tracking-[-0.03em] text-white"
              style={{ fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)" }}
            >
              Digital Marketing That
              <br />
              Turns Attention Into
              <br />
              <span style={{ color: "#00D4FF" }}>Measurable Growth</span>
            </h1>
          </div>

          {/* Right — description + CTA */}
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
              Start A Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
