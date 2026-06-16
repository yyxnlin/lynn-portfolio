export type Point = {
  x: number;
  y: number;
};

export type Stroke = {
  color: string;
  width: number;
  points: Point[];
};

export type Keroppi = {
  id: string;
  createdAt: number;
  name: string;
  message: string;
  strokes: Stroke[];
  onClick?: (keroppi: Keroppi) => void;
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 400;
export const CANVAS_BG = "#1c211e";
export const SPRITE_WIDTH = 150;
export const MESSAGE_MAX = 120;
export const NAME_MAX = 40;

/** Chalk colours for the blackboard — edit hex values here. */
export const DRAW_COLORS = [
  "#f4f4f0",
  "#fde68a",
  "#fca5a5",
  "#fdba74",
  "#a1e4ff",
  "#beef86",
  "#3e3e3e",
] as const;

export type DrawColor = (typeof DRAW_COLORS)[number];

export const DEFAULT_DRAW_COLOR: DrawColor = "#f4f4f0";

export const PLACEMENT_SCALE = 1;
export const PLACEMENT_ROTATION = 0;
