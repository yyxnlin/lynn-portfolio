"use client";

import { useState } from "react";
import { COURSE_CATEGORIES } from "../../data/courses";

export function CoursesList() {
  const [openCourse, setOpenCourse] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
          Relevant Courses
        </p>

        <p className="text-xs leading-relaxed text-neutral-400">
          Note: These are my personal notes and are provided for reference only.
          Most focus on selected topics from each course and do not necessarily
          cover all material. Some courses are omitted.
        </p>
      </div>

      {COURSE_CATEGORIES.map((category) => (
        <section key={category.name}>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7F6899]">
            {category.name}
          </h3>

          <ul className="divide-y divide-neutral-100 pl-3 pr-1">
            {category.courses.map((course) => {
              const isOpen = openCourse === course.name;

              return (
                <li key={course.name}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenCourse(isOpen ? null : course.name)
                    }
                    className="
                      group flex w-full items-start
                      justify-between gap-3
                      py-2 text-left
                      transition-colors
                      hover:bg-neutral-50/50
                    "
                  >
                    <span className="text-sm leading-snug text-neutral-700 group-hover:text-neutral-900">
                      {course.name}
                    </span>

                    <div className="flex shrink-0 items-center gap-2">
                      {course.notes.length > 0 && (
                        <span className="text-xs text-neutral-400">
                          {course.notes.length} note
                          {course.notes.length > 1 ? "s" : ""}
                        </span>
                      )}

                      <span className="text-xs text-neutral-400">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  {isOpen && course.notes.length > 0 && (
                    <div className="flex flex-col gap-1 pb-2 pl-1">
                      {course.notes.map((note) => (
                        <a
                          key={note.url}
                          href={note.url}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            py-0.5
                            text-xs text-neutral-400
                            transition-colors
                            hover:text-neutral-700
                          "
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
        </section>
      ))}
    </div>
  );
}