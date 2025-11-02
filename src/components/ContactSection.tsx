"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useState, useRef } from "react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "3%"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/myzbdraw", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <motion.section
      ref={ref}
      style={{ y: yParallax }}
      id="contact"
      className="relative py-32 px-6 text-center overflow-hidden"
    >
      {/* Gradient background and subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 via-[#111]/60 to-[#0f0f0f] -z-10" />
      <div className="absolute w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] top-1/3 left-1/4 -z-10 animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-purple-500/10 blur-[120px] bottom-1/4 right-1/4 -z-10 animate-pulse delay-700" />

      <div className="max-w-3xl mx-auto">
        <Reveal>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Let’s <span className="text-cyan-400">Connect</span>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 mb-12 leading-relaxed"
          >
            Have a project in mind or just want to say hi?  
            Drop a message below and I’ll get back to you soon.
          </motion.p>
        </Reveal>

        <Reveal>
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="bg-[#111] border border-gray-800 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-0 focus:border-transparent shadow-none focus:shadow-cyan-500/20 outline-none transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="bg-[#111] border border-gray-800 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:shadow-purple-500/20 outline-none transition-all"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Your message"
              required
              className="bg-[#111] border border-gray-800 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:shadow-cyan-500/20 outline-none transition-all"
            />

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`relative w-fit mx-auto px-10 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 ${
                status === "sending"
                  ? "bg-cyan-400 text-black"
                  : "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black"
              }`}
            >
              <span className="relative z-10">
                {status === "sending" ? "Sending..." : "Send Message"}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20 translate-x-[-100%]"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </motion.button>
          </motion.form>
        </Reveal>
      </div>

      {/* Animated Toasts */}
      <AnimatePresence>
        {status === "sent" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-400/20 backdrop-blur-xl border border-green-400/40 text-green-300 px-6 py-3 rounded-full font-semibold shadow-lg shadow-green-400/30"
          >
            ✅ Message sent successfully!
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-400/20 backdrop-blur-xl border border-red-400/40 text-red-300 px-6 py-3 rounded-full font-semibold shadow-lg shadow-red-400/30"
          >
            ❌ Something went wrong. Try again!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}