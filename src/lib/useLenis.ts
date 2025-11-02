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
      duration: hasPrecisionPointer ? 0.1 : 0.45,
      lerp: hasPrecisionPointer ? 0.24 : 0.12,
      smoothWheel: true,
      syncTouch: !hasPrecisionPointer,
      syncTouchLerp: 0.3,
      wheelMultiplier: hasPrecisionPointer ? 1.05 : 0.9,
      touchMultiplier: 0.9,
      easing: (t) => t,
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
