"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getGSAP } from "../lib/gsap";
import { ErrorBoundary } from "./ErrorBoundary";
import { profile } from "../data/profile";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [canRender, setCanRender] = useState(false);
  const [sceneOk, setSceneOk] = useState<null | boolean>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const sceneUrl = profile.spline?.sceneUrl || "";

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

  useEffect(() => {
    if (!sceneUrl) {
      setSceneOk(false);
      return;
    }
    let cancelled = false;
    const controller = new AbortController();
    async function probeScene() {
      try {
        const res = await fetch(sceneUrl, {
          method: "HEAD",
          mode: "cors",
          signal: controller.signal,
        });
        let ok = res.ok;
        const ct = res.headers.get("content-type") || "";
        // Spline usually serves octet-stream; if we see HTML it's likely an error page
        if (ok && ct && ct.includes("text/html")) ok = false;
        if (!ok) {
          // retry GET in case HEAD is blocked
          const resGet = await fetch(sceneUrl, {
            method: "GET",
            mode: "cors",
            signal: controller.signal,
          });
          const ctGet = resGet.headers.get("content-type") || "";
          ok = resGet.ok && !ctGet.includes("text/html");
        }
        if (!cancelled) setSceneOk(ok);
      } catch {
        if (!cancelled) setSceneOk(false);
      }
    }
    probeScene();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [sceneUrl]);

  return (
    <section className="relative min-h-[90svh] grid place-items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {prefersReduced ? (
          profile.spline?.poster ? (
            <Image
              src={profile.spline.poster}
              alt="Hero background"
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-foreground/5" />
          )
        ) : canRender && sceneOk === true ? (
          <ErrorBoundary
            fallback={
              <div className="h-full w-full grid place-items-center bg-foreground/5 text-sm">
                3D preview unavailable
              </div>
            }
          >
            {/* Uses your configured Spline scene URL from app/data/profile.ts */}
            <Spline scene={sceneUrl} />
          </ErrorBoundary>
        ) : sceneOk === null ? (
          <div className="h-full w-full grid place-items-center bg-foreground/5 text-sm">
            Loading 3D…
          </div>
        ) : (
          <div className="h-full w-full grid place-items-center bg-foreground/5 text-sm">
            {sceneOk === false ? "3D scene failed to load" : "3D not supported"}
          </div>
        )}
      </div>
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight"
        >
          {profile.name} — {profile.title}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-4 text-base sm:text-lg text-foreground/80"
        >
          {profile.summary[0]}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#projects"
            className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
