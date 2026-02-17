"use client";

import { useEffect, useRef } from "react";

/**
 * Floating Void Objects — faint dark geometric shapes
 * (cubes, cylinders, etc.) in the deep background that slowly tumble
 * on all axes and sway toward the mouse for a living void effect.
 */

interface VoidShape {
  x: number;
  y: number;
  z: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  type: "cube" | "diamond" | "ring" | "tri";
  opacity: number;
}

export default function VoidObjects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const shapes: VoidShape[] = [];
    const count = 12;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouse);

    // Initialize shapes
    const types: VoidShape["type"][] = ["cube", "diamond", "ring", "tri"];
    for (let i = 0; i < count; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: 0.3 + Math.random() * 0.7,
        size: 20 + Math.random() * 50,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.0015,
        speedY: (Math.random() - 0.5) * 0.0015,
        speedZ: (Math.random() - 0.5) * 0.002,
        type: types[i % types.length],
        opacity: 0.015 + Math.random() * 0.025,
      });
    }

    const project = (px: number, py: number, pz: number, rotX: number, rotY: number, rotZ: number) => {
      // Rotate Y
      let x = px * Math.cos(rotY) - pz * Math.sin(rotY);
      let z = px * Math.sin(rotY) + pz * Math.cos(rotY);
      // Rotate X
      let y = py * Math.cos(rotX) - z * Math.sin(rotX);
      z = py * Math.sin(rotX) + z * Math.cos(rotX);
      // Rotate Z
      const nx = x * Math.cos(rotZ) - y * Math.sin(rotZ);
      y = x * Math.sin(rotZ) + y * Math.cos(rotZ);
      x = nx;
      return { x, y };
    };

    const drawShape = (s: VoidShape) => {
      ctx.save();

      // Mouse sway
      const swayX = (mouse.current.x - 0.5) * 30 * s.z;
      const swayY = (mouse.current.y - 0.5) * 20 * s.z;
      const cx = s.x + swayX;
      const cy = s.y + swayY;

      ctx.globalAlpha = s.opacity;
      ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity * 8})`;
      ctx.lineWidth = 0.5;

      const sz = s.size * s.z;

      if (s.type === "cube") {
        const verts = [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
        ];
        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7],
        ];
        const projected = verts.map(([vx, vy, vz]) => {
          const p = project(vx * sz * 0.5, vy * sz * 0.5, vz * sz * 0.5, s.rotX, s.rotY, s.rotZ);
          return { x: cx + p.x, y: cy + p.y };
        });
        ctx.beginPath();
        for (const [a, b] of edges) {
          ctx.moveTo(projected[a].x, projected[a].y);
          ctx.lineTo(projected[b].x, projected[b].y);
        }
        ctx.stroke();
      } else if (s.type === "diamond") {
        const verts = [
          [0, -1.2, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, 1.2, 0],
        ];
        const edges = [
          [0, 1], [0, 2], [0, 3], [0, 4],
          [5, 1], [5, 2], [5, 3], [5, 4],
          [1, 2], [2, 3], [3, 4], [4, 1],
        ];
        const projected = verts.map(([vx, vy, vz]) => {
          const p = project(vx * sz * 0.4, vy * sz * 0.4, vz * sz * 0.4, s.rotX, s.rotY, s.rotZ);
          return { x: cx + p.x, y: cy + p.y };
        });
        ctx.beginPath();
        for (const [a, b] of edges) {
          ctx.moveTo(projected[a].x, projected[a].y);
          ctx.lineTo(projected[b].x, projected[b].y);
        }
        ctx.stroke();
      } else if (s.type === "ring") {
        const segs = 16;
        const projected = [];
        for (let i = 0; i < segs; i++) {
          const angle = (i / segs) * Math.PI * 2;
          const vx = Math.cos(angle) * sz * 0.5;
          const vy = Math.sin(angle) * sz * 0.5;
          const p = project(vx, vy, 0, s.rotX, s.rotY, s.rotZ);
          projected.push({ x: cx + p.x, y: cy + p.y });
        }
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        for (let i = 1; i < segs; i++) {
          ctx.lineTo(projected[i].x, projected[i].y);
        }
        ctx.closePath();
        ctx.stroke();
      } else {
        // Triangle
        const verts = [
          [0, -1, 0], [0.87, 0.5, 0], [-0.87, 0.5, 0],
        ];
        const projected = verts.map(([vx, vy, vz]) => {
          const p = project(vx * sz * 0.5, vy * sz * 0.5, vz * sz * 0.5, s.rotX, s.rotY, s.rotZ);
          return { x: cx + p.x, y: cy + p.y };
        });
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of shapes) {
        s.rotX += s.speedX;
        s.rotY += s.speedY;
        s.rotZ += s.speedZ;
        drawShape(s);
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
