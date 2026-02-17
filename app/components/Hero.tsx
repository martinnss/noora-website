"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ExplodedAssembly from "./ExplodedAssembly";
import MagneticButton from "./MagneticButton";
import { StaggeredHeading } from "./TextReveal";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden"
    >
      {/* Grid pattern background with parallax scale */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 grid-pattern opacity-50 will-change-transform"
      />

      {/* Exploded Assembly — wireframe assembly animation */}
      <ExplodedAssembly />

      {/* Ambient glows with motion */}
      <motion.div
        animate={{
          scale: [0.85, 1.15, 0.85],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(45,168,143,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{
          scale: [1.15, 0.85, 1.15],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(77,154,155,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(45,168,143,0.05) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Content */}
      <motion.div style={{ y: y1, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge with toggle snap animation */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 glass-card rounded-full px-5 py-2.5 mb-8"
        >
          {/* Toggle switch with elastic snap */}
          <motion.span
            className="relative flex h-5 w-9 rounded-full bg-accent/20 items-center px-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.span
              className="block h-3.5 w-3.5 rounded-full bg-accent"
              initial={{ x: 0 }}
              animate={{ x: 14 }}
              transition={{
                delay: 0.8,
                type: "spring",
                stiffness: 500,
                damping: 15,
              }}
            />
          </motion.span>
          <span className="text-[13px] font-medium text-pure-white/50 tracking-wide">
            Acceso anticipado abierto
          </span>
        </motion.div>

        {/* Headline — Staggered Lift Reveal */}
        <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.92] tracking-[-0.04em] mb-6">
          <StaggeredHeading
            delay={0.4}
            stagger={0.08}
            lines={[
              { text: "Tu copiloto", className: "text-gradient" },
              { text: "inteligente para", className: "text-gradient" },
              { text: "reuniones", className: "text-gradient-accent" },
            ]}
          />
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-pure-white/35 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Noora entiende tus proyectos, recuerda cada conversación y te entrega
          insights, respuestas y próximos pasos{" "}
          <span className="text-pure-white/60 font-medium">en tiempo real</span>{" "}
          mientras estás en tu reunión.
        </motion.p>

        {/* CTA Buttons — Magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#contact"
            className="btn-primary text-white font-semibold px-8 py-4 rounded-2xl text-[15px]"
          >
            Solicitar Acceso Anticipado
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#how-it-works"
            className="btn-ghost font-medium px-8 py-4 rounded-2xl text-[15px]"
          >
            Ver cómo funciona →
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Floating App Preview */}
      <motion.div
        style={{ y: y2 }}
        initial={{ opacity: 0, y: 60, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-12 w-full max-w-5xl mx-auto"
      >
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

          <div className="glass-strong rounded-3xl p-1.5 card-shine border-orbit">
            {/* Mock Meeting UI */}
            <div className="bg-canvas rounded-[20px] p-4 md:p-6 overflow-hidden relative">
              {/* Faint inner glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              {/* Top bar */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pure-white/10" />
                  <div className="w-3 h-3 rounded-full bg-pure-white/10" />
                  <div className="w-3 h-3 rounded-full bg-pure-white/10" />
                </div>
                <div className="flex items-center gap-2.5 glass-card rounded-full px-3 py-1.5">
                  <div className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                  </div>
                  <span className="text-pure-white/40 text-[11px] font-medium tracking-wide">
                    REC · Reunión en curso
                  </span>
                </div>
                <span className="text-pure-white/20 text-[11px] font-mono">
                  14:32:08
                </span>
              </div>

              {/* Meeting content grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Transcription column */}
                <div className="md:col-span-3 space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/80 to-indigo-600/80 flex items-center justify-center text-white text-xs font-bold shrink-0 ring-1 ring-white/10">
                      ML
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-pure-white/80 text-[13px] font-medium">María López</p>
                        <span className="text-pure-white/20 text-[10px]">14:28</span>
                      </div>
                      <p className="text-pure-white/30 text-[12px] leading-relaxed">
                        &quot;¿Cuál es la fecha estimada de entrega del proyecto Alpha? Necesitamos confirmar con el cliente.&quot;
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.7, duration: 0.5 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/80 to-teal-600/80 flex items-center justify-center text-white text-xs font-bold shrink-0 ring-1 ring-white/10">
                      CR
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-pure-white/80 text-[13px] font-medium">Carlos Ruiz</p>
                        <span className="text-pure-white/20 text-[10px]">14:30</span>
                      </div>
                      <p className="text-pure-white/30 text-[12px] leading-relaxed">
                        &quot;Los resultados de Q3 ya están listos, superamos la meta en un 12%.&quot;
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.9, duration: 0.5 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                  >
                    <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/80 to-orange-600/80 flex items-center justify-center text-white text-xs font-bold shrink-0 ring-1 ring-accent/30">
                      <div className="absolute -inset-0.5 rounded-full ring-2 ring-accent/20 animate-pulse" />
                      AP
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-pure-white/80 text-[13px] font-medium">Ana Pérez</p>
                        <span className="text-accent/60 text-[10px] font-medium">hablando...</span>
                      </div>
                      <p className="text-pure-white/30 text-[12px] leading-relaxed">
                        &quot;Sobre el presupuesto del próximo trimestre...&quot;
                        <span className="inline-block w-[2px] h-3 bg-accent/60 ml-0.5 align-middle" style={{ animation: "blink 1s infinite" }} />
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Noora Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: 2.1, duration: 0.6 }}
                  className="md:col-span-2 space-y-3"
                >
                  <div className="rounded-xl p-4 border border-accent/15 bg-accent/[0.04] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-2xl" />
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                        <span className="relative text-white text-[9px] font-black">N</span>
                      </div>
                      <span className="text-accent text-[10px] font-bold tracking-[0.1em]">NOORA · SUGERENCIA</span>
                    </div>
                    <p className="text-pure-white/60 text-[11px] leading-[1.6]">
                      📅 Proyecto Alpha: entrega estimada{" "}
                      <span className="text-accent font-semibold">15 marzo 2026</span>{" "}
                      según reunión del 3 de febrero.
                    </p>
                  </div>

                  <div className="rounded-xl p-4 border border-yellow-500/10 bg-yellow-500/[0.03] relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      <span className="text-yellow-500/80 text-[10px] font-bold tracking-[0.1em]">CONTRADICCIÓN DETECTADA</span>
                    </div>
                    <p className="text-pure-white/40 text-[11px] leading-[1.6]">
                      Carlos dijo Q3 listo, pero el reporte del 10/feb registra 3 entregables pendientes.
                    </p>
                  </div>

                  <div className="rounded-xl p-4 border border-emerald-500/10 bg-emerald-500/[0.03] relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-emerald-500/80 text-[10px] font-bold tracking-[0.1em]">PRÓXIMO PASO</span>
                    </div>
                    <p className="text-pure-white/40 text-[11px] leading-[1.6]">
                      Agendar revisión técnica de proyecto Alpha antes del 20 de febrero.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        style={{ opacity }}
        className="relative z-10 mt-8 flex flex-col items-center gap-3"
      >
        <span className="text-pure-white/20 text-[11px] tracking-[0.2em] uppercase font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-pure-white/10 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-pure-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
