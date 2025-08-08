"use client";
import { Section } from "./Section";

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

const experience: ExperienceItem[] = [
  {
    company: "Your Company",
    role: "Frontend Developer",
    period: "2023 — Present",
    points: [
      "Built responsive React/Next.js apps with TypeScript and Tailwind.",
      "Implemented GSAP animations and Scroll-driven experiences.",
      "Collaborated across design/dev to ship polished product features.",
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ul className="space-y-8">
        {experience.map((item) => (
          <li
            key={item.company}
            className="rounded-lg border border-black/10 dark:border-white/10 p-5"
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
