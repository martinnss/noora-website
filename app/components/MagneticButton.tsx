"use client";

import { useRef, useEffect, type ReactNode } from "react";

/**
 * Magnetic Button — When near the cursor, the button physically
 * moves toward it as if the cursor has gravity.
 */
export default function MagneticButton({
  children,
  className = "",
  as: Tag = "button",
  href,
  ...props
}: {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: globalThis.MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const threshold = 120;

      if (dist < threshold) {
        const strength = 1 - dist / threshold;
        pos.current = {
          x: dx * strength * 0.35,
          y: dy * strength * 0.35,
        };
      } else {
        pos.current = { x: 0, y: 0 };
      }
    };

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.15;
      current.current.y += (pos.current.y - current.current.y) * 0.15;
      el.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const Component = Tag as unknown as React.ElementType;

  return (
    <Component
      ref={ref}
      className={className}
      href={href}
      style={{ willChange: "transform", display: "inline-block" }}
      {...props}
    >
      {children}
    </Component>
  );
}
