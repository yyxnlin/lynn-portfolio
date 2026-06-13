"use client";

import { ExternalLink, FileText } from "lucide-react";

interface PaperProps {
  title: string;
  authors?: string;
  venue?: string;
  date?: string;
  arxivUrl: string;
  posterUrl?: string;
}

export function Paper({
  title,
  authors,
  venue,
  date,
  arxivUrl,
  posterUrl,
}: PaperProps) {
  return (
    <div
      className="
        group flex flex-col gap-2
        border border-neutral-200 bg-white
        rounded-lg p-5 sm:p-6
        transition-all duration-200
        hover:-translate-y-1 hover:border-[#AADEE5]
      "
    >
      {/* Title */}
      <h3 className="text-base font-medium text-neutral-900 leading-snug">
        {title}
      </h3>

      {/* Meta row (subtle hierarchy line) */}
      <div className="text-sm text-neutral-500 space-y-1">
        {authors && <p>{authors}</p>}

        {venue && (
          <p className="text-neutral-400">
            {venue}
          </p>
        )}

        {/* {date && (
          <p className="text-xs text-neutral-400">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </p>
        )} */}
      </div>

      {/* Links */}
      <div className="mt-3 flex gap-4">
        <a
          href={arxivUrl}
          target="_blank"
          className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
        >
          <ExternalLink size={14} />
          arXiv
        </a>

        {posterUrl && (
          <a
            href={posterUrl}
            target="_blank"
            className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
          >
            <FileText size={14} />
            Poster
          </a>
        )}
      </div>
    </div>
  );
}