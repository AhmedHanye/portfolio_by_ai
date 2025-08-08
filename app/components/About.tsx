"use client";
import { Section } from "./Section";
import { profile } from "../data/profile";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="prose prose-invert max-w-none">
        {profile.summary.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </Section>
  );
}
