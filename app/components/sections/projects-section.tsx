"use client";

import { SectionReveal } from "../section-reveal";
import { ProjectCard } from "../project-card";
import { Paper } from "../paper";
import { projects } from "../../../data/projects";

const researchItems = [
  {
    title: "Aligning Multilingual News for Stock Return Prediction",
    authors:
      "Yuntao Wu, Lynn Tao, Ing-Haw Cheng, Charles Martineau, Yoshio Nozawa, John Hull, Andreas Veneris",
    date: "2025-11-15T00:00:00.000Z",
    arxivUrl: "https://arxiv.org/abs/2510.19203",
    venue: "AI for Finance Symposium @ ICAIF'25 (Singapore), November 15-18, 2025",
    posterUrl: "/papers/multilingual_alignment_poster.pdf",
  },
];

export function ProjectSection() {
  const projectList = Object.values(projects)
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section id="projects" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl flex flex-col gap-20">

        {/* Header */}
        <SectionReveal>
          <div>
            <p className="text-xs tracking-[0.25em] text-neutral-400 uppercase">
              Projects & Research
            </p>
          </div>
        </SectionReveal>

        {/* Projects */}
        <SectionReveal delay={0.05}>
          <div className="flex flex-col gap-8">
            <h3 className="text-4xl font-medium text-neutral-900">
              Projects
            </h3>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectList.map((project) => (
                <ProjectCard
                  key={project.url}
                  title={project.title}
                  description={project.description}
                  slug={project.url}
                  url={project.url}
                  repository={project.repository}
                  date={project.date}
                />
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Research */}
        {researchItems.length > 0 && (
          <SectionReveal delay={0.08}>
            <div className="flex flex-col gap-8">
              <h3 className="text-4xl font-medium text-neutral-900">
                Research
              </h3>

              <div className="space-y-6">
                {researchItems.map((paper) => (
                  <Paper
                    key={paper.arxivUrl}
                    title={paper.title}
                    authors={paper.authors}
                    date={paper.date}
                    venue={paper.venue}
                    arxivUrl={paper.arxivUrl}
                    posterUrl={paper.posterUrl}
                  />
                ))}
              </div>
            </div>
          </SectionReveal>
        )}


      </div>
    </section>
  );
}