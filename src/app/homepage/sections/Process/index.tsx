"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: 1,
    tab: "Discovery",            // short label used in nav pill
    label: "Discovery & alignment", // full title used on card
    image: "/process/branding-process-01.avif",
    description:
      "We begin by understanding your business, audience, market, and current brand. Together, we align on goals, priorities, stakeholders, and success criteria.",
    duration: "1–2 Weeks",
    deliverable: "Research and strategic brief",
  },
  {
    num: 2,
    tab: "Brand strategy",
    label: "Brand strategy",
    image: "/process/branding-process-02.avif",
    description:
      "We translate strategy into creative territories, exploring ideas, visual principles, and references that shape the brand and define its future direction.",
    duration: "2–4 Weeks",
    deliverable: "Brand strategy & messaging",
  },
  {
    num: 3,
    tab: "Creative direction",
    label: "Creative direction",
    image: "/process/branding-process-03.avif",
    description:
      "We turn the selected direction into a clear visual concept, defining the mood, principles, and elements that guide the brand across future touchpoints.",
    duration: "1–2 Weeks",
    deliverable: "Selected creative direction",
  },
  {
    num: 4,
    tab: "Identity system",
    label: "Identity system",
    image: "/process/branding-process-04.avif",
    description:
      "We develop the chosen direction into a complete identity, including logo, typography, color, imagery, and graphic language that work as one clear system.",
    duration: "3–5 Weeks",
    deliverable: "Visual and verbal identity system",
  },
  {
    num: 5,
    tab: "Guidelines & handoff",
    label: "Guidelines & handoff",
    image: "/process/branding-process-05.avif",
    description:
      "We finalize the identity, document how it should be used, and prepare approved assets your team can apply consistently across key brand touchpoints.",
    duration: "1–2 Weeks",
    deliverable: "Brand guidelines & assets",
  },
];

const BAR_HEIGHTS = [52, 80, 112, 148, 188, 234, 286, 348];
const BAR_W       = 3;
const BAR_GAP     = 14;
const LEFT_BARS   = [28, 40, 55, 72, 92, 116];
const NAV_H       = 56;

// Each step has 3 scroll phases: card show → dot 1 fills → dot 2 fills → next step
// Total phases = STEPS.length + (STEPS.length - 1) * 2
const TOTAL_PHASES = STEPS.length + (STEPS.length - 1) * 2; // 13

