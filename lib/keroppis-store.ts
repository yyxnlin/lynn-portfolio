import { promises as fs } from "fs";
import path from "path";
import type { Keroppi, Stroke } from "@/types/keroppi";
import { MESSAGE_MAX, NAME_MAX } from "@/types/keroppi";

const DATA_PATH = path.join(process.cwd(), "data", "keroppis.json");

const MARGIN = 56;
const SPRITE_W = 160;
const SPRITE_H = 110;
const MIN_DISTANCE = 96;

async function readKeroppis(): Promise<Keroppi[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeKeroppis(keroppis: Keroppi[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(keroppis, null, 2), "utf-8");
}

export function isValidStrokes(value: unknown): value is Stroke[] {
  if (!Array.isArray(value)) return false;

  return value.every(
    (stroke) =>
      stroke &&
      typeof stroke === "object" &&
      typeof stroke.color === "string" &&
      typeof stroke.width === "number" &&
      Array.isArray(stroke.points) &&
      stroke.points.every(
        (point: unknown) =>
          point &&
          typeof point === "object" &&
          typeof (point as { x: number }).x === "number" &&
          typeof (point as { y: number }).y === "number",
      ),
  );
}

export function generatePlacement(
  existing: Keroppi[],
  viewportWidth: number,
  viewportHeight: number,
): Pick<Keroppi, "x" | "y" | "scale" | "rotation"> {
  const scale = 0.85 + Math.random() * 0.3;
  const rotation = -0.2 + Math.random() * 0.4;

  const maxX = Math.max(MARGIN, viewportWidth - SPRITE_W - MARGIN);
  const maxY = Math.max(MARGIN, viewportHeight - SPRITE_H - MARGIN);

  for (let attempt = 0; attempt < 25; attempt++) {
    const x = MARGIN + Math.random() * (maxX - MARGIN);
    const y = MARGIN + Math.random() * (maxY - MARGIN);

    const crowded = existing.some((k) => {
      const dx = k.x + (SPRITE_W * k.scale) / 2 - (x + SPRITE_W / 2);
      const dy = k.y + (SPRITE_H * k.scale) / 2 - (y + SPRITE_H / 2);
      return Math.hypot(dx, dy) < MIN_DISTANCE;
    });

    if (!crowded) {
      return { x, y, scale, rotation };
    }
  }

  return {
    x: MARGIN + Math.random() * (maxX - MARGIN),
    y: MARGIN + Math.random() * (maxY - MARGIN),
    scale,
    rotation,
  };
}

export async function getAllKeroppis(): Promise<Keroppi[]> {
  return readKeroppis();
}

export async function saveKeroppi(input: {
  name: string;
  message: string;
  strokes: Stroke[];
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  viewportWidth?: number;
  viewportHeight?: number;
}): Promise<Keroppi> {
  const name = input.name.trim().slice(0, NAME_MAX);
  const message = input.message.trim().slice(0, MESSAGE_MAX);

  if (!name) {
    throw new Error("Name is required");
  }

  const existing = await readKeroppis();

  const hasPlacement =
    typeof input.x === "number" && typeof input.y === "number";

  const placement = hasPlacement
    ? {
        x: input.x!,
        y: input.y!,
        scale: input.scale ?? 1,
        rotation: input.rotation ?? 0,
      }
    : generatePlacement(
        existing,
        input.viewportWidth ?? 1280,
        input.viewportHeight ?? 720,
      );

  const keroppi: Keroppi = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    name,
    message,
    strokes: input.strokes,
    ...placement,
  };

  existing.push(keroppi);
  await writeKeroppis(existing);

  return keroppi;
}
