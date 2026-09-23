"use client";

import { useEffect, useRef, useState } from "react";

const ARC_R    = 700;
const ARC_CY   = 860;    // circle centre Y near section bottom — keeps U-shape
const CARD_W   = 170;
const SECTION_H = 880;
const AUTO_SPD  = 0.018; // degrees per ms (auto-rotate speed)

const FILES = [
  "meadowhawk.png",
  "pivot-health.png",
  "income-per-week.png",
  "nexus-ai.png",
  "plastomics.png",
  "lorica-encrypt.png",
  "health-9am.png",
  "pulsar-dashboard.png",
  "focus-stability.png",
];

// 18 cards evenly spaced at 20° — full circle
const NUM_CARDS   = 18;
const ANGLE_STEP  = 360 / NUM_CARDS; // 20°
const BASE_ANGLES = Array.from({ length: NUM_CARDS }, (_, i) => i * ANGLE_STEP - 80);

function toRad(d: number) { return (d * Math.PI) / 180; }
function cardLeft(d: number) {
  return `calc(50% + ${ARC_R * Math.sin(toRad(d)) - CARD_W / 2}px)`;
}
function cardTop(d: number) {
  return `${ARC_CY - ARC_R * Math.cos(toRad(d))}px`;
}
function cardZ(d: number) {
  return Math.max(1, Math.round(5 + 4 * Math.cos(toRad(d))));
}

