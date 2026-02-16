"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255,111,97,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-strong rounded-3xl p-10 md:p-16 text-center card-shine border-orbit relative overflow-hidden">
            {/* Inner top light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            <span className="inline-block text-[11px] font-bold text-accent/70 tracking-[0.2em] uppercase mb-5">
              Acceso Anticipado
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gradient mb-5 leading-tight">
              Sé de los primeros
              <br />
              en usar Noora
            </h2>
            <p className="text-pure-white/30 max-w-md mx-auto mb-10 text-[15px] font-light leading-relaxed">
              Estamos seleccionando equipos para nuestro programa de acceso
              anticipado. Déjanos tu correo y nos pondremos en contacto.
            </p>

            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-pure-white placeholder:text-pure-white/20 focus:outline-none focus:border-accent/30 focus:bg-white/[0.05] transition-all duration-300 text-[14px]"
                  />
                  <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-300 focus-within:shadow-[0_0_30px_rgba(255,111,97,0.05)]" />
                </div>
                <button
                  type="submit"
                  className="btn-primary font-semibold px-7 py-4 rounded-xl whitespace-nowrap text-[14px]"
                >
                  Solicitar Acceso
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl p-8 max-w-sm mx-auto border border-emerald-500/10"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-pure-white/80 font-semibold mb-1">
                  ¡Gracias por tu interés!
                </p>
                <p className="text-[13px] text-pure-white/30">
                  Te contactaremos pronto con los próximos pasos.
                </p>
              </motion.div>
            )}

            <p className="text-[11px] text-pure-white/15 mt-8 tracking-wide">
              Sin spam · Sin compromiso · Solo actualizaciones sobre Noora
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
