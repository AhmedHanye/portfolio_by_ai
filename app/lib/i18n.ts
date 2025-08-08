"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../i18n/locales/en/common.json" assert { type: "json" };
import arCommon from "../i18n/locales/ar/common.json" assert { type: "json" };

const resources = {
  en: { common: enCommon },
  ar: { common: arCommon },
} as const;

let initialized = false;

export function ensureI18n() {
  if (initialized) return i18n;
  i18n.use(initReactI18next).init({
    resources,
    lng:
      typeof window !== "undefined"
        ? localStorage.getItem("lng") || "en"
        : "en",
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });
  initialized = true;
  return i18n;
}

export type I18nLang = keyof typeof resources;
