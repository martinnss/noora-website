"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * "The Staggered Lift" — text slides upward out of an overflow:hidden mask.
 * Each line is staggered by 0.1s for a slot-machine reveal.
 */
export function TextReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px" });

  return (
    <span ref={ref} className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Wraps a heading so each line gets the staggered reveal treatment.
 */
export function StaggeredHeading({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.1,
}: {
  lines: { text: string; className?: string }[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <TextReveal key={i} delay={delay + i * stagger} className={lineClassName}>
          <span className={line.className}>{line.text}</span>
        </TextReveal>
      ))}
    </span>
  );
}
