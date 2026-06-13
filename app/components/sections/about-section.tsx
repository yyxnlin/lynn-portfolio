import { CoursesList } from "../courses-list"
import { SectionReveal } from "../section-reveal";
import { PhotoCarousel } from "../photo-carousel";

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-32">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] text-neutral-400 uppercase">
            About
          </p>
          <h2 className="mt-3 text-4xl font-medium text-neutral-900">
            About me
          </h2>
        </div>

        

        {/* Content */}
        
        <div className="space-y-8 text-neutral-700 leading-relaxed text-base">
          
          <p>
            I’m a third year Engineering Science student at the University of Toronto,
            specializing in Mathematics, Statistics, and Finance, with a minor in Artificial Intelligence.
          </p>

          <p>
            I’m interested in mathematics and its applications in various fields, including finance and machine learning. Throughout high school, I spent a lot of time in competitive math.
          </p>

          <p>
            Outside of academics, I enjoy music, cooking, eating, running, and photography. Recently, I’ve also been learning Japanese on Duolingo, which has been a fun long-term side goal.
          </p>

          <p>
            I also run a casual{" "}
            <a
              href="https://instagram.com/linezeats"
              className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              food account
            </a>
            , where I post photos of food I eat (or make) 🍜
          </p>
        </div>

        

        {/* Work Experience */}
        <SectionReveal>
          <div className="mt-20 space-y-10">

            <h3 className="text-xs tracking-[0.25em] text-neutral-400 uppercase">
              Work Experience
            </h3>

            {/* CIBC */}
            <div className="relative pl-5 border-l border-neutral-200">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-neutral-400" />

              <div className="flex items-start gap-3 w-full">
                <img
                  src="/logos/cibc.png"
                  alt="CIBC logo"
                  className="h-10 w-10 flex-shrink-0 rounded-md object-contain"
                />

                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-neutral-900">
                      Software Developer Intern
                    </p>
                    <span className="text-xs text-neutral-400 whitespace-nowrap">
                      May 2026
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600">
                    CIBC Capital Markets Technology
                  </p>
                </div>
              </div>
            </div>

            {/* Rotman */}
            <div className="relative pl-5 border-l border-neutral-200">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-neutral-400" />

              <div className="flex items-start gap-3 w-full">
                <img
                  src="/logos/rotman.png"
                  alt="Rotman logo"
                  className="h-10 w-10 flex-shrink-0 rounded-md object-contain"
                />

                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-neutral-900">
                      Research Assistant
                    </p>
                    <span className="text-xs text-neutral-400 whitespace-nowrap">
                      May 2025
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600">
                    Rotman FinHub
                  </p>
                </div>
              </div>
            </div>

          </div>
        </SectionReveal>


        {/* Awards */}
        <SectionReveal>
          <div className="mt-20 space-y-4">
            <h3 className="text-xs tracking-[0.25em] text-neutral-400 uppercase">
              Awards
            </h3>

            <ul className="space-y-2 text-sm text-neutral-600 leading-relaxed">
              <li>Euclid: Top 2% (2024), Top 4% (2023)</li>
              <li>CSMC: Top 0.8% (2023), Top 0.5% (2022)</li>
              <li>COMC (Canadian Open Mathematics Challenge): Top 5% Distinction (2022, 2023)</li>
              <li>AIME (American Invitational Mathematics Examination) qualifier (2024)</li>
              <li>Hypatia: Top 3% (Group IV, 2023)</li>
              <li>Fermat: Top 0.6% (Group IV, 2023)</li>
              <li>Galois: Top 6% (2022)</li>
              <li>CIMC: Top 3% (2021); Top 0.3% (2020)</li>
              <li>Fryer: Perfect Score (2021)</li>
              <li>Gauss: Perfect Score (2019)</li>
            </ul>
          </div>
        </SectionReveal>


        {/* Education */}
        <SectionReveal>
          <div className="mt-20 space-y-10">

            <h3 className="text-xs tracking-[0.25em] text-neutral-400 uppercase">
              Education
            </h3>

            {/* UofT */}
            <div className="relative pl-5 border-l border-neutral-200">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-neutral-400" />

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-medium text-neutral-900">
                    University of Toronto
                  </p>
                  <span className="text-xs text-neutral-400 whitespace-nowrap">
                    Expected 2028
                  </span>
                </div>

                <p className="text-sm text-neutral-600">
                  Engineering Science (Mathematics, Statistics, Finance)
                </p>

                <p className="text-xs text-neutral-400">
                  cGPA: 3.93 / 4.0
                </p>
              </div>
            </div>

            {/* High school */}
            <div className="relative pl-5 border-l border-neutral-200">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-neutral-400" />

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-medium text-neutral-900">
                    Markville Secondary School
                  </p>
                  <span className="text-xs text-neutral-400 whitespace-nowrap">
                    2024
                  </span>
                </div>

                <p className="text-sm text-neutral-600">
                  Ontario Secondary School Diploma (OSSD)
                </p>

                <p className="text-xs text-neutral-400">
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

      </div>
    </section>
  );
}