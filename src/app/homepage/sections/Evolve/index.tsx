const CARDS = [
  {
    statement: "Your audience is searching.",
    caveat: "But your brand isn't always there.",
  },
  {
    statement: "Your campaigns are running.",
    caveat: "But performance isn't consistent.",
  },
  {
    statement: "You're creating content.",
    caveat: "But it's not always creating action.",
  },
  {
    statement: "You're getting traffic.",
    caveat: "But too much of it stops before conversion.",
  },
];

export default function Evolve() {
  return (
    <section
      className="w-full px-6 sm:px-10 pt-10 pb-16 sm:pb-20"
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Heading */}
        <h2
          className="text-white text-center mb-10 sm:mb-12"
          style={{
            fontFamily: "var(--font-familjen, 'Familjen Grotesk', sans-serif)",
            fontSize: "clamp(26px, 3.6vw, 50px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          When Digital Marketing Needs To Evolve
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14">
          {CARDS.map((card) => (
            <div
              key={card.statement}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#ffffff" }}
            >
              {/* Dark image placeholder */}
              <div className="px-4 pt-4 sm:px-5 sm:pt-5">
                <div
                  className="w-full rounded-xl"
                  style={{ background: "#0A1535", aspectRatio: "1 / 0.85" }}
                />
              </div>

              {/* Text */}
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <p
                  className="text-[#000028] font-semibold leading-snug mb-1"
                  style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
                >
                  {card.statement}
                </p>
                <p
                  className="text-[#000028]/45 leading-snug"
                  style={{ fontSize: "clamp(11px, 0.9vw, 12.5px)" }}
                >
                  {card.caveat}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer text */}
        <p
          className="text-white/70 text-center max-w-[620px] mx-auto leading-[1.75]"
          style={{ fontSize: "clamp(13px, 1.1vw, 15px)" }}
        >
          Digital growth isn&apos;t about doing more marketing. It&apos;s about making every
          part of your marketing work harder together.
        </p>

      </div>
    </section>
  );
}
