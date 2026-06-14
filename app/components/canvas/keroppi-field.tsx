"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { KeroppiSprite } from "./keroppi-sprite";
import { KeroppiTooltip } from "./keroppi-tooltip";
import type { Keroppi } from "@/types/keroppi";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type TooltipState = {
  keroppi: Keroppi;
  x: number;
  y: number;
};

export function KeroppiField() {
  const [keroppis, setKeroppis] = useState<Keroppi[]>([]);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Keroppi | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const BASE_WIDTH = 900;
  const BASE_HEIGHT = 600;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      await new Promise((r) => setTimeout(r, 200));

      try {
        const snap = await getDocs(collection(db, "keroppis"));

        const data: Keroppi[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Keroppi[];

        if (!cancelled) {
          setKeroppis(data);
          setTimeout(() => setReady(true), 50);
        }
      } catch (err) {
        if (!cancelled) setKeroppis([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (!boardRef.current) return;

      const rect = boardRef.current.getBoundingClientRect();

      const scaleX = rect.width / BASE_WIDTH;
      const scaleY = rect.height / BASE_HEIGHT;

      setScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section className="bg-neutral-100 px-6 py-12 md:py-16">
      <div
        className="mx-auto"
        style={{
          width: "min(92vw, min(900px, calc((100vh - 180px) * 1.5)))",
        }}
      >
        {/* Header */}
        <div className="mb-4 mt-8 flex items-center justify-between gap-4">

          <div>
            <h2 className="text-2xl font-medium text-neutral-900 md:text-3xl">
              Sketchbook
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {!loading && `${keroppis.length} drawings on the canvas`}
            </p>
          </div>

          <Link
            href="/draw"
            className="
              rounded-full
              bg-neutral-900
              px-4 py-2
              text-sm
              font-medium
              text-white
              no-underline
              transition-colors
              hover:bg-neutral-800
            "
          >
            Add yours
          </Link>
        </div>

        {/* Board */}
        <div
          ref={boardRef}
          className="
            relative overflow-hidden rounded-lg border border-neutral-700
            touch-none
          "
          style={{
            width: "100%",
            aspectRatio: "3 / 2",
            backgroundColor: "#1a1a1a",
            boxShadow:
              "inset 0 0 40px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          {loading && (
            <p className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
              Loading canvas
            </p>
          )}

          {!loading && keroppis.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center text-neutral-500">
              <p className="text-sm">The canvas is empty.</p>

              <Link
                href="/draw"
                className="text-sm text-neutral-700 hover:text-neutral-900"
              >
                Leave the first Keroppi →
              </Link>
            </div>
          )}

          {/* Sprites */}
          <div
            className="absolute inset-0 origin-top-left"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            {keroppis.map((keroppi) => (
              <KeroppiSprite
                key={keroppi.id}
                keroppi={keroppi}
                visible={ready}
                scale={scale}
                isHovered={hoveredId === keroppi.id}
                onClick={(k) => setSelected(k)}
                onHover={(k, x, y) => {
                  setHoveredId(k.id);
                  setTooltip({
                    keroppi: k,
                    x: x * scale,
                    y: y * scale,
                  });
                }}
                onLeave={() => {
                  setHoveredId(null);
                  setTooltip(null);
                }}
              />
            ))}
          </div>

          {/* Tooltip */}
          {tooltip && (
            <KeroppiTooltip
              name={tooltip.keroppi.name}
              message={tooltip.keroppi.message}
              x={tooltip.x}
              y={tooltip.y}
            />
          )}

          {/* Modal */}
          {selected && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={() => setSelected(null)}
            >
              <div
                className="relative w-[85vw] max-w-[360px] rounded-lg bg-white p-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute right-3 top-3 text-neutral-500 hover:text-black"
                  onClick={() => setSelected(null)}
                >
                  ✕
                </button>

                <h2 className="text-lg font-medium text-neutral-800">
                  {selected.name}
                </h2>

                <p className="mt-2 text-sm text-neutral-500">
                  {selected.message}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}