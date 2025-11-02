"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <motion.section
      ref={ref}
      id="about"
      style={{ y: yParallax }}
      className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-transparent overflow-hidden"
    >
      {/* Gradient subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] top-20 left-1/4 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-[140px] bottom-20 right-1/4 animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f0f]/60 to-[#0f0f0f]" />
      </div>

      <div className="max-w-4xl">
        <Reveal>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About <span className="text-cyan-400">Me</span>
          </motion.h2>
        </Reveal>

        {/* Animated underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-10 rounded-full"
        />

        <Reveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            I’m <span className="text-white font-semibold">Alex Ciobotea</span>,
            a developer passionate about crafting seamless digital experiences
            that blend design, performance and cutting-edge technology. <br /> <br />
            With a background in{" "}
            <motion.span
              className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-medium"
              initial={{ backgroundPosition: "0%" }}
              whileInView={{ backgroundPosition: "100%" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            >
              Automation and Computer Science
            </motion.span>
            , I focus on building modern web applications that are both visually
            striking and technically solid — turning complex ideas into simple,
            engaging interfaces.
          </motion.p>
        </Reveal>

        <Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-10 inline-block relative"
          >
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full transition duration-300 shadow-lg hover:shadow-cyan-500/40 before:absolute before:inset-0 before:rounded-full before:bg-cyan-500/20 before:blur-2xl before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            >
              Let’s Collaborate
            </button>
          </motion.div>
        </Reveal>
      </div>
    </motion.section>
  );
}