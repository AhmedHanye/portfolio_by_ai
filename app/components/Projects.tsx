"use client";
import Image from "next/image";
import { Section } from "./Section";
import { useTranslation } from "react-i18next";

type Project = {
  title: string;
  description: string;
  href?: string;
  image?: string;
  tags?: string[];
};

function useProjects(): Project[] {
  const { t } = useTranslation("common");
  return (t("profile.projects", { returnObjects: true }) as Project[]) || [];
}

export function Projects() {
  const { t } = useTranslation("common");
  const projects = useProjects();
  return (
    <Section id="projects" title={t("sections.projects") as string}>
      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.href}
            className="group rounded-xl border border-foreground/10 overflow-hidden"
          >
            <div className="relative aspect-[16/9] bg-foreground/5">
              {p.image ? (
                <Image
                  src={p.image}
                  alt="project cover"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              ) : null}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-foreground/80">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags?.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-full border border-foreground/20 px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
