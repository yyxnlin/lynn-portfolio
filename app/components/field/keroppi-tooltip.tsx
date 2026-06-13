"use client";

type KeroppiTooltipProps = {
  name: string;
  message: string;
  x: number;
  y: number;
};

export function KeroppiTooltip({ name, message, x, y }: KeroppiTooltipProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 max-w-[220px] rounded-md border border-neutral-200/90 bg-white/95 px-3 py-2 backdrop-blur-sm"
      style={{
        left: x + 14,
        top: y + 14,
      }}
      role="tooltip"
    >
      <p className="text-sm font-medium text-neutral-900">{name}</p>
      {message && (
        <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
          {message}
        </p>
      )}
    </div>
  );
}
