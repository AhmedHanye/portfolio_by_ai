"use client";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="prose prose-invert max-w-none">
        <p>
          I’m Ahmed, a frontend developer focused on crafting responsive,
          animated experiences with Next.js, Tailwind, GSAP, and Spline. I love
          bringing interfaces to life while keeping performance, accessibility,
          and maintainability top of mind.
        </p>
      </div>
    </Section>
  );
}
