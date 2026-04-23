"use client";

import { useEffect } from "react";

/**
 * Triggers .visible class on elements with .reveal class
 * when they enter the viewport. Used for staggered fade-up
 * animations across all public pages.
 *
 * Usage: call useScrollReveal() once in a layout or page component.
 * Add className="reveal" (and optionally "reveal-delay-1" etc.)
 * to any element you want animated.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Unobserve after triggering — animation plays once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default useScrollReveal;
