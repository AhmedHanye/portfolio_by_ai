export type Socials = {
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
};

export type Project = {
  title: string;
  description: string;
  href?: string;
  image?: string;
  tags?: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

export type Profile = {
  name: string;
  title: string;
  summary: string[];
  location?: string;
  skills?: string[];
  socials: Socials;
  projects: Project[];
  experience: ExperienceItem[];
  spline?: {
    sceneUrl?: string; // external or local e.g. "/spline/scene.splinecode"
  };
};

// TODO: Replace placeholders with real data parsed from CV
export const profile: Profile = {
  name: "Ahmed",
  title: "Frontend Developer",
  summary: [
    "Frontend developer focused on crafting responsive, animated experiences with Next.js, Tailwind, GSAP, and Spline.",
  ],
  location: "",
  skills: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "Spline"],
  socials: {
    email: "you@example.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    website: "",
  },
  projects: [
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
  ],
  experience: [
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
  ],
  spline: {
    sceneUrl: "https://prod.spline.design/bMWBLutzRbxcOQP8/scene.splinecode", // set to a valid public Spline .splinecode URL or a local public path (or "/spline/scene.splinecode")
  },
};
