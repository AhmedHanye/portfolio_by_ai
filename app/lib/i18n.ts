"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    common: {
      nav: {
        about: "About",
        experience: "Experience",
        projects: "Projects",
        contact: "Contact",
      },
      cta: {
        viewProjects: "View Projects",
        contact: "Contact",
      },
    },
  },
  ar: {
    common: {
      nav: {
        about: "نبذة",
        experience: "الخبرات",
        projects: "المشاريع",
        contact: "تواصل",
      },
      cta: {
        viewProjects: "عرض المشاريع",
        contact: "تواصل",
      },
    },
  },
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
