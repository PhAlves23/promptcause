"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/aprender", label: "Aprender" },
  { href: "/causa", label: "A Causa" },
  { href: "/causa#ledger", label: "Transparência" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/marca", label: "Marca" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center gap-7 px-7">
        <Link href="/" className="shrink-0" aria-label="PromptCause — início">
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink-soft transition-colors hover:bg-paper-sunk hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <ThemeToggle />
          <Button
            asChild
            className="rounded-full bg-clay font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
          >
            <Link href="/doar">
              <span aria-hidden>♥</span> Doar
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </Button>
        </div>
      </div>

      <nav className={cn("border-t border-line bg-paper px-4 py-2 md:hidden", open ? "block" : "hidden")}>
        {NAV.map((n) => (
          <Link
            key={n.label}
            href={n.href}
            onClick={() => setOpen(false)}
            className="block rounded-md px-2.5 py-3 font-medium text-ink-soft hover:bg-paper-sunk hover:text-ink"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
