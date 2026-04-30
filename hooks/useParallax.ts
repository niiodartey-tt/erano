"use client";

import { useEffect, useState } from "react";

/**
 * Returns a CSS translateY string based on scroll position.
 * speed: 0.4 means image moves at 40% of scroll rate.
 * Automatically disabled on mobile for performance.
 *
 * Usage:
 *   const parallaxY = useParallax(0.4);
 *   <div style={{ transform: parallaxY }} />
 */
export function useParallax(speed: number = 0.4): string {
  const [translateY, setTranslateY] = useState("translateY(0px)");

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleScroll = () => {
      const offset = window.scrollY * speed;
      setTranslateY(`translateY(${offset}px)`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return translateY;
}

export default useParallax;
