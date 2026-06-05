import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="py-[120px]">
      <div className="mx-auto max-w-[640px] px-7 text-center">
        <p className="font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,3.6rem)] font-medium">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-[44ch] text-[1.1rem] leading-[1.55] text-ink-soft">{t("body")}</p>
        <div className="mt-8">
          <Button asChild size="lg" className="h-12 rounded-[10px] px-6 text-base">
            <Link href="/">{t("back")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
