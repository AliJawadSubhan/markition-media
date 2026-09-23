"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: 1,
    tab: "Discovery",
    shortTab: "Discovery",
    label: "Discovery & alignment",
    image: "/process/branding-process-01.avif",
    description:
      "We begin by understanding your business, audience, market, and current brand. Together, we align on goals, priorities, stakeholders, and success criteria.",
    duration: "1–2 Weeks",
    deliverable: "Research and strategic brief",
  },
  {
    num: 2,
    tab: "Brand strategy",
    shortTab: "Brand",
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
    shortTab: "Creative",
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
    shortTab: "Identity",
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
    shortTab: "Guidelines",
    label: "Guidelines & handoff",
    image: "/process/branding-process-05.avif",
    description:
      "We finalize the identity, document how it should be used, and prepare approved assets your team can apply consistently across key brand touchpoints.",
    duration: "1–2 Weeks",
    deliverable: "Brand guidelines & assets",
  },
];

const BAR_HEIGHTS = [3, 3, 4, 5, 5, 6, 7, 8, 10, 11, 13, 15, 17, 20, 23, 27, 31, 36, 42, 49, 56, 65, 75, 87, 101, 117, 136, 157, 182, 211, 244, 282, 327, 380];
const BAR_W       = 3;
const NAV_H       = 56;
const TOTAL_PHASES = STEPS.length + (STEPS.length - 1) * 2; // 13

