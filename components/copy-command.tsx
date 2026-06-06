"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/** Bloco de comando(s) com botão de copiar — largura fixa, ícone + animação de confirmação. */
export function CopyCommand({
  command,
  className,
  size = "md",
}: {
  command: string | string[];
  className?: string;
  size?: "sm" | "md";
}) {
  const t = useTranslations("common");
  const [copied, setCopied] = useState(false);
  const text = Array.isArray(command) ? command.join("\n") : command;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível */
    }
  };

  return (
    <div className={cn("flex items-stretch gap-2", className)}>
      <code
        className={cn(
          "flex-1 overflow-x-auto rounded-[10px] border border-line-strong bg-ink/[0.04] font-mono text-ink",
          size === "sm" ? "px-3 py-2 text-[0.78rem]" : "px-3.5 py-3 text-[0.85rem]",
          Array.isArray(command) ? "whitespace-pre" : "whitespace-nowrap",
        )}
      >
        {text}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={t("copy")}
        className={cn(
          "flex shrink-0 items-center justify-center gap-1.5 rounded-[10px] font-semibold text-white transition-all duration-200 active:scale-95",
          copied ? "bg-green shadow-[0_2px_0_var(--green-deep)]" : "bg-clay shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep",
          size === "sm" ? "w-[100px] text-xs" : "w-[116px] text-sm",
        )}
      >
        <span key={copied ? "c" : "u"} className="grid place-items-center animate-in zoom-in-50 duration-200">
          {copied ? <CheckIcon /> : <CopyIcon />}
        </span>
        <span>{copied ? t("copied") : t("copy")}</span>
      </button>
    </div>
  );
}
