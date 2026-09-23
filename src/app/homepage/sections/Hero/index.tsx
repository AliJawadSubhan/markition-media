"use client";

export default function Hero() {
  return (
    <section data-hero className="relative w-full">

      {/* Centered text content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 pb-14 sm:pb-20" style={{ paddingTop: "clamp(120px, 18vh, 260px)" }}>
        <div className="flex flex-col items-center text-center gap-8">

          {/* Heading */}
          <h1
            data-hero-anim
            className="text-white"
            style={{
              fontFamily: "var(--font-familjen, 'Familjen Grotesk', sans-serif)",
              fontWeight: 400,
              fontSize: "clamp(36px, 4.5vw, 58px)",
              lineHeight: "clamp(33px, 4.1vw, 53px)",
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

          {/* Description + CTA */}
          <div className="max-w-[500px] flex flex-col items-center">
            <p
              data-hero-anim
              className="text-white/70 text-[14px] sm:text-[15px] leading-[1.8] mb-7"
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
