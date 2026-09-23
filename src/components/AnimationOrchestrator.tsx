"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function AnimationOrchestrator() {
  useEffect(() => {
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

    import("gsap").then(({ gsap }) => {
      // ─── Hero animations ──────────────────────────────────────────────────────
      const heroEls = gsap.utils.toArray<HTMLElement>("[data-hero-anim]");
      if (heroEls.length) {
        gsap.set(heroEls, { y: 56 });
        gsap.to(heroEls, {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power4.out",
          stagger: 0.2,
          delay: 0.15,
          clearProps: "transform",
        });
      }

      const showcaseEl = document.querySelector<HTMLElement>("[data-showcase-anim]");
      if (showcaseEl) {
        gsap.set(showcaseEl, { y: 90, scale: 0.96 });
        gsap.to(showcaseEl, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.7,
          ease: "power3.out",
          delay: 0.65,
          clearProps: "transform",
        });
      }

      // ─── Scroll animations ────────────────────────────────────────────────────
      function preHide(el: HTMLElement, y = 50, scale = 1) {
        gsap.set(el, { opacity: 0, y, scale });
      }

      function animIn(
        els: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
        opts: gsap.TweenVars = {}
      ) {
        gsap.to(els, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9, ease: "power3.out", clearProps: "transform",
          ...opts,
        });
      }

      const vh = window.innerHeight;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          "section:not([data-hero]):not([data-showcase])"
        )
      );

      sections.forEach((section) => {
        const isWork = section.id === "work";
        const rect = section.getBoundingClientRect();
        if (rect.top <= vh * 0.5) return;

        section.querySelectorAll<HTMLElement>("h2, h3").forEach((h) => preHide(h, 48));
        if (!isWork) {
          section.querySelectorAll<HTMLElement>(
            "p:not([class*='review']):not([class*='quote'])"
          ).forEach((p) => preHide(p, 28));
          section.querySelectorAll<HTMLElement>("[data-stagger]").forEach((c) => preHide(c, 44, 0.93));
          section.querySelectorAll<HTMLElement>("article:not([class*='review'])").forEach((a) => preHide(a, 40, 0.94));
          section.querySelectorAll<HTMLElement>("img").forEach((img) => preHide(img, 24, 0.95));
        }
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ isIntersecting, target }) => {
            if (!isIntersecting) return;
            const section = target as HTMLElement;
            const isWork = section.id === "work";

            const headings = section.querySelectorAll<HTMLElement>("h2, h3");
            if (headings.length) animIn(Array.from(headings), { stagger: 0.1, duration: 1 });

            if (!isWork) {
              const paras = section.querySelectorAll<HTMLElement>(
                "p:not([class*='review']):not([class*='quote'])"
              );
              if (paras.length) animIn(Array.from(paras), { stagger: 0.06, duration: 0.85, delay: 0.08 });

              const cards = section.querySelectorAll<HTMLElement>("[data-stagger]");
              if (cards.length) {
                gsap.to(Array.from(cards), {
                  opacity: 1, y: 0, scale: 1,
                  duration: 0.82, ease: "back.out(1.6)",
                  stagger: { amount: 0.48, from: "start" },
                  delay: 0.08, clearProps: "transform",
                });
              }

              const articles = section.querySelectorAll<HTMLElement>("article:not([class*='review'])");
              if (articles.length) {
                gsap.to(Array.from(articles), {
                  opacity: 1, y: 0, scale: 1,
                  duration: 0.8, ease: "back.out(1.5)",
                  stagger: { amount: 0.5, from: "start" },
                  delay: 0.08, clearProps: "transform",
                });
              }

              const imgs = section.querySelectorAll<HTMLElement>("img");
              if (imgs.length) animIn(Array.from(imgs), { stagger: 0.08, duration: 1, delay: 0.12 });
            }

            observer.unobserve(target);
          });
        },
        { threshold: 0.04 }
      );

      sections.forEach((s) => observer.observe(s));
    });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
