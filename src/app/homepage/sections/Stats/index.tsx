const STATS = [
  {
    number: "12 years",
    description: "We've built one of the most trusted agencies",
  },
  {
    number: "150+",
    description: "Specialists in design, engineering & product management",
  },
  {
    number: "78%",
    description: "Returning clients in Europe & North America",
  },
];

export default function Stats() {
  return (
    <section style={{ padding: "0 clamp(24px, 5vw, 80px)" }}>
      {/* Top rule + label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          paddingTop: 72,
          marginBottom: 48,
        }}
      >
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.25)" }} />
        <span
          style={{
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
            fontStyle: "italic",
            fontSize: 15,
            color: "rgba(255,255,255,0.7)",
            whiteSpace: "nowrap",
          }}
        >
          Success breeds success
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.25)" }} />
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(24px, 4vw, 60px)",
          textAlign: "center",
          maxWidth: 1100,
          marginInline: "auto",
        }}
      >
        {STATS.map((s, i) => (
          <div key={i}>
            <p
              style={{
                margin: "0 0 16px",
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
                fontStyle: "italic",
                fontSize: 75,
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: "90px",
                letterSpacing: "-1.5px",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              {s.number}
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
                maxWidth: 260,
                marginInline: "auto",
              }}
            >
              {s.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom rule */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.25)",
          marginTop: 56,
        }}
      />
    </section>
  );
}
