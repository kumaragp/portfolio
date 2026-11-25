
"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
  scroll?: boolean;
  onClick?: () => void;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-accent bg-accent text-background hover:border-accent-hover hover:bg-accent-hover hover:text-foreground",
  secondary:
    "border border-border bg-background-alt text-foreground hover:border-accent/70 hover:bg-card",
  ghost:
    "border border-transparent bg-transparent text-foreground hover:border-accent/40 hover:bg-accent-deep/30 hover:text-accent-highlight",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  scroll = true,
  onClick,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href?.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={(event) => {
          event.preventDefault();

          const target = document.getElementById(href.slice(1));

          if (!target) return;

          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          onClick?.();
        }}
        className={classes}
      >
        {children}
      </a>
    );
  }

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} scroll={scroll} onClick={onClick} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}