"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Collaborative Orbit — a ring of avatar/coins orbiting a central point.
 * As the user scrolls, the orbit tightens (radius decreases), 
 * pulling the team closer together — visualizing "collaboration."
 */
export default function CollaborativeOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      end: "center center",
      scrub: 0.3,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    const avatars = [
      { color: "#2DA88F", label: "ML" },
      { color: "#4D9A9B", label: "CR" },
      { color: "#5CC3AD", label: "AP" },
      { color: "#1F8B75", label: "DK" },
      { color: "#10B981", label: "SR" },
      { color: "#2DA88F", label: "LV" },
    ];

    let animId: number;

    const animate = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      time.current += 0.005;
      const p = progress.current;
      const cx = w / 2;
      const cy = h / 2;

      // Radius shrinks as you scroll (collaboration tightens)
      const maxRadius = Math.min(w, h) * 0.35;
      const minRadius = Math.min(w, h) * 0.1;
      const radius = maxRadius - (maxRadius - minRadius) * p;

      // Draw orbit path
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 + p * 0.03})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Inner orbit path
      ctx.strokeStyle = `rgba(45, 168, 143, ${0.02 + p * 0.04})`;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 0.6, radius * 0.3, 0.3, 0, Math.PI * 2);
      ctx.stroke();

      // Center glow
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.3);
      centerGlow.addColorStop(0, `rgba(45, 168, 143, ${0.05 + p * 0.08})`);
      centerGlow.addColorStop(1, "transparent");
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Draw avatars orbiting
      const speed = 1 + p * 0.5; // slight speed increase as they come together
      for (let i = 0; i < avatars.length; i++) {
        const angle = (i / avatars.length) * Math.PI * 2 + time.current * speed;
        const ax = cx + Math.cos(angle) * radius;
        const ay = cy + Math.sin(angle) * radius * 0.5; // elliptical orbit
        const avatarSize = 14 + p * 4;

        // Avatar glow trail
        const trailGrad = ctx.createRadialGradient(ax, ay, 0, ax, ay, avatarSize * 2);
        trailGrad.addColorStop(0, `${avatars[i].color}15`);
        trailGrad.addColorStop(1, "transparent");
        ctx.fillStyle = trailGrad;
        ctx.beginPath();
        ctx.arc(ax, ay, avatarSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Avatar circle
        ctx.fillStyle = avatars[i].color + "CC";
        ctx.beginPath();
        ctx.arc(ax, ay, avatarSize, 0, Math.PI * 2);
        ctx.fill();

        // Avatar ring
        ctx.strokeStyle = avatars[i].color + "40";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ax, ay, avatarSize + 2, 0, Math.PI * 2);
        ctx.stroke();

        // Avatar label
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = `bold ${avatarSize * 0.65}px Inter, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(avatars[i].label, ax, ay);
      }

      // Connection lines between nearby avatars (visible as they come closer)
      if (p > 0.3) {
        const lineAlpha = (p - 0.3) * 0.15;
        for (let i = 0; i < avatars.length; i++) {
          const angle1 = (i / avatars.length) * Math.PI * 2 + time.current * speed;
          const x1 = cx + Math.cos(angle1) * radius;
          const y1 = cy + Math.sin(angle1) * radius * 0.5;
          const j = (i + 1) % avatars.length;
          const angle2 = (j / avatars.length) * Math.PI * 2 + time.current * speed;
          const x2 = cx + Math.cos(angle2) * radius;
          const y2 = cy + Math.sin(angle2) * radius * 0.5;

          ctx.strokeStyle = `rgba(45, 168, 143, ${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      trigger.kill();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300px] md:h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
