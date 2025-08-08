"use client";
import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

type Props = {
  scene: string;
  className?: string;
  onLoad?: () => void;
  onError?: (e: unknown) => void;
};

export default function SplineLite({
  scene,
  className,
  onLoad,
  onError,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onLoadRef = useRef<Props["onLoad"] | null>(null);
  const onErrorRef = useRef<Props["onError"] | null>(null);

  useEffect(() => {
    onLoadRef.current = onLoad || null;
  }, [onLoad]);

  useEffect(() => {
    onErrorRef.current = onError || null;
  }, [onError]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const app = new Application(canvas);
    let cancelled = false;

    app
      .load(scene)
      .then(() => {
        if (!cancelled) onLoadRef.current?.();
      })
      .catch((e) => {
        if (!cancelled) onErrorRef.current?.(e);
      });

    return () => {
      cancelled = true;
      try {
        app?.dispose?.();
      } catch {}
    };
  }, [scene]);

  return <canvas ref={canvasRef} className={className} />;
}
