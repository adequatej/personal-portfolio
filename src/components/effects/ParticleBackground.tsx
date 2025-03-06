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
  connections: Map<number, number>;
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
    secondary: '99, 102, 241',  // Indigo
    gradient: {
      start: '168, 85, 247',    // Purple-500
      mid: '129, 140, 248',     // Indigo-400
      end: '79, 70, 229'        // Indigo-600
    }
  },
  light: {
    primary: '249, 115, 22',   // Orange
    secondary: '239, 68, 68',   // Red
    gradient: {
      start: '251, 146, 60',    // Orange-400 (brighter)
      mid: '234, 88, 12',       // Orange-600 (deeper)
      end: '220, 38, 38'        // Red-600 (richer)
    }
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
  NUM_PARTICLES: 2500,
  PARTICLE_SIZE: { MIN: 1.5, MAX: 2.5 },
  PARTICLE_SPEED: { MIN: 0.5, MAX: 0.7 },
  CONNECTION_RADIUS: 100, 
  MOUSE_RADIUS: 350,
  MOUSE_FORCE: 0.05,
  CONNECTION_DURATION: 1000,
  CONNECTION_COOLDOWN: 0,
  MAX_CONNECTIONS: 1000,
  BASE_ALPHA: 0.08  // Base alpha will be adjusted in the component
};

const BLACKHOLE_CONFIG: BlackholeConfig = {
  NUM_PARTICLES: 600,
  PARTICLE_SIZE: { MIN: 1, MAX: 3 },
  PARTICLE_SPEED: { MIN: 0.5, MAX: 2 },
  ATTRACTION_RADIUS: 300,
  CORE_RADIUS: 5,
  MAX_FORCE: 2,
  SPIRAL_FACTOR: 0.3,
  RESPAWN_DELAY: { MIN: 0, MAX: 2000 },
  FADE_SPEED: 0.05
};

// Add mobile-optimized configurations
const STATIC_CONFIG_MOBILE: StaticConfig = {
  NUM_PARTICLES: 1000,  // Reduced number for better performance
  PARTICLE_SIZE: { MIN: 2, MAX: 3 },  // Slightly larger for better visibility
  PARTICLE_SPEED: { MIN: 0.3, MAX: 0.6 },
  CONNECTION_RADIUS: 80,
  MOUSE_RADIUS: 150,  // Adjusted for touch
  MOUSE_FORCE: 0.05,
  CONNECTION_DURATION: 1000,
  CONNECTION_COOLDOWN: 0,
  MAX_CONNECTIONS: 3,
  BASE_ALPHA: 0.1
};

const BLACKHOLE_CONFIG_MOBILE: BlackholeConfig = {
  NUM_PARTICLES: 300,  // Reduced for mobile
  PARTICLE_SIZE: { MIN: 1.5, MAX: 3.5 },
  PARTICLE_SPEED: { MIN: 0.4, MAX: 1.5 },
  ATTRACTION_RADIUS: 200,
  CORE_RADIUS: 5,
  MAX_FORCE: 1.5,
  SPIRAL_FACTOR: 0.3,
  RESPAWN_DELAY: { MIN: 0, MAX: 2000 },
  FADE_SPEED: 0.05
};

