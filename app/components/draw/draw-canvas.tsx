"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCanvasPoint, renderStrokes } from "@/lib/drawing-render";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEFAULT_DRAW_COLOR,
  DRAW_COLORS,
  MESSAGE_MAX,
  NAME_MAX,
  type Stroke,
} from "@/types/keroppi";
import { Eraser } from "lucide-react";

export function DrawCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [color, setColor] = useState(DEFAULT_DRAW_COLOR);
  const [brushSize, setBrushSize] = useState(6);
  const [eraser, setEraser] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const isDrawingRef = useRef(false);

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const CANVAS_BG = "#0b0c0f";

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;

    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    renderStrokes(ctx, allStrokes, 1);
  }, [strokes, currentStroke]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    redraw();
  }, [redraw]);

  /* undo */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        setStrokes((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* drawing */
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    setStatus(null);

    const point = getCanvasPoint(e.clientX, e.clientY, e.currentTarget);

    setCurrentStroke({
      color: eraser ? CANVAS_BG : color,
      width: eraser ? brushSize * 2 : brushSize,
      points: [point],
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;

    const point = getCanvasPoint(e.clientX, e.clientY, e.currentTarget);

    setCurrentStroke((prev) =>
      prev ? { ...prev, points: [...prev.points, point] } : prev
    );
  };

  const finishStroke = () => {
    if (!currentStroke) return;

    isDrawingRef.current = false;
    setStrokes((prev) => [...prev, currentStroke]);
    setCurrentStroke(null);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    finishStroke();
  };

  const handleClear = () => {
    if (strokes.length === 0) return;
    if (!window.confirm("Clear the canvas? This cannot be undone.")) return;

    setStrokes([]);
    setCurrentStroke(null);
    setStatus(null);
  };

  const handleUndo = () => {
    if (strokes.length === 0) return;
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleFinish = async () => {
    if (!name.trim()) {
      setStatus("Add your name.");
      return;
    }

    if (strokes.length === 0) {
      setStatus("Draw something first.");
      return;
    }

    setSaving(true);
    setStatus(null);

    try {
      const payload = {
        name: name.trim(),
        message: message.trim(),
        strokes,
        scale: 1,
        rotation: (Math.random() - 0.5) * 0.5,
        createdAt: Date.now(),
      };

      // store temporarily instead of Firestore
      sessionStorage.setItem("pending_keroppi", JSON.stringify(payload));

      setStatus("Now place your doodle ✿");

      setStrokes([]);
      setName("");
      setMessage("");

      setTimeout(() => router.push("/canvas?placing=1"), 300);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not proceed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl text-neutral-900 dark:text-neutral-100">

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            ✿ sketch studio
          </p>

          <h1 className="mt-2 text-3xl font-medium md:text-4xl tracking-tight">
            draw your doodle
          </h1>

          <p className="mt-2 text-sm text-neutral-500 italic">
            sketch something, then press finish
          </p>
        </div>

        <Link
          href="/canvas"
          className="text-sm text-neutral-500 hover:text-neutral-800 transition"
        >
          ↗ view canvas
        </Link>
      </div>

      {/* Panel */}
      <div className="rounded-2xl p-4 md:p-5 bg-white/90 dark:bg-neutral-900/80 shadow-xl border border-black/5 backdrop-blur-md">

        {/* inputs */}
        <div className="mb-4 space-y-3 pb-4 border-b border-black/5">

          <label className="block text-sm text-neutral-700 dark:text-neutral-300">
            Name
            <input
              type="text"
              value={name}
              maxLength={NAME_MAX}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/5 bg-white/80 dark:bg-neutral-800/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-200"
            />
          </label>

          <label className="block text-sm text-neutral-700 dark:text-neutral-300">
            Message
            <textarea
              value={message}
              maxLength={MESSAGE_MAX}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-xl border border-black/5 bg-white/80 dark:bg-neutral-800/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-200"
            />
          </label>
        </div>

        {/* TOOLBAR */}
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-800/40 p-3">

          {/* colors */}
          <div className="flex gap-1.5">
            {DRAW_COLORS.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setColor(preset);
                  setEraser(false);
                }}
                className={`h-6 w-6 rounded-full border transition hover:scale-110 ${
                  color === preset
                    ? "ring-2 ring-pink-200 ring-offset-1"
                    : "border-black/10"
                }`}
                style={{ backgroundColor: preset }}
              />
            ))}
          </div>
          <button
            onClick={() => setEraser((prev) => !prev)}
            title="Eraser"
            className={`
              flex h-6 w-6 items-center justify-center rounded-full
              border transition hover:scale-110
              bg-white dark:bg-neutral-800
              ${
                eraser
                  ? "ring-2 ring-pink-200 ring-offset-1 border-black/10"
                  : "border-black/10"
              }
            `}
          >
          <Eraser className="h-3.5 w-3.5 text-neutral-500" />
          </button>


          {/* brush */}
          <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
            <span>size</span>

            <input
              type="range"
              min={3}
              max={10}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-24 accent-neutral-700"
            />

            <span className="w-3 text-[11px]">{brushSize}</span>
          </div>

          {/* buttons (compressed row) */}
          <div className="ml-auto flex gap-2">

            <button
              onClick={handleUndo}
              disabled={strokes.length === 0}
              className="
                rounded-full px-3 py-1 text-xs
                border border-black/10 dark:border-white/10
                bg-white/70 dark:bg-neutral-800/70
                text-neutral-700 dark:text-neutral-200
                hover:scale-105 transition
              "
            >
              Undo
            </button>


            <button
              onClick={handleClear}
              className="
                rounded-full px-3 py-1 text-xs
                border border-black/10 dark:border-white/10
                bg-white/70 dark:bg-neutral-800/70
                text-neutral-700 dark:text-neutral-200
                hover:scale-105 transition
              "
            >
              Clear
            </button>

            <button
              onClick={handleFinish}
              disabled={saving}
              className="rounded-full px-4 py-1 text-xs bg-neutral-900 text-white hover:scale-105 transition"
            >
              {saving ? "..." : "Finish"}
            </button>

          </div>
        </div>

        {/* Canvas */}
        <div className="rounded-2xl border border-black/10 bg-neutral-900 p-2 shadow-2xl">

          <canvas
            ref={canvasRef}
            className="block w-full cursor-crosshair touch-none"
            style={{
              aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
              backgroundColor: CANVAS_BG,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />

        </div>

        {status && (
          <p className="mt-3 text-center text-sm text-neutral-500">
            {status}
          </p>
        )}

      </div>
    </div>
  );
}