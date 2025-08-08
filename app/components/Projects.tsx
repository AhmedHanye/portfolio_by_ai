"use client";
import Image from "next/image";
import { Section } from "./Section";

type Project = {
  title: string;
  description: string;
  href?: string;
  image?: string;
  tags?: string[];
};

const projects: Project[] = [
  {
    title: "Spline + GSAP Landing",
    description:
      "A 3D-driven hero with scroll-triggered storytelling and smooth UI transitions.",
    href: "#",
    image: "/vercel.svg",
    tags: ["Next.js", "GSAP", "Spline"],
  },
  {
    title: "Dashboard UI",
    description:
      "Accessible, responsive dashboard with Tailwind and component patterns.",
    href: "#",
    image: "/window.svg",
    tags: ["React", "Tailwind"],
  },
];

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.href}
            className="group rounded-xl border border-black/10 dark:border-white/10 overflow-hidden"
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
