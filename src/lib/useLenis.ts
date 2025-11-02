"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const hasPrecisionPointer = window.matchMedia("(pointer: fine)").matches;

    const lenis = new Lenis({
      duration: hasPrecisionPointer ? 0.55 : 0.4,
      lerp: hasPrecisionPointer ? 0.08 : 0.12,
      smoothWheel: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let animationFrame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);
}
