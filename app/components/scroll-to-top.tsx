"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-3 z-40 flex items-end gap-0 sm:bottom-6 sm:right-5">
      <div className="relative -mr-3 mb-1 hidden h-14 w-14 sm:block">
        
      </div>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className="sticker-hover-bounce flex h-10 w-10 items-center justify-center rounded-md border-2 border-neutral-300 bg-white text-lg text-neutral-700 shadow-[2px_2px_0_0_#d4d4d4] transition-colors duration-150 hover:border-neutral-400 hover:bg-neutral-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_#d4d4d4]"
      >
        ↑
      </button>
    </div>
  );
}
