'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

const COLORS = {
  dark: {
    start: [139, 92, 246], // Purple
    end: [59, 130, 246],   // Blue
  },
  light: {
    start: [249, 115, 22], // Orange
    end: [234, 179, 8],    // Yellow
  }
} as const;

const NUM_WAVES = 3;
const WAVE_SPEED = 0.002;
const AMPLITUDE_FACTOR = 0.3;
const FREQUENCY_FACTOR = 0.5;

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme = 'dark' } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const colors = COLORS[resolvedTheme as keyof typeof COLORS];

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `rgba(${colors.start.join(',')}, 0.1)`);
    gradient.addColorStop(1, `rgba(${colors.end.join(',')}, 0.1)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw waves
    for (let i = 0; i < NUM_WAVES; i++) {
      ctx.beginPath();
      
      const phase = (i / NUM_WAVES) * Math.PI * 2;
      const amplitude = height * AMPLITUDE_FACTOR * (1 - i / NUM_WAVES);
      const frequency = FREQUENCY_FACTOR * (i + 1);
      
      // Mouse influence on waves
      const mouseInfluence = Math.sin(
        (mouseRef.current.x / width) * Math.PI * 2 +
        (mouseRef.current.y / height) * Math.PI * 2
      ) * 50;

      for (let x = 0; x <= width; x += 2) {
        const y = height / 2 +
                 amplitude * Math.sin(
                   (x / width) * Math.PI * 2 * frequency +
                   timeRef.current * WAVE_SPEED * (i + 1) +
                   phase
                 ) +
                 mouseInfluence * Math.exp(-(Math.abs(x - mouseRef.current.x) / 200));

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      const alpha = 0.1 - (i * 0.02);
      ctx.strokeStyle = `rgba(${colors.start.join(',')}, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    timeRef.current += 1;
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