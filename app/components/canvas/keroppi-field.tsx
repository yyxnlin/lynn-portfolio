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
  const router = useRouter();

  const BASE_WIDTH = 900;
  const BASE_HEIGHT = 600;

  const [camera, setCamera] = useState({ x: 0, y: 0 });

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const DRAG_THRESHOLD = 4; // pixels

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

  /* -------------------- PAN -------------------- */
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;

    const down = (e: MouseEvent) => {
      isDragging.current = true;
      setIsPanning(true);

      hasDragged.current = false;

      dragStart.current = { x: e.clientX, y: e.clientY };
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const up = () => {
      isDragging.current = false;
      setIsPanning(false);
    };

    const move = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      lastMouse.current = { x: e.clientX, y: e.clientY };

      const totalDx = e.clientX - dragStart.current.x;
      const totalDy = e.clientY - dragStart.current.y;

      if (Math.abs(totalDx) > DRAG_THRESHOLD || Math.abs(totalDy) > DRAG_THRESHOLD) {
        hasDragged.current = true;
      }

      setCamera((c) => ({
        x: c.x + dx,
        y: c.y + dy,
      }));
    };


    el.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      el.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  /* -------------------- MOUSE TRACKING -------------------- */
  useEffect(() => {
    if (!placing) return;

    const handleMove = (e: MouseEvent) => {
      if (!boardRef.current) return;

      const rect = boardRef.current.getBoundingClientRect();

      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;

      const worldX = nx - camera.x;
      const worldY = ny - camera.y;

      setMouse({ x: worldX, y: worldY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [placing, camera]);

  /* -------------------- CLICK TO PLACE -------------------- */
  useEffect(() => {
    if (!placing || !pending) return;

    const handleClick = async () => {
      if (!mouse) return;

      // KEY FIX: ignore click if drag happened
      if (hasDragged.current) {
        hasDragged.current = false;
        return;
      }

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

  /* -------------------- ESC -------------------- */
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

  return (
    <section className="px-0 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
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

        <div className="w-full aspect-[3/2]">
          <div
            ref={boardRef}
            className={`relative h-full w-full overflow-hidden rounded-2xl border border-neutral-600/40 shadow-xl touch-none`}
              style={{
                background: "#000",
                boxShadow:
                  "inset 0 0 70px rgba(0,0,0,0.75), 0 25px 60px rgba(0,0,0,0.35)",
                cursor: isPanning
                  ? "url('/keroppi-cursor-link.png'), grabbing"
                  : "url('/keroppi-cursor.png'), grab",
              }}
          >
            <div
              className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full px-4 py-2 bg-white/80 dark:bg-neutral-900/70 border border-black/10 text-[11px] text-neutral-600 dark:text-neutral-300 backdrop-blur-md pointer-events-none"
            >
              drag to move around ✿
            </div>

            <div
              className="absolute inset-0 origin-top-left"
              style={{
                transform: `translate(${camera.x}px, ${camera.y}px)`,
              }}
            >
              {keroppis.map((keroppi) => (
                <KeroppiSprite
                  key={keroppi.id}
                  keroppi={keroppi}
                  visible={ready}
                  scale={1}
                  isHovered={hoveredId === keroppi.id}
                  onClick={(k) => {
                    if (hasDragged.current) return;
                    setSelected(k);
                  }}
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

            {!placing && tooltip && (
              <KeroppiTooltip
                name={tooltip.keroppi.name}
                message={tooltip.keroppi.message}
                x={tooltip.x}
                y={tooltip.y}
              />
            )}

            {selected && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                onClick={() => setSelected(null)}
              >
                <div
                  className="flex flex-col items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-[55vw] max-w-[340px] rounded-2xl bg-white/95 shadow-2xl border border-black/5 backdrop-blur-md overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-pink-200 via-orange-200 to-yellow-200" />
                    <button
                      className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700 text-sm"
                      onClick={() => setSelected(null)}
                    >
                      ✕
                    </button>

                    <div className="p-4">
                      <h2 className="text-base font-semibold text-neutral-800">
                        ✿ {selected.name}
                      </h2>

                      <p className="mt-2 text-sm text-neutral-500">
                        {selected.message}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-neutral-300">
                    tap outside to close
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}