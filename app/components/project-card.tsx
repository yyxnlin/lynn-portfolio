"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, BookOpen, FileText, PlayCircle } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  readUrl?: string;
  github?: string;
  demoUrl?: string;
  repository?: string;
  date?: string;
  image?: string;
}

export function ProjectCard({
  title,
  description,
  readUrl,
  github,
  demoUrl,
  date,
  image,
}: ProjectCardProps) {
  return (
    <article
      className="
        group flex h-full flex-col
        border border-neutral-200
        bg-white
        transition-colors duration-200
        hover:bg-neutral-50
      "
    >
      {/* Image Area */}
      <div
        className="
          relative h-44
          overflow-hidden
          border-b border-neutral-200
          bg-neutral-50
        "
      >
        {image && (
          <Image
            src={image}
            alt=""
            fill
            className="
              object-cover
              opacity-90
              transition-opacity duration-300
              group-hover:opacity-100
            "
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {date && (
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </p>
        )}

        <h3 className="mt-3 text-xl font-medium leading-tight text-neutral-900">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          {description}
        </p>

        <div className="mt-auto flex gap-5 pt-6 text-sm">
          {readUrl && (
            <a
              href={readUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900"
            >
              <FileText size={14} />
              Read
            </a>
          )}

          {github && (
            <a
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900"
            >
              <Github size={14} />
              GitHub
            </a>
          )}

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900"
            >
              <PlayCircle size={14} />
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}