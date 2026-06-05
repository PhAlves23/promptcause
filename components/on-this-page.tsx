"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Right rail TOC with scroll-spy: highlights the section currently in view. */
export function OnThisPage({
  title,
  items,
}: {
  title: string;
  items: { id: string; label: string }[];
}) {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const elements = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      // active = element near the top of the viewport, just under the fixed header
      { rootMargin: "-96px 0px -68% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="sticky top-[92px] hidden max-h-[calc(100vh-110px)] self-start overflow-y-auto xl:block">
      <p className="mb-3 font-mono text-[0.68rem] font-medium tracking-[0.14em] text-ink-faint uppercase">
        {title}
      </p>
      <nav className="flex flex-col border-l border-line">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            aria-current={it.id === activeId ? "true" : undefined}
            className={cn(
              "-ml-px border-l-2 py-1 pl-3 text-[0.82rem] transition-colors",
              it.id === activeId
                ? "border-green font-medium text-green"
                : "border-transparent text-ink-soft hover:border-line-strong hover:text-ink",
            )}
          >
            {it.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
