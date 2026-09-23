"use client";

import { useState, useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    quote:
      "The value we get from Markition Media and their quality designs sets them apart from others. They are the right mix of price, talent, and style.",
    name: "Marshall Haas",
    role: "CEO & Co-Founder, Need/Want",
    initials: "MH",
    bg: "#4a7fd4",
  },
  {
    quote:
      "Markition is very organized in planning to achieve the goals within the set deadlines. We feel they were truly part of our internal team project.",
    name: "Alvaro Araujo",
    role: "Founder & CEO, Relocate Now",
    initials: "AA",
    bg: "#d48a3a",
  },
  {
    quote:
      "Working with Markition transformed our brand identity completely. Their attention to detail and creative vision exceeded every expectation we had.",
    name: "Sarah Chen",
    role: "Head of Marketing, TechVentures",
    initials: "SC",
    bg: "#7c5cbf",
  },
];

const N = TESTIMONIALS.length;

function Logos() {
  const s: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: "#b0bcc8", letterSpacing: "0.02em",
    display: "flex", alignItems: "center", gap: 5,
    fontFamily: "var(--font-inter), system-ui, sans-serif",
  };
  return (
    <div className="testimonial-logos" style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"clamp(20px,4vw,48px)", flexWrap:"wrap" }}>
      <span style={s}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#b0bcc8" strokeWidth="1.2" fill="none"/><path d="M5 7h4M7 5v4" stroke="#b0bcc8" strokeWidth="1.2" strokeLinecap="round"/></svg>Clutch</span>
      <span style={s}><svg width="14" height="13" viewBox="0 0 14 13" fill="#b0bcc8"><path d="M7 0l1.55 4.77H14L9.72 7.73l1.55 4.77L7 9.54l-4.27 2.96 1.55-4.77L0 4.77h5.45z"/></svg>Trustpilot</span>
      <span style={s}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="1.5" rx="0.75" fill="#b0bcc8"/><rect x="1" y="6.25" width="8" height="1.5" rx="0.75" fill="#b0bcc8"/><rect x="1" y="9.5" width="5" height="1.5" rx="0.75" fill="#b0bcc8"/></svg>sortlist</span>
      <span style={s}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="#b0bcc8"/><rect x="7.5" y="1" width="5.5" height="5.5" rx="1" fill="#b0bcc8"/><rect x="1" y="7.5" width="5.5" height="5.5" rx="1" fill="#b0bcc8"/><rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" fill="#b0bcc8"/></svg>GoodFirms</span>
    </div>
  );
}

function CardContent({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <>
      <h2 className="testimonial-h2" style={{
        fontFamily: "var(--font-instrument), Georgia, serif",
        fontStyle: "italic", fontSize: "clamp(40px,5.5vw,72px)", fontWeight: 400,
        color: "#0a1833", lineHeight: 1.05, letterSpacing: "-2px",
        margin: "clamp(48px,7vw,80px) 0 12px",
      }}>
        100+ verified<br />love letters
      </h2>
      <div className="testimonial-stars" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:12 }}>
        <span style={{ fontSize:15, fontWeight:600, color:"#0a1833", fontFamily:"var(--font-inter), system-ui, sans-serif" }}>5.0</span>
        {Array.from({length:5}).map((_,i)=><span key={i} style={{color:"#f59e0b",fontSize:18}}>★</span>)}
      </div>
      <blockquote className="testimonial-quote" style={{
        margin:"0 0 16px", fontSize:"clamp(16px,1.7vw,20px)", fontWeight:400,
        color:"#1a2a4a", lineHeight:1.65, maxWidth:560, marginInline:"auto",
        textAlign:"center", fontFamily:"var(--font-inter), system-ui, sans-serif",
      }}>
        "{t.quote}"
      </blockquote>
      <div className="testimonial-author" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:"clamp(20px,3vw,32px)" }}>
        <div className="testimonial-author-avatar" style={{
          width:48, height:48, borderRadius:"50%", background:t.bg,
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#fff", fontSize:16, fontWeight:700, flexShrink:0,
          fontFamily:"var(--font-inter), system-ui, sans-serif",
        }}>{t.initials}</div>
        <div style={{textAlign:"left"}}>
          <div className="testimonial-author-name" style={{ fontSize:15, fontWeight:700, color:"#0a1833", fontFamily:"var(--font-inter), system-ui, sans-serif" }}>{t.name}</div>
          <div className="testimonial-author-role" style={{ fontSize:13, color:"#6b7280", fontFamily:"var(--font-inter), system-ui, sans-serif" }}>{t.role}</div>
        </div>
      </div>
      <div className="testimonial-divider" style={{ height:1, background:"#e5e7eb", marginBottom:"clamp(20px,3vw,32px)" }} />
      <Logos />
    </>
  );
}

