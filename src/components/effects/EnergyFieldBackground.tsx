'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  life: number;
  maxLife: number;
  width: number;
}

const COLORS = {
  dark: {
    primary: '139, 92, 246',   // Purple
    secondary: '99, 102, 241'  // Indigo
  },
  light: {
    primary: '249, 115, 22',   // Orange
    secondary: '239, 68, 68'   // Red
  }
} as const;

const CONFIG = {
  NUM_LINES: 50,
  MIN_LENGTH: 50,
  MAX_LENGTH: 150,
  MIN_WIDTH: 1,
  MAX_WIDTH: 3,
  MIN_LIFE: 30,
  MAX_LIFE: 60,
  SPAWN_RATE: 2,
  MOUSE_INFLUENCE: 200
};

interface Props {
  className?: string;
}

export function EnergyFieldBackground({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme = 'dark' } = useTheme();
  const [mounted, setMounted] = useState(false);
  const linesRef = useRef<Line[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const createLine = useCallback((width: number, height: number, nearMouse = false): Line => {
    let x1, y1;
    
    if (nearMouse && Math.random() < 0.7) {
      // Spawn near mouse
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * CONFIG.MOUSE_INFLUENCE;
      x1 = mouseRef.current.x + Math.cos(angle) * distance;
      y1 = mouseRef.current.y + Math.sin(angle) * distance;
    } else {
      // Random position
      x1 = Math.random() * width;
      y1 = Math.random() * height;
    }

    const angle = Math.random() * Math.PI * 2;
    const length = Math.random() * (CONFIG.MAX_LENGTH - CONFIG.MIN_LENGTH) + CONFIG.MIN_LENGTH;
    const maxLife = Math.random() * (CONFIG.MAX_LIFE - CONFIG.MIN_LIFE) + CONFIG.MIN_LIFE;

    return {
      x1,
      y1,
      x2: x1 + Math.cos(angle) * length,
      y2: y1 + Math.sin(angle) * length,
      life: maxLife,
      maxLife,
      width: Math.random() * (CONFIG.MAX_WIDTH - CONFIG.MIN_WIDTH) + CONFIG.MIN_WIDTH
    };
  }, []);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = dimensionsRef.current.width || canvas.width;
    const height = dimensionsRef.current.height || canvas.height;
    const colors = COLORS[resolvedTheme as keyof typeof COLORS];

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Spawn new lines
    for (let i = 0; i < CONFIG.SPAWN_RATE; i++) {
      if (linesRef.current.length < CONFIG.NUM_LINES) {
        linesRef.current.push(createLine(width, height, true));
      }
    }

    // Update and draw lines
    linesRef.current = linesRef.current.filter(line => {
      line.life -= 1;
      if (line.life <= 0) return false;

      // Calculate line properties
      const progress = line.life / line.maxLife;
      const alpha = progress * 0.8;
      
      // Draw glow effect
      const gradient = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
      gradient.addColorStop(0, `rgba(${colors.primary}, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(${colors.secondary}, ${alpha})`);
      gradient.addColorStop(1, `rgba(${colors.primary}, ${alpha})`);

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = line.width * progress;
      ctx.lineCap = 'round';
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();

      // Add perpendicular smaller lines
      const dx = line.x2 - line.x1;
      const dy = line.y2 - line.y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / length * 10; // Normal vector
      const ny = dx / length * 10;  // Normal vector

      for (let i = 0; i < 3; i++) {
        const t = Math.random();
        const x = line.x1 + dx * t;
        const y = line.y1 + dy * t;
        const len = Math.random() * 20 + 5;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${colors.secondary}, ${alpha * 0.5})`;
        ctx.lineWidth = line.width * progress * 0.5;
        ctx.moveTo(x, y);
        ctx.lineTo(x + nx * len, y + ny * len);
        ctx.stroke();
      }

      return true;
    });

    // Replace expired lines
    while (linesRef.current.length < CONFIG.NUM_LINES) {
      linesRef.current.push(createLine(width, height));
    }

    animationFrameRef.current = requestAnimationFrame(draw);
  }, [resolvedTheme, createLine]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    const canvas = canvasRef.current;

    const handleResize = (entries?: ResizeObserverEntry[]) => {
      const dpr = window.devicePixelRatio || 1;
      let width, height;

      if (entries && entries[0]) {
        width = entries[0].contentRect.width;
        height = entries[0].contentRect.height;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
      }

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      dimensionsRef.current = { width, height };
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Reset lines
      linesRef.current = Array.from(
        { length: CONFIG.NUM_LINES },
        () => createLine(width, height)
      );
    };

    const observer = new ResizeObserver((entries) => handleResize(entries));
    observer.observe(canvas.parentElement || document.body);

    const handleMouseMove = (e: MouseEvent) => {
       if (canvasRef.current) {
         const rect = canvasRef.current.getBoundingClientRect();
         mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
       } else {
         mouseRef.current = { x: e.clientX, y: e.clientY };
       }
    };

    handleResize();
    window.addEventListener('mousemove', handleMouseMove);

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, draw, createLine]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className || "fixed inset-0 pointer-events-none -z-10"}
      style={{ opacity: 0.9 }}
    />
  );
}
