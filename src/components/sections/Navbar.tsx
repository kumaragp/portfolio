"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isPopStateRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handlePopState = () => {
      isPopStateRef.current = true;
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useLayoutEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.href.replace("#", ""))).filter((section): section is HTMLElement => Boolean(section));

    const updateNavbarHeight = () => {
      const height = headerRef.current?.getBoundingClientRect().height;

      if (height) {
        document.documentElement.style.setProperty("--navbar-height", `${height}px`);
      }
    };

    let animationFrame = 0;
    let hashFrame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        if (sections.length === 0) return;

        const pageBottom = document.documentElement.scrollHeight;
        const scrollBottom = window.scrollY + window.innerHeight;

        if (pageBottom - scrollBottom <= 2) {
          setActiveSection(sections[sections.length - 1].id);
          return;
        }

        const scrollGap = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);

        const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;

        const activeLine = headerBottom + Math.max(scrollGap + 1, window.innerHeight * 0.25);

        let currentSection = sections[0];

        for (const section of sections) {
          if (section.getBoundingClientRect().top <= activeLine) {
            currentSection = section;
          } else {
            break;
          }
        }

        setActiveSection(currentSection.id);
      });
    };

    const resizeObserver = headerRef.current ? new ResizeObserver(updateNavbarHeight) : null;

    resizeObserver?.observe(headerRef.current!);

    updateNavbarHeight();

    // Handle navigation from another page using URL hash
    const sectionId = window.location.hash.slice(1);

    if (sectionId) {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

      const isReload = navigation?.type === "reload";

      if (isReload && window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      const sectionId = isReload ? "" : window.location.hash.slice(1);

      if (sectionId && !isPopStateRef.current) {
        hashFrame = requestAnimationFrame(() => {
          const target = document.getElementById(sectionId);

          if (target) {
            target.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
              block: "start",
            });
          }
        });

        if (sectionId && document.getElementById(sectionId)) {
          setActiveSection(sectionId);
        }
      }
    }

    // Reset navigation flag after handling the pathname change.
    isPopStateRef.current = false;

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", updateNavbarHeight);
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(hashFrame);

      resizeObserver?.disconnect();

      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateNavbarHeight);
      window.removeEventListener("resize", updateActiveSection);

      document.documentElement.style.removeProperty("--navbar-height");
    };
  }, [pathname]);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    setActiveSection(sectionId);

    const target = document.getElementById(sectionId);
    if (target) {
      requestAnimationFrame(() => {
        const headerHeight = headerRef.current?.getBoundingClientRect().height;
        if (headerHeight) {
          document.documentElement.style.setProperty("--navbar-height", `${headerHeight}px`);
        }

        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between py-4">
          <a href="#home" className="rounded-sm text-lg font-semibold tracking-[-0.05em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            KGP.
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(sectionId);
                  }}
                  className={[
                    "rounded-sm text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                    isActive ? "text-accent-highlight" : "text-muted hover:text-accent-highlight",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
            ref={menuButtonRef}
            aria-expanded={isOpen}
            aria-controls={isOpen ? "mobile-menu" : undefined}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="flex h-4 w-5 flex-col justify-between">
              <span className="block h-px w-full bg-current" />
              <span className="block h-px w-full bg-current" />
              <span className="block h-px w-full bg-current" />
            </span>
          </button>
        </div>

        {isOpen ? (
          <nav id="mobile-menu" aria-label="Mobile navigation" className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={[
                      "rounded-md px-2 py-2 text-sm transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      isActive ? "bg-accent-deep/40 text-accent-highlight" : "text-muted hover:bg-card hover:text-accent-highlight",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(sectionId);
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
