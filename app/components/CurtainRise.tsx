"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * CurtainRise — the next section slides UP over the previous
 * section like a card sliding out of a deck. Creates a physical
 * Z-axis layering effect.
 */
export default function CurtainRise({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 60%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["3%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [24, 12, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, borderRadius }}
      className="relative z-[3] bg-canvas will-change-transform overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
