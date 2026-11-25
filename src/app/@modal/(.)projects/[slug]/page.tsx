import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/ProjectDetail";
import { ProjectModal } from "@/components/ProjectModal";
import { getProjectBySlug } from "@/data/projects";

type ProjectModalPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectModalPage({ params }: ProjectModalPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectModal>
      <ProjectDetail project={project} isModal />
    </ProjectModal>
  );
}
