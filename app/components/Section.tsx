"use client";
import { useEffect, useRef } from "react";
import { getGSAP } from "../lib/gsap";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGSAP();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: 32 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
          {title}
        </h2>
        <div ref={ref}>{children}</div>
      </div>
    </section>
  );
}
