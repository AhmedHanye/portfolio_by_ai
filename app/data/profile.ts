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
  name: "Ahmed Hanye",
  title: "Software Engineer",
  summary: [
    "I’m a software engineer specializing in full stack development, dedicated to crafting dynamic, high-performance web applications.",
    "I excel at solving complex challenges and designing intuitive user experiences that drive real-world impact. Programming isn’t just a career—it’s an evolving craft I continually refine to push the boundaries of innovation.",
  ],
  location: "Egypt",
  skills: ["Next.js", "React", "TypeScript", "Django", "Python"],
  socials: {
    email: "ahmedhanyehossny@gmail.com",
    linkedin: "https://www.linkedin.com/in/ahmed-hanye",
    github: "https://github.com/ahmedhanye",
    website: "https://ahmedhanye.vercel.app/"
  },
  projects: [
    {
      title: "Portfolio (09/2024)",
      description:
        "Showcases skills and projects using modern web technologies.",
      href: "#",
      image: "/vercel.svg",
      tags: ["Next.js", "TypeScript", "React"],
    },
    {
      title: "Security Plus (01/2024)",
      description: "Advanced security features to enhance browsing safety.",
      href: "#",
      image: "/window.svg",
      tags: ["Security", "TypeScript", "Web"],
    },
    {
      title: "Awwwards (Zentry) (12/2024 – 01/2025)",
      description:
        "An award-winning website with high-end interactions and visuals.",
      href: "#",
      image: "/globe.svg",
      tags: ["Next.js", "Animations", "GSAP"],
    },
  ],
  experience: [
    {
      company: "Mudeer",
      role: "Frontend Engineer",
      period: "03/2025 – 06/2025",
      points: [
        "Built responsive UI components and improved user experience.",
        "Collaborated closely with design and backend teams for seamless integration and performance.",
      ],
    },
  ],
  spline: {
    sceneUrl: "https://prod.spline.design/bMWBLutzRbxcOQP8/scene.splinecode", // set to a valid public Spline .splinecode URL or a local public path (or "/spline/scene.splinecode")
  },
};
