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
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);

  const BASE_WIDTH = 900;
  const BASE_HEIGHT = 600;

  /* -------------------- load -------------------- */
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      await new Promise((r) => setTimeout(r, 300));

      try {
        const snap = await getDocs(collection(db, "keroppis"));

        const data: Keroppi[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Keroppi[];

        if (!cancelled) {
          setKeroppis(data);
          setTimeout(() => setReady(true), 120);
        }
      } catch {
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

  /* -------------------- scale -------------------- */
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

  /* -------------------- ink trail -------------------- */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setDots((prev) => [...prev.slice(-10), { x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="px-0 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 md:text-3xl">
              Sketchbook corner ✿
            </h2>

            <p className="mt-1 text-sm italic text-neutral-500 dark:text-neutral-400">
              {!loading
                ? `${keroppis.length} doodles pinned here`
                : "warming up the page..."}
            </p>
          </div>

          <Link
            href="/draw"
            className="
              rotate-[-1deg]
              rounded-full
              bg-neutral-900 dark:bg-neutral-100
              px-4 py-2
              text-sm text-white dark:text-neutral-900
              shadow-sm
              transition
              hover:rotate-0 hover:bg-neutral-800 dark:hover:bg-neutral-200
              wobble
              no-underline
            "
          >
            add a doodle ✎
          </Link>
        </div>

        {/* Board wrapper */}
        <div className="w-full aspect-[3/2]">
          <div
            ref={boardRef}
            className="
              relative h-full w-full overflow-hidden rounded-2xl border
              border-neutral-600/40 dark:border-neutral-700/40
              shadow-xl touch-none
            "
            style={{
              background: "#000000", // ALWAYS BLACK
              boxShadow:
                "inset 0 0 70px rgba(0,0,0,0.75), 0 25px 60px rgba(0,0,0,0.35)",
            }}
          >
            {/* grain */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay dark:opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />

            {/* loading */}
            {loading && (
              <p className="absolute inset-0 flex items-center justify-center text-sm italic text-neutral-400 dark:text-neutral-500">
                pinning doodles onto the page...
              </p>
            )}

            {/* empty */}
            {!loading && keroppis.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-neutral-500 dark:text-neutral-400">
                <p className="text-sm italic">this sketchbook is still blank</p>
                <Link
                  href="/draw"
                  className="text-sm underline decoration-dotted hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  leave the first doodle ✿
                </Link>
              </div>
            )}

            {/* sprites */}
            <div
              className="absolute inset-0 origin-top-left"
              style={{ transform: `scale(${scale})` }}
            >
              {keroppis.map((keroppi, i) => (
                <div
                  key={keroppi.id}
                  style={{ transitionDelay: `${i * 35}ms` }}
                  className={`
                    opacity-0 translate-y-2 scale-95
                    transition-all duration-500 ease-out
                    ${ready ? "opacity-100 translate-y-0 scale-100" : ""}
                  `}
                >
                  <KeroppiSprite
                    keroppi={keroppi}
                    visible={ready}
                    scale={scale}
                    isHovered={hoveredId === keroppi.id}
                    onClick={(k) => setSelected(k)}
                    onHover={(k, x, y) => {
                      setHoveredId(k.id);
                      setTooltip({
                        keroppi: k,
                        x,
                        y,
                      });
                    }}
                    onLeave={() => {
                      setHoveredId(null);
                      setTooltip(null);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* tooltip */}
            {tooltip && (
              <KeroppiTooltip
                name={tooltip.keroppi.name}
                message={tooltip.keroppi.message}
                x={tooltip.x}
                y={tooltip.y}
              />
            )}

            {/* modal */}
            {selected && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                onClick={() => setSelected(null)}
              >
                <div
                  className="
                    relative w-[85vw] max-w-[340px]
                    rounded-2xl
                    bg-white/95
                    shadow-2xl
                    border border-black/5
                    backdrop-blur-md
                    overflow-hidden
                    animate-in fade-in zoom-in-95
                  "
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5" />

                  <div className="h-2 w-full bg-gradient-to-r from-pink-200 via-orange-200 to-yellow-200" />

                  <button
                    className="
                      absolute right-3 top-3
                      text-neutral-400 hover:text-neutral-700
                      text-sm
                    "
                    onClick={() => setSelected(null)}
                  >
                    ✕
                  </button>

                  <div className="p-4">
                    {/* name */}
                    <h2 className="text-base font-semibold text-neutral-800 tracking-tight">
                      ✿ {selected.name}
                    </h2>

                    {/* message */}
                    <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                      {selected.message}
                    </p>

                    {/* tiny footer doodle */}
                    <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-300">
                      <span>•ᴗ•</span>
                      <span>tap outside to close</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ink trail */}
            {dots.map((d, i) => (
              <div
                key={i}
                className="pointer-events-none fixed h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-500"
                style={{
                  left: d.x,
                  top: d.y,
                  opacity: i / dots.length,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}