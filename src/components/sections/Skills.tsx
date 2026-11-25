import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";
import { Icon } from "@iconify/react";

export function Skills() {
  return (
    <section id="skills" className="mb-16 py-6">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Skills & Technologies"
          description="A practical toolkit built around analytics, data processing, software development, and applied machine learning."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              {/* Category Heading */}
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <span className="text-xs font-medium tabular-nums text-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4">
                {category.items?.map((item, itemIndex) => (
                  <li
                    key={`${item.name ?? "skill"}-${itemIndex}`}
                    className="flex min-w-0 items-center gap-2.5 text-sm text-muted"
                  >
                    {item.icon && (
                      <Icon
                        icon={item.icon}
                        width="19"
                        height="19"
                        aria-hidden="true"
                        className="shrink-0"
                      />
                    )}

                    {item.devicon && (
                      <i
                        className={`${item.devicon} shrink-0 text-lg`}
                        aria-hidden="true"
                      />
                    )}

                    {item.name && (
                      <span className="min-w-0 truncate">
                        {item.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}