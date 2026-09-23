"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "About",        href: "/about" },
  { label: "Services",     href: "/services",   dropdown: true },
  { label: "Industries",   href: "/industries", dropdown: true },
  { label: "Locations",    href: "/locations",  dropdown: true },
  { label: "Resources",    href: "/resources" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio",    href: "/portfolio" },
  { label: "Contact",      href: "/contact" },
] as const;

function ChevronDown() {
  return (
    <svg width="9" height="5" viewBox="0 0 9 5" fill="none" aria-hidden="true" className="mt-px flex-shrink-0 opacity-60">
      <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="flex-shrink-0">
      <line x1="3" y1="6" x2="17" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"
        style={{ transformOrigin: "10px 6px", transform: open ? "rotate(45deg) translateY(4px)" : "none", transition: "transform 0.25s ease" }} />
      <line x1="3" y1="10" x2="17" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"
        style={{ opacity: open ? 0 : 1, transition: "opacity 0.15s ease" }} />
      <line x1="3" y1="14" x2="17" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"
        style={{ transformOrigin: "10px 14px", transform: open ? "rotate(-45deg) translateY(-4px)" : "none", transition: "transform 0.25s ease" }} />
    </svg>
  );
}

function StaircaseIcon() {
  return (
    <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="4.88372" height="4.88372" rx="1" fill="white" />
      <rect x="5.55469" y="7" width="4.88372" height="4.88372" rx="1" fill="white" />
      <rect y="14" width="4.88372" height="4.88372" rx="1" fill="white" />
    </svg>
  );
}

const floatStyle: React.CSSProperties = {
  background: "rgba(8, 14, 38, 0.62)",
  backdropFilter: "blur(24px) saturate(1.8)",
  WebkitBackdropFilter: "blur(24px) saturate(1.8)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
};

const mobileMenuStyle: React.CSSProperties = {
  background: "rgba(8, 14, 38, 0.97)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const ctaStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.18)",
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50 px-3 sm:px-4 pt-3 sm:pt-4">

      {/* Floating nav box */}
      <nav
        aria-label="Main navigation"
        className="max-w-[1480px] mx-auto flex items-center justify-between px-5 sm:px-8 py-4 rounded-2xl gap-4"
        style={floatStyle}
      >
        {/* Logo — links to homepage */}
        <a href="/" aria-label="Markition Media — Home" className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/markition-logo.png" alt="Markition Media" className="h-[28px] sm:h-[32px] w-auto" />
        </a>

        {/* Desktop links */}
        <ul
          role="list"
          className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[14px] text-white/80 font-normal flex-1 justify-center list-none m-0 p-0"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors duration-150"
              >
                {link.label}
                {"dropdown" in link && link.dropdown && <ChevronDown />}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="/contact"
            className="hidden sm:flex items-center gap-2 text-white text-[13px] font-medium px-4 py-2 rounded-[8px] transition-colors duration-150 hover:bg-white/[0.12] whitespace-nowrap"
            style={ctaStyle}
          >
            <StaircaseIcon />
            Book Free Consultation
          </a>

          {/* Hamburger — shown below lg */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.08] transition-colors"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile slide-down */}
      <div
        id="mobile-nav"
        className="lg:hidden overflow-hidden"
        aria-hidden={!mobileOpen}
        style={{
          maxHeight: mobileOpen ? "520px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transition: "max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
        }}
      >
        <nav
          aria-label="Mobile navigation"
          className="overflow-hidden"
          style={mobileMenuStyle}
        >
          <ul role="list" className="list-none m-0 p-0">
            {NAV_LINKS.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-5 py-3.5 text-[13.5px] text-white/75 hover:text-white hover:bg-white/[0.05] transition-colors duration-150 ${
                    i < NAV_LINKS.length - 1 ? "border-b border-white/[0.05]" : ""
                  }`}
                >
                  <span>{link.label}</span>
                  {"dropdown" in link && link.dropdown ? (
                    <ChevronDown />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="opacity-30">
                      <path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <div className="p-4 border-t border-white/[0.05]">
            <a
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-white text-[13.5px] font-medium px-5 py-2.5 rounded-[6px] transition-colors"
              style={ctaStyle}
            >
              <StaircaseIcon />
              Book Free Consultation
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
