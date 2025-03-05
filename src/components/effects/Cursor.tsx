"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';

const SPRING_CONFIG = { damping: 15, stiffness: 200, mass: 0.1 };
const CURSOR_SIZE = 16;

const GRADIENTS = {
  dark: 'linear-gradient(to right, rgb(139, 92, 246), rgb(99, 102, 241))',
  light: 'linear-gradient(to right, rgb(249, 115, 22), rgb(239, 68, 68))'
} as const;

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const cursorX = useSpring(mouseX, SPRING_CONFIG);
  const cursorY = useSpring(mouseY, SPRING_CONFIG);

  useEffect(() => {
    setMounted(true);
    // Hide default cursor when component mounts
    document.body.style.cursor = 'none';
    return () => {
      // Restore default cursor when component unmounts
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - CURSOR_SIZE / 2);
      mouseY.set(e.clientY - CURSOR_SIZE / 2);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  if (!mounted || !resolvedTheme) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 w-4 h-4 rounded-full"
      style={{ 
        x: cursorX,
        y: cursorY,
        background: GRADIENTS[resolvedTheme as keyof typeof GRADIENTS]
      }}
      initial={false}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}
