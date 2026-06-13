"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/canvas", label: "sketchbook" },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 md:top-6">
      
      <nav className="
        flex items-center gap-1
        rounded-md border-2 border-neutral-200 bg-white
        px-2 py-1
        whitespace-nowrap
        overflow-x-auto
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      ">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded border-2 px-2.5 py-1 text-[11px] leading-none no-underline transition-colors duration-150 md:px-3 md:text-xs ${
                active
                  ? "border-neutral-800 bg-neutral-800 text-white"
                  : "border-transparent text-neutral-600 hover:border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};