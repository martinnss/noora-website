"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const words = [
  "Memoria contextual",
  "Insights en tiempo real",
  "Detección de contradicciones",
  "Próximos pasos automáticos",
  "Conexión entre reuniones",
  "Resúmenes inteligentes",
  "Respuestas instantáneas",
  "Seguimiento de compromisos",
  "Análisis de proyectos",
  "Historial completo",
  "Alertas proactivas",
  "Inteligencia colaborativa",
];

export default function Marquee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Row 1 */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-canvas to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-canvas to-transparent z-10" />
          <div className="flex animate-marquee">
            {[...words, ...words].map((word, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-2 px-6 py-3 rounded-xl border border-white/[0.04] bg-white/[0.02] text-pure-white/30 text-[13px] font-medium whitespace-nowrap hover:bg-white/[0.04] hover:text-pure-white/50 hover:border-white/[0.08] transition-all duration-500 cursor-default"
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (reverse) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-canvas to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-canvas to-transparent z-10" />
          <div className="flex animate-marquee-reverse">
            {[...words.slice(6), ...words.slice(0, 6), ...words.slice(6), ...words.slice(0, 6)].map(
              (word, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 mx-2 px-6 py-3 rounded-xl border border-white/[0.04] bg-white/[0.02] text-pure-white/30 text-[13px] font-medium whitespace-nowrap hover:bg-white/[0.04] hover:text-pure-white/50 hover:border-white/[0.08] transition-all duration-500 cursor-default"
                >
                  {word}
                </div>
              )
            )}
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
