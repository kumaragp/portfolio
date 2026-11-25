import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AppIcon } from "@/components/ui/AppIcon";

const linkedInUrl = "https://www.linkedin.com/in/kumara-galan-pramana-726919441/";
const githubUrl = "https://github.com/kumaragp";

const technologies = ["Python", "SQL", "Excel", "Machine Learning"];

export function Hero() {
  return (
    <section id="home" className="items-center py-12 sm:py-12">
      <Container>
        <div className="grid items-center gap-8 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] min-[900px]:gap-10">
          {/* LEFT CONTENT */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-accent-highlight">Data Analyst</p>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl lg:text-6xl">
              Hi, My name is
              <span className="block">Kumara</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-sm">Turning data into meaningful insights through analytical thinking and technology.</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#projects" variant="primary">
                Explore My Projects
              </Button>

              {linkedInUrl && (
                <Button href={linkedInUrl} variant="ghost" className="!h-10 !w-10 !p-0">
                  <AppIcon name="linkedin" className="h-5 w-5" />
                </Button>
              )}

              {githubUrl && (
                <Button href={githubUrl} variant="ghost" className="!h-10 !w-10 !p-0">
                  <AppIcon name="github" className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          <div className="relative mx-auto hidden w-full min-w-0 max-w-md min-[900px]:block">
            <div className="absolute inset-0 rounded-full bg-foreground/[0.04] blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-[0_20px_60px_var(--surface-shadow)] min-[900px]:p-5 min-[1200px]:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Data Insights</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">Analytical Perspective</h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-foreground">
                    <path d="M3 3v18h18" />
                    <path d="m7 14 4-4 4 3 5-7" />
                  </svg>
                </div>
              </div>
              <div className="mt-8 rounded-xl border border-border bg-background/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted">Data Visualization</p>
                  <span className="text-[10px] uppercase tracking-wider text-muted">Illustration</span>
                </div>
                <svg viewBox="0 0 320 150" className="mt-5 w-full" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrative analytical chart, not project results">
                  {/* Grid */}
                  {[25, 60, 95, 130].map((y) => (
                    <line key={y} x1="10" y1={y} x2="310" y2={y} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 5" />
                  ))}

                  {/* Area */}
                  <path d="M10 112 C45 100 55 118 85 82 S135 95 160 65 S205 80 230 45 S275 55 310 18 V135 H10 Z" fill="currentColor" fillOpacity="0.07" className="text-accent" />

                  {/* Line */}
                  <path d="M10 112 C45 100 55 118 85 82 S135 95 160 65 S205 80 230 45 S275 55 310 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent-highlight" />

                  {/* Points */}
                  {[
                    [10, 112],
                    [85, 82],
                    [160, 65],
                    [230, 45],
                    [310, 18],
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3.5" fill="currentColor" className="text-accent-highlight" />
                  ))}
                </svg>

                <div className="mt-2 flex justify-between text-[10px] text-muted">
                  <span>Patterns</span>
                  <span>Analysis</span>
                  <span>Insights</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Tools & Technologies</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-border bg-background px-3 py-2 text-xs text-foreground transition-colors hover:border-accent/60 hover:bg-accent-deep/40 hover:text-accent-highlight">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                <p className="text-xs leading-relaxed text-muted">Transforming data into meaningful insights.</p>
              </div>
            </div>

            <div className="absolute -right-3 -top-3 -z-10 h-20 w-20 rounded-2xl border border-border bg-background" />
            <div className="absolute -bottom-3 -left-3 -z-10 h-16 w-16 rounded-2xl border border-border bg-background" />
          </div>
        </div>
      </Container>
    </section>
  );
}
