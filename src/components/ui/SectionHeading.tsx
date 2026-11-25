type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={["max-w-3xl", alignment, className].filter(Boolean).join(" ")}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent-highlight">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
