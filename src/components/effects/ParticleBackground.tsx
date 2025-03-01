'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  charge: number;
  size: number;
  connections: Set<number>;
  lastConnectionTime: number;
  alpha: number;
  active: boolean;
}

interface Props {
  mode: 'static' | 'blackhole';
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

interface StaticConfig {
  NUM_PARTICLES: number;
  PARTICLE_SIZE: { MIN: number; MAX: number };
  PARTICLE_SPEED: { MIN: number; MAX: number };
  CONNECTION_RADIUS: number;
  MOUSE_RADIUS: number;
  MOUSE_FORCE: number;
  CONNECTION_DURATION: number;
  CONNECTION_COOLDOWN: number;
  MAX_CONNECTIONS: number;
  BASE_ALPHA: number;
}

interface BlackholeConfig {
  NUM_PARTICLES: number;
  PARTICLE_SIZE: { MIN: number; MAX: number };
  PARTICLE_SPEED: { MIN: number; MAX: number };
  ATTRACTION_RADIUS: number;
  CORE_RADIUS: number;
  MAX_FORCE: number;
  SPIRAL_FACTOR: number;
  RESPAWN_DELAY: { MIN: number; MAX: number };
  FADE_SPEED: number;
}

const STATIC_CONFIG: StaticConfig = {
  NUM_PARTICLES: 200,
  PARTICLE_SIZE: { MIN: 2, MAX: 4 },
  PARTICLE_SPEED: { MIN: 0.2, MAX: 0.8 },
  CONNECTION_RADIUS: 150,
  MOUSE_RADIUS: 200,
  MOUSE_FORCE: 0.05,
  CONNECTION_DURATION: 500,
  CONNECTION_COOLDOWN: 200,
  MAX_CONNECTIONS: 3,
  BASE_ALPHA: 0.6
};

const BLACKHOLE_CONFIG: BlackholeConfig = {
  NUM_PARTICLES: 300,
  PARTICLE_SIZE: { MIN: 1, MAX: 3 },
  PARTICLE_SPEED: { MIN: 0.5, MAX: 2 },
  ATTRACTION_RADIUS: 300,
  CORE_RADIUS: 5,
  MAX_FORCE: 2,
  SPIRAL_FACTOR: 0.3,
  RESPAWN_DELAY: { MIN: 0, MAX: 2000 },
  FADE_SPEED: 0.05
};

export function ParticleBackground({ mode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme = 'dark' } = useTheme();
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, speed: 0, lastX: 0, lastY: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastFrameTimeRef = useRef(0);

  const createParticles = useCallback((width: number, height: number) => {
    const config = mode === 'static' ? STATIC_CONFIG : BLACKHOLE_CONFIG;
    return Array.from({ length: config.NUM_PARTICLES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2 * config.PARTICLE_SPEED.MAX,
      vy: (Math.random() - 0.5) * 2 * config.PARTICLE_SPEED.MAX,
      charge: Math.random() < 0.5 ? -1 : 1,
      size: Math.random() * (config.PARTICLE_SIZE.MAX - config.PARTICLE_SIZE.MIN) + config.PARTICLE_SIZE.MIN,
      connections: new Set<number>(),
      lastConnectionTime: 0,
      alpha: 1,
      active: true
    }));
  }, [mode]);

