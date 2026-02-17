"use client";

import { useEffect, useRef } from "react";

/**
 * Animated Film Grain — a canvas with animated TV-static noise
 * at ~2% opacity. Prevents 3D/rendered elements from looking too sterile.
 * Renders at a low resolution for performance, scaled up.
 */
export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Low-res for performance
    const w = 256;
    const h = 256;
    canvas.width = w;
    canvas.height = h;

    let animId: number;
    let frame = 0;

    const draw = () => {
      frame++;
      // Only update every 3rd frame (~20fps) for subtle flicker
      if (frame % 3 === 0) {
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.random() * 255;
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = 12; // Very subtle alpha
        }
        ctx.putImageData(imageData, 0, 0);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        width: "100vw",
        height: "100vh",
        opacity: 0.025,
        mixBlendMode: "overlay",
        imageRendering: "pixelated",
      }}
    />
  );
}
