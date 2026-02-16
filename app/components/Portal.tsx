"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Portal() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 px-6 overflow-hidden"
    >
      {/* Top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas pointer-events-none" />

      {/* Portal Ring System */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer ring */}
        <motion.div
          style={{ rotate, scale }}
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px]"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(255,111,97,0.12) 10%, transparent 20%, rgba(77,154,155,0.06) 35%, transparent 50%, rgba(255,111,97,0.08) 65%, transparent 80%, rgba(77,154,155,0.04) 90%, transparent 100%)",
              filter: "blur(50px)",
            }}
          />
        </motion.div>

        {/* Inner ring (counter-rotate) */}
        <motion.div
          style={{
            rotate: useTransform(scrollYProgress, [0, 1], [0, -120]),
            scale,
          }}
          className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "conic-gradient(from 90deg, transparent 0%, rgba(255,111,97,0.06) 15%, transparent 30%, rgba(77,154,155,0.04) 50%, transparent 70%, rgba(255,111,97,0.05) 85%, transparent 100%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        {/* Center glow */}
        <div
          className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,111,97,0.06) 0%, transparent 70%)",
            animation: "pulseRing 6s ease-in-out infinite",
          }}
        />

        {/* Decorative rings */}
        <div className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-white/[0.02]" />
        <div className="absolute w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-white/[0.015]" />
      </div>

      {/* Content */}
      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[0.95] tracking-tight">
          <span className="text-gradient">El futuro de las</span>
          <br />
          <span className="text-gradient-accent">reuniones</span>
          <span className="text-gradient"> es ahora</span>
        </h2>
        <p className="text-base md:text-lg text-pure-white/30 max-w-lg mx-auto mb-16 leading-relaxed font-light">
          No pierdas más tiempo buscando información durante una reunión. Noora
          te da superpoderes para decidir mejor, más rápido.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-16">
          {[
            { value: "80%", label: "menos tiempo buscando info" },
            { value: "3x", label: "reuniones más productivas" },
            { value: "100%", label: "contexto siempre disponible" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-black text-gradient-accent mb-1">
                {stat.value}
              </p>
              <p className="text-[11px] text-pure-white/25 leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="inline-flex btn-primary font-semibold px-10 py-4 rounded-2xl text-[15px] glow-accent-strong"
        >
          Únete al futuro →
        </motion.a>
      </motion.div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
