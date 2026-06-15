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
      className="pointer-events-none fixed z-50"
      style={{
        left: x + 10,
        top: y + 10,
      }}
      role="tooltip"
    >
      {/* main note */}
      <div
        className="
          relative max-w-[200px]
          rotate-[-2deg]
          rounded-2xl
          bg-yellow-100/95
          px-3 py-2
          shadow-md
          border border-yellow-200/70
          backdrop-blur-sm
        "
      >
        {/* name */}
        <p className="text-sm font-semibold text-neutral-800">
          ✿ {name}
        </p>

        {/* message */}
        {message && (
          <p className="mt-1 text-xs leading-relaxed text-neutral-600 italic">
            {message}
          </p>
        )}

      </div>

      {/* little pointer triangle */}
      <div
        className="
          absolute left-3 top-6
          h-2 w-2 rotate-45
          bg-yellow-100/95
          border-l border-b border-yellow-200/70
        "
      />
    </div>
  );
}