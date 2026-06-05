"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Method = "pix" | "card";
type Freq = "once" | "monthly";

const PRESETS = [20, 50, 100, 250];

const METHODS: { id: Method; label: string; hint: string }[] = [
  { id: "pix", label: "PIX", hint: "Brasil · instantâneo" },
  { id: "card", label: "CARD", hint: "Cartão · global" },
];

function impactFor(amount: number): string {
  if (amount >= 250) return "Um kit de conectividade para uma comunidade.";
  if (amount >= 100) return "Uma turma conectada por uma semana.";
  if (amount >= 50) return "Uma hora de oficina de IA em uma escola pública.";
  if (amount >= 20) return "Material didático de IA para um aluno.";
  return "Cada real aproxima alguém da tecnologia.";
}

const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

export function DonateWidget() {
  const [method, setMethod] = useState<Method>("pix");
  const [freq, setFreq] = useState<Freq>("once");
  const [preset, setPreset] = useState(50);
  const [custom, setCustom] = useState("");

  const customNum = Number(custom);
  const amount = custom !== "" && customNum > 0 ? customNum : preset;
  const freqLabel = freq === "monthly" ? "/mês" : "";

  return (
    <Card className="gap-0 overflow-hidden rounded-[16px] border-line bg-paper-card p-0 shadow-[0_18px_50px_-16px_rgba(32,28,21,0.22)] lg:sticky lg:top-[92px]">
      {/* live header */}
      <div className="bg-green-deep px-7 pt-[26px] pb-[22px] text-[#eaf1ec]">
        <div className="font-mono text-[0.7rem] tracking-[0.16em] text-[#9dbca9] uppercase">Sua doação</div>
        <div className="mt-1.5 font-display text-[clamp(2.6rem,6vw,3.4rem)] leading-none font-medium text-white">
          R$ {amount.toLocaleString("pt-BR")}
          <span className="ml-1 font-sans text-[1.1rem] font-normal text-[#9dbca9]">{freqLabel}</span>
        </div>
        <div className="mt-[18px] flex items-center justify-between font-mono text-[0.7rem] tracking-[0.06em] text-[#9dbca9] uppercase">
          <span>
            <b className="font-medium text-white">100%</b> repassado
          </span>
          <span>
            <b className="font-medium text-white">0%</b> retido
          </span>
        </div>
        <div className="mt-2 h-[7px] overflow-hidden rounded-full bg-white/15">
          <i className="block h-full w-full rounded-full bg-gradient-to-r from-green-bright to-[#63ca91]" />
        </div>
      </div>

      {/* body */}
      <div className="px-[26px] py-6">
        <p className={cn(eyebrow, "mb-3")}>Forma de pagamento</p>
        <div className="mb-[22px] grid grid-cols-2 gap-2.5">
          {METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id)}
              aria-pressed={method === m.id}
              className={cn(
                "flex items-center gap-2.5 rounded-[10px] border px-[15px] py-[13px] text-left font-medium transition-colors",
                method === m.id
                  ? "border-green bg-green-tint text-green-deep shadow-[inset_0_0_0_1px_var(--green)]"
                  : "border-line-strong bg-paper-card hover:border-ink-faint",
              )}
            >
              <span className="font-mono text-[0.85rem] font-semibold">{m.label}</span>
              <span className="text-[0.82rem] text-ink-soft">{m.hint}</span>
            </button>
          ))}
        </div>

        <div className="mb-3.5 flex items-center justify-between">
          <p className={cn(eyebrow, "m-0")}>Frequência</p>
          <div className="inline-flex rounded-full border border-line-strong bg-paper-sunk p-[3px]">
            {(["once", "monthly"] as Freq[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFreq(f)}
                aria-pressed={freq === f}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.9rem] font-semibold whitespace-nowrap transition-colors",
                  freq === f ? "bg-paper-card text-ink shadow-[0_1px_2px_rgba(32,28,21,0.06)]" : "text-ink-soft",
                )}
              >
                {f === "once" ? "Uma vez" : "Mensal"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {PRESETS.map((v) => {
            const selected = custom === "" && preset === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setPreset(v);
                  setCustom("");
                }}
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
        <input
          type="number"
          min={1}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Outro valor (R$)"
          aria-label="Outro valor em reais"
          className="mt-2.5 w-full rounded-[10px] border border-line-strong bg-paper-card px-3.5 py-3 font-mono text-base text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/40"
        />

        {/* impact line */}
        <div className="my-5 flex items-start gap-3 rounded-[10px] border border-green-tint-2 bg-green-tint px-4 py-3.5">
          <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-green text-white">→</span>
          <div>
            <div className={cn(eyebrow, "mb-1")}>O que esse valor faz</div>
            <div className="text-[0.96rem] font-medium text-green-deep">{impactFor(amount)}</div>
          </div>
        </div>

        <Button
          type="button"
          size="lg"
          className="h-12 w-full rounded-full bg-clay text-base font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
        >
          <span aria-hidden>♥</span> Doar agora
        </Button>
        <div className="mt-3 text-center font-mono text-[0.82rem] text-ink-faint">
          R$ {amount.toLocaleString("pt-BR")}
          {freqLabel} → 100% repassado
        </div>
      </div>
    </Card>
  );
}
