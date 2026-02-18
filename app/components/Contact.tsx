"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TextReveal } from "./TextReveal";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <section id="contact" className="relative py-24 px-6">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(45,168,143,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-strong rounded-3xl p-10 md:p-16 text-center card-shine border-orbit relative overflow-hidden">
            {/* Inner top light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            <span className="inline-block text-[11px] font-bold text-accent/70 tracking-[0.2em] uppercase mb-4">
              Acceso Anticipado
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              <TextReveal delay={0.05}>
                <span className="text-gradient">Sé de los primeros</span>
              </TextReveal>
              <TextReveal delay={0.1}>
                <span className="text-gradient">en usar Noora</span>
              </TextReveal>
            </h2>
            <p className="text-pure-white/30 max-w-md mx-auto mb-10 text-[15px] font-light leading-relaxed">
              Estamos seleccionando equipos para nuestro programa de acceso
              anticipado. Déjanos tu correo y nos pondremos en contacto.
            </p>

            {!submitted ? (
              <>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    setError("");

                    try {
                      const response = await fetch("/api/lead", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email }),
                      });

                      const data = await response.json();

                      if (data.status === "success") {
                        setSubmitted(true);
                      } else {
                        setError(data.message || "Algo salió mal. Inténtalo de nuevo.");
                      }
                    } catch {
                      setError("Error al enviar. Por favor, inténtalo de nuevo.");
                    } finally {
                      setIsLoading(false);
                    }
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
                    <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-300 focus-within:shadow-[0_0_30px_rgba(45,168,143,0.05)]" />
                  </div>
                  <MagneticButton
                    as="button"
                    className="btn-primary font-semibold px-7 py-4 rounded-xl whitespace-nowrap text-[14px]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Solicitar Acceso"}
                  </MagneticButton>
                </form>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400/80 text-[13px] mt-4 max-w-md mx-auto"
                  >
                    {error}
                  </motion.p>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1 
                }}
                className="relative max-w-md mx-auto"
              >
                {/* Ambient glow behind card */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse, rgba(45,168,143,0.12) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }} 
                />
                
                {/* Success card */}
                <div className="glass-card rounded-2xl p-10 relative overflow-hidden border-accent/10">
                  {/* Top light accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                  
                  {/* Animated checkmark icon */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.6,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="relative w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6"
                  >
                    {/* Icon glow */}
                    <div className="absolute inset-0 rounded-2xl bg-accent/5 blur-xl" />
                    
                    <motion.svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent relative z-10"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.5,
                        ease: "easeInOut" 
                      }}
                    >
                      <motion.polyline 
                        points="20 6 9 17 4 12"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ 
                          duration: 0.5,
                          delay: 0.5,
                          ease: "easeOut" 
                        }}
                      />
                    </motion.svg>
                  </motion.div>
                  
                  {/* Success message */}
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-xl font-bold mb-2 text-gradient"
                  >
                    ¡Solicitud Enviada!
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-[14px] text-pure-white/40 leading-relaxed mb-4"
                  >
                    Gracias por tu interés en Noora. Revisaremos tu solicitud y te contactaremos pronto con los próximos pasos.
                  </motion.p>
                  
                  {/* Submitted email badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    <span className="text-[12px] text-pure-white/50 font-medium">{email}</span>
                  </motion.div>
                </div>
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
