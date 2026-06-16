"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { KeroppiSprite } from "./keroppi-sprite";
import { KeroppiTooltip } from "./keroppi-tooltip";
import type { Keroppi } from "@/types/keroppi";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

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

  const [placing, setPlacing] = useState(false);
  const [pending, setPending] = useState<any | null>(null);

  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);

  const BASE_WIDTH = 900;
  const BASE_HEIGHT = 600;

  const router = useRouter();

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

  /* -------------------- placement mode -------------------- */
  useEffect(() => {
    const url = new URL(window.location.href);
    const isPlacing = url.searchParams.get("placing") === "1";

    if (!isPlacing) return;

    const raw = sessionStorage.getItem("pending_keroppi");
    if (!raw) return;

    setPending(JSON.parse(raw));
    setPlacing(true);
  }, []);

  /* -------------------- FIXED MOUSE TRACKING -------------------- */
  useEffect(() => {
    if (!placing) return;

    const handleMove = (e: MouseEvent) => {
      if (!boardRef.current) return;

      const rect = boardRef.current.getBoundingClientRect();

      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;

      const baseX = nx * BASE_WIDTH;
      const baseY = ny * BASE_HEIGHT;

      setMouse({ x: baseX, y: baseY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [placing]);

  /* -------------------- click to place -------------------- */
  useEffect(() => {
    if (!placing || !pending) return;

    const handleClick = async () => {
      if (!mouse) return;

      await addDoc(collection(db, "keroppis"), {
        ...pending,
        x: mouse.x,
        y: mouse.y,
      });

      sessionStorage.removeItem("pending_keroppi");

      setPlacing(false);
      setPending(null);

      window.location.href = "/canvas";
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [placing, pending, mouse]);

  /* -------------------- ESC cancel -------------------- */
  useEffect(() => {
    if (!placing) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sessionStorage.removeItem("pending_keroppi");
        setPlacing(false);
        setPending(null);

        const url = new URL(window.location.href);
        url.searchParams.delete("placing");

        router.replace(url.pathname + url.search);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [placing, router]);

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
            className="rotate-[-1deg] rounded-full bg-neutral-900 dark:bg-neutral-100 px-4 py-2 text-sm text-white dark:text-neutral-900 no-underline shadow-sm transition hover:rotate-0"
          >
            add a doodle ✎
          </Link>
        </div>

        {/* Board */}
        <div className="w-full aspect-[3/2]">
          <div
            ref={boardRef}
            className="relative h-full w-full overflow-hidden rounded-2xl border border-neutral-600/40 shadow-xl touch-none"
            style={{
              background: "#000",
              boxShadow:
                "inset 0 0 70px rgba(0,0,0,0.75), 0 25px 60px rgba(0,0,0,0.35)",
            }}
          >

            {/* PLACEMENT BANNER */}
            {placing && (
              <div className="absolute left-1/2 top-4 z-50 -translate-x-1/2 rounded-full px-4 py-2 bg-white/90 dark:bg-neutral-900/80 border border-black/10 text-xs text-neutral-800 dark:text-neutral-200 backdrop-blur-md">
                ✿ Click to place your doodle • Esc to cancel
              </div>
            )}

            {/* sprites layer */}
            <div
              className="absolute inset-0 origin-top-left"
              style={{ transform: `scale(${scale})` }}
            >
              {keroppis.map((keroppi, i) => (
                <div key={keroppi.id}>
                  <KeroppiSprite
                    keroppi={keroppi}
                    visible={ready}
                    scale={scale}
                    isHovered={hoveredId === keroppi.id}
                    onClick={(k) => setSelected(k)}
                    onHover={(k, x, y) => {
                      if (placing) return;
                      setHoveredId(k.id);
                      setTooltip({ keroppi: k, x, y });
                    }}
                    onLeave={() => {
                      if (placing) return;
                      setHoveredId(null);
                      setTooltip(null);
                    }}
                  />
                </div>
              ))}

              {placing && pending && mouse && (
                <div
                  style={{
                    position: "absolute",
                    left: mouse.x,
                    top: mouse.y,
                    transform: "translate(-50%, -50%)",
                    opacity: 0.5,
                    pointerEvents: "none",
                    filter: "grayscale(1)",
                  }}
                >
                  <KeroppiSprite
                    keroppi={{
                      ...pending,
                      id: "ghost",
                      x: 0,
                      y: 0,
                    }}
                    visible={true}
                    scale={1}
                    isHovered={false}
                    onClick={() => {}}
                    onHover={() => {}}
                    onLeave={() => {}}
                  />
                </div>
              )}
            </div>

            {/* tooltip */}
            {!placing && tooltip && (
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
            <div className="flex flex-col items-center">
              
              <div
                className="relative w-[55vw] max-w-[340px] rounded-2xl bg-white/95 shadow-2xl border border-black/5 backdrop-blur-md overflow-hidden animate-in fade-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                {/* subtle ring */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none" />

                {/* top gradient bar */}
                <div className="h-2 w-full bg-gradient-to-r from-pink-200 via-orange-200 to-yellow-200" />

                {/* close button */}
                <button
                  className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700 text-sm"
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
                  <div className="mt-4 flex justify-end text-[11px] text-neutral-300">
                    <span>•ᴗ•</span>
                  </div>
                </div>
              </div>

              {/* OUTSIDE hint */}
              <div className="mt-3 text-[11px] text-neutral-300 text-center">
                tap outside to close
              </div>

            </div>
          </div>
        )}


            {/* ink trail */}
            {dots.map((d, i) => (
              <div
                key={i}
                className="pointer-events-none fixed h-1 w-1 rounded-full bg-neutral-400"
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