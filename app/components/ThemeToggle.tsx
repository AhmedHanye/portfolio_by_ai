"use client";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, resolvedTheme, toggle, setTheme } = useTheme();
  // Defer system-resolved text until after mount to avoid SSR/CSR mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const label =
    theme === "system"
      ? mounted
        ? `System (${resolvedTheme})`
        : "System"
      : theme;
  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded-md border border-foreground/20 px-3 py-1.5 text-sm hover:bg-foreground/5"
        onClick={toggle}
        aria-label="Toggle theme"
      >
        {label}
      </button>
      <div className="hidden sm:flex gap-1" role="group" aria-label="Theme">
        <button
          className={`rounded-md px-2 py-1 text-xs border ${
            resolvedTheme === "light" && theme !== "system"
              ? "bg-foreground text-background"
              : "border-foreground/20 hover:bg-foreground/5"
          }`}
          onClick={() => setTheme("light")}
        >
          Light
        </button>
        <button
          className={`rounded-md px-2 py-1 text-xs border ${
            resolvedTheme === "dark" && theme !== "system"
              ? "bg-foreground text-background"
              : "border-foreground/20 hover:bg-foreground/5"
          }`}
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>
        <button
          className={`rounded-md px-2 py-1 text-xs border ${
            theme === "system"
              ? "bg-foreground text-background"
              : "border-foreground/20 hover:bg-foreground/5"
          }`}
          onClick={() => setTheme("system")}
        >
          System
        </button>
      </div>
    </div>
  );
}
