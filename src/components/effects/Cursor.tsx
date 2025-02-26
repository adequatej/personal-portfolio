"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <motion.div
      className="fixed w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: position.x - 8,
        y: position.y - 8,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
      }}
    />
  );
}
