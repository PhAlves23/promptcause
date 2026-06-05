import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { KeyMessage } from "@/components/key-message";
import { ImpactCounter } from "@/components/impact-counter";
import { cn } from "@/lib/utils";

const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

export default async function CausaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("causa");
  const c = await getTranslations("common");
  const h = await getTranslations("home");

  const flow = [
    { n: "01", icon: "♥", title: t("s1title"), desc: t("s1desc"), highlight: false },
    { n: "02", icon: "→", title: t("s2title"), desc: t("s2desc"), highlight: true },
    { n: "03", icon: "✓", title: t("s3title"), desc: t("s3desc"), highlight: false },
  ];
  const ledger: { label: string; amount: string; dir: "in" | "out" }[] = [
    { label: t("rowOut1"), amount: "− R$ 12.400", dir: "out" },
    { label: t("rowIn1"), amount: "+ R$ 12.400", dir: "in" },
    { label: t("rowOut2"), amount: "− R$ 8.900", dir: "out" },
    { label: t("rowIn2"), amount: "+ R$ 8.900", dir: "in" },
    { label: t("rowOut3"), amount: "− R$ 15.200", dir: "out" },
    { label: t("rowIn3"), amount: "+ R$ 15.200", dir: "in" },
  ];
  const partners = [
    { name: t("p1name"), desc: t("p1desc") },
    { name: t("p2name"), desc: t("p2desc") },
    { name: t("p3name"), desc: t("p3desc") },
  ];

  return (
    <>
      <section className="pt-[88px] pb-10">
        <div className="mx-auto max-w-[760px] px-7">
          <p className={eyebrow}>{t("eyebrow")}</p>
          <h1 className="mt-3.5 mb-4 max-w-[14ch] font-display text-[clamp(2.4rem,5.5vw,4rem)] font-medium">
            {t("h1")}
          </h1>
          <p className="text-[1.2rem] leading-[1.55] text-ink-soft">{t("lede")}</p>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="rounded-[16px] bg-green-deep px-10 py-[38px] text-center text-[#eaf1ec]">
            <div className="font-mono text-[0.72rem] tracking-[0.16em] text-[#9dbca9] uppercase">
              {h("impactLabel")}
            </div>
            <ImpactCounter
              target={248730}
              className="my-2 block font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-none font-medium tracking-[-0.02em] text-white"
            />
            <div className="text-[0.96rem] text-[#b9cfc0]">
              <span className="font-semibold text-white">{h("impactPassed")}</span> {h("impactSub")}
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      <section className="py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>{t("flowEyebrow")}</p>
          <h2 className="mt-2 mb-8 max-w-[20ch] font-display text-[2.2rem] font-medium">{t("flowTitle")}</h2>
          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {flow.map((step, i) => (
              <div key={step.n} className="contents">
                <Card
                  className={cn(
                    "gap-0 rounded-[16px] p-[26px] text-center",
                    step.highlight ? "border-green-tint-2 bg-green-tint" : "border-line bg-paper-card",
                  )}
                >
                  <div className={cn("font-mono text-[0.8rem]", step.highlight ? "text-green" : "text-ink-faint")}>
                    {step.n}
                  </div>
                  <div className="my-1.5 text-[2rem] leading-none">{step.icon}</div>
                  <h3 className="mb-1.5 font-display text-[1.25rem] font-medium">{step.title}</h3>
                  <p className="text-[0.9rem] text-ink-soft">{step.desc}</p>
                </Card>
                {i < flow.length - 1 && (
                  <div aria-hidden className="hidden text-center text-[1.6rem] text-green md:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
          <KeyMessage className="mt-7">{c("keymsg")}</KeyMessage>
        </div>
      </section>

      <Separator className="bg-line" />

      <section id="ledger" className="scroll-mt-[88px] bg-paper-sunk py-[88px]">
        <div className="mx-auto max-w-[760px] px-7">
          <p className={eyebrow}>{t("ledgerEyebrow")}</p>
          <h2 className="mt-2 mb-1.5 font-display text-[2.2rem] font-medium">{t("ledgerTitle")}</h2>
          <p className="mb-6 text-ink-soft">{t("ledgerSub")}</p>
          <Card className="gap-0 rounded-[16px] border-line bg-paper-card px-6 py-2">
            {ledger.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3.5 border-b border-line py-[13px] text-[0.94rem] last:border-b-0"
              >
                <span>{row.label}</span>
                <span className={cn("font-mono font-medium", row.dir === "out" ? "text-green" : "text-ink-soft")}>
                  {row.amount}
                </span>
              </div>
            ))}
          </Card>
          <div className="mt-[18px] flex items-center justify-between rounded-[10px] border border-green-tint-2 bg-green-tint px-6 py-4">
            <span className="font-semibold text-green-deep">{t("retained")}</span>
            <span className="font-mono font-semibold text-green-deep">R$ 0,00</span>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      <section id="partners" className="scroll-mt-[88px] py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>{t("partnersEyebrow")}</p>
          <h2 className="mt-2 mb-7 max-w-[22ch] font-display text-[2.2rem] font-medium">{t("partnersTitle")}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {partners.map((p) => (
              <Card key={p.name} className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
                <div
                  className="mb-3.5 grid aspect-video place-items-center rounded-[6px]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, var(--paper-sunk), var(--paper-sunk) 9px, var(--line) 9px, var(--line) 10px)",
                  }}
                >
                  <span className="font-mono text-[0.72rem] text-ink-faint">{t("ngoLogo")}</span>
                </div>
                <h3 className="mb-1.5 font-display text-[1.25rem] font-medium">{p.name}</h3>
                <p className="text-[0.92rem] text-ink-soft">{p.desc}</p>
              </Card>
            ))}
          </div>
          <div className="mt-9 text-center">
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
