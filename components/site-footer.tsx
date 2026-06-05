import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BrandLogo } from "@/components/brand-logo";

export async function SiteFooter() {
  const t = await getTranslations("common");

  const cols: { title: string; links: [string, string][] }[] = [
    {
      title: t("footer.learn"),
      links: [
        ["/aprender", t("levels.1")],
        ["/aprender", t("levels.2")],
        ["/aprender", t("levels.3")],
      ],
    },
    {
      title: t("footer.cause"),
      links: [
        ["/causa#ledger", t("nav.transparency")],
        ["/causa#partners", t("footer.partners")],
        ["/doar", t("cta.donate")],
      ],
    },
    {
      title: t("footer.project"),
      links: [["/manifesto", t("nav.manifesto")]],
    },
  ];

  return (
    <footer className="bg-footer pt-[60px] pb-[38px] text-[#c9c2b3]">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="mb-3.5 inline-flex" aria-label="PromptCause">
              <BrandLogo variant="footer" />
            </Link>
            <p className="max-w-[34ch] text-[#a39b8b]">{t("footer.tagline")}</p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h5 className="mb-3.5 font-mono text-[0.7rem] font-medium tracking-[0.16em] text-[#8b8472] uppercase">
                {col.title}
              </h5>
              {col.links.map(([href, label], i) => (
                <Link
                  key={`${href}-${i}`}
                  href={href}
                  className="block py-[5px] text-[0.94rem] text-[#c9c2b3] transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-5 border-t border-[#38322a] pt-6 text-[0.85rem] text-[#8b8472]">
          <span>{t("footer.copyright")}</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