export function ParticleBackground({ mode }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);
  const lastFrameTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

  const createParticles = useCallback((width: number, height: number) => {
    const config = mode === 'static' 
      ? (isMobileRef.current ? STATIC_CONFIG_MOBILE : STATIC_CONFIG)
      : (isMobileRef.current ? BLACKHOLE_CONFIG_MOBILE : BLACKHOLE_CONFIG);

    return Array.from({ length: config.NUM_PARTICLES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2 * config.PARTICLE_SPEED.MAX,
      vy: (Math.random() - 0.5) * 2 * config.PARTICLE_SPEED.MAX,
      charge: Math.random() < 0.5 ? -1 : 1,
      size: Math.random() * (config.PARTICLE_SIZE.MAX - config.PARTICLE_SIZE.MIN) + config.PARTICLE_SIZE.MIN,
      connections: new Map<number, number>(),
      lastConnectionTime: 0,
      alpha: 1,
      active: true
    }));
  }, [mode]);

  const updateParticles = useCallback((width: number, height: number) => {
    const now = Date.now();

    if (mode === 'static') {
      const config = isMobileRef.current ? STATIC_CONFIG_MOBILE : STATIC_CONFIG;
      
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

        // Apply slight friction (reduced for smoother movement)
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Add very minimal random movement
        particle.vx += (Math.random() - 0.5) * 0.005;
        particle.vy += (Math.random() - 0.5) * 0.005;

        // Ensure minimum speed (keep particles moving)
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed < config.PARTICLE_SPEED.MIN) {
          const scale = config.PARTICLE_SPEED.MIN / speed;
          particle.vx *= scale;
          particle.vy *= scale;
        }

        // Limit maximum speed
        if (speed > config.PARTICLE_SPEED.MAX) {
          const scale = config.PARTICLE_SPEED.MAX / speed;
          particle.vx *= scale;
          particle.vy *= scale;
        }

        // Don't clear connections every frame, instead update their strengths
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mouseRef.current.x, 2) +
          Math.pow(particle.y - mouseRef.current.y, 2)
        );

        const isNearMouse = mouseDistance < config.MOUSE_RADIUS;

        // Update existing connections
        for (const [connectedIndex, strength] of [...particle.connections.entries()]) {
          const other = particlesRef.current[connectedIndex];
          const distance = Math.sqrt(
            Math.pow(particle.x - other.x, 2) +
            Math.pow(particle.y - other.y, 2)
          );

          const midX = (particle.x + other.x) / 2;
          const midY = (particle.y + other.y) / 2;
          const connectionMouseDist = Math.sqrt(
            Math.pow(midX - mouseRef.current.x, 2) +
            Math.pow(midY - mouseRef.current.y, 2)
          );

          // Determine if this connection should remain active
          const shouldKeepConnection = 
            distance < config.CONNECTION_RADIUS && 
            connectionMouseDist < config.MOUSE_RADIUS;

          if (!shouldKeepConnection) {
            // Fade out connection
            const newStrength = strength * 0.8; // Faster fade out
            if (newStrength < 0.01) {
              particle.connections.delete(connectedIndex);
              other.connections.delete(i);
            } else {
              particle.connections.set(connectedIndex, newStrength);
              other.connections.set(i, newStrength);
            }
            continue;
          }

          // Update connection strength based on distance and mouse proximity
          const distanceFactor = 1 - (distance / config.CONNECTION_RADIUS);
          const mouseFactor = 1 - (connectionMouseDist / config.MOUSE_RADIUS);
          const targetStrength = distanceFactor * mouseFactor;

          const newStrength = strength * 0.9 + targetStrength * 0.1; // Smoother transition
          particle.connections.set(connectedIndex, newStrength);
          other.connections.set(i, newStrength);
        }

        // Look for new connections only if near mouse
        if (isNearMouse && particle.connections.size < config.MAX_CONNECTIONS) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            if (particle.connections.has(j)) continue;
            
            const other = particlesRef.current[j];
            if (other.connections.size >= config.MAX_CONNECTIONS) continue;

            const otherMouseDist = Math.sqrt(
              Math.pow(other.x - mouseRef.current.x, 2) +
              Math.pow(other.y - mouseRef.current.y, 2)
            );

            // Only connect if both particles are near mouse
            if (otherMouseDist < config.MOUSE_RADIUS) {
              const distance = Math.sqrt(
                Math.pow(particle.x - other.x, 2) +
                Math.pow(particle.y - other.y, 2)
              );

              if (distance < config.CONNECTION_RADIUS) {
                const distanceFactor = 1 - (distance / config.CONNECTION_RADIUS);
                const mouseFactor = Math.min(
                  1 - (mouseDistance / config.MOUSE_RADIUS),
                  1 - (otherMouseDist / config.MOUSE_RADIUS)
                );
                
                const initialStrength = 0.01 + distanceFactor * mouseFactor * 0.2; // Start very weak
                particle.connections.set(j, initialStrength);
                other.connections.set(i, initialStrength);
              }
            }
          }
        }

        // Update particle alpha based on mouse proximity and connections
        const maxStrength = Math.max(0, ...particle.connections.values());
        const targetAlpha = isNearMouse
          ? 0.4 + maxStrength * 0.6
          : config.BASE_ALPHA;
        
        particle.alpha = particle.alpha * 0.95 + targetAlpha * 0.05;
      });
    } else {
      const config = isMobileRef.current ? BLACKHOLE_CONFIG_MOBILE : BLACKHOLE_CONFIG;
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

        // Smoothly interpolate alpha for connections
        if (particle.connections.size > 0) {
          particle.alpha = particle.alpha * 0.95 + 0.8 * 0.05; // Smooth increase
        } else {
          // Use STATIC_CONFIG's BASE_ALPHA for consistency in both modes
          const baseAlpha = (isMobileRef.current ? STATIC_CONFIG_MOBILE : STATIC_CONFIG).BASE_ALPHA;
          particle.alpha = particle.alpha * 0.95 + baseAlpha * 0.05; // Smooth decrease
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
    lastFrameTimeRef.current = now;

    const width = canvas.width;
    const height = canvas.height;
    const colors = COLORS[resolvedTheme as keyof typeof COLORS];

    // Clear canvas completely
    ctx.clearRect(0, 0, width, height);

    // Update particle positions
    updateParticles(width, height);

    if (mode === 'static') {
      const config = isMobileRef.current ? STATIC_CONFIG_MOBILE : STATIC_CONFIG;
      
      // Draw connections first
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      particlesRef.current.forEach((particle) => {
        // Draw connections
        particle.connections.forEach((strength, j) => {
          const other = particlesRef.current[j];
          
          const midX = (particle.x + other.x) / 2;
          const midY = (particle.y + other.y) / 2;
          const mouseDistance = Math.sqrt(
            Math.pow(midX - mouseRef.current.x, 2) +
            Math.pow(midY - mouseRef.current.y, 2)
          );
          
          const mouseFactor = mouseDistance < config.MOUSE_RADIUS
            ? (1 - mouseDistance / config.MOUSE_RADIUS)
            : 0;

          // Increase alpha for light mode
          const baseConnectionAlpha = resolvedTheme === 'light' ? 0.5 : 0.3;
          const alpha = strength * (baseConnectionAlpha + mouseFactor * 0.7);
          
          // Draw connection with gradient
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y, other.x, other.y
          );
          
          const colorStart = colors.gradient.start;
          const colorMid = colors.gradient.mid;
          const colorEnd = colors.gradient.end;
          
          // Use a three-color gradient for more vibrant effect
          gradient.addColorStop(0, `rgba(${colorStart}, ${alpha * particle.alpha})`);
          gradient.addColorStop(0.5, `rgba(${colorMid}, ${alpha * Math.max(particle.alpha, other.alpha)})`);
          gradient.addColorStop(1, `rgba(${colorEnd}, ${alpha * other.alpha})`);
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          // Increase line width for light mode
          const maxWidth = resolvedTheme === 'light' ? 2.5 : 2;
          ctx.lineWidth = Math.min(maxWidth, 1 + strength * mouseFactor * 1.5);
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        });

        // Draw particle with increased brightness near mouse
        ctx.beginPath();
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mouseRef.current.x, 2) +
          Math.pow(particle.y - mouseRef.current.y, 2)
        );
        const mouseInfluence = mouseDistance < config.MOUSE_RADIUS
          ? 1 - (mouseDistance / config.MOUSE_RADIUS)
          : 0;
        
        // Increase alpha for light mode
        const baseParticleAlpha = resolvedTheme === 'light' ? 0.6 : 0.4;
        const particleAlpha = baseParticleAlpha + mouseInfluence * 0.6;
        
        // Use gradient colors for particles
        const colorStart = colors.gradient.start;
        const colorMid = colors.gradient.mid;
        const colorEnd = colors.gradient.end;
        
        ctx.fillStyle = `rgba(${colorMid}, ${particleAlpha})`;
        
        // Add glow effect with gradient
        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * (resolvedTheme === 'light' ? 3 : 2)
        );
        glow.addColorStop(0, `rgba(${colorMid}, ${particleAlpha})`);
        glow.addColorStop(0.5, `rgba(${colorStart}, ${particleAlpha * 0.6})`);
        glow.addColorStop(1, `rgba(${colorEnd}, 0)`);
        ctx.fillStyle = glow;
        
        ctx.arc(particle.x, particle.y, 
          particle.size * (1 + mouseInfluence * 0.8), 
          0, Math.PI * 2
        );
        ctx.fill();
      });
    } else {
      const config = isMobileRef.current ? BLACKHOLE_CONFIG_MOBILE : BLACKHOLE_CONFIG;
      
      // Draw a subtle glow around the mouse position (black hole)
      const blackholeGlow = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, config.ATTRACTION_RADIUS
      );
      
      const colorStart = colors.gradient.start;
      const colorMid = colors.gradient.mid;
      const colorEnd = colors.gradient.end;
      
      blackholeGlow.addColorStop(0, `rgba(${colorMid}, 0.3)`);
      blackholeGlow.addColorStop(0.1, `rgba(${colorStart}, 0.15)`);
      blackholeGlow.addColorStop(0.5, `rgba(${colorEnd}, 0.05)`);
      blackholeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.fillStyle = blackholeGlow;
      ctx.arc(mouseRef.current.x, mouseRef.current.y, config.ATTRACTION_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        if (!particle.active) return;
        
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mouseRef.current.x, 2) +
          Math.pow(particle.y - mouseRef.current.y, 2)
        );
        
        // Calculate color based on distance to mouse
        const distanceRatio = Math.min(1, mouseDistance / config.ATTRACTION_RADIUS);
        
        // Create a gradient for the particle trail
        if (mouseDistance < config.ATTRACTION_RADIUS * 1.2) {
          const angle = Math.atan2(
            mouseRef.current.y - particle.y,
            mouseRef.current.x - particle.x
          );
          
          const trailLength = Math.min(20, 5 + (1 - distanceRatio) * 15);
          const trailX = particle.x - Math.cos(angle) * trailLength;
          const trailY = particle.y - Math.sin(angle) * trailLength;
          
          const trail = ctx.createLinearGradient(
            particle.x, particle.y,
            trailX, trailY
          );
          
          const trailAlpha = particle.alpha * (1 - distanceRatio) * 0.7;
          trail.addColorStop(0, `rgba(${colorStart}, ${trailAlpha})`);
          trail.addColorStop(1, `rgba(${colorEnd}, 0)`);
          
          ctx.beginPath();
          ctx.strokeStyle = trail;
          ctx.lineWidth = particle.size;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(trailX, trailY);
          ctx.stroke();
        }
        
        // Draw the particle with gradient color
        ctx.beginPath();
        const particleColor = distanceRatio < 0.5 
          ? colorStart 
          : distanceRatio < 0.8 ? colorMid : colorEnd;
        
        ctx.fillStyle = `rgba(${particleColor}, ${particle.alpha})`;
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
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Update mobile detection
      isMobileRef.current = width <= 768;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Reset particles with appropriate config
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      lastTouchRef.current = null; // Reset touch when using mouse
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = touch.clientY;
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = touch.clientY;
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchEnd = () => {
      // Gradually move the influence point off screen when touch ends
      const animate = () => {
        if (!lastTouchRef.current) return;
        
        const dx = window.innerWidth / 2 - lastTouchRef.current.x;
        const dy = window.innerHeight / 2 - lastTouchRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 1) {
          lastTouchRef.current = null;
          return;
        }
        
        lastTouchRef.current.x += dx * 0.1;
        lastTouchRef.current.y += dy * 0.1;
        mouseRef.current.x = lastTouchRef.current.x;
        mouseRef.current.y = lastTouchRef.current.y;
        
        requestAnimationFrame(animate);
      };
      
      animate();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    lastFrameTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
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