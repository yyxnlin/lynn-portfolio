import { CoursesList } from "../courses-list"
import { Awards } from "../awards"
import { SectionReveal } from "../section-reveal";
import { PhotoCarousel } from "../photo-carousel";

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase">
            About
          </p>
          <h2 className="mt-3 text-4xl font-medium text-neutral-900 dark:text-neutral-100">
            About me
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
          
          <p>
            I’m a third year Engineering Science student at the University of Toronto,
            specializing in Mathematics, Statistics, and Finance, with a minor in Artificial Intelligence.
          </p>

          <p>
            I’m interested in mathematics and its applications in various fields, including finance and machine learning. Throughout high school, I spent a lot of time in competitive math, earning distinctions in contests such as CSMC (Top 0.8%), COMC, Euclid (Top 2%), and qualifying for AIME.         
          </p>

          <p>
            Outside of academics, you can find me playing piano, cooking/eating food, running, taking on random sidequests to explore the city, or learning Japanese on Duolingo.
          </p>

          <p>
            I also run a {" "}
            <a
              href="https://instagram.com/linezeats"
              className="underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-4 hover:decoration-neutral-500 dark:hover:decoration-neutral-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              food account
            </a>
            , on Instagram, where I sometimes post photos of food I eat (and make!) 🍜
          </p>
        </div>

        {/* Work Experience */}
        <SectionReveal>
          <div className="mt-20 space-y-10">

            <h3 className="text-xs tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase">
              Work Experience
            </h3>

            {/* CIBC */}
            <div className="relative pl-5 border-l border-neutral-200 dark:border-neutral-700">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />

              <div className="flex items-start gap-3 w-full">
                <img
                  src="/logos/cibc.png"
                  alt="CIBC logo"
                  className="h-10 w-10 flex-shrink-0 rounded-md object-contain"
                />

                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      Software Developer Intern
                    </p>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                      May 2026
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    CIBC Capital Markets Technology
                  </p>
                </div>
              </div>
            </div>

            {/* Rotman */}
            <div className="relative pl-5 border-l border-neutral-200 dark:border-neutral-700">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />

              <div className="flex items-start gap-3 w-full">
                <img
                  src="/logos/rotman.png"
                  alt="Rotman logo"
                  className="h-10 w-10 flex-shrink-0 rounded-md object-contain"
                />

                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      Research Assistant
                    </p>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                      May 2025
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Rotman FinHub
                  </p>
                </div>
              </div>
            </div>

          </div>
        </SectionReveal>

        {/* Education */}
        <SectionReveal>
          <div className="mt-20 space-y-10">

            <h3 className="text-xs tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase">
              Education
            </h3>

            {/* UofT */}
            <div className="relative pl-5 border-l border-neutral-200 dark:border-neutral-700">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    University of Toronto
                  </p>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                    Expected 2028
                  </span>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Engineering Science (Mathematics, Statistics, Finance)
                </p>

                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  cGPA: 3.93 / 4.0
                </p>
              </div>
            </div>

            {/* High school */}
            <div className="relative pl-5 border-l border-neutral-200 dark:border-neutral-700">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Markville Secondary School
                  </p>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                    2024
                  </span>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Ontario Secondary School Diploma (OSSD)
                </p>

                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  95.7% average
                </p>
              </div>
            </div>

          </div>
        </SectionReveal>

        {/* Courses */}
        <SectionReveal delay={0.1}>
          <div className="mt-20">
            <CoursesList />
          </div>
        </SectionReveal>

        {/* Awards */}
        <SectionReveal>
          <div className="mt-20 space-y-4">
            <Awards/>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}