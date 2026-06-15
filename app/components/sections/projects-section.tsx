"use client";

import { SectionReveal } from "../section-reveal";
import { ProjectCard } from "../project-card";
import { Paper } from "../paper";
import { projects } from "../../../data/projects";
import { research } from "../../../data/research";

const projectList = Object.values(projects)
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const researchItems = Object.values(research)
    .filter((r) => r.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function ProjectSection() {
  return (
    <section id="projects" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl flex flex-col gap-5">

        {/* Header */}
        <div className="mb-2">
          <p className="text-xs tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase">
            Projects & Research
          </p>
        </div>

        {/* Research */}
        {researchItems.length > 0 && (
          <SectionReveal delay={0.08}>
            <h3 className="text-4xl font-medium text-neutral-900 dark:text-neutral-100">
              Research
            </h3>

            <div className="mt-4 border-y border-neutral-200 dark:border-neutral-800">
              {researchItems.map((paper) => (
                <Paper
                  key={paper.arxivUrl}
                  title={paper.title}
                  authors={paper.authors}
                  date={paper.date}
                  venue={paper.venue}
                  arxivUrl={paper.arxivUrl}
                  ssrnUrl={paper.ssrnUrl}
                  posterUrl={paper.posterUrl}
                />
              ))}
            </div>
          </SectionReveal>
        )}

        {/* Projects */}
        <SectionReveal delay={0.05}>
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-4xl font-medium text-neutral-900 dark:text-neutral-100">
                Projects
              </h3>
            </div>

            <div
              className="
                grid
                gap-4
                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {projectList.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  readUrl={"readUrl" in project ? project.readUrl : undefined}
                  github={"github" in project ? project.github : undefined}
                  demoUrl={"demoUrl" in project ? project.demoUrl : undefined}
                  date={project.date}
                  image={project.image}
                />
              ))}
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}