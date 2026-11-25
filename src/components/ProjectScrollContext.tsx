"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type ProjectScrollContextType = {
  saveScrollPosition: () => void;
  restoreScrollPosition: () => void;
  closeModal: () => void;
  setCloseModal: (callback: () => void) => void;
  markScrollForRestore: () => void;
};

const ProjectScrollContext = createContext<ProjectScrollContextType | null>(null);

export function ProjectScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const scrollPosition = useRef(0);
  const closeModalRef = useRef<() => void>(() => {});
  const shouldRestoreScroll = useRef(false);

  const saveScrollPosition = useCallback(() => {
    scrollPosition.current = window.scrollY;
  }, []);

  const restoreScrollPosition = useCallback(() => {
    window.scrollTo({
      top: scrollPosition.current,
      behavior: "instant",
    });
  }, []);

  const setCloseModal = useCallback((callback: () => void) => {
    closeModalRef.current = callback;
  }, []);

  const closeModal = useCallback(() => {
    closeModalRef.current();
  }, []);

  const markScrollForRestore = useCallback(() => {
    shouldRestoreScroll.current = true;
  }, []);

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";

    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

    if (navigation?.type === "reload") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, []);

  return (
    <ProjectScrollContext.Provider
      value={{
        saveScrollPosition,
        restoreScrollPosition,
        closeModal,
        setCloseModal,
        markScrollForRestore,
      }}
    >
      {children}
    </ProjectScrollContext.Provider>
  );
}

export function useProjectScroll() {
  const context = useContext(ProjectScrollContext);

  if (!context) {
    throw new Error("useProjectScroll must be used within ProjectScrollProvider");
  }

  return context;
}