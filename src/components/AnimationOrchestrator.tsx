"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";

// ─── Hero (load animation) ────────────────────────────────────────────────────

function runHeroAnims() {
  const els = gsap.utils.toArray<HTMLElement>("[data-hero-anim]");
  if (!els.length) return;
  gsap.set(els, { y: 56 });
  gsap.to(els, {
    opacity: 1,
    y: 0,
    duration: 1.3,
    ease: "power4.out",
    stagger: 0.2,
    delay: 0.15,
    clearProps: "transform",
  });
}

function runShowcaseAnim() {
  const el = document.querySelector<HTMLElement>("[data-showcase-anim]");
  if (!el) return;
  gsap.set(el, { y: 90, scale: 0.96 });
  gsap.to(el, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.7,
    ease: "power3.out",
    delay: 0.65,
    clearProps: "transform",
  });
}

// ─── Scroll animations via IntersectionObserver ───────────────────────────────
// IntersectionObserver fires on ACTUAL viewport intersection — not on
// scroll position — so Lenis's smooth-scroll lag has zero effect on timing.

function preHide(el: HTMLElement, y = 50, scale = 1) {
  gsap.set(el, { opacity: 0, y, scale });
}

function animIn(
  els: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  opts: gsap.TweenVars = {}
) {
  gsap.to(els, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.9,
    ease: "power3.out",
    clearProps: "transform",
    ...opts,
  });
}

function runScrollAnims() {
  const vh = window.innerHeight;

  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(
      "section:not([data-hero]):not([data-showcase])"
    )
  );

  sections.forEach((section) => {
    const isWork = section.id === "work";
    const rect = section.getBoundingClientRect();

    // Only pre-hide sections that start below the visible area
    if (rect.top <= vh * 0.5) return;

    // Headings
    const headings = section.querySelectorAll<HTMLElement>("h2, h3");
    headings.forEach((h) => preHide(h, 48));

    // Paragraphs
    if (!isWork) {
      const paras = section.querySelectorAll<HTMLElement>(
        "p:not([class*='review']):not([class*='quote'])"
      );
      paras.forEach((p) => preHide(p, 28));
    }

    // Data-stagger cards
    if (!isWork) {
      const cards = section.querySelectorAll<HTMLElement>("[data-stagger]");
      cards.forEach((c) => preHide(c, 44, 0.93));

      // Article cards
      const articles = section.querySelectorAll<HTMLElement>(
        "article:not([class*='review'])"
      );
      articles.forEach((a) => preHide(a, 40, 0.94));

      // Images
      const imgs = section.querySelectorAll<HTMLElement>("img");
      imgs.forEach((img) => preHide(img, 24, 0.95));
    }
  });

  // One observer handles everything — threshold 0.04 fires almost immediately
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        const section = target as HTMLElement;
        const isWork = section.id === "work";

        // Headings — animate first
        const headings = section.querySelectorAll<HTMLElement>("h2, h3");
        if (headings.length) {
          animIn(Array.from(headings), { stagger: 0.1, duration: 1 });
        }

        if (!isWork) {
          // Paragraphs — slight delay after headings
          const paras = section.querySelectorAll<HTMLElement>(
            "p:not([class*='review']):not([class*='quote'])"
          );
          if (paras.length) {
            animIn(Array.from(paras), { stagger: 0.06, duration: 0.85, delay: 0.08 });
          }

          // Stagger cards — pop in with spring
          const cards = section.querySelectorAll<HTMLElement>("[data-stagger]");
          if (cards.length) {
            gsap.to(Array.from(cards), {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.82,
              ease: "back.out(1.6)",
              stagger: { amount: 0.48, from: "start" },
              delay: 0.08,
              clearProps: "transform",
            });
          }

          // Article cards
          const articles = section.querySelectorAll<HTMLElement>(
            "article:not([class*='review'])"
          );
          if (articles.length) {
            gsap.to(Array.from(articles), {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.5)",
              stagger: { amount: 0.5, from: "start" },
              delay: 0.08,
              clearProps: "transform",
            });
          }

          // Images
          const imgs = section.querySelectorAll<HTMLElement>("img");
          if (imgs.length) {
            animIn(Array.from(imgs), { stagger: 0.08, duration: 1, delay: 0.12 });
          }
        }

        observer.unobserve(target);
      });
    },
    { threshold: 0.04 }
  );

  sections.forEach((s) => observer.observe(s));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AnimationOrchestrator() {
  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 2.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.65,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    runHeroAnims();
    runShowcaseAnim();
    runScrollAnims();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
