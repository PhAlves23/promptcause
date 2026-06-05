import { cn } from "@/lib/utils";

/** Recurring "Grátis. Se te ajudou, 100% vai para a causa." callout — mirrors `.keymsg`. */
export function KeyMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3.5 rounded-[10px] border border-clay-tint-2 bg-clay-tint px-[18px] py-3.5 font-medium text-clay-deep",
        className,
      )}
    >
      <span aria-hidden className="text-[1.3rem] leading-none">
        ♥
      </span>
      <span>{children}</span>
    </div>
  );
}
