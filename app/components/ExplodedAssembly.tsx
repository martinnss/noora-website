"use client";

import { useEffect, useRef } from "react";

/**
 * Exploded Assembly — Productivity objects start as a floating cloud
 * and implode/magnetically snap onto a central wireframe structure.
 * Objects wobble with spring physics before settling.
 */

interface AssemblyNode {
  // Source (scattered)
  sx: number;
  sy: number;
  // Target (assembled)
  tx: number;
  ty: number;
  // Current
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: "circle" | "square" | "line" | "dot" | "pulse";
  color: string;
  settled: boolean;
  spring: number;
  damping: number;
  delay: number; // stagger
}

export default function ExplodedAssembly() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTime = useRef(0);
  const nodes = useRef<AssemblyNode[]>([]);
  const initialized = useRef(false);

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

    const w = () => canvas.width / window.devicePixelRatio;
    const h = () => canvas.height / window.devicePixelRatio;

    const initNodes = () => {
      if (initialized.current) return;
      
      // Only start when container is in viewport
      const rect = container.getBoundingClientRect();
      if (rect.top > window.innerHeight * 1.2 || rect.bottom < 0) {
        return; // Not in view yet
      }
      
      initialized.current = true;
      startTime.current = performance.now();
      const cx = w() / 2;
      const cy = h() / 2;
      const count = 35;
      const colors = [
        "rgba(45, 168, 143, 0.5)",
        "rgba(77, 154, 155, 0.4)",
        "rgba(255, 154, 143, 0.3)",
        "rgba(255, 255, 255, 0.15)",
        "rgba(0, 109, 111, 0.35)",
      ];
      const types: AssemblyNode["type"][] = ["circle", "square", "line", "dot", "pulse"];

      // Create wireframe target positions: a hexagonal/circular grid
      const targets: { x: number; y: number }[] = [];
      const rings = [0, 6, 12, 18];
      const radii = [0, 40, 80, 120];
      
      for (let ring = 0; ring < rings.length; ring++) {
        const n = rings[ring] || 1;
        const r = radii[ring];
        for (let i = 0; i < n; i++) {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          targets.push({
            x: cx + Math.cos(angle) * r,
            y: cy + Math.sin(angle) * r,
          });
          if (targets.length >= count) break;
        }
        if (targets.length >= count) break;
      }

      // Fill remaining
      while (targets.length < count) {
        const angle = Math.random() * Math.PI * 2;
        const r = 50 + Math.random() * 100;
        targets.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
        });
      }

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 200 + Math.random() * 250;
        nodes.current.push({
          sx: cx + Math.cos(angle) * dist,
          sy: cy + Math.sin(angle) * dist,
          tx: targets[i].x,
          ty: targets[i].y,
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          vx: 0,
          vy: 0,
          size: 3 + Math.random() * 8,
          type: types[i % types.length],
          color: colors[i % colors.length],
          settled: false,
          spring: 0.025 + Math.random() * 0.035,
          damping: 0.82 + Math.random() * 0.08,
          delay: i * 25,
        });
      }
    };

    let animId: number;

    // Check viewport on scroll to trigger animation
    const checkViewport = () => {
      if (!initialized.current) {
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.8 && rect.bottom > 0) {
          initNodes(); // Start animation when in view
        }
      }
    };

    const animate = () => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      // Try to initialize if not yet (viewport check)
      if (!initialized.current) {
        checkViewport();
      }

      if (!initialized.current) {
        // Not ready yet, keep checking
        animId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = performance.now() - startTime.current;

      // Draw wireframe connections (target structure)
      const settledCount = nodes.current.filter((n) => n.settled).length;
      const structureAlpha = Math.min(1, settledCount / nodes.current.length) * 0.06;
      
      if (structureAlpha > 0.005) {
        ctx.strokeStyle = `rgba(45, 168, 143, ${structureAlpha})`;
        ctx.lineWidth = 0.5;
        
        // Draw connecting lines between nearby settled nodes
        for (let i = 0; i < nodes.current.length; i++) {
          for (let j = i + 1; j < nodes.current.length; j++) {
            const dx = nodes.current[i].tx - nodes.current[j].tx;
            const dy = nodes.current[i].ty - nodes.current[j].ty;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60) {
              ctx.beginPath();
              ctx.moveTo(nodes.current[i].x, nodes.current[i].y);
              ctx.lineTo(nodes.current[j].x, nodes.current[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw nodes
      for (const node of nodes.current) {
        if (elapsed < node.delay) continue;

        // Spring physics toward target
        const dx = node.tx - node.x;
        const dy = node.ty - node.y;
        node.vx += dx * node.spring;
        node.vy += dy * node.spring;
        node.vx *= node.damping;
        node.vy *= node.damping;
        node.x += node.vx;
        node.y += node.vy;

        // Check if settled
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(node.vx) < 0.1) {
          node.settled = true;
        }

        ctx.save();
        ctx.globalAlpha = Math.min(1, (elapsed - node.delay) / 400);

        if (node.type === "circle") {
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (node.type === "square") {
          ctx.fillStyle = node.color;
          ctx.fillRect(node.x - node.size / 2, node.y - node.size / 2, node.size, node.size);
        } else if (node.type === "line") {
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x - node.size, node.y);
          ctx.lineTo(node.x + node.size, node.y);
          ctx.stroke();
        } else if (node.type === "dot") {
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fill();
          // Glow
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 2);
          glow.addColorStop(0, node.color);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Pulse ring
          const pulsePhase = ((elapsed - node.delay) / 1500) % 1;
          const pulseR = node.size * (1 + pulsePhase);
          ctx.strokeStyle = node.color.replace(/[\d.]+\)$/, `${0.4 * (1 - pulsePhase)})`);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    // Check viewport on scroll and mount
    checkViewport();
    window.addEventListener("scroll", checkViewport, { passive: true });

    window.addEventListener("resize", () => {
      resize();
      // Reset for recalculation
      nodes.current = [];
      initialized.current = false;
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", checkViewport);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[1]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
