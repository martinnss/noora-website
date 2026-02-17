"use client";

import { useEffect, useRef } from "react";

/**
 * "Gelatin" / Velocity Distortion Effect
 * As the user scrolls fast, the page content creates a subtle skew
 * in the direction of scrolling. When scrolling stops, it snaps back.
 * This makes the interface feel liquid and responsive.
 */
export default function ScrollVelocity() {
  const prevScroll = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef<number>(0);
  const targetSkew = useRef(0);
  const currentSkew = useRef(0);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const diff = currentScroll - prevScroll.current;
      velocity.current = diff;
      prevScroll.current = currentScroll;
    };

    const animate = () => {
      // Clamp velocity to a reasonable skew range (-2 to 2 degrees)
      targetSkew.current = Math.max(-2.5, Math.min(2.5, velocity.current * 0.04));
      // Smooth interpolation with damping
      currentSkew.current += (targetSkew.current - currentSkew.current) * 0.15;
      // Decay velocity
      velocity.current *= 0.92;

      if (Math.abs(currentSkew.current) > 0.001) {
        (main as HTMLElement).style.transform = `skewY(${currentSkew.current}deg)`;
      } else {
        (main as HTMLElement).style.transform = "";
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
      if (main) {
        (main as HTMLElement).style.transform = "";
      }
    };
  }, []);

  return null;
}
