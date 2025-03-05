"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { useEffect } from "react";

type Point = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  ix: number;
  iy: number;
};

type ParticlesProps = {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
  colorDark?: string;
};

export function Particles({
  className,
  quantity = 50,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = "#f97316",
  colorDark = "#a855f7",
}: ParticlesProps) {
  const { theme } = useTheme();
  const canvasRef = useCallback((node: HTMLCanvasElement) => {
    if (!node) return;

    const ctx = node.getContext("2d")!;
    let points: Point[] = [];
    let frame: number;
    let width: number;
    let height: number;
    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      node.width = width;
      node.height = height;
    };

    const pointsInit = () => {
      points = [];
      for (let i = 0; i < quantity; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        points.push({
          x: x,
          y: y,
          dx: (Math.random() - 0.5) * 2,
          dy: (Math.random() - 0.5) * 2,
          ix: x,
          iy: y,
        });
      }
    };

    const updatePoints = () => {
      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        const dx = (mouse?.x || width / 2) - point.x;
        const dy = (mouse?.y || height / 2) - point.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const f = d < 1 ? 1 : -staticity / d;

        if (d < staticity) {
          point.dx = dx * f * 0.01;
          point.dy = dy * f * 0.01;
        }

        point.x += point.dx * 0.1;
        point.y += point.dy * 0.1;

        if (point.x < 0 || point.x > width) {
          point.dx *= -1;
        }
        if (point.y < 0 || point.y > height) {
          point.dy *= -1;
        }

        point.dx = (point.dx + (point.ix - point.x) / ease) * 0.95;
        point.dy = (point.dy + (point.iy - point.y) / ease) * 0.95;
      }
    };

    const renderPoints = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = theme === "dark" ? colorDark : color;
      ctx.globalAlpha = 0.7;
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const initCanvas = () => {
      setSize();
      pointsInit();
    };

    const loop = () => {
      updatePoints();
      renderPoints();
      frame = requestAnimationFrame(loop);
    };

    initCanvas();
    loop();

    const handleMouse = (event: MouseEvent | TouchEvent) => {
      if (event instanceof MouseEvent) {
        mouse = {
          x: event.clientX,
          y: event.clientY,
        };
      } else {
        mouse = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }
    };

    const handleResize = () => {
      setSize();
      pointsInit();
      // Reset mouse position on resize
      mouse = {
        x: width / 2,
        y: height / 2,
      };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleMouse);
    window.addEventListener("touchstart", handleMouse);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleMouse);
      window.removeEventListener("touchstart", handleMouse);
      cancelAnimationFrame(frame);
    };
  }, [quantity, staticity, ease, refresh, color, colorDark, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none", className)}
    />
  );
} 