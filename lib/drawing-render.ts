import type { Keroppi, Point, Stroke } from "@/types/keroppi";

export function renderStroke(
  ctx: CanvasRenderingContext2D,
  stroke: Stroke,
  scale = 1,
) {
  const { points, color, width } = stroke;
  if (points.length === 0) return;

  const isEraser = (stroke as any).isEraser;

  ctx.save();

  if (isEraser) {
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
  }

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width * scale;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (points.length === 1) {
    const p = points[0];
    ctx.beginPath();
    ctx.arc(p.x * scale, p.y * scale, (width * scale) / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x * scale, points[0].y * scale);

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = ((prev.x + curr.x) / 2) * scale;
    const midY = ((prev.y + curr.y) / 2) * scale;
    ctx.quadraticCurveTo(prev.x * scale, prev.y * scale, midX, midY);
  }

  const last = points[points.length - 1];
  ctx.lineTo(last.x * scale, last.y * scale);
  ctx.stroke();

  ctx.restore();
}

export function renderStrokes(
  ctx: CanvasRenderingContext2D,
  strokes: Stroke[],
  drawScale = 1,
) {
  for (const stroke of strokes) {
    renderStroke(ctx, stroke, drawScale);
  }
}

/** Draw line art on a clear canvas (no background fill). */
export function renderLineArt(
  ctx: CanvasRenderingContext2D,
  strokes: Stroke[],
  scale: number,
  options?: { highlight?: boolean }
) {
  const { highlight = false } = options || {};
  

  ctx.save();
  ctx.scale(scale, scale);

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // MAIN DRAW PASS
  for (const stroke of strokes) {
    const isEraser = (stroke as any).isEraser;

    ctx.beginPath();

    const points = stroke.points;

    const shouldHighlight = highlight && !isEraser;

    ctx.strokeStyle = shouldHighlight ? "#ffffff" : stroke.color;
    ctx.lineWidth = stroke.width * (shouldHighlight ? 1.4 : 1);

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }

    ctx.stroke();
  }

  ctx.restore();
}


export function getCanvasPoint(
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement,
): Point {
  const rect = canvas.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * canvas.width;
  const y = ((clientY - rect.top) / rect.height) * canvas.height;
  return { x, y };
}
