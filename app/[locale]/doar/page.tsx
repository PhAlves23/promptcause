import { getTranslations, setRequestLocale } from "next-intl/server";
import { KeyMessage } from "@/components/key-message";
import { ImpactCounter } from "@/components/impact-counter";
import { DonateWidget } from "@/components/donate-widget";
import { getActiveOngs, getImpactTotalReais, donationHref } from "@/lib/donations";

// Lê o total doado e as ONGs do banco a cada requisição.
export const dynamic = "force-dynamic";

export default async function DoarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("doar");
  const c = await getTranslations("common");
  const h = await getTranslations("home");
  const [totalReais, ongs] = await Promise.all([getImpactTotalReais(), getActiveOngs()]);

  return (
    <section className="py-[88px]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-14 px-7 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3.5 mb-4 max-w-[14ch] font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-medium">
            {t("h1")}
          </h1>
          <p className="text-[1.2rem] leading-[1.55] text-ink-soft">{t("lede")}</p>

          <div className="my-7 rounded-[16px] bg-green-deep px-9 py-7 text-[#eaf1ec]">
            <div className="font-mono text-[0.72rem] tracking-[0.16em] text-[#9dbca9] uppercase">
              {h("impactLabel")}
            </div>
            <ImpactCounter
              target={totalReais}
              className="my-2 block font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none font-medium tracking-[-0.02em] text-white"
            />
            <div className="text-[0.96rem] text-[#b9cfc0]">
              <span className="font-semibold text-white">{h("impactPassed")}</span>
            </div>
          </div>

          <KeyMessage>{c("keymsg")}</KeyMessage>
        </div>

        <DonateWidget
          ongs={ongs.map((o) => ({
            slug: o.slug,
            nome: o.nome,
            donationType: o.donationType,
            href: o.linkDoacao ? donationHref(o.linkDoacao) : null,
            pixKey: o.pixKey,
            pixKeyType: o.pixKeyType,
            descricao: o.descricao,
            logoUrl: o.logoUrl,
            regiaoUf: o.regiaoUf,
            site: o.site,
          }))}
        />
      </div>
    </section>
  );
}
