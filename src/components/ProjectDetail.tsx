import { Container } from "@/components/ui/Container";
import type { Project } from "@/data/projects";
import { ProjectInformation } from "@/components/ProjectInformation";
import { ProjectNavigation } from "@/components/ProjectNavigation";
import { ProjectOverview } from "@/components/ProjectOverview";
import { ProjectSidebar } from "./ProjectSidebar";

type ProjectDetailProps = {
  project: Project;
  isModal?: boolean;
};

export function ProjectDetail({ project, isModal = false }: ProjectDetailProps) {
  return (
    <>
      <main className="py-10 sm:py-14">
        <Container>
          <div
            className="
            mx-auto max-w-6xl
            grid grid-cols-1
            lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)] items-start
            gap-10 lg:gap-12
          "
          >
            {/* Main Content */}
            <div className="min-w-0 space-y-4">
              <ProjectOverview project={project} />

              <ProjectInformation project={project} />
            </div>

            {/* Sidebar */}
            <aside
              className="
              min-w-0 lg:sticky
              lg:self-start
            "
            >
              <ProjectSidebar project={project} />
            </aside>
          </div>

          <div className="mt-16">
            <ProjectNavigation currentSlug={project.slug} isModal={isModal} />
          </div>
        </Container>
      </main>
    </>
  );
}
