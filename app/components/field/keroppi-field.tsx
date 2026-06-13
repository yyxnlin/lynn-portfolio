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
      setScale(rect.width / BASE_WIDTH);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100 px-3 py-6">
      
      {/* WRAPPER */}
      <div className="relative flex w-full max-w-5xl flex-col items-center gap-3">

        {/* HEADER */}
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-2">
          
          <div className="text-xs text-neutral-500 text-center sm:text-left">
            {!loading && `${keroppis.length} in the field`}
          </div>

          <Link
            href="/draw"
            className="
              w-full sm:w-auto
              text-center
              rounded-full
              bg-neutral-900
              px-5 py-2
              text-sm
              font-medium
              text-white
              shadow-lg
              transition-all
              hover:bg-neutral-800
              active:scale-95
            "
          >
            add yours 🖌️
          </Link>
        </div>

        {/* BOARD */}
        <div
          ref={boardRef}
          className="
            relative overflow-hidden rounded-lg border border-neutral-700
            w-[92vw]
            max-w-[900px]
            aspect-[3/2]
            mx-auto
            touch-none
          "
          style={{
            backgroundColor: "#1a1a1a",
            boxShadow:
              "inset 0 0 40px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          {loading && (
            <p className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
              Loading field…
            </p>
          )}

          {!loading && keroppis.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-neutral-500 text-center px-4">
              <p className="text-sm">The field is empty.</p>
              <Link
                href="/draw"
                className="text-sm text-neutral-700 hover:text-neutral-900"
              >
                Leave the first Keroppi →
              </Link>
            </div>
          )}

          {/* SPRITES (SCALED) */}
          <div className="absolute inset-0">
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

          {/* TOOLTIP */}
          {tooltip && (
            <KeroppiTooltip
              name={tooltip.keroppi.name}
              message={tooltip.keroppi.message}
              x={tooltip.x}
              y={tooltip.y}
            />
          )}


          {selected && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={() => setSelected(null)}
            >
              <div
                className="relative w-[85vw] max-w-[360px] rounded-lg bg-white p-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* close button */}
                <button
                  className="absolute right-3 top-3 text-neutral-500 hover:text-black"
                  onClick={() => setSelected(null)}
                >
                  ✕
                </button>

                {/* title */}
                <h2 className="text-lg font-medium text-neutral-800">
                  {selected.name}
                </h2>

                {/* message */}
                <p className="mt-2 text-sm text-neutral-500">
                  {selected.message}
                </p>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}