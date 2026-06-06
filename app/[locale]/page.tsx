import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LevelBadge } from "@/components/level-badge";
import { KeyMessage } from "@/components/key-message";
import { ImpactCounter } from "@/components/impact-counter";
import { getImpactTotalReais } from "@/lib/donations";
import { PromptBlock, PromptVar, PromptKey, PromptComment } from "@/components/prompt-block";
import { RightWrong } from "@/components/right-wrong";

const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const c = await getTranslations("common");
  const totalReais = await getImpactTotalReais();

  const paths = [
    { level: 1 as const, title: t("p1title"), desc: t("p1desc") },
    { level: 2 as const, title: t("p2title"), desc: t("p2desc") },
    { level: 3 as const, title: t("p3title"), desc: t("p3desc") },
  ];

  return (
    <>
      {/* HERO */}
      <section className="pt-[88px] pb-14">
        <div className="mx-auto max-w-[1180px] px-7">
          <span className="inline-flex items-center gap-[7px] rounded-full border border-green-tint-2 bg-green-tint px-3 py-[5px] font-mono text-[0.74rem] font-medium text-green-deep">
            <span className="size-[7px] rounded-full bg-green-bright" /> {c("freeBadge")}
          </span>
          <p className={`mt-6 ${eyebrow}`}>{t("eyebrow")}</p>
          <h1 className="mt-3.5 max-w-[15ch] font-display text-[clamp(2.8rem,6.5vw,5rem)] leading-[1.04] font-medium tracking-[-0.018em]">
            {t("h1a")} <span className="text-green">{t("h1b")}</span>
            <span className="pc-caret text-green">_</span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-[1.2rem] leading-[1.55] text-ink-soft">{t("lede")}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-[10px] px-6 text-base">
              <Link href="/aprender">{t("startFree")} →</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-[10px] px-6 text-base">
              <Link href="/causa">{t("seeCause")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* IMPACT BANNER */}
      <section className="pb-6">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="grid items-center gap-8 rounded-[16px] bg-green-deep px-10 py-[38px] text-[#eaf1ec] md:grid-cols-[1.3fr_0.9fr]">
            <div>
              <div className="font-mono text-[0.72rem] tracking-[0.16em] text-[#9dbca9] uppercase">
                {t("impactLabel")}
              </div>
              <ImpactCounter
                target={totalReais}
                className="my-2 block font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-none font-medium tracking-[-0.02em] text-white"
              />
              <div className="text-[0.96rem] text-[#b9cfc0]">
                <span className="font-semibold text-white">{t("impactPassed")}</span> {t("impactSub")}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-clay px-6 text-base font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
              >
                <Link href="/doar">
                  <span aria-hidden>♥</span> {c("cta.donate")}
                </Link>
              </Button>
              <Link
                href="/causa#ledger"
                className="border-b border-white/25 pb-px text-[0.92rem] text-[#cde0d3] hover:text-white"
              >
                {t("impactSeeWhere")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* PATHS */}
      <section className="py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>{t("pathsEyebrow")}</p>
          <h2 className="mt-2 max-w-[18ch] font-display text-[2.4rem] font-medium">{t("pathsTitle")}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {paths.map((p) => (
              <Card
                key={p.level}
                className="group gap-0 rounded-[16px] border-line bg-paper-card p-[26px] transition-all hover:-translate-y-[3px] hover:border-line-strong hover:shadow-[0_4px_16px_-6px_rgba(32,28,21,0.14)]"
              >
                <LevelBadge level={p.level} label={c(`levels.${p.level}`)} />
                <h3 className="mt-[18px] mb-2 font-display text-[1.5rem] font-medium">{p.title}</h3>
                <p className="text-[0.96rem] text-ink-soft">{p.desc}</p>
                <Link href="/aprender" className="mt-4 text-[0.92rem] font-semibold text-green group-hover:underline">
                  {t("enter")} →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* HOW WE TEACH */}
      <section className="bg-paper-sunk py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className={eyebrow}>{t("teachEyebrow")}</p>
              <h2 className="mt-2 mb-3.5 max-w-[16ch] font-display text-[2.2rem] font-medium">
                {t("teachTitle")}
              </h2>
              <p className="max-w-[46ch] text-ink-soft">{t("teachLede")}</p>
              <KeyMessage className="mt-[22px] max-w-[52ch]">{c("keymsg")}</KeyMessage>
            </div>
            <div>
              <PromptBlock label={c("promptLabel")} className="mb-4">
                <PromptComment>{t("teachComment")}</PromptComment>
                <br />
                {t("teachLine1")} <PromptVar>{`{${t("teachVar")}}`}</PromptVar>
                {t("teachLine2")} <PromptKey>{t("teachKey1")}</PromptKey>
                {t("teachLine3")} <PromptKey>{t("teachKey2")}</PromptKey>
                {t("teachLine4")}
              </PromptBlock>
              <RightWrong good={t("teachGood")} bad={t("teachBad")} goodLabel={c("rw.good")} badLabel={c("rw.bad")} />
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* WHY FREE */}
      <section className="py-[88px]">
        <div className="mx-auto max-w-[760px] px-7 text-center">
          <p className={eyebrow}>{t("whyEyebrow")}</p>
          <p className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.18] font-medium tracking-[-0.015em]">
            {t("whyLema")}
          </p>
          <p className="mx-auto mt-5 max-w-[54ch] text-[1.2rem] leading-[1.55] text-ink-soft">{t("whyBody")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-[10px] px-6 text-base">
              <Link href="/aprender">{c("cta.start")} →</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-clay px-6 text-base font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
            >
              <Link href="/doar">
                <span aria-hidden>♥</span> {c("cta.donate")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
