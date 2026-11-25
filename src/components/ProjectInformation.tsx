import type { Project } from "@/data/projects";
import { MachineLearning } from "@/components/projects/MachineLearning";
import { WebDeveloper } from "@/components/projects/WebDeveloper";
import { DataEngineer } from "@/components/projects/DataEngineer";

type ProjectInformationProps = {
  project: Project;
};

export function ProjectInformation({
  project,
}: ProjectInformationProps) {
  switch (project.category) {
    case "Data Analytics & Machine Learning":
      return <MachineLearning project={project} />;

    case "Web Development":
      return <WebDeveloper project={project} />;
    
    case "Data Engineering":
      return <DataEngineer project={project} />;

    default:
      return null;
  }
}