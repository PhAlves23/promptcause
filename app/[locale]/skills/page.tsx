import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSkills } from "@/lib/skills";

const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

// Renderiza on-demand; o fetch do marketplace/GitHub é cacheado (revalidate) entre requests.
export const dynamic = "force-dynamic";

export default async function SkillsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("skills");
  const skills = await getSkills();

  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <p className={eyebrow}>{t("eyebrow")}</p>
        <h1 className="mt-3.5 mb-4 max-w-[18ch] font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-medium">
          {t("h1")}
        </h1>
        <p className="mb-10 max-w-[60ch] text-[1.15rem] leading-[1.55] text-ink-soft">{t("lede")}</p>

        {skills.length === 0 ? (
          <p className="text-ink-soft">{t("empty")}</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <Card
                key={s.name}
                className="flex h-full flex-col gap-0 rounded-[16px] border-line bg-paper-card p-[26px]"
              >
                {s.category && (
                  <span className="mb-3 inline-flex w-fit items-center rounded-full border border-green-tint-2 bg-green-tint px-3 py-[5px] font-mono text-[0.7rem] font-medium tracking-[0.06em] text-green-deep uppercase">
                    {s.category}
                  </span>
                )}
                <h3 className="mb-2 font-display text-[1.4rem] font-medium">{s.name}</h3>
                <p className="mb-5 text-[0.95rem] leading-[1.5] text-ink-soft">{s.description}</p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
                  <a
                    href={s.author.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm hover:underline"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.author.avatarUrl}
                      alt={s.author.name}
                      width={28}
                      height={28}
                      className="size-7 rounded-full border border-line object-cover"
                    />
                    <span className="text-ink-soft">
                      <span className="text-[0.7rem] text-ink-faint">{t("createdBy")}</span>
                      <br />
                      <span className="font-medium text-ink">{s.author.name}</span>
                    </span>
                  </a>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="shrink-0 rounded-full border border-line-strong text-sm font-medium hover:bg-paper-sunk"
                  >
                    <a href={s.homepage} target="_blank" rel="noopener noreferrer">
                      {t("viewOnGithub")}
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
