'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
}

const COLORS = {
  dark: {
    primary: '139, 92, 246',   // Purple
    secondary: '59, 130, 246'  // Blue
  },
  light: {
    primary: '249, 115, 22',   // Orange
    secondary: '234, 179, 8'   // Yellow
  }
} as const;

const CONFIG = {
  NUM_STARS: 200,
  MIN_SPEED: 0.5,
  MAX_SPEED: 2,
  MIN_SIZE: 0.5,
  MAX_SIZE: 2,
  DEPTH: 1000,
  MOUSE_INFLUENCE: 0.3
};

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme = 'dark' } = useTheme();
  const [mounted, setMounted] = useState(false);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  const createStars = useCallback((width: number, height: number) => {
    return Array.from({ length: CONFIG.NUM_STARS }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * CONFIG.DEPTH,
      size: Math.random() * (CONFIG.MAX_SIZE - CONFIG.MIN_SIZE) + CONFIG.MIN_SIZE,
      speed: Math.random() * (CONFIG.MAX_SPEED - CONFIG.MIN_SPEED) + CONFIG.MIN_SPEED
    }));
  }, []);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const colors = COLORS[resolvedTheme as keyof typeof COLORS];
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas with fade effect
    ctx.fillStyle = resolvedTheme === 'dark'
      ? 'rgba(0, 0, 0, 0.2)'
      : 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, width, height);

    // Mouse influence on movement direction
    const mouseOffsetX = (mouseRef.current.x - centerX) * CONFIG.MOUSE_INFLUENCE;
    const mouseOffsetY = (mouseRef.current.y - centerY) * CONFIG.MOUSE_INFLUENCE;

    // Update and draw stars
    starsRef.current.forEach(star => {
      // Move star closer to viewer
      star.z -= star.speed;

      // Reset star if it's too close
      if (star.z <= 0) {
        star.z = CONFIG.DEPTH;
        star.x = (Math.random() - 0.5) * width * 2;
        star.y = (Math.random() - 0.5) * height * 2;
      }

      // Project star onto 2D screen
      const scale = CONFIG.DEPTH / (CONFIG.DEPTH + star.z);
      const projectedX = centerX + (star.x + mouseOffsetX) * scale;
      const projectedY = centerY + (star.y + mouseOffsetY) * scale;
      const projectedSize = star.size * scale;

      // Draw star with trail effect
      const gradient = ctx.createRadialGradient(
        projectedX, projectedY, 0,
        projectedX, projectedY, projectedSize * 2
      );

      const alpha = (1 - star.z / CONFIG.DEPTH) * 0.8;
      gradient.addColorStop(0, `rgba(${colors.primary}, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(${colors.secondary}, ${alpha * 0.4})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(projectedX, projectedY, projectedSize * 2, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameRef.current = requestAnimationFrame(draw);
  }, [resolvedTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    const canvas = canvasRef.current;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      starsRef.current = createStars(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, draw, createStars]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: 0.9 }}
    />
  );
} 