type Phase = "idle" | "exit-left" | "exit-right" | "resetting";

export default function Testimonials() {
  const [deck, setDeck]   = useState([0, 1, 2 % N]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [isMobile, setIsMobile] = useState(false);
  const busy              = useRef(false);
  const frontRef          = useRef<HTMLDivElement>(null);
  const touchStartX       = useRef<number | null>(null);
  const CARD_H            = 600;
  const DURATION          = 520; // ms

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // right arrow → card flies to the RIGHT, next testimonial
  const goNext = () => {
    if (busy.current) return;
    busy.current = true;
    if (frontRef.current) frontRef.current.style.zIndex = "4";
    setPhase("exit-right");
    // At 42% of the animation the card has swept sideways and is about to arc behind —
    // drop z-index directly on the DOM element (no re-render, animation keeps running)
    setTimeout(() => { if (frontRef.current) frontRef.current.style.zIndex = "0"; }, DURATION * 0.42);
  };

  // left arrow → card flies to the LEFT, prev testimonial
  const goPrev = () => {
    if (busy.current) return;
    busy.current = true;
    if (frontRef.current) frontRef.current.style.zIndex = "4";
    setPhase("exit-left");
    setTimeout(() => { if (frontRef.current) frontRef.current.style.zIndex = "0"; }, DURATION * 0.42);
  };

  // After the full animation, swap deck content, then snap positions in one frame.
  // We also immediately reset the front card's DOM style so the keyframe fill-mode
  // doesn't leave it visibly tilted while React's re-render is still pending.
  useEffect(() => {
    if (phase !== "exit-left" && phase !== "exit-right") return;
    const t = setTimeout(() => {
      if (frontRef.current) {
        frontRef.current.style.animation = "none";
        frontRef.current.style.transform = "translateX(-50%) translateY(-50%) rotate(0deg) scale(1)";
        frontRef.current.style.zIndex    = "4";
      }
      setDeck(([f, m, b]) =>
        phase === "exit-right"
          ? [m, b, (b + 1) % N]
          : [b, f, (f - 1 + N) % N]
      );
      setPhase("resetting");
    }, DURATION);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "resetting") return;
    const frame = requestAnimationFrame(() => {
      setPhase("idle");
      busy.current = false;
    });
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  // ─── Keyframes ────────────────────────────────────────────────────────────────
  // Card sweeps sideways (clearly visible at z:4), then at 42% the z drops to 0
  // via the ref, so the card arcs back "behind" the deck for the remaining 58%.
  const kf = `
    @keyframes fly-right {
      0%  { transform: translateX(-50%) translateY(-50%) rotate(0deg) scale(1); }
      42% { transform: translateX(-50%) translateY(-50%) translateX(38%) rotate(10deg) scale(0.90); }
      100%{ transform: translateX(-50%) translateY(-50%) rotate(7deg) scale(0.82); }
    }
    @keyframes fly-left {
      0%  { transform: translateX(-50%) translateY(-50%) rotate(0deg) scale(1); }
      42% { transform: translateX(-50%) translateY(-50%) translateX(-38%) rotate(-10deg) scale(0.90); }
      100%{ transform: translateX(-50%) translateY(-50%) rotate(7deg) scale(0.82); }
    }
  `;

  const TRANS = phase === "resetting"
    ? "none"
    : `transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1), box-shadow ${DURATION}ms ease`;

  const exiting = phase === "exit-left" || phase === "exit-right";

  const frontAnim =
    phase === "exit-right" ? `fly-right ${DURATION}ms cubic-bezier(0.4,0,0.2,1) forwards` :
    phase === "exit-left"  ? `fly-left  ${DURATION}ms cubic-bezier(0.4,0,0.2,1) forwards` :
                             "none";
  const frontT = "translateX(-50%) translateY(-50%) rotate(0deg) scale(1)";

  // Mid card jumps to z:5 (above the flying front card) and comes forward
  const midT =
    exiting ? "translateX(-50%) translateY(-50%) rotate(0deg) scale(1)" :
              "translateX(-50%) translateY(-50%) rotate(3.5deg) scale(1)";
  const midZ = exiting ? 5 : 2;
  const midShadow = exiting ? "0 40px 90px rgba(0,0,0,0.32)" : "0 12px 36px rgba(0,0,0,0.14)";

  const backT =
    exiting ? "translateX(-50%) translateY(-50%) rotate(3.5deg)" :
              "translateX(-50%) translateY(-50%) rotate(7deg)";

  const cardBase: React.CSSProperties = {
    position: "absolute",
    top: "50%", left: "50%",
    width: "calc(100vw - 120px)",
    maxWidth: 1100, ...(isMobile ? {} : { height: CARD_H }),
    borderRadius: 0,
    padding: "clamp(44px,5vw,72px) clamp(44px,6vw,88px) clamp(36px,4vw,56px)",
    textAlign: "center",
    display: "flex", flexDirection: "column", justifyContent: "center",
  };
  const cardCls = "testimonial-card";

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return; // ignore tiny taps
    if (dx < 0) goNext(); else goPrev();
  };

  return (
    <section
      className="testimonials-section"
      style={{ position:"relative", overflow:"hidden", padding:"80px 0 80px", minHeight: CARD_H + 160 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        @media (max-width: 767px) {
          .testimonials-section {
            min-height: 320px !important;
            padding: 60px 0 !important;
          }
        }
      `}</style>
      <style>{kf + `
        /* Cards are absolutely centered (top:50% + translateY(-50%)), so the
           gap above/below is always symmetric no matter how padding is
           split — can't do "0 top / 80 bottom" like flow-layout sections.
           Zero it out here instead: the uniform 80px inter-section gap on
           each side comes entirely from the neighbor section's own edge
           (Industries' bottom, and Stats' matching custom top). */
        @media (min-width: 768px) {
          .testimonials-section {
            padding: 0 !important;
            min-height: ${CARD_H}px !important;
          }
        }
        @media (max-width: 767px) {
          .testimonial-card {
            width: calc(100vw - 48px) !important;
            max-width: 500px !important;
            height: auto !important;
            min-height: 0 !important;
            padding: 18px 16px 14px !important;
          }
          .testimonial-h2 {
            font-size: 18px !important;
            line-height: 1.1 !important;
            letter-spacing: -0.5px !important;
            margin: 0 0 6px !important;
          }
          .testimonial-stars { margin-bottom: 6px !important; }
          .testimonial-quote {
            font-size: 12px !important;
            line-height: 1.5 !important;
            margin-bottom: 8px !important;
          }
          .testimonial-author { margin-bottom: 8px !important; gap: 10px !important; }
          .testimonial-author-avatar { width: 34px !important; height: 34px !important; font-size: 13px !important; }
          .testimonial-author-name { font-size: 13px !important; }
          .testimonial-author-role { font-size: 11px !important; }
          .testimonial-divider { margin-bottom: 8px !important; }
          .testimonial-logos { gap: 10px !important; flex-wrap: nowrap !important; justify-content: space-around !important; }
          .testimonial-logos span { font-size: 10px !important; gap: 3px !important; }
          .testimonial-logos svg { width: 10px !important; height: 10px !important; }
          .testimonial-nav-btn {
            width: 34px !important;
            height: 34px !important;
            font-size: 18px !important;
          }
          .testimonial-nav-left  { left: 6px !important; }
          .testimonial-nav-right { right: 6px !important; }
        }
      `}</style>

      {/* ── Back card ──────────────────────────────────────────── */}
      <div className={cardCls} style={{
        ...cardBase,
        background: "rgba(195,212,232,0.70)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        zIndex: 1,
        transform: backT,
        transition: TRANS,
        overflow: "hidden",
      }} />

      {/* ── Mid card ───────────────────────────────────────────── */}
      <div className={cardCls} style={{
        ...cardBase,
        background: "rgba(218,228,240,0.90)",
        boxShadow: midShadow,
        zIndex: midZ,
        transform: midT,
        transition: TRANS,
        overflow: "hidden",
      }}>
        <CardContent t={TESTIMONIALS[deck[1]]} />
      </div>

      {/* ── Front card ─────────────────────────────────────────── */}
      <div
        ref={frontRef}
        className={cardCls}
        style={{
          ...cardBase,
          background: "#ffffff",
          boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
          zIndex: 4,
          animation: exiting ? frontAnim : "none",
          transform: exiting ? undefined : frontT,
          transition: exiting ? "none" : TRANS,
          overflow: "hidden",
        }}
      >
        <CardContent t={TESTIMONIALS[deck[0]]} />
      </div>

      {/* ── Nav buttons ────────────────────────────────────────── */}
      {(["left","right"] as const).map((side) => (
        <button
          key={side}
          onClick={side === "left" ? goPrev : goNext}
          className={`testimonial-nav-btn testimonial-nav-${side}`}
          style={{
            position: "absolute", top: "50%",
            [side]: 20,
            transform: "translateY(-50%)",
            width: 48, height: 48, borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.55)",
            background: "transparent", color: "#ffffff",
            fontSize: 24, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 10,
          }}
        >
          {side === "left" ? "‹" : "›"}
        </button>
      ))}
    </section>
  );
}
