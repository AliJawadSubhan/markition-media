import Image from "next/image";

const LOGOS = [
  { src: "/logos/logo03.png", alt: "Partner logo" },
  { src: "/logos/logo07.png", alt: "Partner logo" },
  { src: "/logos/logo11.png", alt: "Partner logo" },
  { src: "/logos/vector.png", alt: "Partner logo" },
  { src: "/logos/vector-1.png", alt: "Partner logo" },
  { src: "/logos/vector-2.png", alt: "Partner logo" },
];

const items = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

export default function Ticker() {
  return (
    <section className="relative z-10 w-full section-gap-md">

      {/* Glass ticker strip */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "#0d2d6b",
          border: "1px solid #334155",
          boxShadow: "0px 20px 67.5px -16.2px #2B7FFF26",
          backdropFilter: "blur(32.4px)",
          WebkitBackdropFilter: "blur(32.4px)",
        }}
      >
        <div className="py-6 sm:py-8 overflow-hidden">
          <div className="ticker-track flex items-center w-max">
            {items.map((logo, i) => (
              <div
                key={i}
                className="flex items-center px-8 sm:px-12 lg:px-14 select-none flex-shrink-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={36}
                  className="h-6 sm:h-7 lg:h-8 w-auto object-contain brightness-0 invert opacity-70"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 z-10"
          style={{ background: "linear-gradient(to right, #0d2d6b 0%, rgba(13,45,107,0) 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 z-10"
          style={{ background: "linear-gradient(to left, #0d2d6b 0%, rgba(13,45,107,0) 100%)" }}
        />
      </div>

      {/* Trust divider */}
      <div className="py-5 px-6 sm:px-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.22)" }} />
          <div className="flex items-center gap-2 text-white text-[11px] sm:text-[13px] tracking-[0.18em] uppercase whitespace-nowrap">
            <span className="opacity-70">Join the 200+ companies trusting</span>
            <Image
              src="/markition-logo.svg"
              alt="Markition"
              width={90}
              height={22}
              className="h-[16px] sm:h-[20px] w-auto brightness-0 invert opacity-70"
            />
          </div>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.22)" }} />
        </div>
      </div>

    </section>
  );
}
