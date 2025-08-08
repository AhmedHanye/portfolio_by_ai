"use client";
import { Section } from "./Section";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation("common");
  return (
    <Section id="about" title={t("sections.about") as string}>
      <div className="prose prose-invert max-w-none">
        {(t("profile.summary", { returnObjects: true }) as string[]).map(
          (para, i) => (
            <p key={i}>{para}</p>
          )
        )}
      </div>
    </Section>
  );
}
