const CARDS = [
  { title: "SEO",        sub: "Search visibility" },
  { title: "Paid Media", sub: "Performance campaigns" },
  { title: "Social",     sub: "Audience engagement" },
  { title: "Content",    sub: "Meaningful communication" },
];

export default function Services() {
  return (
    <section
      className="w-full px-6 sm:px-10 py-20 sm:py-28"
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Heading block */}
        <div className="text-center max-w-[700px] mx-auto mb-14 sm:mb-18">
          <h2
            className="text-white font-bold mb-5 leading-[1.1]"
            style={{
              fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              fontSize: "clamp(28px, 3.8vw, 52px)",
              letterSpacing: "-0.03em",
            }}
          >
            Your{" "}
            <span style={{ color: "#00D4FF" }}>Digital Marketing</span>{" "}
            Should<br />Work As One System.
          </h2>

          <p className="text-white/50 text-[14px] sm:text-[15px] leading-[1.75] mb-4">
            Your digital marketing should work as one system.
          </p>

          <p
            className="text-[14px] sm:text-[15px] leading-[1.75] mb-5"
            style={{ color: "#00D4FF" }}
          >
            Markition brings strategy, creative execution and performance marketing
            together to create a clearer path from attention to action.
          </p>

          <p className="text-white/30 text-[12px] sm:text-[13px] leading-[1.7]">
            From organic search and paid campaigns to social content and
            conversion-focused experiences, we connect the channels that matter
            to your customers.
          </p>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center justify-center rounded-2xl px-6 py-6 sm:px-8 sm:py-8 cursor-pointer group transition-shadow duration-200"
              style={{
                gap: 0,
                background: "#ffffff",
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
              }}
            >
              <span
                className="text-[#000028] block leading-none group-hover:text-[#1964D1] transition-colors"
                style={{
                  fontFamily: "var(--font-instrument, 'Instrument Serif', serif)",
                  fontSize: "clamp(32px, 3.8vw, 52px)",
                  fontWeight: 400,
                }}
              >
                {card.title}
              </span>
              <span className="text-[#000028]/50 text-[12px] sm:text-[13px] font-medium tracking-wide text-center">
                {card.sub}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
