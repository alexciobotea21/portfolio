"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || typeof window === "undefined") {
      return;
    }

    let animationFrame: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const updatePosition = () => {
      if (cursor) {
        cursor.style.transform = `translate(${targetX}px, ${targetY}px)`;
      }
      animationFrame = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX - cursor.offsetWidth / 2;
      targetY = event.clientY - cursor.offsetHeight / 2;

      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 bg-cyan-400/30 rounded-full pointer-events-none mix-blend-screen blur-lg transition-transform duration-150 ease-out z-[9999] will-change-[transform]"
      style={{ transform: "translate(-999px, -999px)" }}
    />
  );
}
