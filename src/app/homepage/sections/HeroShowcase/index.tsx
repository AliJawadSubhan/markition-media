export default function HeroShowcase() {
  return (
    <section
      className="relative w-full"
      style={{ background: "#000218" }}
    >
      {/* Blue radial glow — continues from Hero */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(25,100,209,0.4) 0%, transparent 65%)",
        }}
      />

      {/* Mockup card — no clipping, rounds on all sides */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10 pb-0">
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            background: "#e8edf5",
            minHeight: "380px",
            boxShadow: "0 0 80px rgba(25,100,209,0.25), 0 2px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* Crosshair placeholder — swap for real screenshot later */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
              style={{ borderTop: "1.5px dashed rgba(25, 100, 209, 0.3)" }}
            />
            <div className="relative z-10">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
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
