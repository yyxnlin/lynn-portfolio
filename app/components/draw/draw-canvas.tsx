"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCanvasPoint, renderStrokes } from "@/lib/drawing-render";
import {
  CANVAS_BG,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEFAULT_DRAW_COLOR,
  DRAW_COLORS,
  MESSAGE_MAX,
  NAME_MAX,
  type Stroke,
} from "@/types/keroppi";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export function DrawCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [color, setColor] = useState(DEFAULT_DRAW_COLOR);
  const [brushSize, setBrushSize] = useState(6);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const isDrawingRef = useRef(false);

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

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

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    setStatus(null);

    const point = getCanvasPoint(e.clientX, e.clientY, e.currentTarget);

    setCurrentStroke({
      color,
      width: brushSize,
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
    if (!window.confirm("Clear the blackboard? This cannot be undone.")) return;

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
      await addDoc(collection(db, "keroppis"), {
        name: name.trim(),
        message: message.trim(),
        strokes,

        x: Math.random() * (900 - 80),
        y: Math.random() * (600 - 80),

        scale: 1,
        rotation: (Math.random() - 0.5) * 0.5,

        createdAt: Date.now(),
      });

      setStatus("Placed in the field!");

      setStrokes([]);
      setName("");
      setMessage("");

      setTimeout(() => router.push("/field"), 500);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-caps">Keroppi</p>
          <h1 className="mt-2 text-3xl font-medium text-neutral-900 md:text-4xl">
            Draw your Keroppi
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Sketch on the blackboard, then click finish to place it in the field.
          </p>
        </div>

        <Link
          href="/field"
          className="text-sm text-neutral-500 no-underline hover:text-neutral-800"
        >
          Visit field →
        </Link>
      </div>

      <div className="glass rounded-xl p-4 md:p-5">
        {/* Name + message */}
        <div className="mb-4 space-y-3 border-b border-neutral-200/80 pb-4">
          <label className="block text-sm text-neutral-600">
            Name <span className="text-neutral-400">(required)</span>
            <input
              type="text"
              value={name}
              maxLength={NAME_MAX}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name"
              className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-400"
            />
          </label>

          <label className="block text-sm text-neutral-600">
            Message
            <textarea
              value={message}
              maxLength={MESSAGE_MAX}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="a short note (optional)"
              rows={2}
              className="mt-1 w-full resize-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-400"
            />
            <span className="mt-0.5 block text-right text-xs text-neutral-400">
              {message.length}/{MESSAGE_MAX}
            </span>
          </label>
        </div>

        {/* Tools */}
        <div className="mb-4 flex flex-wrap items-center gap-4 border-b border-neutral-200/80 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {DRAW_COLORS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setColor(preset)}
                className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                  color === preset
                    ? "border-neutral-800 ring-2 ring-neutral-400 ring-offset-1"
                    : "border-neutral-400"
                }`}
                style={{ backgroundColor: preset }}
              />
            ))}
          </div>

          <label className="flex flex-1 items-center gap-2 text-sm text-neutral-600">
            Size
            <input
              type="range"
              min={3}
              max={10}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="flex-1 accent-neutral-700"
            />
            <span className="w-4 text-xs text-neutral-400">{brushSize}</span>
          </label>

          <div className="flex gap-2">
            <button
              onClick={handleUndo}
              disabled={strokes.length === 0}
              className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-600"
            >
              Undo
            </button>

            <button
              onClick={handleClear}
              className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-600"
            >
              Clear
            </button>

            <button
              onClick={handleFinish}
              disabled={saving}
              className="rounded-md border border-neutral-800 bg-neutral-800 px-4 py-1.5 text-sm text-white"
            >
              {saving ? "Saving..." : "Finish"}
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="rounded-sm border-4 border-neutral-600 bg-neutral-700 p-2">
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