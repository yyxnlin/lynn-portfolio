"use client";

import { useState } from "react";
import { COURSES } from "../../data/courses";

export function CoursesList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-[0.25em] text-neutral-400 uppercase">
          Relevant Courses
        </p>

        <p className="text-xs text-neutral-400 leading-relaxed w-full">
          Note: The below notes are my personal notes and are provided for reference only. They may not cover all course content, and the course material may have
          changed since they were written.
        </p>
      </div>

      <ul className="w-full divide-y divide-neutral-100">
        {COURSES.map((course, idx) => {
          const isOpen = openIndex === idx;

          return (
            <li key={course.name} className="w-full">
              {/* clickable row */}
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="group flex w-full items-start justify-between gap-4 py-4 text-left hover:bg-neutral-50/50 transition-colors"
              >
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 leading-snug">
                  {course.name}
                </span>

                <span className="text-xs text-neutral-400 shrink-0 pt-[2px]">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="pb-4 pl-1 flex flex-col gap-2">
                  {course.notes.map((note) => (
                    <a
                      key={note.url}
                      href={note.url}
                      target="_blank"
                      className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
                    >
                      {note.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}