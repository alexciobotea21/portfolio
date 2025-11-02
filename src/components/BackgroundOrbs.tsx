"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundOrbs() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== "undefined") {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const x1 = useTransform(smoothX, [0, windowSize.width], ["-15%", "15%"]);
  const y1 = useTransform(smoothY, [0, windowSize.height], ["-10%", "10%"]);
  const x2 = useTransform(smoothX, [0, windowSize.width], ["10%", "-10%"]);
  const y2 = useTransform(smoothY, [0, windowSize.height], ["5%", "-5%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-[1] will-change-transform mix-blend-screen pointer-events-none">
      {/* Orb 1 — Cyan */}
      <motion.div
        className="absolute rounded-full blur-[100px] opacity-50"
        style={{
          width: 450,
          height: 450,
          top: "15%",
          left: "10%",
          background: "radial-gradient(circle, rgba(0,229,255,0.8), transparent 70%)",
          x: x1,
          y: y1,
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Orb 2 — Purple */}
      <motion.div
        className="absolute rounded-full blur-[120px] opacity-45"
        style={{
          width: 550,
          height: 550,
          bottom: "10%",
          right: "15%",
          background: "radial-gradient(circle, rgba(124,58,237,0.8), transparent 70%)",
          x: x2,
          y: y2,
        }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
    </div>
  );
}