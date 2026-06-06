"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DonateButton, type DonateTarget } from "@/components/donate-button";

type OngOption = DonateTarget & {
  slug: string;
  descricao?: string | null;
  logoUrl?: string | null;
  regiaoUf?: string | null;
  site?: string | null;
};

// Valores apenas como REFERÊNCIA DE IMPACTO — o valor/forma de pagamento reais
// são escolhidos no checkout da própria ONG (modelo redirect).
const PRESETS = [20, 50, 100, 250];
const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

export function DonateWidget({ ongs = [] }: { ongs?: OngOption[] }) {
  const t = useTranslations("doar");
  const [ongSlug, setOngSlug] = useState(ongs[0]?.slug ?? "");
  const [preset, setPreset] = useState(50);

  const selectedOng = ongs.find((o) => o.slug === ongSlug) ?? ongs[0];

  const impactFor = (a: number) => {
    if (a >= 250) return t("impact250");
    if (a >= 100) return t("impact100");
    if (a >= 50) return t("impact50");
    if (a >= 20) return t("impact20");
    return t("impactBase");
  };

  return (
    <Card className="gap-0 overflow-hidden rounded-[16px] border-line bg-paper-card p-0 shadow-[0_18px_50px_-16px_rgba(32,28,21,0.22)] lg:sticky lg:top-[92px]">
      <div className="bg-green-deep px-7 pt-[26px] pb-[22px] text-[#eaf1ec]">
        <div className="font-mono text-[0.7rem] tracking-[0.16em] text-[#9dbca9] uppercase">{t("yourDonation")}</div>
        <div className="mt-1.5 font-display text-[clamp(2.6rem,6vw,3.4rem)] leading-none font-medium text-white">
          100%
          <span className="ml-2 font-sans text-[1.1rem] font-normal text-[#9dbca9]">{t("toNgo")}</span>
        </div>
        <div className="mt-[18px] flex items-center justify-between font-mono text-[0.7rem] tracking-[0.06em] text-[#9dbca9] uppercase">
          <span>
            <b className="font-medium text-white">100%</b> {t("passed")}
          </span>
          <span>
            <b className="font-medium text-white">0%</b> {t("retained")}
          </span>
        </div>
        <div className="mt-2 h-[7px] overflow-hidden rounded-full bg-white/15">
          <i className="block h-full w-full rounded-full bg-gradient-to-r from-green-bright to-[#63ca91]" />
        </div>
      </div>

      <div className="px-[26px] py-6">
        {ongs.length > 0 && (
          <div className="mb-[22px]">
            <p className={cn(eyebrow, "mb-3")}>{t("ngoLabel")}</p>
            <Select value={ongSlug} onValueChange={setOngSlug}>
              <SelectTrigger aria-label={t("ngoLabel")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ongs.map((o) => (
                  <SelectItem key={o.slug} value={o.slug}>
                    {o.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedOng && (selectedOng.descricao || selectedOng.logoUrl || selectedOng.regiaoUf || selectedOng.site) && (
          <div className="mb-[22px] rounded-[10px] border border-line bg-paper-sunk px-4 py-4">
            <div className="flex items-start gap-3">
              {selectedOng.logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedOng.logoUrl}
                  alt={selectedOng.nome}
                  className="size-11 shrink-0 rounded-[8px] border border-line object-cover"
                />
              )}
              <div className="min-w-0">
                <div className="font-display text-[1.02rem] leading-tight font-medium text-ink">{selectedOng.nome}</div>
                {selectedOng.regiaoUf && (
                  <div className="mt-0.5 font-mono text-[0.68rem] tracking-[0.08em] text-ink-faint uppercase">
                    {selectedOng.regiaoUf}
                  </div>
                )}
              </div>
            </div>
            {selectedOng.descricao && (
              <p className="mt-3 text-[0.9rem] leading-[1.5] text-ink-soft">{selectedOng.descricao}</p>
            )}
            {selectedOng.site && (
              <a
                href={selectedOng.site}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[0.85rem] font-medium text-green hover:text-green-deep"
              >
                {t("learnMore")} <span aria-hidden>→</span>
              </a>
            )}
          </div>
        )}

        <p className={cn(eyebrow, "mb-3")}>{t("impactOf")}</p>
        <div className="grid grid-cols-4 gap-2.5">
          {PRESETS.map((v) => {
            const selected = preset === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => setPreset(v)}
                aria-pressed={selected}
                className={cn(
                  "flex flex-col items-center gap-px rounded-[10px] border px-1 py-[13px] font-mono text-[1.05rem] font-semibold transition-all",
                  selected
                    ? "border-green bg-green text-white shadow-[0_4px_14px_-4px_rgba(22,104,74,0.55)]"
                    : "border-line-strong bg-paper-card text-ink hover:border-green",
                )}
              >
                <small className="text-[0.62rem] font-medium tracking-[0.06em] opacity-55">R$</small>
                {v}
              </button>
            );
          })}
        </div>

        <div className="my-5 flex items-start gap-3 rounded-[10px] border border-green-tint-2 bg-green-tint px-4 py-3.5">
          <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-green text-white">→</span>
          <div>
            <div className={cn(eyebrow, "mb-1")}>{t("impactOf")}</div>
            <div className="text-[0.96rem] font-medium text-green-deep">{impactFor(preset)}</div>
          </div>
        </div>

        {selectedOng && (
          <DonateButton
            target={selectedOng}
            size="lg"
            className="h-12 w-full rounded-full bg-clay text-base font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
          />
        )}
        <p className="mt-3 text-center text-[0.82rem] text-ink-faint">{t("redirectNote")}</p>
      </div>
    </Card>
  );
}
