"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';

const CURSOR_OFFSET = 8;
const SPRING_CONFIG = { damping: 15, stiffness: 200, mass: 0.1 };

const GRADIENTS = {
  dark: 'linear-gradient(to right, rgb(139, 92, 246), rgb(59, 130, 246))',
  light: 'linear-gradient(to right, rgb(249, 115, 22), rgb(234, 179, 8))'
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
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - CURSOR_OFFSET);
      mouseY.set(e.clientY - CURSOR_OFFSET);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  if (!mounted || !resolvedTheme) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-50"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div 
        className="w-4 h-4 rounded-full"
        initial={false}
        animate={{
          background: GRADIENTS[resolvedTheme as keyof typeof GRADIENTS]
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
