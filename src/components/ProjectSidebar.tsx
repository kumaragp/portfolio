import type { Project } from "@/data/projects";
import { ProjectTechnologies } from "@/components/ProjectTechnologies";

type ProjectSidebarProps = {
  project: Project;
};

export function ProjectSidebar({ project }: ProjectSidebarProps) {
  const navigationSections =
    project.category === "Web Development"
      ? [
          { id: "data-overview", label: "Data Overview" },
          { id: "feature-description", label: "Feature Description" },
          { id: "problem", label: "Problem" },
          { id: "solutions", label: "Solutions" },
          { id: "results", label: "Results" },
        ]
      : [];

  return (
    <aside className="space-y-8">
      {/* Project Information */}
      <section aria-labelledby="sidebar-project-info" className="space-y-4">
        <h2 id="sidebar-project-info" className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
          Project Information
        </h2>

        <dl className="space-y-4">
          <div className="flex flex-col gap-1">
            <dt className="text-xs text-muted">Category</dt>
            <dd className="text-sm font-medium text-foreground">{project.category}</dd>
          </div>

          <div className="flex flex-col gap-1">
            <dt className="text-xs text-muted">Project Type</dt>
            <dd className="text-sm font-medium text-foreground">{project.projectType ?? "Not specified"}</dd>
          </div>
        </dl>
      </section>

      {/* Technologies */}
      <div>
        <ProjectTechnologies technologies={project.technologies} />
      </div>

      {/* Project Links */}
      {(project.githubUrl || project.liveUrl) && (
        <section aria-labelledby="sidebar-project-links" className="border-t border-border pt-6">
          <h2 id="sidebar-project-links" className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Project Resources
          </h2>

          <div className="mt-4 flex flex-col gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:bg-accent-deep/20"
              >
                GitHub Repository
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:bg-accent-deep/20"
              >
                Live Demo
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </section>
      )}
    </aside>
  );
}
