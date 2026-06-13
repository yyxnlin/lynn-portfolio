"use client";

import Link from "next/link";
import { Github, ExternalLink, BookOpen } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  url?: string;
  repository?: string;
  date?: string;
}

export function ProjectCard({
  title,
  description,
  slug,
  url,
  repository,
  date,
}: ProjectCardProps) {
  return (
    <div
      className="
        group flex h-full flex-col rounded-lg
        border border-neutral-200 bg-white
        transition-all duration-200
        hover:-translate-y-1
        hover:border-[#AADEE5]
      "
    >
      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* Title */}
        <h3 className="text-lg font-medium text-neutral-900 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          {description}
        </p>

        {/* Date */}
        {date && (
          <p className="mt-4 text-xs text-neutral-400">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </p>
        )}

        {/* Actions */}
        <div className="mt-auto pt-5 flex gap-3">
          {url && (
            <a
              href={url}
              target="_blank"
              className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              <ExternalLink size={14} />
              Visit
            </a>
          )}

          {repository && (
            <a
              href={`https://github.com/${repository}`}
              target="_blank"
              className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              <Github size={14} />
              GitHub
            </a>
          )}

          {!url && !repository && (
            <Link
              href={`/projects/${slug}`}
              className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              <BookOpen size={14} />
              Read
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}