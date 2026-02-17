"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: "Funciones" },
    { href: "#how-it-works", label: "Cómo Funciona" },
    { href: "#contact", label: "Contacto" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.5 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-2xl"
    >
      <nav
        className={`glass-nav rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-700 ${
          scrolled ? "bg-canvas/80" : ""
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
            <span className="relative text-white font-black text-sm">N</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-pure-white/90 group-hover:text-pure-white transition-colors">
            Noora
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-[13px] font-medium text-pure-white/45 hover:text-pure-white/90 transition-colors duration-300 rounded-lg hover:bg-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <MagneticButton
          as="a"
          href="#contact"
          className="hidden md:inline-flex btn-primary text-white text-[13px] font-semibold px-5 py-2 rounded-xl"
        >
          Solicitar Acceso
        </MagneticButton>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 group"
          aria-label="Menú"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1.5px] bg-pure-white/60 group-hover:bg-pure-white/90 transition-colors"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[1.5px] bg-pure-white/60 group-hover:bg-pure-white/90 transition-colors"
          />
          <motion.span
            animate={
              mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
            }
            className="block w-5 h-[1.5px] bg-pure-white/60 group-hover:bg-pure-white/90 transition-colors"
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-nav rounded-2xl mt-2 p-5 flex flex-col gap-1 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-pure-white/70 font-medium py-3 px-4 rounded-xl hover:bg-white/[0.04] transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary text-white text-sm font-semibold px-5 py-3 rounded-xl text-center mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Solicitar Acceso
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
