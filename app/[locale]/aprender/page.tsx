import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "@/components/level-badge";
import { KeyMessage } from "@/components/key-message";
import { getBiblia, type Technique } from "@/lib/biblia";

const eyebrow = "font-mono text-[0.68rem] font-medium tracking-[0.14em] text-ink-faint uppercase";

export default async function AprenderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("common");
  const b = await getBiblia(locale);

  return (
    <div className="mx-auto max-w-[1320px] px-7 pt-10 pb-20">
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_210px]">
        {/* LEFT: parts nav */}
        <aside className="sticky top-[92px] hidden max-h-[calc(100vh-110px)] self-start overflow-y-auto lg:block">
          <div className="mb-4 rounded-[10px] border border-line bg-paper-card px-3.5 py-3">
            <div className="text-[0.92rem] font-semibold">{b.title}</div>
            <div className="font-mono text-[0.7rem] text-ink-faint">prompt engineering · v1.0</div>
          </div>
          <nav className="border-l border-line">
            {b.parts.map((part) => (
              <a
                key={part.id}
                href={`#${part.id}`}
                className="-ml-px block border-l-2 border-transparent py-1.5 pl-3.5 text-[0.9rem] text-ink-soft hover:border-line-strong hover:text-ink"
              >
                {part.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* CENTER: guide content */}
        <article className="min-w-0">
          <p className={eyebrow}>{c("nav.learn")}</p>
          <h1 className="mt-3 mb-3 font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium">{b.title}</h1>
          <p className="text-[1.2rem] leading-[1.55] text-ink-soft">{b.subtitle}</p>

          <KeyMessage className="mt-6">{c("keymsg")}</KeyMessage>

          {b.parts.map((part) => (
            <section key={part.id} id={part.id} className="scroll-mt-[92px]">
              <h2 className="mt-12 mb-2 border-b border-line pb-2 font-display text-[1.7rem] font-medium">
                {part.title}
              </h2>
              {part.techniques.map((tech) => (
                <TechniqueBlock key={tech.id} tech={tech} levelLabel={c(`levels.${tech.level}`)} labels={b} />
              ))}
            </section>
          ))}

          <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-6">
            <Button
              asChild
              className="rounded-full bg-clay font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
            >
              <Link href="/doar">
                <span aria-hidden>♥</span> {c("cta.donate")}
              </Link>
            </Button>
          </div>
        </article>

        {/* RIGHT: on-this-page (parts) */}
        <aside className="sticky top-[92px] hidden max-h-[calc(100vh-110px)] self-start overflow-y-auto xl:block">
          <p className={`mb-3 ${eyebrow}`}>{b.tocTitle}</p>
          <nav className="flex flex-col border-l border-line">
            {b.parts.map((part) => (
              <a
                key={part.id}
                href={`#${part.id}`}
                className="-ml-px border-l-2 border-transparent py-1 pl-3 text-[0.82rem] text-ink-soft hover:text-ink"
              >
                {part.title.replace(/^.*·\s*/, "")}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}

function TechniqueBlock({
  tech,
  levelLabel,
  labels,
}: {
  tech: Technique;
  levelLabel: string;
  labels: { whatIsLabel: string; whenLabel: string; wrongLabel: string; rightLabel: string; whyLabel: string };
}) {
  return (
    <div id={tech.id} className="scroll-mt-[92px] py-6">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-[1.35rem] font-medium">{tech.name}</h3>
        <LevelBadge level={tech.level} label={levelLabel} />
      </div>
      <p className="mt-2.5 max-w-[70ch]">
        <strong>{labels.whatIsLabel}:</strong> {tech.whatIs}
      </p>
      {tech.when && (
        <p className="mt-1.5 max-w-[70ch] text-[0.95rem] text-ink-soft italic">
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
        <div className="max-w-[72ch] border-l-[3px] border-green bg-paper-card px-4 py-2.5 text-[0.95rem]">
          <strong>{labels.whyLabel}:</strong> {tech.why}
        </div>
      )}
    </div>
  );
}

function ExampleBox({ kind, label, text }: { kind: "good" | "bad"; label: string; text: string }) {
  const good = kind === "good";
  return (
    <div className={`rounded-[10px] border px-5 py-[18px] ${good ? "border-green-tint-2 bg-green-tint" : "border-[#ebcfc9] bg-wrong-tint"}`}>
      <div className={`mb-2.5 flex items-center gap-2 text-[0.9rem] font-semibold ${good ? "text-green-deep" : "text-wrong"}`}>
        <span className={`grid size-5 place-items-center rounded-full text-[0.8rem] font-bold text-white ${good ? "bg-green" : "bg-wrong"}`}>
          {good ? "✓" : "✕"}
        </span>
        {label}
      </div>
      <div className="font-mono text-[0.85rem] leading-relaxed whitespace-pre-line text-ink">{text}</div>
    </div>
  );
}
