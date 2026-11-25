import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function ProjectNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center py-16">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-border bg-card p-8 sm:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Project</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-foreground">
            Project not found
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            This project page does not exist or is no longer available.
          </p>
          <Link
            href="/#projects"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:text-accent-highlight hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to projects
          </Link>
        </div>
      </Container>
    </main>
  );
}