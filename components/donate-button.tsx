"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DonateTarget = {
  nome: string;
  donationType: string; // "link" | "pix"
  href?: string | null; // checkout (já com ?ref)
  pixKey?: string | null;
  pixKeyType?: string | null;
};

export function DonateButton({
  target,
  className,
  size = "lg",
}: {
  target: DonateTarget;
  className?: string;
  size?: "sm" | "lg" | "default";
}) {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Caso 1: ONG com checkout próprio → redireciona.
  if (target.donationType !== "pix") {
    if (!target.href) return null;
    return (
      <Button asChild size={size} className={className}>
        <a href={target.href} target="_blank" rel="noopener noreferrer">
          <span aria-hidden>♥</span> {t("cta.donate")}
        </a>
      </Button>
    );
  }

  // Caso 2: ONG via chave PIX → mostra a chave (copia-e-cola).
  const copy = async () => {
    if (!target.pixKey) return;
    try {
      await navigator.clipboard.writeText(target.pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível — usuário copia manualmente */
    }
  };

  return (
    <>
      <Button type="button" size={size} className={className} onClick={() => setOpen(true)}>
        <span aria-hidden>♥</span> {t("cta.donate")}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-sm rounded-[16px] border border-line bg-paper-card p-6 shadow-[0_18px_50px_-16px_rgba(32,28,21,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 font-mono text-[0.72rem] tracking-[0.16em] text-ink-faint uppercase">
              {t("pixModalTitle")}
            </div>
            <h3 className="mb-4 font-display text-xl font-semibold">{target.nome}</h3>

            <label className="mb-1 block text-xs font-medium text-ink-soft">
              {t("pixKeyLabel")}
              {target.pixKeyType ? ` · ${target.pixKeyType}` : ""}
            </label>
            <div className="flex items-stretch gap-2">
              <code className="flex-1 overflow-x-auto rounded-[10px] border border-line-strong bg-paper-sunk px-3 py-2.5 font-mono text-sm">
                {target.pixKey}
              </code>
              <button
                type="button"
                onClick={copy}
                className="shrink-0 rounded-[10px] bg-clay px-4 text-sm font-semibold text-white hover:bg-clay-deep"
              >
                {copied ? t("pixCopied") : t("pixCopy")}
              </button>
            </div>

            <p className="mt-4 text-sm text-ink-soft">{t("pixHelp")}</p>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 w-full rounded-full border border-line-strong py-2.5 text-sm font-medium hover:bg-paper-sunk"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
