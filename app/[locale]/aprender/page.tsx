import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "@/components/level-badge";
import { KeyMessage } from "@/components/key-message";
import { RightWrong } from "@/components/right-wrong";
import { PromptBlock, PromptVar, PromptKey, PromptComment } from "@/components/prompt-block";

const eyebrow = "font-mono text-[0.68rem] font-medium tracking-[0.14em] text-ink-faint uppercase";

export default async function AprenderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aprender");
  const c = await getTranslations("common");

  const sidebar = [
    { level: c("levels.1"), items: [t("l1"), t("l2"), t("l3")], firstActive: true },
    { level: c("levels.2"), items: [t("l4"), t("l5"), t("l6")] },
    { level: c("levels.3"), items: [t("l7"), t("l8"), t("l9")] },
  ];

  const toc = [
    { id: "receita", label: t("tocRecipe"), active: true },
    { id: "contraste", label: t("tocContrast") },
    { id: "por-que", label: t("tocWhy"), sub: true },
    { id: "pratique", label: t("tocPractice") },
  ];

  return (
    <div className="mx-auto max-w-[1320px] px-7 pt-10 pb-20">
      <div className="grid gap-10 lg:grid-cols-[232px_minmax(0,1fr)] xl:grid-cols-[232px_minmax(0,1fr)_200px]">
        {/* LEFT: nav sidebar */}
        <aside className="sticky top-[92px] hidden self-start lg:block">
          <div className="mb-5 rounded-[10px] border border-line bg-paper-card px-3.5 py-3">
            <div className="text-[0.92rem] font-semibold">{t("guideTitle")}</div>
            <div className="font-mono text-[0.7rem] text-ink-faint">{t("guideSub")}</div>
          </div>
          <nav className="border-l border-line">
            {sidebar.map((group, gi) => (
              <div key={group.level}>
                <h5 className={`mt-[18px] mb-2 pl-3.5 ${eyebrow} first:mt-0`}>{group.level}</h5>
                {group.items.map((item, ii) => {
                  const active = gi === 0 && ii === 0 && group.firstActive;
                  return (
                    <Link
                      key={item}
                      href="/aprender"
                      className={
                        active
                          ? "-ml-px block border-l-2 border-green bg-green-tint py-1.5 pl-3.5 text-[0.9rem] font-semibold text-green"
                          : "-ml-px block border-l-2 border-transparent py-1.5 pl-3.5 text-[0.9rem] text-ink-soft hover:border-line-strong hover:text-ink"
                      }
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* CENTER: lesson */}
        <article className="min-w-0">
          <nav aria-label="breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[0.85rem] text-ink-soft">
            <Link href="/aprender" className="hover:text-ink">
              {c("nav.learn")}
            </Link>
            <span aria-hidden className="text-ink-faint">›</span>
            <span className="text-ink-faint">{c("levels.1")}</span>
            <span aria-hidden className="text-ink-faint">›</span>
            <span className="text-ink">{t("crumb")}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <LevelBadge level={1} label={c("levels.1")} />
            <span className="rounded-[6px] border border-line px-[7px] py-[2px] font-mono text-[0.68rem] tracking-[0.1em] text-ink-faint uppercase">
              {t("tag")}
            </span>
          </div>

          <h1 className="mt-4 mb-2 font-display text-[clamp(2.2rem,4.5vw,3.2rem)] font-medium">{t("title")}</h1>
          <p className="mb-5 font-mono text-[0.78rem] text-ink-faint">{t("updated")}</p>
          <p className="text-[1.2rem] leading-[1.55] text-ink-soft">{t("lede")}</p>

          <h2 id="receita" className="mt-9 mb-3.5 scroll-mt-[92px] font-display text-[1.9rem] font-medium">
            {t("h2recipe")}
          </h2>
          <p className="max-w-[68ch]">{t("pRecipe")}</p>

          <PromptBlock className="my-5">
            <PromptComment>{t("pcComment1")}</PromptComment>
            <br />
            {t("pcL1a")}
            <PromptVar>{`{${t("pcVar")}}`}</PromptVar>
            {t("pcL1b")}
            <br />
            <PromptComment>{t("pcComment2")}</PromptComment>
            <br />
            {t("pcL2")}
            <br />
            <PromptComment>{t("pcComment3")}</PromptComment>
            <br />
            <PromptKey>{t("pcKey")}</PromptKey>
          </PromptBlock>

          <h2 id="contraste" className="mt-9 mb-3.5 scroll-mt-[92px] font-display text-[1.9rem] font-medium">
            {t("h2contrast")}
          </h2>
          <p className="max-w-[68ch]">{t("pContrast")}</p>

          <RightWrong className="my-6" good={t("good")} bad={t("bad")} goodLabel={c("rw.good")} badLabel={c("rw.bad")} />

          <h3 id="por-que" className="mt-7 mb-2.5 scroll-mt-[92px] font-display text-[1.3rem] font-medium">
            {t("h3why")}
          </h3>
          <p className="max-w-[68ch]">{t("pWhy")}</p>

          <KeyMessage className="my-7">{c("keymsg")}</KeyMessage>

          <h2 id="pratique" className="mt-9 mb-3.5 scroll-mt-[92px] font-display text-[1.9rem] font-medium">
            {t("h2practice")}
          </h2>
          <p className="max-w-[68ch]">{t("pPractice")}</p>

          <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
            <Button asChild className="rounded-[10px]">
              <Link href="/aprender">{t("next")}</Link>
            </Button>
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

        {/* RIGHT: on-this-page TOC */}
        <aside className="sticky top-[92px] hidden self-start xl:block">
          <p className={`mb-3 ${eyebrow}`}>{t("onThisPage")}</p>
          <nav className="flex flex-col border-l border-line">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={
                  (item.active
                    ? "-ml-px border-l-2 border-green text-green "
                    : "-ml-px border-l-2 border-transparent text-ink-soft hover:text-ink ") +
                  "py-1 text-[0.85rem] " +
                  (item.sub ? "pl-6" : "pl-3")
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}
