"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState<string>("");
  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);
  return (
    <footer className="border-t border-black/5 dark:border-white/10 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {year || ""} Ahmed. All rights reserved.</p>
        <p className="text-xs">
          Built with Next.js, Tailwind, GSAP, and Spline.
        </p>
      </div>
    </footer>
  );
}
