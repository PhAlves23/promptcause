import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyCommand } from "@/components/copy-command";
import { getSkills, getMarketplaceStats } from "@/lib/skills";

const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

const REPO_URL = "https://github.com/PhAlves23/promptcause-marketplace";
const CONTRIBUTING_URL = `${REPO_URL}/blob/main/CONTRIBUTING.md`;
const ADD_CMD = "/plugin marketplace add PhAlves23/promptcause-marketplace";

export const dynamic = "force-dynamic";

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.26 6.9.8-5.12 4.66 1.42 6.78L12 17.77 5.9 21.3l1.42-6.78L2.2 9.86l6.9-.8L12 2z" />
    </svg>
  );
}
function ForkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
      <path d="M12 12v3" />
    </svg>
  );
}

const statPill =
  "inline-flex items-center gap-1.5 rounded-full bg-paper-sunk px-2.5 py-1 text-[0.74rem] font-semibold text-ink-soft";

export default async function SkillsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("skills");
  const [skills, stats] = await Promise.all([getSkills(), getMarketplaceStats()]);
  const example = skills[0]?.name ?? "prompt-engineering";
  const features = [t("featCurated"), t("featSha"), t("featGranular"), t("featMultiAgent")];

  return (
    <section className="py-[72px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <p className={eyebrow}>{t("eyebrow")}</p>
        <h1 className="mt-3.5 mb-4 max-w-[18ch] font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-medium">
          {t("h1")}
        </h1>
        <p className="mb-8 max-w-[60ch] text-[1.15rem] leading-[1.55] text-ink-soft">{t("lede")}</p>

        {/* Painel do marketplace — fundo verde escuro + texto claro (legível em light e dark) */}
        <Card className="mb-12 gap-0 overflow-hidden rounded-[16px] border-transparent bg-green-deep p-7 md:p-9">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="text-[#eaf1ec]">
              <h2 className="mb-2 font-display text-[1.7rem] font-medium text-white">{t("mpTitle")}</h2>
              <p className="mb-5 text-[1.02rem] leading-[1.5] text-[#cfe0d6]">{t("mpLede")}</p>
              <ul className="flex flex-col gap-2.5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.95rem] text-[#e6efe9]">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-green-bright text-[0.7rem] font-bold text-green-deep">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[12px] bg-paper-card p-5">
              <p className={`${eyebrow} mb-2.5`}>{t("installHint")}</p>
              <CopyCommand command={[ADD_CMD, `/plugin install ${example}`]} />
              {stats && (
                <div className="mt-4 flex items-center gap-2.5">
                  <span className={statPill}>
                    <span className="text-clay">
                      <StarIcon />
                    </span>
                    {stats.stars} {t("starsLabel")}
                  </span>
                  <span className={statPill}>
                    <ForkIcon />
                    {stats.forks} {t("forksLabel")}
                  </span>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2.5">
                <Button
                  asChild
                  className="rounded-full bg-clay font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
                >
                  <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                    ★ {t("starCta")}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-full border border-line-strong font-medium hover:bg-paper-sunk"
                >
                  <a href={CONTRIBUTING_URL} target="_blank" rel="noopener noreferrer">
                    {t("contributeCta")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <h2 className="mb-5 font-display text-[1.6rem] font-medium">{t("catalogTitle")}</h2>
        {skills.length === 0 ? (
          <p className="text-ink-soft">{t("empty")}</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <Card
                key={s.name}
                className="flex h-full flex-col gap-0 rounded-[16px] border-line bg-paper-card p-[26px]"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  {s.category ? (
                    <span className="inline-flex w-fit items-center rounded-full border border-green-tint-2 bg-green-tint px-3 py-[5px] font-mono text-[0.7rem] font-medium tracking-[0.06em] text-green-deep uppercase">
                      {s.category}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="flex items-center gap-2">
                    <span className={statPill}>
                      <span className="text-clay">
                        <StarIcon />
                      </span>
                      {s.stars}
                    </span>
                    <span className={statPill}>
                      <ForkIcon />
                      {s.forks}
                    </span>
                  </span>
                </div>

                <h3 className="mb-2 font-display text-[1.4rem] font-medium">{s.name}</h3>
                <p className="mb-4 text-[0.95rem] leading-[1.5] text-ink-soft">
                  {t.has(`desc.${s.name}`) ? t(`desc.${s.name}`) : s.description}
                </p>

                <CopyCommand command={`/plugin install ${s.name}`} size="sm" className="mb-4" />

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
                    <span>
                      <span className="block text-[0.7rem] text-ink-faint">{t("createdBy")}</span>
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
