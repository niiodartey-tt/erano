"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-32 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-navy text-white shadow-lg transition-opacity duration-300"
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
