"use client";

import { useState, useEffect, useRef } from "react";

const FAQS = [
  {
    q: "What is included in your branding services?",
    a: "Our branding services include logo design, brand identity systems, typography, colour palettes, brand guidelines, and all the core assets you need to show up consistently across digital and print.",
  },
  {
    q: "What is the difference between branding and rebranding?",
    a: "Branding is building your visual identity from scratch. Rebranding is evolving or replacing an existing identity — whether that means a full overhaul or a strategic refresh to better match where your business is today.",
  },
  {
    q: "Can you design our website as part of the branding project?",
    a: "Yes. We can scope a website design — or a full design-and-build — as an add-on to your branding project so your digital presence launches alongside your new identity.",
  },
  {
    q: "Can you apply the identity to a digital product?",
    a: "Absolutely. We extend brand identities into UI systems, component libraries, and product design so your app or SaaS product feels as polished as your marketing.",
  },
  {
    q: "Do you provide logo design without a complete rebrand?",
    a: "Yes. We offer standalone logo design for businesses that need a strong mark without a full identity overhaul. We'll make sure it's versatile enough to grow with you.",
  },
  {
    q: "Do you work with startups?",
    a: "Definitely. We love working with early-stage companies. We can build a brand system that looks established from day one and scales as your team and product grows.",
  },
  {
    q: "How long does a branding project take?",
    a: "Most branding projects take 4–8 weeks depending on scope. A logo-only project can move faster; a full identity system with guidelines and collateral typically runs the full range.",
  },
];

export default function FAQ() {
  const [open, setOpen]         = useState<number | null>(null);
  const [hovered, setHovered]   = useState<number | null>(null);
  const [visible, setVisible]   = useState<Set<number>>(new Set());
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function check() {
      const next = new Set<number>();
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const { top, bottom } = el.getBoundingClientRect();
        if (top < window.innerHeight * 0.85 && bottom > 0) next.add(i);
      });
      setVisible(next);
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <section
      style={{
        padding: "100px 0 80px",
      }}
    >
      <div
        style={{
          maxWidth: 860,
          marginInline: "auto",
          paddingInline: "clamp(24px, 5vw, 80px)",
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            Quick answers to questions you may have
          </h2>
        </div>

        {/* Items */}
        {FAQS.map((item, i) => (
          <div key={i} ref={(el) => { rowRefs.current[i] = el; }} data-idx={i}>
            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.2)",
              }}
            />
            <button
              onClick={() => setOpen(open === i ? null : i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                background: "none",
                border: "none",
                padding: "26px 0",
                cursor: "pointer",
                gap: 24,
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(15px, 1.6vw, 18px)",
                  fontWeight: 500,
                  color: "#ffffff",
                  lineHeight: 1.4,
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 300,
                  color: "#ffffff",
                  lineHeight: 1,
                  background: open === i
                    ? "rgba(0,0,0,0.7)"
                    : visible.has(i) || hovered === i
                    ? "rgba(0,0,0,0.55)"
                    : "transparent",
                  transition: "background 0.4s ease, transform 0.25s ease",
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>

            {/* Answer */}
            <div
              style={{
                overflow: "hidden",
                maxHeight: open === i ? 300 : 0,
                transition: "max-height 0.35s ease",
              }}
            >
              <p
                style={{
                  margin: "0 0 28px",
                  fontSize: "clamp(14px, 1.4vw, 16px)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  maxWidth: 720,
                }}
              >
                {item.a}
              </p>
            </div>
          </div>
        ))}

        {/* Final divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.2)" }} />
      </div>
    </section>
  );
}
