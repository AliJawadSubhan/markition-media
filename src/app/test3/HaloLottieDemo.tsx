"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./test3.module.css";

const LOTTIE_CDN = "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js";
const HALO_JSON_PATH = "/halo-branding-evolution-dna.json";

type LottieAnimation = {
  addEventListener?: (eventName: string, callback: () => void) => void;
  destroy: () => void;
  goToAndStop: (value: number, isFrame?: boolean) => void;
  resize?: () => void;
  setSpeed?: (speed: number) => void;
  totalFrames: number;
};

type LottieGlobal = {
  loadAnimation: (options: {
    autoplay: boolean;
    container: Element;
    loop: boolean;
    path: string;
    renderer: "svg" | "canvas" | "html";
    rendererSettings?: Record<string, unknown>;
  }) => LottieAnimation;
};

type WindowWithLottie = Window & typeof globalThis & { lottie?: LottieGlobal };

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
          reject(new Error("Bodymovin loaded without exposing window.lottie"));
        }
      });
      existingScript.addEventListener("error", () => reject(new Error("Could not load Bodymovin")));
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
        reject(new Error("Bodymovin loaded without exposing window.lottie"));
      }
    };
    script.onerror = () => reject(new Error("Could not load Bodymovin"));
    document.head.appendChild(script);
  });
}

export default function HaloLottieDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<LottieAnimation | null>(null);
  const [status, setStatus] = useState("Loading Halo Lab Lottie JSON");

  useEffect(() => {
    let frameRequest = 0;
    let destroyed = false;

    const syncAnimationToScroll = () => {
      const animation = animationRef.current;

      if (!animation || !animation.totalFrames) {
        return;
      }

      const scrollable = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollable > 0 ? window.scrollY / scrollable : 0;
      const clampedPercent = Math.min(1, Math.max(0, scrollPercent));
      const targetFrame = clampedPercent * (animation.totalFrames - 1);

      animation.goToAndStop(targetFrame, true);
    };

    const requestScrollSync = () => {
      window.cancelAnimationFrame(frameRequest);
      frameRequest = window.requestAnimationFrame(syncAnimationToScroll);
    };

    loadLottieScript()
      .then((lottie) => {
        if (!containerRef.current || destroyed) {
          return;
        }

        animationRef.current = lottie.loadAnimation({
          autoplay: false,
          container: containerRef.current,
          loop: false,
          path: HALO_JSON_PATH,
          renderer: "canvas",
          rendererSettings: {
            clearCanvas: true,
            progressiveLoad: true,
            preserveAspectRatio: "xMidYMid meet",
          },
        });
        animationRef.current.addEventListener?.("DOMLoaded", () => {
          setStatus("");
          syncAnimationToScroll();
        });
        animationRef.current.addEventListener?.("data_failed", () => {
          setStatus("Halo Lab JSON request failed");
        });
        animationRef.current.setSpeed?.(1);
      })
      .catch((error) => {
        setStatus(error instanceof Error ? error.message : "Could not load Halo Lab Lottie");
      });

    const handleResize = () => {
      animationRef.current?.resize?.();
      requestScrollSync();
    };

    window.addEventListener("scroll", requestScrollSync, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      destroyed = true;
      window.removeEventListener("scroll", requestScrollSync);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frameRequest);
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.scene} aria-label="Halo Lab Lottie JSON test">
        <div className={styles.frame}>
          <div ref={containerRef} className={`${styles.lottieMount} branding-evolution__art`} />
          {status ? <p className={styles.status}>{status}</p> : null}
        </div>
      </section>
      <section className={styles.scrollSpace} aria-hidden="true" />
    </main>
  );
}
