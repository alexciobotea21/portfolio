"use client";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { Code, Brush, Zap, Rocket } from "lucide-react";

const services = [
  {
    icon: <Code size={40} />,
    title: "Web Development",
    description:
      "Modern, responsive websites built with React, Next.js and the latest tech stack — optimized for speed and scalability.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: <Brush size={40} />,
    title: "UI/UX Design",
    description:
      "Clean and functional interfaces that combine minimal design with strong user experience principles.",
    color: "from-pink-500 to-violet-500",
  },
  {
    icon: <Zap size={40} />,
    title: "Automation & Integrations",
    description:
      "Smart automations for contact forms, analytics, AI chatbots and business workflows using APIs and modern tools.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: <Rocket size={40} />,
    title: "Brand Launch",
    description:
      "Complete launch packages — from domain setup and hosting to brand visuals, SEO and deployment.",
    color: "from-green-400 to-emerald-500",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-32 px-6 bg-transparent text-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_#0a0a0a_0%,_#000_100%)] opacity-80"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#111]/70 to-[#0f0f0f] -z-10" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative inline-block mb-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              My <span className="text-cyan-400">Services</span>
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-10 rounded-full"
            />
          </motion.div>
        </Reveal>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-400 mb-16"
        >
          Services crafted to deliver impact, precision, and beauty.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <Reveal key={i}>
              <motion.div
                whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
                viewport={{ once: true }}
                className="relative group cursor-default"
              >
                <div
                  className={`p-[1px] rounded-2xl bg-gradient-to-r ${service.color} transition-all duration-700`}
                >
                  <div className="p-8 rounded-2xl bg-[#0f0f0f]/90 border border-gray-800 relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 60%)",
                      }}
                    />

                    <div
                      className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${service.color} text-white`}
                    >
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-semibold mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}