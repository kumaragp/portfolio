import Image from "next/image";
import type { Project } from "@/data/projects";

type WebDeveloperProps = {
  project: Project;
};

function SectionHeading({ number, label, title, id }: { number: string; label: string; title: string; id: string }) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
        {number} / {label}
      </p>
      <h2 id={id} className="text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}

export function WebDeveloper({ project }: WebDeveloperProps) {
  const solution = project.solution ?? [...(project.approach ?? []), ...(project.implementation ?? [])];

  return (
    <div className="space-y-14 sm:space-y-12">

      {/* 01. PROBLEM */}
      {project.problemStatement && (
        <section id="problem" aria-labelledby="problem-title" className="scroll-mt-24">
          <SectionHeading number="01" label="The context" title="Problem" id="problem-title" />
          <p className="max-w-2xl text-base leading-8 text-muted">{project.problemStatement}</p>
        </section>
      )}

      {/* 02. SOLUTION */}
      {solution.length > 0 && (
        <section id="solution" aria-labelledby="solution-title" className="scroll-mt-24">
          <SectionHeading number="02" label="The approach" title="Solution" id="solution-title" />
          <div className="max-w-3xl space-y-4">
            {solution.map((item, index) => (
              <p key={`${item}-${index}`} className="border-l-2 border-border pl-4 text-sm leading-7 text-muted">
                {item}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* 03. RESULT */}
      <section id="results" aria-labelledby="results-title" className="scroll-mt-24">
        <SectionHeading number="03" label="Application screens" title="Results" id="results-title" />

        {project.resultsGallery && project.resultsGallery.length > 0 ? (
          <>
            <p className="mb-4 text-xs text-muted">Scroll horizontally to explore more screens</p>
            <div aria-label={`${project.title} application screenshot gallery`} className="project-gallery-scroll flex items-start snap-x snap-mandatory gap-5 overflow-x-auto">
              {project.resultsGallery.map((item) => (
                <article key={`${item.title}-${item.image}`} className="w-[82%] shrink-0 snap-start sm:w-[520px]">
                  <div className="w-full overflow-hidden rounded-sm border border-border bg-surface-secondary">
                    <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-border bg-surface-secondary">
                      <Image src={item.image} alt="" fill sizes="(max-width: 640px) 82vw, 520px" className="scale-110 object-cover blur-xl opacity-40" aria-hidden="true" />
                      <Image src={item.image} alt={`${item.title} preview`} fill sizes="(max-width: 640px) 82vw, 520px" className="object-contain" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 min-h-14 max-w-xl text-sm pb-8">{item.description}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="rounded-lg border border-border px-4 py-5 text-sm text-muted">Application screenshots are not available for public viewing.</p>
        )}
      </section>
    </div>
  );
}
