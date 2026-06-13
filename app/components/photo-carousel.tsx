"use client";

import { useState } from "react";

const PHOTOS = [
  "/photos/photo1.jpg",
  "/photos/photo2.jpg",
  "/photos/photo3.jpg",
  "/photos/photo4.jpg",
];

export function PhotoCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? PHOTOS.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === PHOTOS.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="mt-12">
        {/* carousel container */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg bg-neutral-100">
        {/* image */}
        <img
          src={PHOTOS[index]}
          alt="photo"
          className="h-full w-full object-cover transition-all duration-500"
        />

        {/* left button */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur px-2 py-1 text-neutral-700 hover:bg-white transition"
        >
          ‹
        </button>

        {/* right button */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur px-2 py-1 text-neutral-700 hover:bg-white transition"
        >
          ›
        </button>

        {/* dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {PHOTOS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition ${
                i === index ? "bg-neutral-800" : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}