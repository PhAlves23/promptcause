import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { getContributors } from "@/lib/contributors";

const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

const ISSUES_URL = "https://github.com/PhAlves23/promptcause/issues?q=is%3Aopen+label%3A%22help+wanted%22";
const SKILL_CONTRIB_URL = "https://github.com/PhAlves23/prompt-cause-marketplace/blob/main/CONTRIBUTING.md";

export const dynamic = "force-dynamic";

export default async function ContribuidoresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contributors");
  const people = await getContributors();

  return (
    <section className="py-[72px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <p className={eyebrow}>{t("eyebrow")}</p>
        <h1 className="mt-3.5 mb-4 max-w-[18ch] font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-medium">
          {t("h1")}
        </h1>
        <p className="mb-10 max-w-[60ch] text-[1.15rem] leading-[1.55] text-ink-soft">{t("lede")}</p>

        {people.length === 0 ? (
          <p className="text-ink-soft">{t("empty")}</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {people.map((p) => (
              <a
                key={p.login}
                href={p.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center rounded-[16px] border border-line bg-paper-card p-6 text-center transition-all hover:-translate-y-[3px] hover:border-line-strong hover:shadow-[0_4px_16px_-6px_rgba(32,28,21,0.14)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.avatarUrl}
                  alt={p.login}
                  width={72}
                  height={72}
                  className="size-[72px] rounded-full border border-line object-cover"
                />
                <div className="mt-3 font-display text-[1.05rem] font-medium group-hover:text-green">
                  {p.login}
                </div>
                <div className="mt-0.5 font-mono text-[0.72rem] text-ink-faint">
                  {p.contributions} {t("contributions")}
                </div>
              </a>
            ))}
          </div>
        )}

        {/* CTA — junte-se */}
        <div className="mt-14 rounded-[16px] bg-green-deep p-8 text-center md:p-10">
          <h2 className="mb-2 font-display text-[1.8rem] font-medium text-white">{t("ctaTitle")}</h2>
          <p className="mx-auto mb-6 max-w-[52ch] text-[1.02rem] leading-[1.5] text-[#cfe0d6]">{t("ctaText")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-clay font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
            >
              <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer">
                {t("ctaContent")}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full border border-white/25 font-medium text-white hover:bg-white/10"
            >
              <a href={SKILL_CONTRIB_URL} target="_blank" rel="noopener noreferrer">
                {t("ctaSkill")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
