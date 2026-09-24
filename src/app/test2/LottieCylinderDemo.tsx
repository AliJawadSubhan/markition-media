"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./test2.module.css";

const LOTTIE_CDN = "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js";
const TOTAL_FRAMES = 180;

type LottieAnimation = {
  destroy: () => void;
  goToAndStop: (value: number, isFrame?: boolean) => void;
  setSubframe?: (useSubframes: boolean) => void;
};

type LottieGlobal = {
  loadAnimation: (options: {
    animationData: Record<string, unknown>;
    autoplay: boolean;
    container: Element;
    loop: boolean;
    renderer: "svg" | "canvas" | "html";
    rendererSettings?: Record<string, unknown>;
  }) => LottieAnimation;
};

type WindowWithLottie = Window & typeof globalThis & { lottie?: LottieGlobal };

const heights = [310, 270, 232, 194, 158, 126, 104, 126, 158, 194, 232, 270, 310];
const speeds = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3.5, 3, 2.5, 2];

function ease() {
  return {
    i: { x: [0.42], y: [1] },
    o: { x: [0.58], y: [0] },
  };
}

type ScaleKey = ReturnType<typeof ease> & { s: number[]; t: number };

function scaleKeys(speed: number) {
  const cycles = Math.max(1, Math.round(speed / 2));
  const keys: ScaleKey[] = [];

  for (let i = 0; i <= cycles * 2; i += 1) {
    const t = (TOTAL_FRAMES / (cycles * 2)) * i;
    const narrow = i % 2 === 1;
    keys.push({
      ...ease(),
      s: narrow ? [30, 100, 100] : [100, 100, 100],
      t,
    });
  }

  return keys.map((key, index) => ({
    ...key,
    e: index < keys.length - 1 ? keys[index + 1].s[0] : undefined,
  }));
}

// Each group needs its own transform object — Lottie mutates these internally
function makeTr() {
  return {
    ty: "tr",
    p: { a: 0, k: [0, 0] },
    a: { a: 0, k: [0, 0] },
    s: { a: 0, k: [100, 100] },
    r: { a: 0, k: 0 },
    o: { a: 0, k: 100 },
    sk: { a: 0, k: 0 },
    sa: { a: 0, k: 0 },
  };
}

function cylinderLayer(index: number, x: number, height: number, speed: number) {
  const width = 46;
  const capHeight = 17;
  const bodyHeight = height - capHeight;

  return {
    ddd: 0,
    ind: index + 1,
    ty: 4,
    nm: `tube ${index + 1}`,
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [x, 320, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: scaleKeys(speed) },
    },
    ao: 0,
    shapes: [
      // ── 1. Cast shadow beneath cylinder ──────────────────────
      {
        ty: "gr",
        nm: "cast shadow",
        it: [
          {
            ty: "el",
            p: { a: 0, k: [4, height / 2 + capHeight * 0.35] },
            s: { a: 0, k: [width * 0.85, capHeight * 0.5] },
          },
          { ty: "fl", c: { a: 0, k: [0, 0.01, 0.05, 1] }, o: { a: 0, k: 55 }, r: 1 },
          makeTr(),
        ],
      },
      // ── 2. Glass tube body ────────────────────────────────────
      {
        ty: "gr",
        nm: "glass tube",
        it: [
          {
            ty: "rc",
            nm: "body",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [width, bodyHeight] },
            r: { a: 0, k: 5 },
          },
          { ty: "fl", c: { a: 0, k: [0.02, 0.34, 1, 1] }, o: { a: 0, k: 58 }, r: 1 },
          {
            ty: "st",
            c: { a: 0, k: [0.7, 0.92, 1, 1] },
            o: { a: 0, k: 94 },
            w: { a: 0, k: 2.5 },
            lc: 1,
            lj: 1,
            ml: 4,
          },
          {
            ty: "rc",
            nm: "left highlight",
            p: { a: 0, k: [-width * 0.24, 0] },
            s: { a: 0, k: [4, bodyHeight * 0.94] },
            r: { a: 0, k: 2 },
          },
          { ty: "fl", c: { a: 0, k: [0.9, 0.98, 1, 1] }, o: { a: 0, k: 78 }, r: 1 },
          makeTr(),
        ],
      },
      // ── 3. Right-side shadow strip ────────────────────────────
      {
        ty: "gr",
        nm: "right shadow",
        it: [
          {
            ty: "rc",
            p: { a: 0, k: [width * 0.27, 0] },
            s: { a: 0, k: [10, bodyHeight * 0.9] },
            r: { a: 0, k: 2 },
          },
          { ty: "fl", c: { a: 0, k: [0, 0.03, 0.14, 1] }, o: { a: 0, k: 75 }, r: 1 },
          makeTr(),
        ],
      },
      // ── 4. Bottom darkening ───────────────────────────────────
      {
        ty: "gr",
        nm: "bottom dark",
        it: [
          {
            ty: "rc",
            p: { a: 0, k: [2, bodyHeight * 0.27] },
            s: { a: 0, k: [width - 4, bodyHeight * 0.46] },
            r: { a: 0, k: 4 },
          },
          { ty: "fl", c: { a: 0, k: [0, 0.03, 0.15, 1] }, o: { a: 0, k: 38 }, r: 1 },
          makeTr(),
        ],
      },
      // ── 5. Caps (top bright, bottom dark) ────────────────────
      {
        ty: "gr",
        nm: "caps",
        it: [
          {
            ty: "el",
            nm: "top cap",
            p: { a: 0, k: [0, -height / 2] },
            s: { a: 0, k: [width, capHeight] },
          },
          {
            ty: "st",
            c: { a: 0, k: [0.78, 0.94, 1, 1] },
            o: { a: 0, k: 100 },
            w: { a: 0, k: 3 },
            lc: 1,
            lj: 1,
            ml: 4,
          },
          { ty: "fl", c: { a: 0, k: [0.04, 0.28, 0.95, 1] }, o: { a: 0, k: 24 }, r: 1 },
          {
            ty: "el",
            nm: "bottom cap",
            p: { a: 0, k: [0, height / 2] },
            s: { a: 0, k: [width, capHeight] },
          },
          {
            ty: "st",
            c: { a: 0, k: [0.30, 0.54, 0.82, 1] },
            o: { a: 0, k: 96 },
            w: { a: 0, k: 3 },
            lc: 1,
            lj: 1,
            ml: 4,
          },
          { ty: "fl", c: { a: 0, k: [0.01, 0.08, 0.38, 1] }, o: { a: 0, k: 62 }, r: 1 },
          makeTr(),
        ],
      },
    ],
    ip: 0,
    op: TOTAL_FRAMES,
    st: 0,
    bm: 0,
  };
}

