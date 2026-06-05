import { LevelBadge } from "@/components/level-badge";
import type { Technique } from "@/lib/biblia";

type Labels = {
  whatIsLabel: string;
  whenLabel: string;
  wrongLabel: string;
  rightLabel: string;
  whyLabel: string;
};

export function TechniqueBlock({
  tech,
  levelLabel,
  labels,
}: {
  tech: Technique;
  levelLabel: string;
  labels: Labels;
}) {
  return (
    <div id={tech.id} className="scroll-mt-[92px] border-t border-line py-7 first:border-t-0">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-[1.5rem] font-medium">{tech.name}</h3>
        <LevelBadge level={tech.level} label={levelLabel} />
      </div>
      <p className="mt-3 max-w-[72ch] text-[1.05rem] leading-[1.6]">
        <strong>{labels.whatIsLabel}:</strong> {tech.whatIs}
      </p>
      {tech.when && (
        <p className="mt-2 max-w-[72ch] text-[0.98rem] text-ink-soft italic">
          {labels.whenLabel}: {tech.when}
        </p>
      )}
      {(tech.wrong || tech.right) && (
        <div className="my-4 grid gap-4 sm:grid-cols-2">
          {tech.wrong && <ExampleBox kind="bad" label={labels.wrongLabel} text={tech.wrong} />}
          {tech.right && <ExampleBox kind="good" label={labels.rightLabel} text={tech.right} />}
        </div>
      )}
      {tech.why && (
        <div className="max-w-[74ch] border-l-[3px] border-green bg-paper-card px-4 py-3 text-[0.98rem] leading-[1.55]">
          <strong>{labels.whyLabel}:</strong> {tech.why}
        </div>
      )}
    </div>
  );
}

function ExampleBox({ kind, label, text }: { kind: "good" | "bad"; label: string; text: string }) {
  const good = kind === "good";
  return (
    <div
      className={`rounded-[10px] border px-5 py-[18px] ${good ? "border-green-tint-2 bg-green-tint" : "border-[#ebcfc9] bg-wrong-tint"}`}
    >
      <div
        className={`mb-2.5 flex items-center gap-2 text-[0.9rem] font-semibold ${good ? "text-green-deep" : "text-wrong"}`}
      >
        <span
          className={`grid size-5 place-items-center rounded-full text-[0.8rem] font-bold text-white ${good ? "bg-green" : "bg-wrong"}`}
        >
          {good ? "✓" : "✕"}
        </span>
        {label}
      </div>
      <div className="font-mono text-[0.85rem] leading-relaxed whitespace-pre-line text-ink">{text}</div>
    </div>
  );
}
