import { BarChart3, BrainCircuit, Lightbulb } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const focusAreas = [
  {
    title: "Data Science",
    description:
      "Applying machine learning techniques to uncover patterns, develop predictive models, and extract meaningful information from complex datasets.",
    icon: BrainCircuit,
  },
  {
    title: "Business Intelligence",
    description:
      "Transforming business data into meaningful insights through analytical methods and visualization to support strategic planning and informed decision-making.",
    icon: BarChart3,
  },
  {
    title: "Data-Driven Solutions",
    description:
      "Leveraging data analysis and technology to identify business challenges, evaluate potential solutions, and support improvements in operational processes.",
    icon: Lightbulb,
  },
];

export function About() {
  return (
    <section id="about" className="py-8 mb-12">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="About Me"
          description="I am an Information Systems graduate from Telkom University Purwokerto with a strong interest in Data Analytics and Data Science. I enjoy working with data through data processing, exploratory analysis, and visualization to uncover meaningful insights. With a foundation in analytical thinking and technology, I aim to develop data-driven solutions that support better decision-making and solve real-world problems."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {focusAreas.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-[1.25rem] border border-border bg-card p-6 transition-colors hover:border-accent/50">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background-alt text-accent-highlight">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>

              <h3 className="text-xl font-medium tracking-[-0.03em] text-foreground">{title}</h3>

              <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
