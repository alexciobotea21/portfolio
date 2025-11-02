"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex flex-col justify-center items-center text-center min-h-screen px-6 overflow-hidden"
    >
      {/* 🔹 Parallax gradient background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0a0a0a_0%,#000_100%)] -z-10"
      />

      {/* 🔹 Title with gradient text */}
      <motion.h1
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-bold mb-6"
      >
        Crafting{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          Next-Gen
        </span>{" "}
        Web Experiences
      </motion.h1>

      {/* 🔹 Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true }}
        className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8"
      >
        I build stunning, performant, and interactive websites — blending design,
        motion and technology into seamless user experiences.
      </motion.p>

      {/* 🔹 Call-to-action button with interactive glow */}
      <motion.button
        onClick={() =>
          document
            .getElementById("portfolio")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        onMouseMove={(e) => {
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;
          e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, #00e5ff, #0078ff)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#06b6d4";
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        viewport={{ once: true }}
        className="px-8 py-3 bg-cyan-500 text-black font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-cyan-400/30"
      >
        View My Work
      </motion.button>
    </section>
  );
}