export default function Process() {
  const sectionRef                    = useRef<HTMLDivElement>(null);
  const stepRef                       = useRef(0);
  const dotPhaseRef                   = useRef(0);
  const barsRef                       = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef                       = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorDotRef                  = useRef<HTMLDivElement | null>(null);
  const tiltRef                       = useRef<HTMLDivElement | null>(null);
  const [step, setStep]               = useState(0);
  const [dotPhase, setDotPhase]       = useState(0);
  const [cardVisible, setCardVisible] = useState(true);

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const rect     = el.getBoundingClientRect();
      const total    = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(total, -rect.top));

      const barProgress = (scrolled / total) * BAR_HEIGHTS.length;

      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const fill = Math.max(0, Math.min(1, barProgress - i));
        bar.style.background = `rgba(255,255,255,${(0.15 + fill * 0.43).toFixed(3)})`;
      });

      const cursor = cursorDotRef.current;
      if (cursor) {
        if (barProgress <= 0) {
          cursor.style.opacity = "0";
        } else {
          const clamped = Math.min(barProgress, BAR_HEIGHTS.length - 0.001);
          const floor   = Math.floor(clamped);
          const frac    = clamped - floor;
          const h1      = BAR_HEIGHTS[floor];
          const h2      = BAR_HEIGHTS[Math.min(floor + 1, BAR_HEIGHTS.length - 1)];
          const cursorH = h1 + frac * (h2 - h1);
          const leftPct = (clamped / (BAR_HEIGHTS.length - 1)) * 100;
          cursor.style.opacity = "1";
          cursor.style.bottom  = `${cursorH + 10}px`;
          cursor.style.left    = `calc(${leftPct}% - 4px)`;
        }
      }

      const rawPhase   = (scrolled / total) * TOTAL_PHASES;
      const phaseIndex = Math.min(TOTAL_PHASES - 1, Math.floor(rawPhase));
      const newStep     = Math.min(STEPS.length - 1, Math.floor(phaseIndex / 3));
      const newDotPhase = phaseIndex - newStep * 3;

      if (newStep !== stepRef.current) {
        stepRef.current     = newStep;
        dotPhaseRef.current = newDotPhase;
        setCardVisible(false);
        setTimeout(() => {
          setStep(newStep);
          setDotPhase(newDotPhase);
          setCardVisible(true);
        }, 220);
      } else if (newDotPhase !== dotPhaseRef.current) {
        dotPhaseRef.current = newDotPhase;
        // Direct DOM update — no React re-render, eliminates scroll jitter on mobile
        dotsRef.current.forEach((el, j) => {
          if (!el) return;
          const gap       = Math.floor(j / 2);
          const threshold = (j % 2) + 1;
          const lit       = newStep > gap ? 2 : newStep === gap ? newDotPhase : 0;
          el.style.background = lit >= threshold
            ? "rgba(255,255,255,0.85)"
            : "rgba(255,255,255,0.22)";
        });
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dotsLitForGap(gapIndex: number): number {
    if (step > gapIndex) return 2;
    if (step === gapIndex) return dotPhase;
    return 0;
  }

  const isLastStep = step === STEPS.length - 1;
  const s          = STEPS[step];

  function onCardMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.innerWidth <= 767) return;
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width;
    const y    = (e.clientY - rect.top)  / rect.height;
    el.style.transition = "transform 0.08s ease-out";
    el.style.transform  = `perspective(900px) rotateX(${(y - 0.5) * -16}deg) rotateY(${(x - 0.5) * 16}deg)`;
  }

  function onCardMouseLeave() {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ height: `${TOTAL_PHASES * 50 + 100}vh`, position: "relative" }}
    >
      <style>{`
        /* ── Mobile: every size below blends vw + vh (calc(Avw + Bvh)) with the
           A:B ratio held constant across width/height pairs. That keeps the
           card's own aspect ratio steady (never goes tall-and-narrow on slim
           screens) while still letting the whole composition grow on TALL
           viewports instead of leaving a big dark gap above/below the card
           on narrow-but-tall phones. Pure vw-only sizing shrinks everything
           when only the width narrows, which is correct for the card's own
           shape but starves the vertical rhythm when height stays generous —
           the vh term compensates for exactly that case. ── */
        .process-tab-text-short { display: none; }
        @media (max-width: 767px) {
          /* Stable height (svh = small viewport = excludes URL bar = never changes).
             translateZ(0) + will-change promote to GPU compositor layer,
             preventing sticky micro-jitter from Lenis fractional scroll values. */
          .process-sticky-frame {
            height: 100vh !important;
            height: 100svh !important;
            justify-content: center !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            gap: clamp(10px, calc(1.5vw + 2vh), 28px) !important;
            will-change: transform !important;
            -webkit-transform: translateZ(0) !important;
            transform: translateZ(0) !important;
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
          }
          .process-header {
            padding-top: clamp(0px, calc(1vw + 3vh), 34px) !important;
            margin-bottom: clamp(0px, calc(1vw + 2vh), 20px) !important;
          }
          .process-subtitle {
            font-size: clamp(11px, calc(2vw + 1vh), 14px) !important;
            margin-bottom: 4px !important;
          }
          .process-h2 {
            font-size: clamp(21px, calc(5vw + 2.2vh), 29px) !important;
            letter-spacing: -1.2px !important;
            line-height: 1.1 !important;
          }
          /* Card area: auto height, full width, no extra vertical padding */
          .process-card-flex {
            flex: 0 0 auto !important;
            padding: 0 clamp(12px,4vw,20px) !important;
            align-items: flex-start !important;
          }
          /* Card width: blended vw+vh, capped so it never gets huge on larger
             phones. Image-zone height below uses the SAME vw:vh ratio, so
             width and height always grow together — the card's shape stays
             consistent whether the extra room comes from width or height. */
          .process-card-wrapper {
            width: clamp(240px, calc(55vw + 15vh), 380px) !important;
          }
          /* Bars: extend proportionally to viewport width */
          .process-bars-layer {
            left: -14vw !important;
            right: -14vw !important;
          }
          /* Image zone: same 55:15 ratio as card width above (scaled ~0.435x)
             keeps the image zone's proportion to the card constant. */
          .process-image-zone {
            height: clamp(100px, calc(24vw + 6.5vh), 170px) !important;
            min-height: 100px !important;
            max-height: 170px !important;
          }
          /* Content zone: padding/gaps/type all blend vw+vh too, so they grow
             in step with the card instead of staying flat on tall screens. */
          /* Stack title/desc above the meta row (instead of side-by-side) so
             text gets the FULL card width — a side-by-side layout leaves the
             title column too narrow at these larger mobile font sizes and
             forces it to wrap onto 3 cramped lines. */
          .process-content-body {
            padding: clamp(12px, calc(2.2vw + 1.4vh), 24px) clamp(14px, calc(2.8vw + 1.6vh), 28px) clamp(12px, calc(2.2vw + 1.4vh), 24px) !important;
            gap: clamp(6px, calc(1vw + 0.8vh), 12px) !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .process-content-title {
            font-size: clamp(14px, calc(3.2vw + 1.3vh), 19px) !important;
            letter-spacing: -0.2px !important;
          }
          .process-content-desc {
            font-size: clamp(11px, calc(2.2vw + 0.9vh), 14px) !important;
            line-height: 1.45 !important;
            /* Clamp to 3 lines so a narrower card (more text wrapping) doesn't
               grow taller — keeps the card compact on slim screens. */
            display: -webkit-box !important;
            -webkit-line-clamp: 3 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .process-content-meta-val {
            font-size: clamp(11px, calc(2.2vw + 0.9vh), 14px) !important;
          }
          .process-content-meta-label {
            font-size: clamp(10px, calc(2vw + 0.8vh), 12.5px) !important;
          }
          /* Meta becomes a left-aligned row (duration · deliverable) below
             the title/desc, full width, instead of a narrow right column. */
          .process-content-meta {
            min-width: 0 !important;
            width: 100% !important;
            text-align: left !important;
            align-self: stretch !important;
            display: flex !important;
            align-items: baseline !important;
            gap: 6px !important;
            padding-top: clamp(4px, calc(0.6vw + 0.5vh), 8px) !important;
            border-top: 1px solid rgba(10,20,51,0.08) !important;
          }
          .process-content-meta-label {
            margin-top: 0 !important;
          }
          .process-content-meta-label::before {
            content: "· ";
          }
          /* Nav: pull out of absolute positioning, flow naturally below card.
             Kept strictly vw-based (not blended with vh) because it has a
             hard constraint pure vertical-filling doesn't: it must always
             fit within 100% of the viewport WIDTH. Short labels + no dots +
             vw-scaled type keep all 5 tabs on one line without scrolling. */
          .process-desktop-nav {
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            width: 100% !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            justify-content: center !important;
            gap: clamp(2px,1vw,5px) !important;
            padding: 0 clamp(6px,2vw,12px) !important;
            height: clamp(30px,9vw,40px) !important;
            flex-shrink: 0 !important;
          }
          .process-desktop-nav::-webkit-scrollbar { display: none !important; }
          .process-tab-pill  { padding: clamp(2px,0.8vw,4px) clamp(5px,1.8vw,9px) !important; }
          .process-tab-text  { font-size: clamp(9px,2.6vw,11px) !important; }
          .process-tab-text-full  { display: none !important; }
          .process-tab-text-short { display: inline !important; }
          .process-tab-badge { width: clamp(12px,3.6vw,15px) !important; height: clamp(12px,3.6vw,15px) !important; font-size: clamp(7px,2vw,8.5px) !important; }
          .process-dot       { display: none !important; }
        }
        @media (min-width: 768px) {
          .process-mobile-nav { display: none !important; }
        }
      `}</style>

      {/* ── Sticky frame ── */}
      <div
        className="process-sticky-frame"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "hidden",
          overflowX: "clip",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
          paddingBottom: NAV_H,
        }}
      >
        {/* ── Header ── */}
        <div
          className="process-header"
          style={{
            textAlign: "center",
            paddingTop: "clamp(28px,4vh,48px)",
            marginBottom: "clamp(16px,2.5vh,28px)",
            flexShrink: 0,
          }}
        >
          <p
            className="process-subtitle"
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
            className="process-h2"
            style={{
              margin: 0,
              fontSize: "clamp(32px, 4.5vw, 58px)",
              fontWeight: 400,
              fontStyle: "normal",
              color: "#ffffff",
              letterSpacing: "-3.5px",
              lineHeight: 1.05,
              fontFamily: "var(--font-familjen), sans-serif",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            How we build<br />your growth system
          </h2>
        </div>

        {/* ── Card + bars ── */}
        <div
          className="process-card-flex"
          style={{
            flex: 1,
            minHeight: 0,
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "0 clamp(16px,4vw,60px) 20px",
            boxSizing: "border-box",
          }}
        >
          <div
            className="process-card-wrapper"
            style={{
              position: "relative",
              width: "clamp(320px,52vw,660px)",
              flexShrink: 0,
            }}
          >
            {/* ── Bars behind card ── */}
            <div
              aria-hidden="true"
              className="process-bars-layer"
              style={{
                position: "absolute",
                bottom: 0,
                left: "-200px",
                right: "-200px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              <div
                ref={cursorDotRef}
                style={{
                  position: "absolute",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#ffffff",
                  boxShadow: "0 0 10px 3px rgba(255,255,255,0.45)",
                  bottom: 0,
                  left: -4,
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
              {BAR_HEIGHTS.map((h, i) => {
                const isLast = i === BAR_HEIGHTS.length - 1;
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
                          zIndex: 10,
                        }}
                      >
                        Top 1%
                      </div>
                    )}
                    <div
                      ref={(el) => { barsRef.current[i] = el; }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 2,
                        background: "rgba(255,255,255,0.15)",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* ── Tilt wrapper ── */}
            <div
              ref={tiltRef}
              onMouseMove={onCardMouseMove}
              onMouseLeave={onCardMouseLeave}
              style={{
                position: "relative",
                zIndex: 1,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* ── Card face ── */}
              <div
                key={step}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 24px 72px rgba(0,0,20,0.6)",
                  opacity: cardVisible ? 1 : 0,
                  transform: cardVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(28px) scale(0.92)",
                  filter: cardVisible ? "blur(0px)" : "blur(8px)",
                  transition: cardVisible
                    ? "opacity 0.48s cubic-bezier(0.16,1,0.3,1), transform 0.52s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease"
                    : "opacity 0.2s ease-in, transform 0.2s ease-in, filter 0.18s ease-in",
                }}
              >
                {/* ── Top zone: image ── */}
                <div
                  className="process-image-zone"
                  style={{
                    position: "relative",
                    height: "clamp(240px,32vh,340px)",
                    background: "linear-gradient(175deg, #b6cbde 0%, #c8daec 25%, #dce8f3 55%, #ecf3f9 75%, #f5f8fc 100%)",
                    overflow: "hidden",
                  }}
                >
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
                  className="process-content-body"
                  style={{
                    background: "#ffffff",
                    padding: "clamp(16px,2vh,22px) clamp(18px,2.5vw,26px) clamp(18px,2vh,24px)",
                    display: "flex",
                    gap: 20,
                    alignItems: "flex-start",
                  }}
                >
                  <div className="process-content-main" style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      className="process-content-title"
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
                      className="process-content-desc"
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
                  <div
                    className="process-content-meta"
                    style={{
                      flexShrink: 0,
                      textAlign: "right",
                      minWidth: "clamp(90px,9vw,120px)",
                      alignSelf: "flex-end",
                    }}
                  >
                    <div
                      className="process-content-meta-val"
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
                      className="process-content-meta-label"
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
            </div>
          </div>
        </div>

        {/* ── Mobile nav (hidden — desktop nav handles both) ── */}
        <div
          className="process-mobile-nav"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 64,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "0 24px",
            boxSizing: "border-box",
            display: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {STEPS.map((_, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  height: 6,
                  borderRadius: 3,
                  width: i === step ? 22 : 6,
                  background: i < step
                    ? "rgba(255,255,255,0.65)"
                    : i === step
                    ? "#5533ff"
                    : "rgba(255,255,255,0.2)",
                  transition: "width 0.35s ease, background 0.35s ease",
                }}
              />
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-geist-sans), system-ui, sans-serif", letterSpacing: "0.02em" }}>
            <span style={{ color: "#ffffff", fontWeight: 600 }}>{step + 1}/{STEPS.length}</span>
            {" · "}{s.tab}
          </p>
        </div>

        {/* ── Desktop nav (also used on mobile as scrollable strip) ── */}
        <div
          className="process-desktop-nav"
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
          {STEPS.flatMap((st, i) => {
            const isActive = i === step;
            const lit      = dotsLitForGap(i);

            const tab = (
              <div
                key={`tab-${i}`}
                className="process-tab-pill"
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
                  className="process-tab-text"
                  style={{
                    fontSize: "clamp(13px,1vw,15px)",
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    transition: "color 0.3s ease",
                  }}
                >
                  <span className="process-tab-text-full">{st.tab}</span>
                  <span className="process-tab-text-short">{st.shortTab}</span>
                </span>
                {isActive && (
                  <span
                    className="process-tab-badge"
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

            const dot1 = (
              <span
                key={`dot-${i}-a`}
                ref={(el) => { dotsRef.current[i * 2] = el; }}
                className="process-dot"
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
                ref={(el) => { dotsRef.current[i * 2 + 1] = el; }}
                className="process-dot"
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
