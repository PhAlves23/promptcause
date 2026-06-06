import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { KeyMessage } from "@/components/key-message";
import { GuideNav } from "@/components/guide-nav";
import { getBiblia } from "@/lib/biblia";

const eyebrow = "font-mono text-[0.68rem] font-medium tracking-[0.14em] text-ink-faint uppercase";

export default async function AprenderIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("common");
  const a = await getTranslations("aprender");
  const b = await getBiblia(locale);
  const parts = b.parts.map((p) => ({ id: p.id, title: p.title }));

  // Temas a caminho — cada um aponta para uma issue de contribuição no GitHub.
  const comingSoon = [
    { title: "RAG", desc: a("soonRag"), issue: 7 },
    { title: "Fine-tuning", desc: a("soonFt"), issue: 8 },
    { title: "MCP", desc: a("soonMcp"), issue: 9 },
    { title: "AI Agents", desc: a("soonAgents"), issue: 10 },
    { title: "Evals", desc: a("soonEvals"), issue: 11 },
    { title: "Embeddings", desc: a("soonEmbeddings"), issue: 12 },
  ];

  return (
    <div className="mx-auto max-w-[1320px] px-7 pt-10 pb-20">
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <GuideNav parts={parts} title={b.title} />

        <article className="min-w-0">
          <p className={eyebrow}>{c("nav.learn")}</p>
          <h1 className="mt-3 mb-3 font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium">{b.title}</h1>
          <p className="max-w-[68ch] text-[1.2rem] leading-[1.55] text-ink-soft">{b.subtitle}</p>
          <KeyMessage className="mt-6 max-w-[60ch]">{c("keymsg")}</KeyMessage>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {b.parts.map((part, i) => (
              <Card
                key={part.id}
                className="group gap-0 rounded-[16px] border-line bg-paper-card p-[26px] transition-all hover:-translate-y-[3px] hover:border-line-strong hover:shadow-[0_4px_16px_-6px_rgba(32,28,21,0.14)]"
              >
                <div className="font-mono text-[0.72rem] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="mt-2 mb-1.5 font-display text-[1.4rem] font-medium">
                  {part.title.replace(/^.*·\s*/, "")}
                </h2>
                <p className="text-[0.92rem] text-ink-soft">
                  {part.techniques.length} {c("techniques")}
                </p>
                <Link
                  href={`/aprender/${part.id}`}
                  className="mt-4 text-[0.92rem] font-semibold text-green group-hover:underline"
                >
                  {c("nav.learn")} →
                </Link>
              </Card>
            ))}
          </div>

          {/* Em breve — temas abertos para a comunidade construir */}
          <section className="mt-16">
            <p className={eyebrow}>{a("soonBadge")}</p>
            <h2 className="mt-2 mb-2 font-display text-[1.8rem] font-medium">{a("soonTitle")}</h2>
            <p className="mb-7 max-w-[62ch] text-[1.05rem] leading-[1.5] text-ink-soft">{a("soonLede")}</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {comingSoon.map((topic) => (
                <Card
                  key={topic.title}
                  className="group flex h-full flex-col gap-0 rounded-[16px] border border-dashed border-line-strong bg-paper-card/50 p-[26px] transition-colors hover:border-green hover:bg-paper-card"
                >
                  <span className="mb-3 inline-flex w-fit items-center rounded-full bg-paper-sunk px-2.5 py-1 font-mono text-[0.64rem] font-medium tracking-[0.1em] text-ink-faint uppercase">
                    {a("soonBadge")}
                  </span>
                  <h3 className="mb-1.5 font-display text-[1.3rem] font-medium">{topic.title}</h3>
                  <p className="mb-4 text-[0.92rem] leading-[1.5] text-ink-soft">{topic.desc}</p>
                  <a
                    href={`https://github.com/PhAlves23/promptcause/issues/${topic.issue}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 text-[0.9rem] font-semibold text-green hover:underline"
                  >
                    {a("soonCta")} →
                  </a>
                </Card>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
