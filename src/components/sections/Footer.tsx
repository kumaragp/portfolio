import { Container } from "@/components/ui/Container";

const currentYear = new Date().getFullYear();

const footerNav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt/70">
      <Container className="py-6 md:py-4">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-sm font-semibold tracking-[-0.05em] text-foreground">KGP</span>
            <div>
              <p className="text-base font-semibold tracking-[-0.04em] text-foreground">Kumara Galan Pramana</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
                {footerNav.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="rounded-sm transition-colors duration-200 hover:text-accent-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-border py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} Kumara Galan Pramana. All rights reserved.</p>
        <a href="#home" className="w-fit rounded-sm transition-colors hover:text-accent-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          Back to top
        </a>
      </Container>
    </footer>
  );
}
