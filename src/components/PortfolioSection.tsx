"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import Image from "next/image";

const projects = [
  {
    title: "Luxury eBook Store",
    description:
      "High-end eCommerce built with Next.js and Tailwind, optimized for mobile and SEO.",
    img: "/images/1.png",
    link: "https://enthusiabloom.netlify.app",
    tech: ["Next.js", "Tailwind", "Stripe"],
  },
  {
    title: "Hair Studio Platform",
    description:
      "Full web platform for a Hair studio — bookings, services, blog and CRM integration.",
    img: "/images/2.png",
    link: "https://restaurant-alexdev.netlify.app/",
    tech: ["React", "Firebase", "Framer Motion"],
  },
  {
    title: "Restaurant Website",
    description: "Luxurious Restaurant Experience Site.",
    img: "/images/3.png",
    link: "https://midnight-bistro.lovable.app/?utm_source=lovable-editor",
    tech: ["Node.js", "React", "OpenAI API"],
  },
];

export default function PortfolioSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <motion.section
      ref={ref}
      id="portfolio"
      style={{ y: yParallax }}
      className="relative py-32 px-6 text-center bg-transparent overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 via-[#111]/60 to-[#0f0f0f] -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Title + underline */}
        <Reveal>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Featured <span className="text-cyan-400">Projects</span>
          </motion.h2>
        </Reveal>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-16 rounded-full"
        />

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <Reveal key={i}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="relative group rounded-2xl overflow-hidden border border-gray-800 bg-[#0f0f0f]/70 shadow-lg shadow-black/20"
              >
                {/* Image with gradient overlay */}
                <div className="relative overflow-hidden">
                  <Image
                    src={project.img}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-64 opacity-90 group-hover:opacity-50 transition-all duration-700 ease-out"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 via-purple-500/30 to-transparent"
                  />
                </div>

                {/* Hover content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 px-6">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
                  >
                    View Demo
                  </a>
                </div>

                {/* Tech badges */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {project.tech.map((t, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ boxShadow: "0 0 8px rgba(34,211,238,0.5)" }}
                      className="text-xs bg-gray-800/80 text-gray-300 px-2 py-1 rounded-md transition-all duration-300"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </motion.section>
  );
}