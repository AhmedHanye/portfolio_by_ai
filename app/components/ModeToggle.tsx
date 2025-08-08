"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (!menuRef.current || !triggerRef.current) return;
      if (!menuRef.current.contains(t) && !triggerRef.current.contains(t)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const label =
    mounted && theme === "system" ? `System (${resolvedTheme})` : theme;

  return (
    <div className="relative inline-block text-left">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Toggle theme"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-foreground/20 bg-transparent text-foreground/90 hover:bg-foreground/5 focus:outline-none"
        title={label}
      >
        {/* Sun visible in light, hidden in dark */}
        <SunIcon className="h-[1.1rem] w-[1.1rem] transition-all dark:scale-0 dark:-rotate-90" />
        {/* Moon visible in dark, hidden in light */}
        <MoonIcon className="absolute h-[1.1rem] w-[1.1rem] transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Theme</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Theme options"
          className="absolute right-0 mt-2 w-40 overflow-hidden rounded-md border border-foreground/15 bg-background shadow-xl z-50"
        >
          <button
            role="menuitem"
            className="w-full text-left px-3 py-2 text-sm hover:bg-foreground/5"
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
          >
            Light
          </button>
          <button
            role="menuitem"
            className="w-full text-left px-3 py-2 text-sm hover:bg-foreground/5"
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
          >
            Dark
          </button>
          <button
            role="menuitem"
            className="w-full text-left px-3 py-2 text-sm hover:bg-foreground/5"
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
          >
            System
          </button>
        </div>
      )}
    </div>
  );
}
