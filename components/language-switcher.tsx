"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeMeta, type Locale } from "@/i18n/locales";

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={t("language")}
          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-paper-card px-3 py-[7px] font-mono text-[0.76rem] font-medium text-ink-soft hover:border-ink-faint hover:text-ink"
        >
          <span aria-hidden>{localeMeta[locale]?.flag}</span>
          <span className="uppercase">{locale}</span>
          <ChevronDown aria-hidden className="size-3 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[264px] p-0">
        <Command
          filter={(value, search) => (value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0)}
        >
          <CommandInput placeholder={t("searchLanguage")} />
          <CommandList>
            <CommandEmpty>{t("noLanguage")}</CommandEmpty>
            <CommandGroup>
              {locales.map((l) => {
                const meta = localeMeta[l];
                return (
                  <CommandItem
                    key={l}
                    value={`${meta.native} ${meta.english} ${l}`}
                    onSelect={() => change(l)}
                    className="gap-2.5"
                  >
                    <span aria-hidden>{meta.flag}</span>
                    <span className="flex-1 truncate">{meta.native}</span>
                    <span className="font-mono text-[0.62rem] text-ink-faint uppercase">{l}</span>
                    {l === locale && <Check className="size-3.5 text-green" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
