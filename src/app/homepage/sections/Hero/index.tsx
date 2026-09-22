"use client";

export default function Hero() {
  return (
    <section className="relative w-full">

      {/* Two-column text content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-14 sm:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">

          {/* Left — heading */}
          <div className="flex-1">
            <h1
              className="text-white"
              style={{
                fontFamily: "var(--font-familjen, 'Familjen Grotesk', sans-serif)",
                fontWeight: 400,
                fontSize: "clamp(32px, 4vw, 52px)",
                lineHeight: "clamp(29px, 3.6vw, 47px)",
                letterSpacing: "clamp(-1.5px, -0.22vw, -3px)",
                textTransform: "capitalize",
              }}
            >
              Digital Marketing That
              <br />
              Turns Attention Into
              <br />
              <span style={{ color: "#00D4FF" }}>Measurable Growth</span>
            </h1>
          </div>

          {/* Right — description + CTA */}
          <div className="lg:w-[360px] xl:w-[400px] flex-shrink-0 flex flex-col">
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
