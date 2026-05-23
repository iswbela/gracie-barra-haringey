"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref's subtree.
 * Any child element with class fade-up / fade-left / fade-right gains
 * the `visible` class when it enters the viewport.
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = el.querySelectorAll(".fade-up, .fade-left, .fade-right");
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return ref;
}
