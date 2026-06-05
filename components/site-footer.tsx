import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Aprender",
    links: [
      ["/aprender", "Iniciante"],
      ["/aprender", "Intermediário"],
      ["/aprender", "Avançado"],
    ],
  },
  {
    title: "A Causa",
    links: [
      ["/causa#ledger", "Transparência"],
      ["/causa#partners", "ONGs parceiras"],
      ["/doar", "Doar"],
    ],
  },
  {
    title: "Projeto",
    links: [
      ["/manifesto", "Manifesto"],
      ["/marca", "Marca"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-footer pt-[60px] pb-[38px] text-[#c9c2b3]">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="mb-3.5 inline-flex" aria-label="PromptCause — início">
              <BrandLogo variant="footer" />
            </Link>
            <p className="max-w-[34ch] text-[#a39b8b]">
              Conhecimento de IA aberto a todos. Doações 100% repassadas à inclusão digital.
            </p>
          </div>

          {COLS.map((col) => (
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
          <span>© 2026 PromptCause</span>
          <span>Conteúdo aberto. Use, traduza, compartilhe.</span>
        </div>
      </div>
    </footer>
  );
}
