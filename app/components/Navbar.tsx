"use client";
import Link from "next/link";
import { useState } from "react";
import { profile } from "../data/profile";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        <Link href="#" className="font-bold tracking-tight text-lg">
          {profile.name}
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:opacity-70 transition-opacity"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 px-3 py-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="i-ph-list text-xl" aria-hidden />
          <span className="sr-only">Menu</span>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-black/5 dark:border-white/10">
          <nav className="px-4 py-3 flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-2"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
