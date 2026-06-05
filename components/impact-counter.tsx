"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Count-up impact number, animated when scrolled into view — mirrors `[data-counter]`. */
export function ImpactCounter({
  target,
  prefix = "R$ ",
  durationMs = 1400,
  className,
}: {
  target: number;
  prefix?: string;
  durationMs?: number;
  className?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {new Intl.NumberFormat("pt-BR").format(value)}
    </span>
  );
}
