import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3;

const LEVELS: Record<Level, { label: string; cls: string; bars: number }> = {
  1: { label: "Iniciante", cls: "border-green-tint-2 bg-green-tint text-green", bars: 1 },
  2: { label: "Intermediário", cls: "border-clay-tint-2 bg-clay-tint text-clay-deep", bars: 2 },
  3: { label: "Avançado", cls: "border-line-strong bg-paper-sunk text-ink", bars: 3 },
};

const BAR_HEIGHTS = [5, 8, 11];

/** Level indicator (Iniciante / Intermediário / Avançado) — mirrors `.badge.lv-*`. */
export function LevelBadge({ level, label }: { level: Level; label?: string }) {
  const l = LEVELS[level];
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.72rem] font-medium tracking-wide uppercase",
        l.cls,
      )}
    >
      <span className="inline-flex h-[11px] items-end gap-[2px]">
        {BAR_HEIGHTS.map((h, i) => (
          <i
            key={i}
            className={cn("w-[3px] rounded-[1px] bg-current", i < l.bars ? "opacity-100" : "opacity-30")}
            style={{ height: h }}
          />
        ))}
      </span>
      {label ?? l.label}
    </Badge>
  );
}