function makeAnimationData() {
  const spacing = 72;
  const startX = 600 - ((heights.length - 1) * spacing) / 2;

  return {
    v: "5.12.2",
    fr: 60,
    ip: 0,
    op: TOTAL_FRAMES,
    w: 1200,
    h: 640,
    nm: "scroll cylinder lottie test",
    ddd: 0,
    assets: [],
    layers: heights.map((height, index) =>
      cylinderLayer(index, startX + index * spacing, height, speeds[index]),
    ),
  };
}

function getLottie() {
  return (window as WindowWithLottie).lottie;
}

function loadLottieScript() {
  if (getLottie()) {
    return Promise.resolve(getLottie()!);
  }

  return new Promise<LottieGlobal>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${LOTTIE_CDN}"]`);

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        const lottie = getLottie();
        if (lottie) {
          resolve(lottie);
        } else {
          reject(new Error("Lottie loaded without exposing window.lottie"));
        }
      });
      existingScript.addEventListener("error", () => reject(new Error("Unable to load Lottie")));
      return;
    }

    const script = document.createElement("script");
    script.src = LOTTIE_CDN;
    script.async = true;
    script.onload = () => {
      const lottie = getLottie();
      if (lottie) {
        resolve(lottie);
      } else {
        reject(new Error("Lottie loaded without exposing window.lottie"));
      }
    };
    script.onerror = () => reject(new Error("Unable to load Lottie"));
    document.head.appendChild(script);
  });
}

export default function LottieCylinderDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<LottieAnimation | null>(null);
  const wheelOffset = useRef(0);
  const baseScrollY = useRef(0);
  const [status, setStatus] = useState("Loading Bodymovin");

  useEffect(() => {
    let frameRequest = 0;
    let destroyed = false;

    loadLottieScript()
      .then((lottie) => {
        if (!containerRef.current || destroyed) {
          return;
        }

        setStatus("");
        baseScrollY.current = window.scrollY;
        animationRef.current = lottie.loadAnimation({
          animationData: makeAnimationData(),
          autoplay: false,
          container: containerRef.current,
          loop: false,
          renderer: "svg",
          rendererSettings: {
            className: styles.lottieSvg,
            progressiveLoad: true,
          },
        });
        animationRef.current.setSubframe?.(false);

        const draw = () => {
          const signal = window.scrollY - baseScrollY.current + wheelOffset.current;
          const frame = ((signal / 7) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES;
          animationRef.current?.goToAndStop(frame, true);
          frameRequest = window.requestAnimationFrame(draw);
        };

        frameRequest = window.requestAnimationFrame(draw);
      })
      .catch(() => {
        setStatus("Could not load Bodymovin from cdnjs");
      });

    const handleWheel = (event: WheelEvent) => {
      wheelOffset.current += event.deltaY;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      destroyed = true;
      window.removeEventListener("wheel", handleWheel);
      window.cancelAnimationFrame(frameRequest);
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.scene} aria-label="Bodymovin Lottie cylinder test">
        <div ref={containerRef} className={styles.lottieMount} />
        {status ? <p className={styles.status}>{status}</p> : null}
      </section>
      <section className={styles.scrollSpace} aria-hidden="true" />
    </main>
  );
}
