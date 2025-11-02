"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-8 h-8 bg-cyan-400/30 rounded-full pointer-events-none mix-blend-screen blur-lg transition-transform duration-150 ease-out z-[9999]"
      style={{
        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
      }}
    />
  );
}