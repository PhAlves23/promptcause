import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { KeyMessage } from "@/components/key-message";

const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

export default async function ManifestoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("manifesto");
  const c = await getTranslations("common");

  const principles: { n: string; title: string; body: React.ReactNode }[] = [
    { n: "01", title: t("pr1title"), body: t("pr1body") },
    {
      n: "02",
      title: t("pr2title"),
      body: (
        <>
          {t("pr2body")}{" "}
          <Link href="/causa#ledger" className="text-green hover:underline">
            {t("pr2link")}
          </Link>
        </>
      ),
    },
    { n: "03", title: t("pr3title"), body: t("pr3body") },
    { n: "04", title: t("pr4title"), body: t("pr4body") },
  ];

  return (
    <>
      <section className="pt-[88px] pb-10">
        <div className="mx-auto max-w-[760px] px-7">
          <p className={eyebrow}>{t("eyebrow")}</p>
          <h1 className="mt-4 font-display text-[clamp(2.3rem,5.2vw,4rem)] leading-[1.1] font-medium tracking-[-0.015em]">
            {t("h1")}
          </h1>
          <p className="mt-[22px] text-[1.2rem] leading-[1.55] text-ink-soft">{t("lede")}</p>
        </div>
      </section>

      <Separator className="bg-line" />

      <section className="py-[88px]">
        <div className="mx-auto max-w-[760px] px-7">
          <p className={eyebrow}>{t("storyEyebrow")}</p>
          <h2 className="mt-2 mb-4 font-display text-[2rem] font-medium">{t("storyTitle")}</h2>
          <div className="space-y-4 text-ink">
            <p>{t("story1")}</p>
            <p>{t("story2")}</p>
            <p>{t("story3")}</p>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      <section className="bg-paper-sunk py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>{t("believeEyebrow")}</p>
          <h2 className="mt-2 mb-8 font-display text-[2.2rem] font-medium">{t("believeTitle")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {principles.map((p) => (
              <Card key={p.n} className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
                <div className="mb-2.5 font-mono text-[0.9rem] text-green">{p.n}</div>
                <h3 className="mb-2 font-display text-[1.4rem] font-medium">{p.title}</h3>
                <p className="text-ink-soft">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      <section className="py-[88px]">
        <div className="mx-auto max-w-[760px] px-7 text-center">
          <p className={eyebrow}>{t("promiseEyebrow")}</p>
          <p className="mt-3.5 mb-6 font-display text-[clamp(1.7rem,3.6vw,2.4rem)] leading-[1.3] font-medium">
            {t("promiseQuote")}
          </p>
          <KeyMessage className="inline-flex text-left">{t("promiseBody")}</KeyMessage>
        </div>
      </section>

      <Separator className="bg-line" />

      <section className="bg-paper-sunk py-[88px]">
        <div className="mx-auto max-w-[760px] px-7 text-center">
          <h2 className="mb-4 font-display text-[2.2rem] font-medium">{t("closingTitle")}</h2>
          <p className="mx-auto mb-7 max-w-[46ch] text-ink-soft">{t("closingBody")}</p>
          <div className="flex flex-wrap justify-center gap-3">
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
