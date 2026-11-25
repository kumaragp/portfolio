"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";

type DataEngineerProps = {
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

export function DataEngineer({ project }: DataEngineerProps) {
  return (
    <div className="space-y-14 sm:space-y-16">
      
      {/* 01. OVERVIEW */}
      {project.problemStatement && (
        <section id="overview" aria-labelledby="overview-title" className="scroll-mt-24">
          <SectionHeading number="01" label="The Challenge" title="Problem" id="overview-title" />
          <div className="max-w-4xl space-y-5">
            <p className="text-sm leading-7 text-foreground">{project.problemStatement}</p>
          </div>
        </section>
      )}

      {/* 02. REQUIREMENTS */}
      <section id="requirements" aria-labelledby="requirements-title" className="scroll-mt-24">
        <SectionHeading number="02" label="System specifications" title="Requirements" id="requirements-title" />

        {project.architectureRequirements && project.architectureRequirements.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {project.architectureRequirements.map((item, index) => (
              <article key={`${item.name}-${index}`} className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-surface-secondary text-xs font-semibold text-muted transition-colors duration-300 group-hover:bg-accent/10 group-hover:text-accent-highlight">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mb-2 text-sm font-semibold text-foreground">{item.name}</h3>

                <p className="text-sm leading-7 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card px-5 py-8 text-center">
            <p className="text-sm text-muted">Project requirements are not available for public viewing.</p>
          </div>
        )}
      </section>

      {/* 03. ARCHITECTURE DESIGN */}
      <section id="architecture-design" aria-labelledby="architecture-title" className="scroll-mt-24">
        <SectionHeading number="03" label="System structure" title="Architecture Design" id="architecture-title" />

        {project.architectureDiagram ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Architecture Overview</h3>

                <span className="text-xs text-muted">01 / 01</span>
              </div>

              <p className="mt-1 text-xs leading-6 text-muted">System components and their interactions.</p>
            </div>

            <div className="group overflow-hidden rounded-xl border border-border bg-card">
              <div className="overflow-hidden bg-muted">
                <Image
                  src={project.architectureDiagram}
                  alt={`${project.title} architecture overview`}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex items-center justify-between border-t border-border px-4 py-3">
                <span className="text-xs font-medium text-foreground">System Architecture</span>

                <span className="text-xs text-muted">Architecture Diagram</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card px-5 py-8 text-center">
            <p className="text-sm text-muted">Architecture diagram is not available for public viewing.</p>
          </div>
        )}
      </section>

      {/* 04. RESULTS */}
      <section id="results" aria-labelledby="results-title" className="scroll-mt-24">
        <SectionHeading number="04" label="Project outcomes" title="Results" id="results-title" />

        {project.resultsLayout === "image-table" ? (
          <div className="space-y-10">
            {project.results && project.results.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Key Outcomes</h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {project.results.map((item, index) => (
                    <article key={`${item}-${index}`} className="flex gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/40">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-xs font-semibold text-accent-highlight">{String(index + 1).padStart(2, "0")}</span>

                      <p className="text-sm leading-7 text-muted">{item}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {project.resultsGallery && project.resultsGallery.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Output Documentation</h3>
                    <p className="mt-1 text-xs leading-6 text-muted">Visual documentation of the project's final output.</p>
                  </div>

                  <span className="text-xs text-muted">01 / 01</span>
                </div>

                <div className="group overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative overflow-hidden bg-muted">
                    <Image
                      src={project.resultsGallery[0].image}
                      alt="Workcloud preview"
                      width={1200}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-border px-4 py-3">
                    <span className="text-xs font-medium text-foreground">Workcloud Interface</span>

                    <span className="text-xs text-muted">Project Preview</span>
                  </div>
                </div>
              </div>
            )}

            {project.resultsTable && (
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="border-b border-border px-5 py-4 sm:px-6">
                  <h3 className="text-sm font-semibold text-foreground">Results Overview</h3>
                  <p className="mt-1 text-xs leading-6 text-muted">Summary of the project's implementation results.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left text-sm">
                    <thead className="bg-surface-secondary">
                      <tr>
                        {project.resultsTable.headers.map((header, index) => (
                          <th key={`${header}-${index}`} className="px-5 py-4 font-semibold text-foreground sm:px-6">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {project.resultsTable.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-t border-border transition-colors duration-200 hover:bg-surface-secondary/60">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-5 py-4 leading-6 text-muted sm:px-6">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : project.resultsLayout === "reserved" ? (
          <div className="rounded-xl border border-dashed border-border bg-card px-5 py-12 text-center">
            <p className="text-sm font-medium text-foreground">Results documentation</p>

            <p className="mt-2 text-xs leading-6 text-muted">Project results documentation will be available soon.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card px-5 py-8 text-center">
            <p className="text-sm text-muted">Published project outcomes are not available.</p>
          </div>
        )}
      </section>
    </div>
  );
}