export default function Process() {
  const sectionRef                      = useRef<HTMLDivElement>(null);
  const stepRef                         = useRef(0);
  const dotPhaseRef                     = useRef(0);
  const [step, setStep]                 = useState(0);
  const [dotPhase, setDotPhase]         = useState(0); // 0, 1, or 2 dots lit for current gap
  const [cardVisible, setCardVisible]   = useState(true);

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const rect     = el.getBoundingClientRect();
      const total    = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(total, -rect.top));

      const rawPhase   = (scrolled / total) * TOTAL_PHASES;
      const phaseIndex = Math.min(TOTAL_PHASES - 1, Math.floor(rawPhase));

      const newStep     = Math.min(STEPS.length - 1, Math.floor(phaseIndex / 3));
      const newDotPhase = phaseIndex - newStep * 3;

      if (newStep !== stepRef.current) {
        // Card changes — animate transition
        stepRef.current     = newStep;
        dotPhaseRef.current = newDotPhase;
        setCardVisible(false);
        setTimeout(() => {
          setStep(newStep);
          setDotPhase(newDotPhase);
          setCardVisible(true);
        }, 150);
      } else if (newDotPhase !== dotPhaseRef.current) {
        // Only dots change — no card animation
        dotPhaseRef.current = newDotPhase;
        setDotPhase(newDotPhase);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // How many dots are lit for the gap after step[gapIndex]
  function dotsLitForGap(gapIndex: number): number {
    if (step > gapIndex) return 2;        // past this gap — fully lit
    if (step === gapIndex) return dotPhase; // currently filling this gap
    return 0;                              // haven't reached this gap yet
  }

  // Each of the 8 bars maps to one of the 8 dot-fills (4 gaps × 2 dots)
  // so bars and dots advance in perfect sync
  const barsLit    = step * 2 + dotPhase;
  const isLastStep = step === STEPS.length - 1;
  const s          = STEPS[step];

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ height: `${TOTAL_PHASES * 100 + 100}vh`, position: "relative" }}
    >
      {/* ── Sticky frame ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
          paddingBottom: NAV_H,
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            textAlign: "center",
            paddingTop: "clamp(28px,4vh,48px)",
            marginBottom: "clamp(16px,2.5vh,28px)",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              margin: "0 0 6px",
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(13px,1.1vw,16px)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.03em",
            }}
          >
            Our process
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(30px,4vw,58px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1.06,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            How we build your brand
          </h2>
        </div>

        {/* ── Card + side bars row ── */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(16px,2.5vw,36px)",
            padding: "0 clamp(16px,4vw,60px)",
            boxSizing: "border-box",
          }}
        >
          {/* ── Left decorative bars ── */}
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: BAR_GAP,
              flexShrink: 0,
              alignSelf: "flex-end",
              paddingBottom: 8,
              flexDirection: "row-reverse",
            }}
          >
            {LEFT_BARS.map((h, i) => (
              <div
                key={i}
                style={{
                  width: BAR_W,
                  height: h,
                  flexShrink: 0,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.13)",
                }}
              />
            ))}
          </div>

          {/* ── Card ── */}
          <div
            key={step}
            style={{
              width: "clamp(320px,52vw,660px)",
              borderRadius: 20,
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 24px 72px rgba(0,0,20,0.6)",
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}
          >
            {/* ── Top zone: gradient + 3D model ── */}
            <div
              style={{
                position: "relative",
                height: "clamp(240px,32vh,340px)",
                background:
                  "linear-gradient(175deg, #b6cbde 0%, #c8daec 25%, #dce8f3 55%, #ecf3f9 75%, #f5f8fc 100%)",
                overflow: "hidden",
              }}
            >
              {/* Step number badge */}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 18,
                  zIndex: 2,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0a1433",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  flexShrink: 0,
                }}
              >
                {s.num}
              </div>

              {/* 3D model — right side, vertically centered */}
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "68%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingRight: "3%",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.label}
                  style={{
                    maxHeight: "94%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            </div>

            {/* ── Bottom zone: text content ── */}
            <div
              style={{
                background: "#ffffff",
                padding: "clamp(16px,2vh,22px) clamp(18px,2.5vw,26px) clamp(18px,2vh,24px)",
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              {/* Left: title + description */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: "clamp(16px,1.5vw,20px)",
                    fontWeight: 700,
                    color: "#0a1433",
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    letterSpacing: "-0.3px",
                    lineHeight: 1.2,
                  }}
                >
                  {s.label}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(12px,0.95vw,13.5px)",
                    color: "rgba(10,20,51,0.58)",
                    lineHeight: 1.65,
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  }}
                >
                  {s.description}
                </p>
              </div>

              {/* Right: duration + deliverable */}
              <div
                style={{
                  flexShrink: 0,
                  textAlign: "right",
                  minWidth: "clamp(90px,9vw,120px)",
                  alignSelf: "flex-end",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(12px,0.95vw,13.5px)",
                    fontWeight: 600,
                    color: "#0a1433",
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  }}
                >
                  {s.duration}
                </div>
                <div
                  style={{
                    fontSize: "clamp(11px,0.85vw,12px)",
                    color: "rgba(10,20,51,0.48)",
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    marginTop: 2,
                    lineHeight: 1.4,
                  }}
                >
                  {s.deliverable}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right animated bars ── */}
          <div
            aria-hidden="true"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              gap: BAR_GAP,
              flexShrink: 0,
              alignSelf: "flex-end",
              paddingBottom: 8,
              paddingTop: 28,
            }}
          >
            {/* Cursor dot — slides to the top of the last lit bar */}
            <div
              style={{
                position: "absolute",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#ffffff",
                boxShadow: "0 0 10px 3px rgba(255,255,255,0.45)",
                bottom: barsLit > 0
                  ? 8 + BAR_HEIGHTS[barsLit - 1] + 10
                  : 8,
                left: barsLit > 0
                  ? (barsLit - 1) * (BAR_W + BAR_GAP) - 2.5
                  : -2.5,
                opacity: barsLit > 0 ? 1 : 0,
                transition: "bottom 0.45s ease, left 0.45s ease, opacity 0.3s ease",
                pointerEvents: "none",
              }}
            />

            {BAR_HEIGHTS.map((h, i) => {
              const isLast   = i === BAR_HEIGHTS.length - 1;
              const isActive = i < barsLit;
              return (
                <div
                  key={i}
                  style={{ position: "relative", width: BAR_W, height: h, flexShrink: 0 }}
                >
                  {isLast && isLastStep && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#ffffff",
                        color: "#0a1433",
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: 20,
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
                        opacity: cardVisible ? 1 : 0,
                        transition: "opacity 0.4s ease 0.2s",
                      }}
                    >
                      Top 1%
                    </div>
                  )}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 2,
                      background: isActive
                        ? "rgba(255,255,255,0.58)"
                        : "rgba(255,255,255,0.15)",
                      transition: "background 0.45s ease",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom nav — full width, space-between ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: NAV_H,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            padding: "0 clamp(24px,4vw,64px)",
            boxSizing: "border-box",
          }}
        >
          {/* Flat row: tab · · tab · · tab · · tab · · tab — space-between distributes gaps evenly */}
          {STEPS.flatMap((st, i) => {
            const isActive = i === step;
            const lit      = dotsLitForGap(i);

            const tab = (
              <div
                key={`tab-${i}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: isActive ? "5px 13px 5px 12px" : "5px 4px",
                  borderRadius: 50,
                  background: isActive ? "#5533ff" : "transparent",
                  transition: "background 0.3s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(13px,1vw,15px)",
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    transition: "color 0.3s ease",
                  }}
                >
                  {st.tab}
                </span>
                {isActive && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#ffffff",
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    {st.num}
                  </span>
                )}
              </div>
            );

            if (i === STEPS.length - 1) return [tab];

            // Each dot is its own flat item so space-between gives equal gap:
            // tab ← gap → dot ← same gap → dot ← same gap → tab
            const dot1 = (
              <span
                key={`dot-${i}-a`}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  display: "block",
                  flexShrink: 0,
                  background: lit >= 1 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.22)",
                  transition: "background 0.35s ease",
                }}
              />
            );

            const dot2 = (
              <span
                key={`dot-${i}-b`}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  display: "block",
                  flexShrink: 0,
                  background: lit >= 2 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.22)",
                  transition: "background 0.35s ease",
                }}
              />
            );

            return [tab, dot1, dot2];
          })}
        </div>
      </div>
    </section>
  );
}
