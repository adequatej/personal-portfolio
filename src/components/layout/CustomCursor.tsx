"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setHasMouse(true);
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Ring follows with slight delay via requestAnimationFrame
  useEffect(() => {
    let animId: number;
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      setRingPosition((prev) => ({
        x: lerp(prev.x, position.x, 0.15),
        y: lerp(prev.y, position.y, 0.15),
      }));
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [position]);

  // Track hover state on interactive elements
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [role="button"], input, select, textarea, label')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [role="button"], input, select, textarea, label')
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!hasMouse) return null;

  const dotSize = isHovering ? 14 : 10;
  const ringSize = isHovering ? 48 : 36;

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          transform: `translate(${position.x - dotSize / 2}px, ${position.y - dotSize / 2}px)`,
          opacity: isVisible ? 1 : 0,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          transition: 'width 0.15s, height 0.15s, opacity 0.15s',
        }}
      />

      {/* Ring — follows with delay */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          transform: `translate(${ringPosition.x - ringSize / 2}px, ${ringPosition.y - ringSize / 2}px)`,
          opacity: isVisible ? 0.5 : 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: '1.5px solid currentColor',
          transition: 'width 0.3s ease-out, height 0.3s ease-out, opacity 0.3s',
        }}
      />
    </>
  );
}
