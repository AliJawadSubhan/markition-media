"use client";

import { useState } from "react";

const INDUSTRIES = [
  {
    name: "Roofing",
    description:
      "We align positioning, audience, messaging, and creative direction before design.",
  },
  {
    name: "Dental",
    description:
      "We align positioning, audience, messaging, and creative direction before design.",
  },
  {
    name: "Aesthetician",
    description:
      "We align positioning, audience, messaging, and creative direction before design.",
  },
  {
    name: "Hair Transplant",
    description:
      "We align positioning, audience, messaging, and creative direction before design.",
  },
];

function ProjectButton() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
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
          ? "linear-gradient(135deg, #1a3fd4 0%, #2a55f0 100%)"
          : hovered
          ? "linear-gradient(135deg, #2a50f5 0%, #4a70ff 100%)"
          : "linear-gradient(135deg, #1e46e8 0%, #3a60ff 100%)",
        color: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        fontSize: 14,
        fontWeight: 700,
        padding: "12px 28px",
        borderRadius: 50,
        textDecoration: "none",
        letterSpacing: "0.04em",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: pressed
          ? "0 2px 10px rgba(30,70,232,0.4)"
          : hovered
          ? "0 0 0 4px rgba(100,140,255,0.3), 0 8px 28px rgba(30,70,232,0.6)"
          : "0 4px 20px rgba(30,70,232,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
        transform: pressed ? "scale(0.95)" : hovered ? "scale(1.06)" : "scale(1)",
        transition: "transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      <span>Start A Project</span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          fontSize: 13,
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "transform 0.2s ease",
        }}
      >
        →
      </span>
    </a>
  );
}

export default function Industries() {
  return (
    <section
      className="section-gap-md"
      style={{
        padding: "0 clamp(24px,5vw,80px)",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .industries-heading {
            font-size: clamp(26px, 7vw, 48px) !important;
            line-height: 1.05 !important;
            letter-spacing: -1.5px !important;
            margin-bottom: 32px !important;
          }
          .industries-grid {
            flex-wrap: wrap !important;
          }
          .industries-col {
            flex: 0 0 100% !important;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.15) !important;
          }
          .industries-col:first-child {
            border-top: none !important;
          }
        }
        @media (min-width: 480px) and (max-width: 767px) {
          .industries-col {
            flex: 0 0 50% !important;
            box-sizing: border-box !important;
          }
          .industries-col:nth-child(1),
          .industries-col:nth-child(2) {
            border-top: none !important;
          }
          .industries-col:nth-child(odd) {
            border-left: none !important;
          }
          .industries-col:nth-child(even) {
            border-left: 1px solid rgba(255,255,255,0.15) !important;
          }
        }
      `}</style>

      {/* Heading */}
      <h2
        className="industries-heading"
        style={{
          fontFamily: "var(--font-familjen-grotesk), system-ui, sans-serif",
          fontWeight: 400,
          fontSize: 64,
          lineHeight: "60px",
          letterSpacing: "-3px",
          textAlign: "center",
          textTransform: "capitalize",
          color: "#ffffff",
          margin: "0 0 clamp(40px,5vw,64px)",
        }}
      >
        Industries We Serve
      </h2>

      {/* Columns */}
      <div style={{ display: "flex" }} className="industries-grid">
        {INDUSTRIES.map((item, i) => (
          <div
            key={i}
            className="industries-col"
            style={{
              flex: 1,
              borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.15)",
              padding: "clamp(24px,3vw,40px) clamp(20px,2.5vw,36px) clamp(28px,4vw,48px)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(15px,1.4vw,18px)",
                color: "#ffffff",
                margin: 0,
              }}
            >
              {item.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "clamp(13px,1.1vw,15px)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.65,
                margin: 0,
                flex: 1,
              }}
            >
              {item.description}
            </p>
            <div style={{ marginTop: 8 }}>
              <ProjectButton />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom rule */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.15)" }} />
    </section>
  );
}
