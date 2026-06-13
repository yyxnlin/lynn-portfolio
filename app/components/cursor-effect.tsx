"use client";

import React, { useRef, useEffect } from "react";
import { useMousePosition } from "@/util/mouse";

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mousePosition = useMousePosition();
  const trailRef = useRef<
    Array<{ x: number; y: number; time: number }>
  >([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const lastPointRef = useRef({ x: 0, y: 0 });
  const isFirstMoveRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    contextRef.current = ctx;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    let animationFrame: number;

    const animate = () => {
      const now = performance.now();

      if (isFirstMoveRef.current) {
        cursorRef.current.x = mousePosition.x;
        cursorRef.current.y = mousePosition.y;
        lastPointRef.current = { ...cursorRef.current };
        isFirstMoveRef.current = false;
      }

      cursorRef.current.x += (mousePosition.x - cursorRef.current.x) * 0.35;
      cursorRef.current.y += (mousePosition.y - cursorRef.current.y) * 0.35;

      const dx = cursorRef.current.x - lastPointRef.current.x;
      const dy = cursorRef.current.y - lastPointRef.current.y;
      if (Math.hypot(dx, dy) > 8) {
        trailRef.current.push({
          x: cursorRef.current.x,
          y: cursorRef.current.y,
          time: now,
        });
        lastPointRef.current = { ...cursorRef.current };
      }

      trailRef.current = trailRef.current.filter(
        (point) => now - point.time < 600,
      );
      if (trailRef.current.length > 40) {
        trailRef.current.shift();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trailRef.current.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "rgba(163, 163, 163, 0.4)";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);
        for (let i = 1; i < trailRef.current.length; i += 1) {
          ctx.lineTo(trailRef.current[i].x, trailRef.current[i].y);
        }
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 z-40 h-full w-full"
      aria-hidden="true"
    />
  );
}
