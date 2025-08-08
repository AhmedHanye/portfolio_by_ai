"use client";
import { Section } from "./Section";
import { profile } from "../data/profile";
import { useTranslation } from "react-i18next";

export function Contact() {
  const { t } = useTranslation("common");
  return (
    <Section id="contact" title={t("sections.contact") as string}>
      <div className="max-w-xl">
        <p className="text-foreground/80 text-sm">{t("contact.lead")}</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:${profile.socials.email}`}
            className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            {t("cta.emailMe")}
          </a>
          <a
            href={profile.socials.linkedin || "#"}
            target="_blank"
            className="rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
          >
            {t("contact.linkedin")}
          </a>
          <a
            href={profile.socials.github || "#"}
            target="_blank"
            className="rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
          >
            {t("contact.github")}
          </a>
        </div>
      </div>
    </Section>
  );
}
