"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeMeta, readyLocales, type Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const change = (next: Locale) => {
    setOpen(false);
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("language")}
        className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-paper-card px-3 py-[7px] font-mono text-[0.76rem] font-medium text-ink-soft hover:border-ink-faint hover:text-ink"
      >
        <span aria-hidden>{localeMeta[locale]?.flag}</span>
        <span className="uppercase">{locale}</span>
        <span aria-hidden className="text-[0.6rem] opacity-60">
          ▾
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute top-[calc(100%+8px)] right-0 z-50 max-h-[360px] w-[244px] overflow-y-auto rounded-[10px] border border-line-strong bg-paper-card p-1.5 shadow-[0_18px_50px_-16px_rgba(32,28,21,0.22)]">
            <div className="px-2.5 py-2 font-mono text-[0.6rem] tracking-[0.14em] text-ink-faint uppercase">
              {t("language")}
            </div>
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => change(l)}
                className={cn(
                  "flex w-full items-center justify-between gap-2.5 rounded-[6px] px-2.5 py-2 text-left text-[0.92rem] hover:bg-paper-sunk",
                  l === locale ? "font-semibold text-green" : "text-ink",
                )}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden>{localeMeta[l].flag}</span>
                  {localeMeta[l].native}
                  {!readyLocales.includes(l) && (
                    <span className="font-mono text-[0.58rem] text-ink-faint">(en)</span>
                  )}
                </span>
                <span
                  className={cn(
                    "font-mono text-[0.64rem] uppercase",
                    l === locale ? "text-green" : "text-ink-faint",
                  )}
                >
                  {l}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
