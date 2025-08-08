"use client";
import { useEffect, useRef, useState } from "react";
import { getGSAP } from "../lib/gsap";
import { ErrorBoundary } from "./ErrorBoundary";
import { profile } from "../data/profile";
import { useTranslation } from "react-i18next";
import Spline from "./SplineLite";

export function Hero() {
  const { t } = useTranslation("common");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [canRender, setCanRender] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const suppressedRef = useRef<null | (() => void)>(null);
  const localScene =
    profile.spline?.sceneUrl && profile.spline.sceneUrl.startsWith("/")
      ? profile.spline.sceneUrl
      : "/spline/scene.splinecode";

  useEffect(() => {
    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 24 });
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // In development, filter out a known noisy Spline runtime console.error("Missing property")
    if (process.env.NODE_ENV !== "development") return;
    const orig = console.error;
    console.error = function (...args) {
      if (typeof args[0] === "string" && args[0].includes("Missing property")) {
        return; // suppress this noisy message in dev; ErrorBoundary will still handle real crashes
      }
      // @ts-expect-error - restoring original console.error binding
      return orig.apply(this, args);
    } as typeof console.error;
    suppressedRef.current = () => {
      console.error = orig;
    };
    return () => suppressedRef.current?.();
  }, []);

  useEffect(() => {
    // Minimal WebGL detection to avoid Spline runtime errors on unsupported devices
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setCanRender(!!gl);
    } catch {
      setCanRender(false);
    }
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion at runtime
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <section className="relative min-h-[90svh] grid place-items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {prefersReduced ? (
          <div className="h-full w-full bg-foreground/5" />
        ) : canRender ? (
          <ErrorBoundary
            fallback={
              <div className="h-full w-full grid place-items-center bg-foreground/5 text-sm">
                3D preview unavailable
              </div>
            }
          >
            {/* Uses a local Spline scene from public/ */}
            <Spline
              scene={localScene}
              onError={(e: unknown) => {
                if (process.env.NODE_ENV !== "production") {
                  console.warn("Spline failed to load scene:", e);
                }
              }}
            />
          </ErrorBoundary>
        ) : (
          <div className="h-full w-full grid place-items-center bg-foreground/5 text-sm">
            {"3D not supported"}
          </div>
        )}
      </div>
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h1
          ref={titleRef}
          className="text-2xl sm:text-5xl font-extrabold tracking-tight leading-tight text-balance text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-violet-600 to-sky-600 dark:text-foreground dark:bg-none drop-shadow-lg"
        >
          <span>{(t("profile.name") as string) || profile.name}</span>
          <br />
          <span>{(t("profile.title") as string) || profile.title}</span>
        </h1>
        <p
          ref={subtitleRef}
          className="mt-5 text-base sm:text-lg font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-violet-600 to-sky-400 dark:text-foreground/80 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed sm:leading-8 text-pretty"
        >
          {(t("profile.summary", { returnObjects: true }) as string[])[0] ||
            profile.summary[0]}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#projects"
            className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            {t("cta.viewProjects")}
          </a>
          <a
            href="#contact"
            className="rounded-md border border-foreground/20 bg-background px-4 py-2 text-sm font-medium hover:bg-background/90 dark:hover:bg-foreground/5"
          >
            {t("cta.contact")}
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
