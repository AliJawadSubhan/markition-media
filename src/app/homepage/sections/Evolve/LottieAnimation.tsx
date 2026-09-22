"use client";

import { useEffect, useRef } from "react";

const LOTTIE_CDN = "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js";
const HALO_JSON_PATH = "/halo-branding-evolution-dna.json";

type LottieAnimation = {
  addEventListener?: (event: string, cb: () => void) => void;
  destroy: () => void;
  goToAndStop: (value: number, isFrame?: boolean) => void;
  resize?: () => void;
  totalFrames: number;
};

type LottieGlobal = {
  loadAnimation: (opts: {
    autoplay: boolean;
    container: Element;
    loop: boolean;
    path: string;
    renderer: "svg" | "canvas" | "html";
    rendererSettings?: Record<string, unknown>;
  }) => LottieAnimation;
};

declare global {
  interface Window { lottie?: LottieGlobal; }
}

function loadLottieScript(): Promise<LottieGlobal> {
  if (window.lottie) return Promise.resolve(window.lottie);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${LOTTIE_CDN}"]`);
    if (existing) {
      existing.addEventListener("load", () => window.lottie ? resolve(window.lottie) : reject());
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = LOTTIE_CDN;
    s.async = true;
    s.onload = () => window.lottie ? resolve(window.lottie) : reject();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function LottieAnimation() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<LottieAnimation | null>(null);

  useEffect(() => {
    let frame = 0;
    let destroyed = false;

    const sync = () => {
      const anim = animRef.current;
      const el = mountRef.current;
      if (!anim || !anim.totalFrames || !el) return;

      // Map scroll relative to this element entering/leaving the viewport
      const rect = el.getBoundingClientRect();
      const start = -el.clientHeight;       // element bottom just enters from bottom
      const end   = window.innerHeight;     // element top just exits at top
      const progress = 1 - (rect.top - start) / (end - start);
      const clamped = Math.min(1, Math.max(0, progress));

      anim.goToAndStop(clamped * (anim.totalFrames - 1), true);
    };

    const requestSync = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(sync);
    };

    loadLottieScript().then((lottie) => {
      if (!mountRef.current || destroyed) return;
      const container = mountRef.current;
      animRef.current = lottie.loadAnimation({
        autoplay: false,
        container,
        loop: false,
        path: HALO_JSON_PATH,
        renderer: "canvas",
        rendererSettings: { clearCanvas: true, progressiveLoad: true, preserveAspectRatio: "xMidYMid meet" },
      });
      animRef.current.addEventListener?.("DOMLoaded", () => {
        // Boost canvas resolution to device pixel ratio
        const canvas = container.querySelector("canvas");
        if (canvas) {
          const dpr = Math.min(window.devicePixelRatio ?? 1, 3);
          const w = container.clientWidth;
          const h = container.clientHeight;
          canvas.width = w * dpr;
          canvas.height = h * dpr;
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          const ctx = canvas.getContext("2d");
          if (ctx) ctx.scale(dpr, dpr);
        }
        sync();
      });
    }).catch(() => {});

    const handleResize = () => { animRef.current?.resize?.(); requestSync(); };

    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      destroyed = true;
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frame);
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        width: "min(680px, 92%)",
        height: "clamp(180px, 24vw, 340px)",
        margin: "0 auto",
        pointerEvents: "none",
      }}
    />
  );
}
