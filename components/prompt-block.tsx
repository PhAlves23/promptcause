import { cn } from "@/lib/utils";

/** Dark monospace prompt sample with a corner label — mirrors `.prompt`. */
export function PromptBlock({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-auto rounded-[10px] border border-[#322c22] bg-[#211d16] px-5 py-[18px] font-mono text-[0.92rem] leading-relaxed text-[#ede7d9]",
        className,
      )}
    >
      <span className="absolute top-0 right-0 px-3 py-[7px] text-[0.62rem] tracking-[0.18em] text-[#8e8676] uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

/** Token highlights for prompt samples (variable / keyword / comment). */
export const PromptVar = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#e89b6c]">{children}</span>
);
export const PromptKey = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#7fb78f]">{children}</span>
);
export const PromptComment = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#7c7464]">{children}</span>
);
