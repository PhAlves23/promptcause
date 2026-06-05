import { cn } from "@/lib/utils";

/**
 * PromptCause wordmark: the "<3" mark (chevron + heart) followed by the name.
 * Mirrors references/styles.css `.brand-mark` / `.brand-name`.
 */
export function BrandLogo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "footer";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative grid size-[30px] place-items-center rounded-lg font-mono text-[18px] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]",
          variant === "footer" ? "bg-green-bright" : "bg-green",
        )}
      >
        ›
        <i className="absolute -top-1.5 -right-[7px] grid size-[15px] place-items-center rounded-full bg-paper text-[9px] not-italic leading-none text-clay shadow-[0_0_0_1px_var(--line)]">
          ♥
        </i>
      </span>
      <span
        className={cn(
          "font-display text-[1.32rem] font-semibold tracking-tight",
          variant === "footer" && "text-white",
        )}
      >
        Prompt
        <b
          className={cn(
            "font-semibold",
            variant === "footer" ? "text-green-bright" : "text-green",
          )}
        >
          Cause
        </b>
      </span>
    </span>
  );
}
