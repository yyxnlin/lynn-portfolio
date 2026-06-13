"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

  const BOARD_WIDTH = 900;
  const BOARD_HEIGHT = 600;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      await new Promise((r) => setTimeout(r, 200));

      try {
        console.log({
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });

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

  return (
    <div className="flex h-full w-full items-center justify-center bg-neutral-100">
      
      {/* CENTERED BOARD WRAPPER */}
      <div className="relative flex flex-col items-center gap-3">

        {/* HEADER / CTA ABOVE BOARD */}
        <div className="flex w-full items-center justify-between px-2">
          <div className="text-xs text-neutral-500">
            {!loading && `${keroppis.length} in the field`}
          </div>

          <Link
            href="/draw"
            className="
              rounded-full
              bg-neutral-900
              px-5 py-2
              text-sm
              font-medium
              text-white
              shadow-lg
              transition-all
              hover:bg-neutral-800
              hover:scale-105
              active:scale-95
            "
          >
            add yours 🖌️
          </Link>
        </div>

        {/* BOARD */}
        <div
          className="relative overflow-hidden rounded-lg border border-neutral-700"
          style={{
            width: BOARD_WIDTH,
            height: BOARD_HEIGHT,
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
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-neutral-500">
              <p className="text-sm">The field is empty.</p>
              <Link
                href="/draw"
                className="text-sm text-neutral-700 no-underline hover:text-neutral-900"
              >
                Leave the first Keroppi →
              </Link>
            </div>
          )}

          {/* SPRITES */}
          <div className="absolute inset-0">
            {keroppis.map((keroppi) => (
              <KeroppiSprite
                key={keroppi.id}
                keroppi={keroppi}
                visible={ready}
                isHovered={hoveredId === keroppi.id}
                onHover={(k, x, y) => {
                  setHoveredId(k.id);
                  setTooltip({ keroppi: k, x, y });
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
        </div>
      </div>
    </div>
  );
}