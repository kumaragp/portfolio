"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useProjectScroll } from "@/components/ProjectScrollContext";

type ProjectModalProps = {
  children: ReactNode;
};

export function ProjectModal({ children }: ProjectModalProps) {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);
  const isClosing = useRef(false);

  const { setCloseModal } = useProjectScroll();

  const closeModal = useCallback(() => {
    if (isClosing.current) return;

    isClosing.current = true;
    setIsVisible(false);

    window.setTimeout(() => {
      router.back();
    }, 300);
  }, [router]);

  // Register close modal callback
  useEffect(() => {
    setCloseModal(closeModal);

    return () => {
      setCloseModal(() => {});
    };
  }, [closeModal, setCloseModal]);

  // Lock background scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-[100] h-[100dvh] w-full overflow-hidden bg-background">
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Project details"
        className={`relative h-full w-full overflow-y-auto overscroll-contain bg-background ${
          isVisible
            ? "project-modal-enter"
            : "project-modal-exit"
        }`}
      >
        {children}
      </section>
    </div>
  );
}