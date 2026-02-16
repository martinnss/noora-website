"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer ref={ref} className="relative py-16 px-6">
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
              <span className="relative text-white font-black text-sm">N</span>
            </div>
            <div>
              <span className="text-[15px] font-semibold tracking-tight text-pure-white/80">
                Noora
              </span>
              <span className="text-pure-white/20 text-[12px] ml-2">
                por Noora Labs
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1">
            {[
              { href: "#features", label: "Funciones" },
              { href: "#how-it-works", label: "Cómo Funciona" },
              { href: "#contact", label: "Contacto" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[13px] font-medium text-pure-white/30 hover:text-pure-white/60 transition-colors duration-300 rounded-lg hover:bg-white/[0.02]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
          <p className="text-[12px] text-pure-white/15">
            © {new Date().getFullYear()} Noora Labs. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-pure-white/15">
            <span>Consultoría Tecnológica & IA</span>
            <span className="w-1 h-1 rounded-full bg-pure-white/10" />
            <span>Santiago, Chile</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
