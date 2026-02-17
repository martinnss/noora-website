"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Privacy Cube Metaphor — A sphere (your data) floats near a wireframe cube.
 * On scroll, the sphere moves into the cube and the cube rotates to hide it.
 * Represents data privacy and security.
 */
export default function PrivacyCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

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

    // ScrollTrigger to link scroll to animation progress
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      end: "center center",
      scrub: 0.3,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    let animId: number;

    const project3D = (x: number, y: number, z: number, rotY: number, rotX: number) => {
      // Rotate Y
      const nx = x * Math.cos(rotY) - z * Math.sin(rotY);
      let nz = x * Math.sin(rotY) + z * Math.cos(rotY);
      // Rotate X
      const ny = y * Math.cos(rotX) - nz * Math.sin(rotX);
      nz = y * Math.sin(rotX) + nz * Math.cos(rotX);
      // Simple perspective
      const scale = 300 / (300 + nz);
      return { x: nx * scale, y: ny * scale, scale };
    };

    const animate = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      const p = progress.current;
      const cx = w / 2;
      const cy = h / 2;

      // Cube rotation based on progress
      const cubeRotY = p * Math.PI * 0.6;
      const cubeRotX = 0.3 + p * 0.2;
      const cubeSize = Math.min(w, h) * 0.18;

      // Draw wireframe cube
      const cubeVerts = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      ];
      const cubeEdges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      const projected = cubeVerts.map(([vx, vy, vz]) => {
        const p3d = project3D(vx * cubeSize, vy * cubeSize, vz * cubeSize, cubeRotY, cubeRotX);
        return { x: cx + p3d.x, y: cy + p3d.y };
      });

      // Cube edges
      ctx.strokeStyle = `rgba(45, 168, 143, ${0.15 + p * 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const [a, b] of cubeEdges) {
        ctx.moveTo(projected[a].x, projected[a].y);
        ctx.lineTo(projected[b].x, projected[b].y);
      }
      ctx.stroke();

      // Cube face fill (subtle, more visible as cube closes)
      if (p > 0.5) {
        const faceAlpha = (p - 0.5) * 0.15;
        ctx.fillStyle = `rgba(45, 168, 143, ${faceAlpha})`;
        // Draw front face
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[3].x, projected[3].y);
        ctx.closePath();
        ctx.fill();
      }

      // Sphere position — starts to the left, moves into center of cube
      const sphereStartX = cx - cubeSize * 2.5;
      const sphereEndX = cx;
      // ease-in-out using smoothstep
      const t = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const sphereX = sphereStartX + (sphereEndX - sphereStartX) * Math.min(t * 1.2, 1);
      const sphereY = cy;
      const sphereRadius = cubeSize * 0.25;
      const sphereAlpha = p > 0.8 ? 1 - (p - 0.8) * 5 : 1; // fade as cube "closes"

      // Draw sphere with gradient
      const grad = ctx.createRadialGradient(
        sphereX - sphereRadius * 0.3,
        sphereY - sphereRadius * 0.3,
        0,
        sphereX,
        sphereY,
        sphereRadius
      );
      grad.addColorStop(0, `rgba(77, 154, 155, ${0.6 * sphereAlpha})`);
      grad.addColorStop(0.7, `rgba(0, 109, 111, ${0.3 * sphereAlpha})`);
      grad.addColorStop(1, `rgba(0, 109, 111, ${0.05 * sphereAlpha})`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(sphereX, sphereY, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Sphere glow
      const glowGrad = ctx.createRadialGradient(sphereX, sphereY, 0, sphereX, sphereY, sphereRadius * 2.5);
      glowGrad.addColorStop(0, `rgba(77, 154, 155, ${0.1 * sphereAlpha})`);
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(sphereX, sphereY, sphereRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.font = "10px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      
      if (p < 0.3) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * (1 - p / 0.3)})`;
        ctx.fillText("Tus datos", sphereX, sphereY + sphereRadius + 20);
      }
      if (p > 0.7) {
        ctx.fillStyle = `rgba(45, 168, 143, ${0.4 * ((p - 0.7) / 0.3)})`;
        ctx.fillText("Protegido", cx, cy + cubeSize + 30);
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
