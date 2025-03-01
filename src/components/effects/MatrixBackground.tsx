'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

// Mix of Latin, Katakana, and special characters for variety, maybe will make Korean instead later
const CHARACTERS = `アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*`.split('');

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

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
  updateInterval: number;
  lastUpdate: number;
}

const FONT_SIZE = 16;
const DROP_CHANCE = 0.02;
const MIN_SPEED = 1;
const MAX_SPEED = 3;
const MIN_LENGTH = 5;
const MAX_LENGTH = 15;
const MIN_UPDATE_INTERVAL = 50;
const MAX_UPDATE_INTERVAL = 150;

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme = 'dark' } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dropsRef = useRef<Drop[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  const createDrop = useCallback((x?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const length = Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH) + MIN_LENGTH);
    const chars = Array.from({ length }, () => 
      CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
    );

    return {
      x: x ?? Math.floor(Math.random() * (canvas.width / FONT_SIZE)) * FONT_SIZE,
      y: 0,
      speed: Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED,
      length,
      chars,
      updateInterval: Math.random() * (MAX_UPDATE_INTERVAL - MIN_UPDATE_INTERVAL) + MIN_UPDATE_INTERVAL,
      lastUpdate: performance.now()
    };
  }, []);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = COLORS[resolvedTheme as keyof typeof COLORS];
    const now = performance.now();

    // Semi-transparent fade effect
    ctx.fillStyle = resolvedTheme === 'dark' 
      ? 'rgba(0, 0, 0, 0.1)' 
      : 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add new drops randomly
    if (Math.random() < DROP_CHANCE) {
      const drop = createDrop();
      if (drop) dropsRef.current.push(drop);
    }

    // Add drops near mouse position
    const mouseX = Math.floor(mouseRef.current.x / FONT_SIZE) * FONT_SIZE;
    if (Math.random() < DROP_CHANCE * 2) {
      const drop = createDrop(mouseX + (Math.random() * 100 - 50));
      if (drop) dropsRef.current.push(drop);
    }

    // Update and draw drops
    ctx.font = `${FONT_SIZE}px monospace`;
    dropsRef.current = dropsRef.current.filter(drop => {
      // Update characters periodically
      if (now - drop.lastUpdate > drop.updateInterval) {
        drop.chars = drop.chars.map(() => 
          CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
        );
        drop.lastUpdate = now;
      }

      // Draw characters with gradient effect
      drop.chars.forEach((char, i) => {
        const y = drop.y - i * FONT_SIZE;
        if (y < 0) return;

        const distanceFromMouse = Math.sqrt(
          Math.pow(drop.x - mouseRef.current.x, 2) +
          Math.pow(y - mouseRef.current.y, 2)
        );

        const isNearMouse = distanceFromMouse < 100;
        const alpha = isNearMouse 
          ? 1 - (distanceFromMouse / 100) 
          : (1 - i / drop.length) * 0.8;

        if (i === 0) {
          // Leading character
          ctx.fillStyle = `rgba(${colors.primary}, ${alpha})`;
        } else {
          // Trail characters
          ctx.fillStyle = `rgba(${colors.secondary}, ${alpha * 0.8})`;
        }

        ctx.fillText(char, drop.x, y);
      });

      // Update position
      drop.y += drop.speed;

      // Remove if off screen
      return drop.y - drop.length * FONT_SIZE < canvas.height;
    });

    animationFrameRef.current = requestAnimationFrame(draw);
  }, [resolvedTheme, createDrop]);

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

      // Reset drops
      dropsRef.current = [];
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
  }, [mounted, draw]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: 0.9 }}
    />
  );
} 