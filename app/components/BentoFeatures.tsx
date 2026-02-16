"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a6 6 0 0 1 6 6c0 4-6 10-6 10S6 12 6 8a6 6 0 0 1 6-6z" />
        <circle cx="12" cy="8" r="2" />
      </svg>
    ),
    title: "Memoria de Proyectos",
    description:
      "Recuerda cada detalle de tus proyectos. Fechas, decisiones, responsables — todo accesible al instante durante cualquier reunión.",
    span: "md:col-span-1 md:row-span-1",
    accent: false,
    visual: (
      <div className="mt-6 space-y-2">
        {["Proyecto Alpha", "Proyecto Beta", "Migración Q1"].map((p, i) => (
          <div
            key={p}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <div className="w-2 h-2 rounded-full bg-accent/60" />
            <span className="text-[11px] text-pure-white/40 font-medium">{p}</span>
            <span className="ml-auto text-[10px] text-pure-white/20">
              {["12 tareas", "8 tareas", "5 tareas"][i]}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Insights en Tiempo Real",
    description:
      "Mientras tu reunión avanza, Noora analiza cada palabra y surfacea datos, respuestas y contexto del momento exacto que necesitas.",
    span: "md:col-span-2 md:row-span-1",
    accent: true,
    visual: (
      <div className="mt-6 relative">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-accent/10">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <span className="text-accent text-xs">⚡</span>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-accent/60 font-bold tracking-wider mb-0.5">EN VIVO</p>
            <p className="text-[11px] text-pure-white/50 leading-relaxed">
              &quot;El presupuesto mencionado (€45K) coincide con la propuesta aprobada el 2 de febrero&quot;
            </p>
          </div>
        </div>
        <div className="absolute -right-1 -bottom-1 w-16 h-16 bg-accent/5 rounded-full blur-xl" />
      </div>
    ),
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Conexión entre Reuniones",
    description:
      "Asocia conversaciones de hoy con las de ayer. Detecta patrones, seguimientos y compromisos que cruzaron reuniones.",
    span: "md:col-span-1 md:row-span-1",
    accent: false,
    visual: (
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
          <span className="text-[10px] text-pure-white/20 font-medium">Hoy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-r from-pure-white/10 to-transparent" />
          <span className="text-[10px] text-pure-white/15 font-medium">3 Feb</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px flex-1 bg-gradient-to-r from-pure-white/5 to-transparent" />
          <span className="text-[10px] text-pure-white/10 font-medium">28 Ene</span>
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Detección de Contradicciones",
    description:
      "Cuando alguien dice algo que contradice datos previos, Noora te alerta silenciosamente. Tú decides si abordarlo o no en la reunión.",
    span: "md:col-span-1 md:row-span-1",
    accent: false,
    visual: (
      <div className="mt-6">
        <div className="p-3 rounded-xl bg-yellow-500/[0.04] border border-yellow-500/10">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <span className="text-[10px] text-yellow-500/50 font-bold tracking-wider">ALERTA</span>
          </div>
          <p className="text-[11px] text-pure-white/35 leading-relaxed">
            Fecha mencionada contradice acta anterior
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: "Próximos Pasos Automáticos",
    description:
      "Al finalizar, Noora genera un resumen con próximos pasos, responsables y fechas. Nada se pierde, nada se olvida.",
    span: "md:col-span-2 md:row-span-1",
    accent: true,
    visual: (
      <div className="mt-6 space-y-2">
        {[
          { task: "Enviar propuesta revisada a cliente", who: "María L.", status: "urgent" },
          { task: "Validar presupuesto Q2 con finanzas", who: "Carlos R.", status: "pending" },
          { task: "Agendar revisión técnica Alpha", who: "Ana P.", status: "scheduled" },
        ].map((item) => (
          <div
            key={item.task}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                item.status === "urgent" ? "bg-accent" : item.status === "pending" ? "bg-yellow-500/60" : "bg-emerald-500/60"
              }`}
            />
            <span className="text-[11px] text-pure-white/40 font-medium flex-1">{item.task}</span>
            <span className="text-[10px] text-pure-white/20 shrink-0">{item.who}</span>
          </div>
        ))}
      </div>
    ),
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`${feature.span} group`}
    >
      <div
        className={`h-full rounded-2xl p-7 md:p-8 card-shine glass-card-hover relative overflow-hidden ${
          feature.accent ? "border-orbit" : ""
        }`}
      >
        {/* Faint accent glow for accent cards */}
        {feature.accent && (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />
        )}

        <div className="relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-pure-white/40 mb-5 group-hover:text-accent/70 group-hover:border-accent/10 group-hover:bg-accent/[0.04] transition-all duration-500">
            {feature.icon}
          </div>

          <h3 className="text-lg font-semibold text-pure-white/90 mb-2 tracking-tight">
            {feature.title}
          </h3>
          <p className="text-[14px] text-pure-white/35 leading-relaxed">
            {feature.description}
          </p>

          {feature.visual}
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoFeatures() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="features" className="relative py-32 px-6">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255,77,0,0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block text-[11px] font-bold text-accent/70 tracking-[0.2em] uppercase mb-5">
            Funciones
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gradient mb-6 leading-tight">
            Todo lo que necesitas,
            <br />
            justo cuando lo necesitas
          </h2>
          <p className="text-base md:text-lg text-pure-white/30 max-w-xl mx-auto font-light">
            Inteligencia contextual que transforma cada reunión en una experiencia
            productiva.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
