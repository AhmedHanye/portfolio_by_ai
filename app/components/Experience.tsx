"use client";
import { Section } from "./Section";
import { useTranslation } from "react-i18next";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

function useExperience(): ExperienceItem[] {
  const { t } = useTranslation("common");
  return (
    (t("profile.experience", { returnObjects: true }) as ExperienceItem[]) || []
  );
}

export function Experience() {
  const { t } = useTranslation("common");
  const experience = useExperience();
  return (
    <Section id="experience" title={t("sections.experience") as string}>
      <ul className="space-y-8">
        {experience.map((item) => (
          <li
            key={item.company}
            className="rounded-lg border border-foreground/10 p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-lg font-semibold">
                {item.role} · {item.company}
              </h3>
              <div className="text-sm text-foreground/70">{item.period}</div>
            </div>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              {item.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
