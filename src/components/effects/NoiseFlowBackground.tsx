'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  CELL_SIZE: 10,
  NOISE_SCALE: 0.01,
  FLOW_SPEED: 0.001,
  PARTICLE_COUNT: 1000,
  PARTICLE_SIZE: 1,
  PARTICLE_SPEED: 2,
  PARTICLE_LIFE: 100,
  FADE_SPEED: 0.05
};

interface Particle {
  x: number;
  y: number;
  age: number;
  speed: number;
}

// Simplex noise implementation
class SimplexNoise {
  private grad3: number[][];
  private p: number[];
  private perm: number[];
  private simplex: number[][];

  constructor(seed: string) {
    this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
                  [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
                  [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }
    
    this.perm = new Array(512);
    this.simplex = [[0,1,2,3],[0,1,3,2],[0,2,3,1],[0,2,1,3],
                    [0,3,1,2],[0,3,2,1],[1,2,3,0],[1,2,0,3],
                    [1,3,0,2],[1,3,2,0],[1,0,2,3],[1,0,3,2],
                    [2,3,0,1],[2,3,1,0],[2,0,1,3],[2,0,3,1],
                    [2,1,3,0],[2,1,0,3],[3,0,1,2],[3,0,2,1],
                    [3,1,2,0],[3,1,0,2],[3,2,0,1],[3,2,1,0]];
    
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
  }

  private dot(g: number[], x: number, y: number): number {
    return g[0] * x + g[1] * y;
  }

  noise(xin: number, yin: number): number {
    const n0 = 0.5 * (1.0 - Math.cos(xin * Math.PI)) * (1.0 - Math.cos(yin * Math.PI));
    const n1 = 0.5 * (1.0 + Math.cos(xin * Math.PI)) * (1.0 - Math.cos(yin * Math.PI));
    const n2 = 0.5 * (1.0 - Math.cos(xin * Math.PI)) * (1.0 + Math.cos(yin * Math.PI));
    const n3 = 0.5 * (1.0 + Math.cos(xin * Math.PI)) * (1.0 + Math.cos(yin * Math.PI));
    
    return (n0 + n1 + n2 + n3) * 0.5;
  }
}

export function NoiseFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme = 'dark' } = useTheme();
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const noiseRef = useRef(new SimplexNoise(Math.random().toString()));
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  const createParticles = useCallback((width: number, height: number) => {
    return Array.from({ length: CONFIG.PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      age: Math.random() * CONFIG.PARTICLE_LIFE,
      speed: Math.random() * CONFIG.PARTICLE_SPEED + 1
    }));
  }, []);

  const draw = useCallback(() => {
    if (!canvasRef.current || !noiseRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const colors = COLORS[resolvedTheme as keyof typeof COLORS];

    // Apply fade effect
    ctx.fillStyle = resolvedTheme === 'dark'
      ? `rgba(0, 0, 0, ${CONFIG.FADE_SPEED})`
      : `rgba(255, 255, 255, ${CONFIG.FADE_SPEED})`;
    ctx.fillRect(0, 0, width, height);

    // Update time
    timeRef.current += CONFIG.FLOW_SPEED;

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      // Get flow direction from noise
      const noiseX = particle.x * CONFIG.NOISE_SCALE;
      const noiseY = particle.y * CONFIG.NOISE_SCALE;
      const noiseValue = noiseRef.current!.noise(
        noiseX + timeRef.current,
        noiseY + timeRef.current
      );
      const angle = noiseValue * Math.PI * 4;

      // Add mouse influence
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const mouseInfluence = Math.max(0, 1 - distance / 200);

      // Update particle position
      particle.x += (Math.cos(angle) + dx * mouseInfluence * 0.01) * particle.speed;
      particle.y += (Math.sin(angle) + dy * mouseInfluence * 0.01) * particle.speed;
      particle.age += 1;

      // Reset particle if it's too old or out of bounds
      if (particle.age > CONFIG.PARTICLE_LIFE ||
          particle.x < 0 || particle.x > width ||
          particle.y < 0 || particle.y > height) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.age = 0;
      }

      // Draw particle
      const alpha = (1 - particle.age / CONFIG.PARTICLE_LIFE) * 0.5;
      ctx.fillStyle = `rgba(${colors.primary}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, CONFIG.PARTICLE_SIZE, 0, Math.PI * 2);
      ctx.fill();

      // Draw trail
      if (particle.age > 1) {
        const gradient = ctx.createLinearGradient(
          particle.x - Math.cos(angle) * 10,
          particle.y - Math.sin(angle) * 10,
          particle.x,
          particle.y
        );
        gradient.addColorStop(0, `rgba(${colors.secondary}, 0)`);
        gradient.addColorStop(1, `rgba(${colors.secondary}, ${alpha * 0.5})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = CONFIG.PARTICLE_SIZE;
        ctx.beginPath();
        ctx.moveTo(
          particle.x - Math.cos(angle) * 10,
          particle.y - Math.sin(angle) * 10
        );
        ctx.lineTo(particle.x, particle.y);
        ctx.stroke();
      }
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

      particlesRef.current = createParticles(canvas.width, canvas.height);
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
  }, [mounted, draw, createParticles]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: 0.9 }}
    />
  );
} 