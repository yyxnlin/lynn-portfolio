import { NextResponse } from "next/server";
import {
  getAllKeroppis,
  isValidStrokes,
  saveKeroppi,
} from "@/lib/keroppis-store";

export const runtime = "nodejs";

export async function GET() {
  const keroppis = await getAllKeroppis();
  return NextResponse.json({ keroppis });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const {
    name,
    message,
    strokes,
    x,
    y,
    scale,
    rotation,
    viewportWidth,
    viewportHeight,
  } = body as {
    name?: unknown;
    message?: unknown;
    strokes?: unknown;
    x?: unknown;
    y?: unknown;
    scale?: unknown;
    rotation?: unknown;
    viewportWidth?: unknown;
    viewportHeight?: unknown;
  };

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (typeof message !== "string") {
    return NextResponse.json({ error: "Message must be a string" }, { status: 400 });
  }

  if (!isValidStrokes(strokes)) {
    return NextResponse.json({ error: "Invalid strokes data" }, { status: 400 });
  }

  if (x !== undefined && typeof x !== "number") {
    return NextResponse.json({ error: "Invalid x position" }, { status: 400 });
  }

  if (y !== undefined && typeof y !== "number") {
    return NextResponse.json({ error: "Invalid y position" }, { status: 400 });
  }

  try {
    const keroppi = await saveKeroppi({
      name,
      message,
      strokes,
      x: typeof x === "number" ? x : undefined,
      y: typeof y === "number" ? y : undefined,
      scale: typeof scale === "number" ? scale : undefined,
      rotation: typeof rotation === "number" ? rotation : undefined,
      viewportWidth:
        typeof viewportWidth === "number" ? viewportWidth : undefined,
      viewportHeight:
        typeof viewportHeight === "number" ? viewportHeight : undefined,
    });

    return NextResponse.json({ keroppi }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