export default function Portfolio() {
  const refs      = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef    = useRef<number>(0);
  const rotRef    = useRef(0);       // accumulated wheel rotation
  const velRef    = useRef(0);       // momentum velocity (deg/ms)
  const dragging  = useRef(false);
  const lastX     = useRef(0);
  const lastT     = useRef(0);
  const lastDX    = useRef(0);

  const [mounted, setMounted]   = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [pressed, setPressed]   = useState(false);
  const [showSpin, setShowSpin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const spinTimer               = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    let prevT = performance.now();

    function tick(now: number) {
      const dt = now - prevT;
      prevT = now;

      if (!dragging.current) {
        if (Math.abs(velRef.current) > 0.002) {
          // momentum decay
          rotRef.current += velRef.current * dt;
          velRef.current *= 0.96;
        } else {
          // auto-rotate
          velRef.current = 0;
          rotRef.current += AUTO_SPD * dt;
        }
      }

      const rot = rotRef.current;
      BASE_ANGLES.forEach((base, i) => {
        const el = refs.current[i];
        if (!el) return;
        const deg = base + rot;
        el.style.left     = cardLeft(deg);
        el.style.top      = cardTop(deg);
        el.style.zIndex   = String(cardZ(deg));
        el.style.transform = `rotate(${deg}deg)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ─── Mobile render ────────────────────────────────────────────────────────────
  const mobileRow1 = [...FILES, ...FILES, ...FILES];
  const mobileRow2 = [...FILES].reverse().concat([...FILES].reverse(), [...FILES].reverse());

  if (isMobile) {
    return (
      <section
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          background: "linear-gradient(180deg, #000028 0%, #1a4db8 20%, #4a8ce0 45%, #6aaaf5 55%, #1a4db8 80%, #000028 100%)",
          paddingTop: 56,
          paddingBottom: 64,
          userSelect: "none",
        }}
      >
        <style>{`
          @keyframes portfolio-scroll-left {
            from { transform: translateX(0); }
            to   { transform: translateX(-33.333%); }
          }
          @keyframes portfolio-scroll-right {
            from { transform: translateX(-33.333%); }
            to   { transform: translateX(0); }
          }
          .port-row-left  { animation: portfolio-scroll-left  22s linear infinite; }
          .port-row-right { animation: portfolio-scroll-right 18s linear infinite; }
        `}</style>

        {/* Top gradient blend */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(180deg, #0c1e40 0%, transparent 100%)", zIndex: 10, pointerEvents: "none" }} />
        {/* Bottom gradient blend */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(0deg, #020a1c 0%, transparent 100%)", zIndex: 10, pointerEvents: "none" }} />

        {/* Row 1 — scrolls left */}
        <div style={{ overflow: "hidden", marginBottom: 10, maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
          <div className="port-row-left" style={{ display: "flex", gap: 10, width: "max-content" }}>
            {mobileRow1.map((file, i) => (
              <div key={i} style={{ flexShrink: 0, width: 130, borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/portfolio/${file}`} alt="" draggable={false} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
          <div className="port-row-right" style={{ display: "flex", gap: 10, width: "max-content" }}>
            {mobileRow2.map((file, i) => (
              <div key={i} style={{ flexShrink: 0, width: 130, borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/portfolio/${file}`} alt="" draggable={false} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Heading + CTA centered */}
        <div style={{ position: "relative", zIndex: 20, textAlign: "center", padding: "32px 24px 0" }}>
          <h2 style={{ margin: "0 0 14px", fontSize: "clamp(28px, 7vw, 40px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-1px", lineHeight: 1.15, fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
            Ready to grow your<br />digital presence?
          </h2>
          <p style={{ margin: "0 0 24px", fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, maxWidth: 320, marginInline: "auto", fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
            Let&apos;s turn your marketing into a system that attracts, converts, and keeps improving
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg,#060c28,#132060)",
              color: "#fff", fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: 15, fontWeight: 700, padding: "13px 32px", borderRadius: 50,
              textDecoration: "none", letterSpacing: "0.04em",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 4px 24px rgba(0,10,60,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <span>Start A Project</span>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.12)", fontSize: 13 }}>→</span>
          </a>
        </div>
      </section>
    );
  }

  function onPointerDown(e: React.PointerEvent<HTMLElement>) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    lastX.current    = e.clientX;
    lastT.current    = e.timeStamp;
    lastDX.current   = 0;
    velRef.current   = 0;
    clearTimeout(spinTimer.current);
    setShowSpin(true);
    spinTimer.current = setTimeout(() => setShowSpin(false), 2500);
  }

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (!dragging.current) return;
    const dx  = e.clientX - lastX.current;
    const dt  = e.timeStamp - lastT.current || 1;
    lastDX.current = dx / dt;          // deg per ms for momentum
    lastX.current  = e.clientX;
    lastT.current  = e.timeStamp;
    rotRef.current += dx * 0.12;       // drag sensitivity
  }

  function onPointerUp() {
    if (!dragging.current) return;
    dragging.current = false;
    velRef.current   = lastDX.current * 0.12; // hand off to momentum
  }

  return (
    <section
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{
        position: "relative",
        width: "100%",
        height: SECTION_H,
        overflow: "hidden",
        background: "linear-gradient(180deg, #000028 0%, #1a4db8 20%, #4a8ce0 45%, #6aaaf5 55%, #1a4db8 80%, #000028 100%)",
        cursor: dragging.current ? "grabbing" : "grab",
        userSelect: "none",
      }}
    >
      {/* ── Top blend: dark wrapper → section ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 120,
        background: "linear-gradient(180deg, #0c1e40 0%, transparent 100%)",
        zIndex: 30,
        pointerEvents: "none",
      }} />
      {/* ── Bottom blend: section → dark wrapper ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 120,
        background: "linear-gradient(0deg, #020a1c 0%, transparent 100%)",
        zIndex: 30,
        pointerEvents: "none",
      }} />
      {/* ── Cards — client-only to avoid SSR floating-point hydration mismatch ── */}
      {mounted && BASE_ANGLES.map((base, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          style={{
            position:        "absolute",
            left:            cardLeft(base),
            top:             cardTop(base),
            width:           `${CARD_W}px`,
            overflow:        "hidden",
            zIndex:          cardZ(base),
            transform:       `rotate(${base}deg)`,
            transformOrigin: "50% 0%",
            boxShadow:       "0 12px 40px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
            pointerEvents:   "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/portfolio/${FILES[i % FILES.length]}`}
            alt="Portfolio project"
            draggable={false}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      ))}


      {/* ── Spin GIF (shown while dragging) ─────────────────────── */}
      <div style={{
        position:   "absolute",
        left:       "50%",
        top:        540,
        transform:  "translate(-50%, -50%)",
        zIndex:     20,
        pointerEvents: "none",
        opacity:    showSpin ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/spin.gif"
          alt=""
          style={{ width: 130, height: 130, borderRadius: "50%", display: "block", objectFit: "cover" }}
        />
      </div>

      {/* ── Heading ──────────────────────────────────────────────── */}
      <div
        style={{
          position:    "absolute",
          left:        "50%",
          top:         600,
          transform:   "translate(-50%, -50%)",
          zIndex:      20,
          textAlign:   "center",
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            margin:        "0 0 18px",
            fontSize:      "clamp(36px, 3.8vw, 52px)",
            fontWeight:    800,
            color:         "#ffffff",
            letterSpacing: "-1.5px",
            lineHeight:    1.1,
            whiteSpace:    "nowrap",
            fontFamily:    "var(--font-geist-sans), system-ui, sans-serif",
            opacity:       showSpin ? 0 : 1,
            transition:    "opacity 0.3s ease",
          }}
        >
          Ready to grow your
          <br />
          digital presence?
        </h2>
        <p
          style={{
            margin:       0,
            fontSize:     15,
            fontWeight:   400,
            color:        "rgba(255,255,255,0.75)",
            lineHeight:   1.6,
            maxWidth:     480,
            marginInline: "auto",
            fontFamily:   "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          Let&apos;s turn your marketing into a system that attracts, converts,
          and keeps improving
        </p>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <div
        style={{
          position:   "absolute",
          left:       "50%",
          top:        730,
          transform:  "translate(-50%, -50%)",
          zIndex:     20,
          whiteSpace: "nowrap",
        }}
      >
        <a
          href="/contact"
          onPointerDown={(e) => e.stopPropagation()}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setPressed(false); }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            10,
            background:     pressed
              ? "linear-gradient(135deg,#0a0f2e,#101a4a)"
              : hovered
              ? "linear-gradient(135deg,#0d1540,#1a2d80)"
              : "linear-gradient(135deg,#060c28,#132060)",
            color:          "#fff",
            fontFamily:     "var(--font-geist-sans), system-ui, sans-serif",
            fontSize:       15,
            fontWeight:     700,
            padding:        "14px 36px",
            borderRadius:   50,
            textDecoration: "none",
            letterSpacing:  "0.04em",
            border:         "1px solid rgba(255,255,255,0.18)",
            boxShadow:      pressed
              ? "0 2px 8px rgba(0,0,0,0.5)"
              : hovered
              ? "0 0 0 4px rgba(100,140,255,0.25),0 8px 32px rgba(10,30,100,0.7)"
              : "0 4px 24px rgba(0,10,60,0.6),inset 0 1px 0 rgba(255,255,255,0.08)",
            transform:      pressed ? "scale(0.95)" : hovered ? "scale(1.06)" : "scale(1)",
            transition:     "transform 0.15s ease,box-shadow 0.2s ease,background 0.2s ease",
            cursor:         "pointer",
          }}
        >
          <span>Start A Project</span>
          <span
            style={{
              display:         "inline-flex",
              alignItems:      "center",
              justifyContent:  "center",
              width:           26,
              height:          26,
              borderRadius:    "50%",
              background:      "rgba(255,255,255,0.12)",
              fontSize:        14,
              transform:       hovered ? "translateX(3px)" : "translateX(0)",
              transition:      "transform 0.2s ease",
            }}
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