  const updateParticles = useCallback((width: number, height: number, deltaTime: number) => {
    const now = Date.now();

    if (mode === 'static') {
      const config = STATIC_CONFIG;
      // Update mouse speed
      const dx = mouseRef.current.x - mouseRef.current.lastX;
      const dy = mouseRef.current.y - mouseRef.current.lastY;
      mouseRef.current.speed = Math.sqrt(dx * dx + dy * dy) / deltaTime;
      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;

      particlesRef.current.forEach((particle, i) => {
        // Basic movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check with bounce
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }

        // Apply slight friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Add small random movement
        particle.vx += (Math.random() - 0.5) * 0.1;
        particle.vy += (Math.random() - 0.5) * 0.1;

        // Limit speed
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > config.PARTICLE_SPEED.MAX) {
          particle.vx = (particle.vx / speed) * config.PARTICLE_SPEED.MAX;
          particle.vy = (particle.vy / speed) * config.PARTICLE_SPEED.MAX;
        }

        // Clear old connections
        particle.connections.clear();

        // Check for new connections only near mouse
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mouseRef.current.x, 2) +
          Math.pow(particle.y - mouseRef.current.y, 2)
        );

        if (mouseDistance < config.MOUSE_RADIUS && 
            now - particle.lastConnectionTime > config.CONNECTION_COOLDOWN) {
          // Find nearby particles for connections
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const other = particlesRef.current[j];
            const distance = Math.sqrt(
              Math.pow(particle.x - other.x, 2) +
              Math.pow(particle.y - other.y, 2)
            );

            if (distance < config.CONNECTION_RADIUS &&
                particle.connections.size < config.MAX_CONNECTIONS &&
                other.connections.size < config.MAX_CONNECTIONS) {
              particle.connections.add(j);
              other.connections.add(i);
              particle.lastConnectionTime = now;
              other.lastConnectionTime = now;
            }
          }
        }
      });
    } else {
      const config = BLACKHOLE_CONFIG;
      // Black hole effect
      particlesRef.current.forEach(particle => {
        if (!particle.active) {
          // Check if it's time to respawn
          if (now - particle.lastConnectionTime > Math.random() * 
              (config.RESPAWN_DELAY.MAX - config.RESPAWN_DELAY.MIN) + config.RESPAWN_DELAY.MIN) {
            // Respawn at a random edge of the screen
            const side = Math.floor(Math.random() * 4);
            switch (side) {
              case 0: // Top
                particle.x = Math.random() * width;
                particle.y = 0;
                break;
              case 1: // Right
                particle.x = width;
                particle.y = Math.random() * height;
                break;
              case 2: // Bottom
                particle.x = Math.random() * width;
                particle.y = height;
                break;
              case 3: // Left
                particle.x = 0;
                particle.y = Math.random() * height;
                break;
            }
            particle.vx = (Math.random() - 0.5) * config.PARTICLE_SPEED.MAX;
            particle.vy = (Math.random() - 0.5) * config.PARTICLE_SPEED.MAX;
            particle.alpha = 1;
            particle.active = true;
          }
          return;
        }

        // Calculate distance and direction to mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.ATTRACTION_RADIUS) {
          // Calculate gravitational force
          const force = (1 - distance / config.ATTRACTION_RADIUS) * config.MAX_FORCE;
          
          // Add spiral effect
          const angle = Math.atan2(dy, dx);
          const spiralForce = config.SPIRAL_FACTOR * force;
          
          particle.vx += (dx / distance) * force + Math.cos(angle + Math.PI / 2) * spiralForce;
          particle.vy += (dy / distance) * force + Math.sin(angle + Math.PI / 2) * spiralForce;

          // Check if particle has reached the "event horizon"
          if (distance < config.CORE_RADIUS) {
            particle.active = false;
            particle.lastConnectionTime = now;
            return;
          }

          // Fade out as it gets closer to the center
          particle.alpha = Math.max(0.2, distance / config.ATTRACTION_RADIUS);
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply drag
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Boundary check
        if (particle.x < 0 || particle.x > width || particle.y < 0 || particle.y > height) {
          particle.active = false;
          particle.lastConnectionTime = now;
        }
      });
    }
  }, [mode]);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const now = performance.now();
    const deltaTime = now - lastFrameTimeRef.current;
    lastFrameTimeRef.current = now;

    const width = canvas.width;
    const height = canvas.height;
    const colors = COLORS[resolvedTheme as keyof typeof COLORS];

    // Clear canvas with fade effect
    ctx.fillStyle = `rgba(0, 0, 0, ${mode === 'static' ? 0.2 : 0.1})`;
    ctx.fillRect(0, 0, width, height);

    // Update particle positions
    updateParticles(width, height, deltaTime);

    // Draw particles and connections
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (mode === 'static') {
      const config = STATIC_CONFIG;
      // Draw connections first
      particlesRef.current.forEach((particle, i) => {
        particle.connections.forEach(j => {
          const other = particlesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(particle.x - other.x, 2) +
            Math.pow(particle.y - other.y, 2)
          );
          
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y,
            other.x, other.y
          );
          
          const alpha = Math.min(
            1 - distance / config.CONNECTION_RADIUS,
            config.BASE_ALPHA
          );

          gradient.addColorStop(0, `rgba(${colors.primary}, ${alpha})`);
          gradient.addColorStop(1, `rgba(${colors.secondary}, ${alpha})`);
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        });
      });

      // Draw particles
      particlesRef.current.forEach(particle => {
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `rgba(${colors.primary}, ${config.BASE_ALPHA})`);
        gradient.addColorStop(1, `rgba(${colors.primary}, 0)`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      const config = BLACKHOLE_CONFIG;
      // Draw black hole effect
      const mouseGradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, config.ATTRACTION_RADIUS
      );
      mouseGradient.addColorStop(0, `rgba(${colors.primary}, 0.2)`);
      mouseGradient.addColorStop(0.1, `rgba(${colors.secondary}, 0.1)`);
      mouseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = mouseGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particlesRef.current.forEach(particle => {
        if (!particle.active) return;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `rgba(${colors.primary}, ${particle.alpha})`);
        gradient.addColorStop(1, `rgba(${colors.primary}, 0)`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    animationFrameRef.current = requestAnimationFrame(draw);
  }, [mode, resolvedTheme, updateParticles]);

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

      // Reset particles
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    lastFrameTimeRef.current = performance.now();
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