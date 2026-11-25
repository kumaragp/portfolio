import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactInfo } from "@/data/contact";
import { Icon } from "@iconify/react";

type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: string;
};

const contactItems: ContactItem[] = [
  {
    label: "Email",
    value: contactInfo.email || contactInfo.emailLabel,
    href: contactInfo.email
      ? `mailto:${contactInfo.email}`
      : "mailto:kumaragalanpramana11@gmail.com",
    icon: "bxl:gmail",
  },
  {
    label: "LinkedIn",
    value: contactInfo.linkedin || contactInfo.linkedinLabel,
    href: "https://www.linkedin.com/in/kumara-galan-pramana-726919441/",
    icon: "akar-icons:linkedin-fill",
  },
  {
    label: "GitHub",
    value: contactInfo.github || contactInfo.githubLabel,
    href: "https://github.com/kumaragp",
    icon: "akar-icons:github-fill",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-6">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's Connect"
          description="I'm open to opportunities, collaborations, and discussions related to data analytics and technology."
        />

        <div className="mt-8">
          <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-7">
            <div className="space-y-3">
              {contactItems.map(({ label, value, href, icon }) => {
                const isAvailable = Boolean(href);
                const isExternal = href.startsWith("http");

                return (
                  <div
                    key={label}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-background-alt p-4 transition-all duration-200 hover:border-accent/50 hover:bg-card"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-accent-highlight transition-colors duration-200 group-hover:bg-background-alt">
                      <Icon
                        icon={icon}
                        className="h-5 w-5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted">
                        {label}
                      </p>

                      {isAvailable ? (
                        <a
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          className="mt-1 block break-all text-sm text-foreground underline-offset-4 hover:text-accent-highlight hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 break-all text-sm text-muted">
                          {value}
                        </p>
                      )}
                    </div>

                    {isAvailable && (
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Have something in mind?
                </p>
                <p className="mt-1 text-sm text-muted">
                  Feel free to reach out. I'd love to hear from you.
                </p>
              </div>

              <a
                href={
                  contactInfo.email
                    ? `mailto:${contactInfo.email}`
                    : undefined
                }
                aria-disabled={!contactInfo.email}
                className={[
                  "inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.98]",
                  contactInfo.email
                    ? "border-accent bg-accent text-background hover:border-accent-hover hover:bg-accent-hover hover:text-foreground"
                    : "pointer-events-none border-border bg-card text-muted opacity-80",
                ].join(" ")}
              >
                <Mail className="h-4 w-4" strokeWidth={1.8} />
                {contactInfo.email ? "Email Me" : "Email unavailable"}
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}