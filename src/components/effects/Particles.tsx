"use client";

import { useRef } from 'react';

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Basic placeholder for now - i will implement the full particle system later
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
