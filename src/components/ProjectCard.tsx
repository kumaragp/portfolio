"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useProjectScroll } from "@/components/ProjectScrollContext";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { saveScrollPosition } = useProjectScroll();

  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors duration-200 hover:border-accent/50">
      <Link
        href={`/projects/${project.slug}`}
        scroll={false}
        aria-label={`View details for ${project.title}`}
        onClick={saveScrollPosition}
        className="relative mb-5 block aspect-[16/10] overflow-hidden rounded-lg bg-background-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {project.image ? (
          <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-opacity duration-200 group-hover:opacity-90" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium uppercase tracking-widest text-muted">{project.title.slice(0, 2)}</div>
        )}
      </Link>

      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{project.title}</h3>

        <p className="mt-2 text-sm leading-6 text-muted">{project.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-md border border-border bg-background-alt px-2 py-1 text-[11px] text-muted">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-end gap-4 pt-5">
          <Link
            href={`/projects/${project.slug}`}
            scroll={false}
            onClick={saveScrollPosition}
            className="text-xs font-medium uppercase tracking-wider text-foreground underline-offset-4 transition-colors hover:text-accent-highlight hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
