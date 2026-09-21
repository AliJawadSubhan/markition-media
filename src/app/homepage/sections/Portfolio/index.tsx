"use client";

// Cards are positioned with absolute left/top — exactly like the approved static
// layout — so every card stays upright (no CSS rotation tilt).
// A requestAnimationFrame loop increments each card's arc angle, creating the
// clockwise circular carousel while preserving the original visual appearance.
//
// Circle: R=800px, centre at (50 %, 1000 px from top).  Design width 1440 px.

import { useEffect, useRef, useState } from "react";

const ARC_R         = 800;
const ARC_CY        = 1000;
const CARD_W        = 200;
const REVOLUTION_MS = 60_000; // 60 s per full revolution

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

// First 9: original visible angles (17.5° step — identical to the approved static layout)
// Last 9:  hidden angles filling the lower 220° arc (22° step)
const WHEEL_ANGLES = [
  -70, -52.5, -35, -17.5,  0, 17.5,  35, 52.5,  70,
   92,  114,  136,  158, 180,  202, 224,  246, 268,
];

function toRad(deg: number) { return (deg * Math.PI) / 180; }

// card LEFT edge  (card is CARD_W wide, centered on the arc x-position)
function left(deg: number) {
  return `calc(50% + ${ARC_R * Math.sin(toRad(deg)) - CARD_W / 2}px)`;
}
// card TOP edge  (matches original yPx formula)
function top(deg: number) {
  return `${ARC_CY - ARC_R * Math.cos(toRad(deg))}px`;
}
function zOf(deg: number) {
  return Math.max(1, Math.round(5 + 4 * Math.cos(toRad(deg))));
}

export default function Portfolio() {
  const refs      = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef    = useRef<number>();
  const [hovered, setHovered]   = useState(false);
  const [pressed, setPressed]   = useState(false);

  useEffect(() => {
    const t0 = performance.now();

    function tick() {
      const elapsed  = performance.now() - t0;
      const wheelDeg = (elapsed / REVOLUTION_MS) * 360;

      WHEEL_ANGLES.forEach((base, i) => {
        const el = refs.current[i];
        if (!el) return;
        const deg = base + wheelDeg;
        el.style.left      = left(deg);
        el.style.top       = top(deg);
        el.style.zIndex    = String(zOf(deg));
        el.style.transform = `rotate(${deg}deg)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: 870,
        overflow: "hidden",
      }}
    >
      {/* ── Cards ─────────────────────────────────────────────────── */}
      {WHEEL_ANGLES.map((deg, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          style={{
            position: "absolute",
            left:   left(deg),
            top:    top(deg),
            width:  CARD_W,
            overflow: "hidden",
            zIndex: zOf(deg),
            transform: `rotate(${deg}deg)`,
            transformOrigin: "50% 0%",
            boxShadow: "0 12px 40px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
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

      {/* ── Bottom gradient mask ───────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background:
            "linear-gradient(to top, #75a0e1 0%, rgba(117,160,225,0) 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* ── Heading ───────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 600,
          transform: "translate(-50%, -50%)",
          zIndex: 20,
          textAlign: "center",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            margin: "0 0 18px",
            fontSize: "clamp(36px, 3.8vw, 52px)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            whiteSpace: "nowrap",
          }}
        >
          Ready to grow your
          <br />
          digital presence?
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 400,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.6,
            maxWidth: 480,
            marginInline: "auto",
            whiteSpace: "normal",
          }}
        >
          Let&apos;s turn your marketing into a system that attracts, converts,
          and keeps improving
        </p>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 730,
          transform: "translate(-50%, -50%)",
          zIndex: 20,
          whiteSpace: "nowrap",
        }}
      >
        <a
          href="/contact"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setPressed(false); }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: pressed
              ? "linear-gradient(135deg, #0a0f2e 0%, #101a4a 100%)"
              : hovered
              ? "linear-gradient(135deg, #0d1540 0%, #1a2d80 100%)"
              : "linear-gradient(135deg, #060c28 0%, #132060 100%)",
            color: "#fff",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: 15,
            fontWeight: 700,
            padding: "14px 36px",
            borderRadius: 50,
            textDecoration: "none",
            letterSpacing: "0.04em",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: pressed
              ? "0 2px 8px rgba(0,0,0,0.5)"
              : hovered
              ? "0 0 0 4px rgba(100,140,255,0.25), 0 8px 32px rgba(10,30,100,0.7)"
              : "0 4px 24px rgba(0,10,60,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
            transform: pressed ? "scale(0.95)" : hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease",
          }}
        >
          <span>Start A Project</span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              fontSize: 14,
              transform: hovered ? "translateX(3px)" : "translateX(0)",
              transition: "transform 0.2s ease",
            }}
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
