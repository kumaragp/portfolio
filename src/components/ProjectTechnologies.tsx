type ProjectTechnologiesProps = {
  technologies: string[];
};

export function ProjectTechnologies({ technologies }: ProjectTechnologiesProps) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="project-technologies-title">
      <h2
        id="project-technologies-title"
        className="text-xs font-medium uppercase tracking-[0.2em] text-muted"
      >
        Tools & Technologies
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-full border border-border bg-background-alt px-3 py-1.5 text-sm text-muted"
          >
            {technology}
          </li>
        ))}
      </ul>
    </section>
  );
}
