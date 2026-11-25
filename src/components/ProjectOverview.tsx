import type { Project } from "@/data/projects";

type ProjectOverviewProps = {
  project: Project;
};

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const description = project.overview ?? project.problemStatement;

  if (!description) {
    return null;
  }

  return (
    <section aria-labelledby="project-overview-title" className="border-b border-border pb-8">
      <h2
        id="project-overview-title"
        className="text-2xl font-semibold tracking-[-0.04em] text-foreground"
      >
        Project Overview
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-muted">{description}</p>
    </section>
  );
}