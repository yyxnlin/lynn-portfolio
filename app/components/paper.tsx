"use client";

import { ExternalLink, FileText } from "lucide-react";

interface PaperProps {
  title: string;
  authors?: string;
  venue?: string;
  date?: string;
  arxivUrl: string;
  ssrnUrl?: string;
  posterUrl?: string;
}

export function Paper({
  title,
  authors,
  venue,
  arxivUrl,
  ssrnUrl,
  posterUrl,
}: PaperProps) {
  return (
    <article
      className="
        group border-b border-neutral-200 dark:border-neutral-800
        py-6 last:border-b-0
      "
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          {/* Venue */}
          {venue && (
            <span
              className="
                inline-flex items-center rounded-full
                bg-[#F2ECF8] dark:bg-neutral-800
                px-2.5 py-1
                text-xs font-medium
                text-[#7F6A99] dark:text-[#CBB6DD]
              "
            >
              {venue}
            </span>
          )}

          {/* Title */}
          <h3
            className="
              mt-3 text-xl font-medium
              tracking-tight text-neutral-900 dark:text-neutral-100
            "
          >
            {title}
          </h3>

          {/* Authors */}
          {authors && (
            <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {authors}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="mt-3 flex gap-4">
          {arxivUrl && (
            <a
              href={arxivUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1"
            >
              <ExternalLink size={14} />
              arXiv
            </a>
          )}

          {ssrnUrl && (
            <a
              href={ssrnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1"
            >
              <ExternalLink size={14} />
              SSRN
            </a>
          )}

          {posterUrl && (
            <a
              href={posterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1"
            >
              <FileText size={14} />
              Poster
            </a>
          )}
        </div>
      </div>
    </article>
  );
}