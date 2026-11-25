"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";

const categories = [
  { label: "All Projects", value: "all" },
  { label: "Data Analytics & ML", value: "Data Analytics & Machine Learning" },
  { label: "Web Development", value: "Web Development" },
  { label: "Data Engineering", value: "Data Engineering" },
];

const PROJECTS_PER_PAGE = 6;

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");

  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;

  const currentProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const handleCategoryChange = (category: ProjectCategory | "all") => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <section id="projects" className="py-6 mb-16">
      <Container>
        <SectionHeading eyebrow="Projects" title="Selected Projects" description="A focused portfolio of applied analytics, machine learning, and software projects built around practical problem solving." />

        {/* Category Filter */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
            {categories.map((category) => {
              const isActive = activeCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleCategoryChange(category.value as ProjectCategory | "all")}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-xs font-medium
  transition-all duration-300 ease-out
  hover:-translate-y-0.5 active:scale-95 ${isActive ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted hover:border-accent/50 hover:text-foreground"}`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="mt-7">
          {currentProjects.length > 0 ? (
            <div key={`${activeCategory}-${currentPage}`} className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {currentProjects.map((project, index) => (
                <div
                  key={project.slug}
                  className="project-card-enter"
                  style={{
                    animationDelay: `${index * 70}ms`,
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-border">
              <p className="text-sm text-muted">No projects found in this category.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
            <p className="text-xs text-muted">
              Showing {startIndex + 1}–{Math.min(startIndex + PROJECTS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length} projects
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="rounded-md border border-border px-3 py-2 text-xs
  font-medium text-foreground transition-all duration-200
  hover:-translate-y-0.5 hover:bg-background-alt
  active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="min-w-12 text-center text-xs text-muted">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-background-alt disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
