import { cn } from "@/lib/utils";

/** Side-by-side "do this / avoid" example boxes — mirrors `.rw` / `.rw-box`. */
export function RightWrong({
  good,
  bad,
  goodLabel,
  badLabel,
  className,
}: {
  good: React.ReactNode;
  bad: React.ReactNode;
  goodLabel: string;
  badLabel: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      <RWBox kind="good" label={goodLabel}>
        {good}
      </RWBox>
      <RWBox kind="bad" label={badLabel}>
        {bad}
      </RWBox>
    </div>
  );
}

function RWBox({
  kind,
  label,
  children,
}: {
  kind: "good" | "bad";
  label: string;
  children: React.ReactNode;
}) {
  const good = kind === "good";
  return (
    <div
      className={cn(
        "rounded-[10px] border px-5 py-[18px]",
        good ? "border-green-tint-2 bg-green-tint" : "border-[#ebcfc9] bg-wrong-tint",
      )}
    >
      <div
        className={cn(
          "mb-2.5 flex items-center gap-2 text-[0.9rem] font-semibold",
          good ? "text-green-deep" : "text-wrong",
        )}
      >
        <span
          className={cn(
            "grid size-5 place-items-center rounded-full text-[0.8rem] font-bold text-white",
            good ? "bg-green" : "bg-wrong",
          )}
        >
          {good ? "✓" : "✕"}
        </span>
        {label}
      </div>
      <div className="font-mono text-[0.85rem] leading-relaxed text-ink">{children}</div>
    </div>
  );
}
