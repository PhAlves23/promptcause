"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "/aprender", label: t("nav.learn") },
    { href: "/causa", label: t("nav.cause") },
    { href: "/causa#ledger", label: t("nav.transparency") },
    { href: "/manifesto", label: t("nav.manifesto") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center gap-7 px-7">
        <Link href="/" className="flex shrink-0 items-center" aria-label="PromptCause">
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink-soft transition-colors hover:bg-paper-sunk hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          {/* tema + idioma: apenas no desktop (no mobile vão para o menu) */}
          <div className="hidden items-center gap-2.5 md:flex">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <Button
            asChild
            className="rounded-full bg-clay font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
          >
            <Link href="/doar">
              <span aria-hidden>♥</span> {t("cta.donate")}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-11 text-[1.75rem] leading-none md:hidden"
            aria-label={t("cta.openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </Button>
        </div>
      </div>

      <nav className={cn("border-t border-line bg-paper px-4 py-2 md:hidden", open ? "block" : "hidden")}>
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className="block rounded-md px-2.5 py-3 font-medium text-ink-soft hover:bg-paper-sunk hover:text-ink"
          >
            {n.label}
          </Link>
        ))}
        {/* tema + idioma dentro do menu, no mobile */}
        <div className="mt-1 flex items-center gap-3 border-t border-line px-2.5 pt-3 pb-1">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
