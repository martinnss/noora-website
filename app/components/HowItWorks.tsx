"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Conecta tus proyectos",
    description:
      "Integra tus herramientas de gestión, emails y documentos. Noora aprende el contexto de cada proyecto automáticamente.",
    detail: "Slack · Notion · Jira · Google Drive · Email",
  },
  {
    number: "02",
    title: "Únete a tu reunión",
    description:
      "Inicia tu reunión como siempre. Noora escucha y entiende la conversación en tiempo real, identificando temas y preguntas.",
    detail: "Zoom · Meet · Teams · Presencial",
  },
  {
    number: "03",
    title: "Recibe insights al instante",
    description:
      "Noora te muestra respuestas, alertas de contradicciones y sugerencias mientras la reunión sucede. Tú decides qué compartir.",
    detail: "Respuestas · Alertas · Sugerencias · Datos",
  },
  {
    number: "04",
    title: "Resumen y next steps",
    description:
      "Al terminar, obtén un resumen completo con decisiones tomadas, compromisos adquiridos y próximos pasos asignados automáticamente.",
    detail: "Resumen · Tareas · Responsables · Fechas",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group"
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute top-1/2 -right-[calc(50%-12px)] w-[calc(100%-24px)] h-px">
          <div className="w-full h-full bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
      )}

      <div className="glass-card-hover rounded-2xl p-8 h-full relative overflow-hidden">
        {/* Large faded number */}
        <span className="absolute top-4 right-5 text-[80px] font-black text-pure-white/[0.02] leading-none select-none">
          {step.number}
        </span>

        {/* Step indicator */}
        <div className="relative mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent/[0.08] border border-accent/10 flex items-center justify-center group-hover:bg-accent/[0.12] group-hover:border-accent/20 transition-all duration-500">
            <span className="text-accent/80 text-sm font-bold font-mono">
              {step.number}
            </span>
          </div>
          {/* Glow */}
          <div className="absolute -inset-2 rounded-xl bg-accent/[0.04] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        <h3 className="text-lg font-semibold text-pure-white/90 mb-3 tracking-tight">
          {step.title}
        </h3>
        <p className="text-[14px] text-pure-white/35 leading-relaxed mb-5">
          {step.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {step.detail.split(" · ").map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-pure-white/20 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.04]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-32 px-6 overflow-hidden">
      {/* Dot matrix background */}
      <div className="absolute inset-0 dot-matrix opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6"
        >
          <span className="inline-block text-[11px] font-bold text-accent/70 tracking-[0.2em] uppercase mb-5">
            Cómo Funciona
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gradient mb-6 leading-tight">
            Simple de usar,
            <br />
            poderoso en cada reunión
          </h2>
          <p className="text-base md:text-lg text-pure-white/30 max-w-xl mx-auto font-light">
            Cuatro pasos para transformar la manera en que trabajas con tu equipo.
          </p>
        </motion.div>

        {/* Progress line */}
        <div className="relative max-w-3xl mx-auto mb-16">
          <div className="h-px bg-white/[0.04] w-full" />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-0 left-0 h-px bg-gradient-to-r from-accent/40 via-accent/20 to-transparent"
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
