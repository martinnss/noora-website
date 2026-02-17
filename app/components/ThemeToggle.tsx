"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    document.body.classList.toggle("light-mode", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-[9999] group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer liquid glass container */}
      <div className="relative w-[110px] h-[44px] rounded-full overflow-hidden liquid-glass-toggle">
        {/* Gradient background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-50" />

        {/* Glass blur layer */}
        <div className="absolute inset-0 backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] rounded-full" />

        {/* Sliding pill indicator */}
        <motion.div
          className="absolute top-1 left-1 w-[50px] h-[36px] rounded-full bg-gradient-to-br from-accent to-accent-dark shadow-lg"
          animate={{
            x: isDark ? 0 : 56,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        >
          {/* Inner shine on pill */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(45,168,143,0.4)]" />
        </motion.div>

        {/* Icon container */}
        <div className="relative h-full flex items-center justify-between px-3">
          {/* Moon icon - Dark mode */}
          <motion.div
            className="relative z-10 flex items-center justify-center w-6 h-6"
            animate={{
              color: isDark ? "#FFFFFF" : "rgba(255,255,255,0.4)",
            }}
          >
            <AnimatePresence mode="wait">
              {isDark && (
                <motion.svg
                  key="moon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sun icon - Light mode */}
          <motion.div
            className="relative z-10 flex items-center justify-center w-6 h-6"
            animate={{
              color: !isDark ? "#FFFFFF" : "rgba(255,255,255,0.4)",
            }}
          >
            <AnimatePresence mode="wait">
              {!isDark && (
                <motion.svg
                  key="sun"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
      </div>

      {/* Outer glow on hover */}
      <motion.div
        className="absolute -inset-2 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
}
