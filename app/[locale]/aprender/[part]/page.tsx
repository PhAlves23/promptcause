import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GuideNav } from "@/components/guide-nav";
import { OnThisPage } from "@/components/on-this-page";
import { TechniqueBlock } from "@/components/technique-block";
import { getBiblia } from "@/lib/biblia";

const eyebrow = "font-mono text-[0.68rem] font-medium tracking-[0.14em] text-ink-faint uppercase";

export async function generateStaticParams() {
  const b = await getBiblia("pt");
  return b.parts.map((p) => ({ part: p.id }));
}

export default async function GuidePartPage({
  params,
}: {
  params: Promise<{ locale: string; part: string }>;
}) {
  const { locale, part: partId } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("common");
  const b = await getBiblia(locale);

  const idx = b.parts.findIndex((p) => p.id === partId);
  if (idx === -1) notFound();
  const part = b.parts[idx];
  const prev = b.parts[idx - 1];
  const next = b.parts[idx + 1];
  const parts = b.parts.map((p) => ({ id: p.id, title: p.title }));

  return (
    <div className="mx-auto max-w-[1320px] px-7 pt-10 pb-20">
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_210px]">
        <GuideNav parts={parts} activeId={partId} title={b.title} />

        <article className="min-w-0">
          {/* breadcrumb */}
          <nav aria-label={c("breadcrumb")} className="mb-5 flex flex-wrap items-center gap-2 text-[0.85rem] text-ink-soft">
            <Link href="/aprender" className="hover:text-ink">
              {b.title}
            </Link>
            <span aria-hidden className="text-ink-faint">›</span>
            <span className="text-ink">{part.title.replace(/^.*·\s*/, "")}</span>
          </nav>

          <p className={eyebrow}>
            {idx + 1} / {b.parts.length}
          </p>
          <h1 className="mt-3 mb-8 font-display text-[clamp(2rem,4vw,2.8rem)] font-medium">
            {part.title.replace(/^.*·\s*/, "")}
          </h1>

          <div>
            {part.techniques.map((tech) => (
              <TechniqueBlock key={tech.id} tech={tech} levelLabel={c(`levels.${tech.level}`)} labels={b} />
            ))}
          </div>

          {/* prev / next */}
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
            {prev ? (
              <Link href={`/aprender/${prev.id}`} className="text-[0.95rem] font-medium text-green hover:underline">
                ← {prev.title.replace(/^.*·\s*/, "")}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/aprender/${next.id}`} className="text-right text-[0.95rem] font-medium text-green hover:underline">
                {next.title.replace(/^.*·\s*/, "")} →
              </Link>
            ) : (
              <Button
                asChild
                className="rounded-full bg-clay font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
              >
                <Link href="/doar">
                  <span aria-hidden>♥</span> {c("cta.donate")}
                </Link>
              </Button>
            )}
          </div>
        </article>

        {/* RIGHT: TOC with scroll-spy */}
        <OnThisPage title={b.tocTitle} items={part.techniques.map((t) => ({ id: t.id, label: t.name }))} />
      </div>
    </div>
  );
}
