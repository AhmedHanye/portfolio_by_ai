"use client";
import { useEffect } from "react";

// Ensures that reloading with a hash (e.g., /#contact) lands on the right spot
// after layout mounts and fonts/styles settle.
export function HashScrollFix() {
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const el = document.getElementById(id);
    if (!el) return;

    // Try immediate scroll first
    el.scrollIntoView({ behavior: "instant", block: "start" as ScrollLogicalPosition });

    // Re-run after a tick to account for late layout shifts (fonts/images)
    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: "instant", block: "start" as ScrollLogicalPosition });
    }, 50);

    // And once more after a longer delay as a safety net
    const t2 = setTimeout(() => {
      el.scrollIntoView({ behavior: "instant", block: "start" as ScrollLogicalPosition });
    }, 250);

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);
  return null;
}
