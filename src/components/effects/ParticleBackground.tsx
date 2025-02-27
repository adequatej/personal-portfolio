'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const currentTheme = resolvedTheme || theme;

  // Theme-specific colors
  const colors = {
    dark: ['rgba(139, 92, 246, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)'], // Purple/Blue
    light: ['rgba(249, 115, 22, 0.3)', 'rgba(234, 179, 8, 0.3)', 'rgba(239, 68, 68, 0.3)']  // Orange/Yellow/Red
  };

  const createParticles = useCallback(() => {
    if (!canvasRef.current || !currentTheme) return;
    const canvas = canvasRef.current;
    const particles: Particle[] = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 8000);

    const currentColors = currentTheme === 'dark' ? colors.dark : colors.light;

    for (let i = 0; i < particleCount; i++) {
      const baseSize = Math.random() * 1.5 + 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: baseSize,
        baseSize,
        color: currentColors[Math.floor(Math.random() * currentColors.length)]
      });
    }

    particlesRef.current = particles;
  }, [currentTheme, colors]);

  const draw = useCallback(() => {
    if (!canvasRef.current || !currentTheme) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create gradient for glow around mouse
    const mouseGradient = ctx.createRadialGradient(
      mouseRef.current.x, mouseRef.current.y, 0,
      mouseRef.current.x, mouseRef.current.y, 300
    );
    
    // Theme-specific mouse glow
    if (currentTheme === 'dark') {
      mouseGradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)'); 
      mouseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      mouseGradient.addColorStop(0, 'rgba(249, 115, 22, 0.1)'); 
      mouseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    
    ctx.fillStyle = mouseGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach((particle, i) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const mouseInfluence = Math.max(0, 1 - distance / 150);
      particle.size = particle.baseSize * (1 + mouseInfluence * 2);

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const other = particlesRef.current[j];
        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.2;
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y,
            other.x, other.y
          );
          
          if (currentTheme === 'dark') {
            gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`); // Purple
            gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`); // Blue
          } else {
            gradient.addColorStop(0, `rgba(249, 115, 22, ${opacity})`); // Orange
            gradient.addColorStop(1, `rgba(234, 179, 8, ${opacity})`); // Yellow
          }
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.5 + mouseInfluence * 0.5;
          ctx.stroke();
        }
      }
    });

    animationFrameRef.current = requestAnimationFrame(draw);
  }, [currentTheme]);

  // Reset animation and recreate particles
  const resetAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (canvasRef.current) {
      createParticles();
      animationFrameRef.current = requestAnimationFrame(draw);
    }
  }, [createParticles, draw]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (!mounted) return;
    resetAnimation();
  }, [mounted, currentTheme, resetAnimation]);

  // Main initialization effect
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
      
      resetAnimation();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, resetAnimation]);

  if (!mounted || !currentTheme) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: 0.8 }}
    />
  );
} 