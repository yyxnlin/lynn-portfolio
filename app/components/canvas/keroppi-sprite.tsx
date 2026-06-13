"use client";

import { useEffect, useRef } from "react";
import { renderLineArt } from "@/lib/drawing-render";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  SPRITE_WIDTH,
  type Keroppi,
} from "@/types/keroppi";

type KeroppiSpriteProps = {
  keroppi: Keroppi;
  visible: boolean;
  isHovered?: boolean;
  onHover: (keroppi: Keroppi, x: number, y: number) => void;
  onLeave: () => void;
  onClick?: (keroppi: Keroppi) => void;
};

export function KeroppiSprite({
  keroppi,
  visible,
  isHovered = false,
  onHover,
  onLeave,
  onClick,
  scale = 1,
}: KeroppiSpriteProps & { scale?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const displayHeight = (SPRITE_WIDTH * CANVAS_HEIGHT) / CANVAS_WIDTH;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = SPRITE_WIDTH * dpr;
    canvas.height = displayHeight * dpr;

    const drawScale = (SPRITE_WIDTH / CANVAS_WIDTH) * dpr;

    renderLineArt(ctx, keroppi.strokes, drawScale, {
      highlight: isHovered,
    });
  }, [keroppi, displayHeight, isHovered]);

  return (
    <div
      className="absolute transition-opacity duration-500"
      style={{
        left: keroppi.x * scale,
        top: keroppi.y * scale,
        opacity: visible ? 1 : 0,
      }}
      onClick={() => onClick?.(keroppi)}
    >
      <div
        className="relative origin-top-left transition-transform duration-200 hover:scale-[1.06]"
        style={{
          transform: `rotate(${keroppi.rotation}rad) scale(${keroppi.scale * scale})`,
        }}
        onMouseEnter={(e) => onHover(keroppi, e.clientX, e.clientY)}
        onMouseMove={(e) => onHover(keroppi, e.clientX, e.clientY)}
        onMouseLeave={onLeave}

        onTouchStart={(e) => {
          const t = e.touches[0];
          onHover(keroppi, t.clientX, t.clientY);
        }}
        onTouchMove={(e) => {
          const t = e.touches[0];
          onHover(keroppi, t.clientX, t.clientY);
        }}
        onTouchEnd={onLeave}
      >
        <canvas
          ref={canvasRef}
          className="block cursor-default"
          style={{
            width: SPRITE_WIDTH * scale,
            height: displayHeight * scale,
            filter: isHovered
              ? "brightness(1.15) contrast(1.05)"
              : "none",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}