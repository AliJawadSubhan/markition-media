"use client";

import { useState } from "react";

const BUDGET_MIN = 0;
const BUDGET_MAX = 10000;

export default function Contact() {
  const [budgetMin, setBudgetMin] = useState(1000);
  const [budgetMax, setBudgetMax] = useState(5000);

  const minPct = ((budgetMin - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;
  const maxPct = ((budgetMax - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;

  function handleMin(e: React.ChangeEvent<HTMLInputElement>) {
    setBudgetMin(Math.min(Number(e.target.value), budgetMax - 500));
  }
  function handleMax(e: React.ChangeEvent<HTMLInputElement>) {
    setBudgetMax(Math.max(Number(e.target.value), budgetMin + 500));
  }

  return (
    <section style={{ background: "#000028", padding: "100px 0 110px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "0 60px",
          alignItems: "start",
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div>
          <h2
            style={{
              margin: "0 0 18px",
              fontSize: "clamp(30px,3.4vw,44px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-1.2px",
              color: "#f0f6ff",
              fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
            }}
          >
            Let&apos;s Build<br />
            Something{" "}
            <span style={{ color: "#00d4ff" }}>Great</span>
          </h2>

          <p
            style={{
              margin: "0 0 40px",
              fontSize: 14,
              lineHeight: 1.8,
              color: "#8aa4c8",
              maxWidth: 340,
            }}
          >
            Share your vision with us and our team will create intelligent
            AI solutions tailored to your goals — helping you streamline
            operations, unlock new opportunities, and scale faster.
          </p>

          {/* ── Phone card ── */}
          <div
            style={{
              display: "flex",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(0,212,255,0.12)",
              boxShadow: "0 20px 60px rgba(0,0,40,0.5)",
            }}
          >
            {/* Person photo */}
            <div
              style={{
                width: "44%",
                background: "#e8edf8",
                display: "flex",
                alignItems: "flex-end",
                overflow: "hidden",
                minHeight: 180,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/expert-photo.png"
                alt="Expert"
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
            </div>

            {/* Phone info */}
            <div
              style={{
                flex: 1,
                background: "#060e2a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "28px 20px",
                gap: 0,
              }}
            >
              {/* Glowing phone icon */}
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "rgba(30,80,255,0.18)",
                  border: "1px solid rgba(60,120,255,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                  boxShadow:
                    "0 0 20px rgba(40,100,255,0.55), 0 0 48px rgba(40,100,255,0.2)",
                }}
              >
                <PhoneCallIcon />
              </div>

              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#f0f6ff",
                  letterSpacing: "-0.4px",
                  textAlign: "center",
                }}
              >
                +1 (713) 894-7727
              </p>

              <div
                style={{
                  width: 110,
                  height: 1,
                  background: "rgba(255,255,255,0.14)",
                  margin: "0 0 10px",
                }}
              />

              <p style={{ margin: 0, fontSize: 13, color: "#00d4ff", fontWeight: 500 }}>
                Talk to an expert
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN – Form ── */}
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexDirection: "column", gap: 22, paddingLeft: 24 }}
        >
          {/* Full Name + Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <FormField label="Full Name" placeholder="Type here" type="text" />
            <FormField label="Email" placeholder="Type here" type="email" />
          </div>

          {/* Why contacting */}
          <div>
            <label style={labelStyle}>Why Are You Contacting Us?</label>
            <div style={{ position: "relative" }}>
              <select
                defaultValue=""
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                  color: "#8aa4c8",
                  fontSize: 13,
                  padding: "7px 24px 7px 0",
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                }}
              >
                <option value="" disabled style={{ background: "#060e2a" }}>
                  Select a Service
                </option>
                <option value="web-design"    style={{ background: "#060e2a" }}>Web Design</option>
                <option value="seo"           style={{ background: "#060e2a" }}>SEO Optimization</option>
                <option value="social-media"  style={{ background: "#060e2a" }}>Social Media Marketing</option>
                <option value="paid-ads"      style={{ background: "#060e2a" }}>Paid Advertising</option>
                <option value="content"       style={{ background: "#060e2a" }}>Content Marketing</option>
              </select>
              {/* Chevron */}
              <svg
                style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8aa4c8" }}
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Budget range slider */}
          <div>
            <label style={labelStyle}>Your Budget</label>
            <p style={{ margin: "4px 0 14px", fontSize: 12, color: "#8aa4c8" }}>
              Slide to indicate your budget range
            </p>
            <div style={{ position: "relative", height: 36 }}>
              {/* Track bg */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: 2,
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  pointerEvents: "none",
                }}
              />
              {/* Active fill */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: 2,
                  left: `${minPct}%`,
                  width: `${maxPct - minPct}%`,
                  background: "#00d4ff",
                  borderRadius: 2,
                  pointerEvents: "none",
                }}
              />
              <input
                type="range"
                className="budget-thumb"
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={100}
                value={budgetMin}
                onChange={handleMin}
                style={{ zIndex: budgetMin > BUDGET_MAX - 1000 ? 5 : 3 }}
              />
              <input
                type="range"
                className="budget-thumb"
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={100}
                value={budgetMax}
                onChange={handleMax}
                style={{ zIndex: 4 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "#8aa4c8",
                marginTop: 8,
              }}
            >
              <span>${budgetMin.toLocaleString()}</span>
              <span>${budgetMax.toLocaleString()}</span>
            </div>
          </div>

          {/* Message */}
          <div>
            <label style={labelStyle}>Your Message</label>
            <textarea
              placeholder="Type here"
              rows={3}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
                color: "#f0f6ff",
                fontSize: 13,
                padding: "7px 0",
                outline: "none",
                resize: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.28)",
                borderRadius: 50,
                padding: "11px 26px",
                color: "#f0f6ff",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                letterSpacing: "0.02em",
                fontFamily: "inherit",
              }}
            >
              <span style={{ color: "#00d4ff", fontSize: 11 }}>✦</span>
              Let&apos;s Build Something Great
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .budget-thumb {
          -webkit-appearance: none;
          appearance: none;
          position: absolute;
          width: 100%;
          height: 100%;
          background: transparent;
          pointer-events: none;
          top: 0;
          left: 0;
          margin: 0;
          outline: none;
        }
        .budget-thumb::-webkit-slider-runnable-track {
          background: transparent;
          height: 2px;
        }
        .budget-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10192e;
          border: 2px solid #00d4ff;
          cursor: pointer;
          pointer-events: all;
          box-shadow: 0 0 0 3px rgba(0,212,255,0.15), 0 0 10px rgba(0,212,255,0.3);
          margin-top: -9px;
        }
        .budget-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10192e;
          border: 2px solid #00d4ff;
          cursor: pointer;
          pointer-events: all;
          box-shadow: 0 0 0 3px rgba(0,212,255,0.15);
        }
        .budget-thumb::-moz-range-track {
          background: transparent;
        }
        input[type="text"]::placeholder,
        input[type="email"]::placeholder,
        textarea::placeholder {
          color: rgba(255,255,255,0.2);
        }
      `}</style>
    </section>
  );
}

/* ── Shared ── */
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#c8d8ee",
  marginBottom: 6,
};

function FormField({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          color: "#f0f6ff",
          fontSize: 13,
          padding: "7px 0",
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}

function PhoneCallIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5599ff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 3a9 9 0 0 1 6.95 6.96" />
      <path d="M14.05 7a5 5 0 0 1 3.96 3.99" />
    </svg>
  );
}
