"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { TextReveal } from "./TextReveal";

const testimonials = [
  {
    quote:
      "Noora cambió completamente cómo manejamos nuestros proyectos. Antes perdíamos información entre reuniones — ahora todo está conectado.",
    author: "María González",
    role: "Head of Product",
    company: "TechCo",
  },
  {
    quote:
      "La detección de contradicciones en tiempo real es increíble. Nos ahorra horas de revisión post-reunión y evita malentendidos costosos.",
    author: "Diego Fernández",
    role: "CTO",
    company: "DataFlow",
  },
  {
    quote:
      "Los próximos pasos automáticos son un game changer. Nuestro equipo dejó de perder compromisos y la accountability mejoró un 200%.",
    author: "Valentina Rojas",
    role: "VP Operations",
    company: "ScaleUp Labs",
  },
  {
    quote:
      "Es como tener un asistente con memoria perfecta en cada reunión. Noora recuerda lo que nosotros olvidamos.",
    author: "Andrés Moreno",
    role: "Director de Proyectos",
    company: "Innovatech",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(8px)",
    }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (d: number) => ({
      x: d > 0 ? -60 : 60,
      opacity: 0,
      filter: "blur(8px)",
    }),
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(45,168,143,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[11px] font-bold text-accent/70 tracking-[0.2em] uppercase mb-4">
            Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            <TextReveal delay={0.05}>
              <span className="text-gradient">Lo que dicen nuestros</span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <span className="text-gradient">primeros usuarios</span>
            </TextReveal>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-10 md:p-14 min-h-[260px] flex items-center justify-center card-shine relative overflow-hidden">
            {/* Inner accent light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                {/* Quote */}
                <p className="text-[16px] md:text-[18px] text-pure-white/50 leading-relaxed mb-8 font-light italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <p className="text-[14px] font-semibold text-pure-white/80">
                    {testimonials[current].author}
                  </p>
                  <p className="text-[12px] text-pure-white/25 mt-0.5">
                    {testimonials[current].role} · {testimonials[current].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-accent/60"
                    : "w-1.5 bg-pure-white/10 hover:bg-pure-white/20"
                }`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
