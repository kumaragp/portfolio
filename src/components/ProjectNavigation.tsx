"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { useProjectScroll } from "@/components/ProjectScrollContext";

type ProjectNavigationProps = {
  currentSlug: string;
  isModal?: boolean;
};

export function ProjectNavigation({ currentSlug, isModal = false }: ProjectNavigationProps) {
  const { closeModal } = useProjectScroll();
  const router = useRouter();

  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
      <button type="button" onClick={isModal ? closeModal : () => router.back()} className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </button>
    </nav>
  );
}