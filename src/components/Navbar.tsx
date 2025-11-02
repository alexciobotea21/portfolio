"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  // scroll blur + shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((sec) => {
        const top = window.scrollY;
        if (top >= (sec as HTMLElement).offsetTop - 200) current = sec.id;
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[#0f0f0f]/60 shadow-lg border-b border-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      {/* Gradient bar */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="text-xl font-semibold text-cyan-400 hover:opacity-90 transition"
        >
          Alex<span className="text-white">Dev</span>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative transition duration-300 ${
                activeSection === item.id
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-cyan-400"
              }`}
            >
              {item.label}
              {/* animated underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-cyan-400 transition-all duration-300 ${
                  activeSection === item.id
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full"
                }`}
              ></span>
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-cyan-400 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0f0f0f]/95 backdrop-blur-lg text-center py-8 space-y-6"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-lg font-medium ${
                  activeSection === item.id
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                } transition`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}