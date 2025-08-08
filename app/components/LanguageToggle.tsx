"use client";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = (i18n.language || "en").slice(0, 2) as "en" | "ar";

  const setLang = (lng: "en" | "ar") => {
    if (lng === current) return;
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("lng", lng);
    } catch {}
  };

  return (
    <div className="inline-flex items-center gap-1 border border-foreground/15 rounded-md p-1">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-2 py-1 text-xs rounded ${
          current === "en"
            ? "bg-foreground text-background"
            : "hover:bg-foreground/10"
        }`}
        aria-pressed={current === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        className={`px-2 py-1 text-xs rounded ${
          current === "ar"
            ? "bg-foreground text-background"
            : "hover:bg-foreground/10"
        }`}
        aria-pressed={current === "ar"}
      >
        AR
      </button>
    </div>
  );
}
