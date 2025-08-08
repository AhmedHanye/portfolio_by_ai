"use client";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="max-w-xl">
        <p className="text-foreground/80 text-sm">
          Have an idea or opportunity? Let’s chat.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:you@example.com"
            className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Email me
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            className="rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
          >
            GitHub
          </a>
        </div>
      </div>
    </Section>
  );
}
