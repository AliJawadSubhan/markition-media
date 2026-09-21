"use client";

import { useState } from "react";

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

/* ── Platform logos ───────────────────────────────────────────── */
function Logos() {
  const style: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: "#b0bcc8",
    letterSpacing: "0.02em",
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "clamp(20px, 4vw, 48px)",
        flexWrap: "wrap",
      }}
    >
      <span style={style}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#b0bcc8" strokeWidth="1.2" fill="none" />
          <path d="M5 7h4M7 5v4" stroke="#b0bcc8" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Clutch
      </span>
      <span style={style}>
        <svg width="14" height="13" viewBox="0 0 14 13" fill="#b0bcc8">
          <path d="M7 0l1.55 4.77H14L9.72 7.73l1.55 4.77L7 9.54l-4.27 2.96 1.55-4.77L0 4.77h5.45z" />
        </svg>
        Trustpilot
      </span>
      <span style={style}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="3" width="12" height="1.5" rx="0.75" fill="#b0bcc8" />
          <rect x="1" y="6.25" width="8" height="1.5" rx="0.75" fill="#b0bcc8" />
          <rect x="1" y="9.5" width="5" height="1.5" rx="0.75" fill="#b0bcc8" />
        </svg>
        sortlist
      </span>
      <span style={style}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="#b0bcc8" />
          <rect x="7.5" y="1" width="5.5" height="5.5" rx="1" fill="#b0bcc8" />
          <rect x="1" y="7.5" width="5.5" height="5.5" rx="1" fill="#b0bcc8" />
          <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" fill="#b0bcc8" />
        </svg>
        GoodFirms
      </span>
    </div>
  );
}

export default function Testimonials() {
  const [idx, setIdx]       = useState(0);
  const [dir, setDir]       = useState<"left" | "right">("left");
  const [animKey, setAnimKey] = useState(0);
  const t = TESTIMONIALS[idx];

  const prev = () => {
    setDir("right");
    setAnimKey((k) => k + 1);
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };
  const next = () => {
    setDir("left");
    setAnimKey((k) => k + 1);
    setIdx((i) => (i + 1) % TESTIMONIALS.length);
  };

  const CARD_H = 600;

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 0 80px",
        minHeight: CARD_H + 160,
      }}
    >
      <style>{`
        @keyframes slide-in-left  { from { opacity: 0; transform: translateX(160px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-right { from { opacity: 0; transform: translateX(-160px); } to { opacity: 1; transform: translateX(0); } }
        .slide-left  { animation: slide-in-left  0.42s cubic-bezier(0.25,0.46,0.45,0.94) both; }
        .slide-right { animation: slide-in-right 0.42s cubic-bezier(0.25,0.46,0.45,0.94) both; }
      `}</style>
      {/* Card 2 – furthest back, slightly more tilted */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "calc(100vw - 120px)",
          maxWidth: 1100,
          height: CARD_H,
          background: "rgba(195,212,232,0.70)",
          borderRadius: 0,
          transform: "translateX(-50%) translateY(-50%) rotate(7deg)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          zIndex: 1,
        }}
      />
      {/* Card 1 – just behind main, barely tilted */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "calc(100vw - 120px)",
          maxWidth: 1100,
          height: CARD_H,
          background: "rgba(218,228,240,0.85)",
          borderRadius: 0,
          transform: "translateX(-50%) translateY(-50%) rotate(3.5deg)",
          boxShadow: "0 12px 36px rgba(0,0,0,0.14)",
          zIndex: 2,
        }}
      />

      {/* ── Main card ─────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "calc(100vw - 120px)",
          maxWidth: 1100,
          height: CARD_H,
          marginInline: "auto",
          background: "#ffffff",
          borderRadius: 0,
          padding: "clamp(44px,5vw,72px) clamp(44px,6vw,88px) clamp(36px,4vw,56px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
          zIndex: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(40px,5.5vw,72px)",
            fontWeight: 400,
            color: "#0a1833",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            margin: "clamp(48px,7vw,80px) 0 12px",
          }}
        >
          100+ verified
          <br />
          love letters
        </h2>

        {/* Stars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#0a1833",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            5.0
          </span>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: "#f59e0b", fontSize: 18 }}>★</span>
          ))}
        </div>

        {/* Sliding content — quote + author */}
        <div
          key={animKey}
          className={dir === "left" ? "slide-left" : "slide-right"}
        >
          {/* Quote */}
          <blockquote
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(16px,1.7vw,20px)",
              fontWeight: 400,
              color: "#1a2a4a",
              lineHeight: 1.65,
              maxWidth: 560,
              marginInline: "auto",
              textAlign: "center",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            "{t.quote}"
          </blockquote>

          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              marginBottom: "clamp(20px,3vw,32px)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: t.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                flexShrink: 0,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              }}
            >
              {t.initials}
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0a1833",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {t.role}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#e5e7eb", marginBottom: "clamp(20px,3vw,32px)" }} />

        {/* Platform logos */}
        <Logos />
      </div>

      {/* ── Nav buttons ───────────────────────────────────────── */}
      <button
        onClick={prev}
        style={{
          position: "absolute",
          top: "50%",
          left: 20,
          transform: "translateY(-50%)",
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.55)",
          background: "transparent",
          color: "#ffffff",
          fontSize: 24,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        ‹
      </button>
      <button
        onClick={next}
        style={{
          position: "absolute",
          top: "50%",
          right: 20,
          transform: "translateY(-50%)",
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.55)",
          background: "transparent",
          color: "#ffffff",
          fontSize: 24,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        ›
      </button>
    </section>
  );
}
