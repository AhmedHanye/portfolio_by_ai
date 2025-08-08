"use client";
import { PropsWithChildren, useEffect } from "react";
import { ensureI18n } from "../lib/i18n";

const i18n = ensureI18n();

export function I18nProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const applyAttrs = () => {
      const lang = i18n.language || "en";
      const dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    };
    applyAttrs();
    const handler = () => applyAttrs();
    i18n.on("languageChanged", handler);
    return () => {
      i18n.off("languageChanged", handler);
    };
  }, []);
  return <>{children}</>;
}
