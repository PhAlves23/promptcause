import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "@/components/level-badge";
import { KeyMessage } from "@/components/key-message";
import { RightWrong } from "@/components/right-wrong";
import { PromptBlock, PromptVar, PromptKey, PromptComment } from "@/components/prompt-block";

export const metadata: Metadata = {
  title: "Aprender",
  description:
    "A anatomia de um bom prompt: papel, tarefa, contexto e formato. Aprenda do iniciante ao avançado, com exemplos certos e errados.",
};

const eyebrow = "font-mono text-[0.68rem] font-medium tracking-[0.14em] text-ink-faint uppercase";

const SIDEBAR: { level: string; items: { label: string; active?: boolean }[] }[] = [
  {
    level: "Iniciante",
    items: [
      { label: "O que é um prompt", active: true },
      { label: "Anatomia de um bom pedido" },
      { label: "Dar contexto" },
    ],
  },
  {
    level: "Intermediário",
    items: [
      { label: "Few-shot: ensinar com exemplos" },
      { label: "Formatos e restrições" },
      { label: "Personas e papéis" },
    ],
  },
  {
    level: "Avançado",
    items: [
      { label: "Chain-of-thought" },
      { label: "Uso de ferramentas" },
      { label: "Avaliação & guardrails" },
    ],
  },
];

// table of contents for the right rail ("Nesta página")
const TOC: { id: string; label: string; sub?: boolean; active?: boolean }[] = [
  { id: "receita", label: "A receita", active: true },
  { id: "contraste", label: "O contraste que muda tudo" },
  { id: "por-que", label: "Por que funciona", sub: true },
  { id: "pratique", label: "Pratique agora" },
];

export default function AprenderPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-7 pt-10 pb-20">
      <div className="grid gap-10 lg:grid-cols-[232px_minmax(0,1fr)] xl:grid-cols-[232px_minmax(0,1fr)_200px]">
        {/* LEFT: nav sidebar */}
        <aside className="sticky top-[92px] hidden self-start lg:block">
          <div className="mb-5 rounded-[10px] border border-line bg-paper-card px-3.5 py-3">
            <div className="text-[0.92rem] font-semibold">Guia PromptCause</div>
            <div className="font-mono text-[0.7rem] text-ink-faint">prompt engineering · v1.0</div>
          </div>
          <nav className="border-l border-line">
            {SIDEBAR.map((group) => (
              <div key={group.level}>
                <h5 className={`mt-[18px] mb-2 pl-3.5 ${eyebrow} first:mt-0`}>{group.level}</h5>
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href="#"
                    className={
                      item.active
                        ? "-ml-px block border-l-2 border-green bg-green-tint py-1.5 pl-3.5 text-[0.9rem] font-semibold text-green"
                        : "-ml-px block border-l-2 border-transparent py-1.5 pl-3.5 text-[0.9rem] text-ink-soft hover:border-line-strong hover:text-ink"
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* CENTER: lesson */}
        <article className="min-w-0">
          {/* breadcrumb */}
          <nav aria-label="Trilha" className="mb-5 flex flex-wrap items-center gap-2 text-[0.85rem] text-ink-soft">
            <Link href="/aprender" className="hover:text-ink">
              Aprender
            </Link>
            <span aria-hidden className="text-ink-faint">
              ›
            </span>
            <span className="text-ink-faint">Iniciante</span>
            <span aria-hidden className="text-ink-faint">
              ›
            </span>
            <span className="text-ink">A anatomia de um bom prompt</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <LevelBadge level={1} />
            <span className="rounded-[6px] border border-line px-[7px] py-[2px] font-mono text-[0.68rem] tracking-[0.1em] text-ink-faint uppercase">
              Lição 01 · 5 min
            </span>
          </div>

          <h1 className="mt-4 mb-2 font-display text-[clamp(2.2rem,4.5vw,3.2rem)] font-medium">
            A anatomia de um bom prompt
          </h1>
          <p className="mb-5 font-mono text-[0.78rem] text-ink-faint">Última atualização · junho de 2026</p>
          <p className="text-[1.2rem] leading-[1.55] text-ink-soft">
            Um prompt não é uma pergunta solta — é uma instrução. Quanto mais clara a instrução, melhor a
            resposta. Existe uma receita simples que funciona quase sempre.
          </p>

          <h2 id="receita" className="mt-9 mb-3.5 scroll-mt-[92px] font-display text-[1.9rem] font-medium">
            A receita: papel · tarefa · contexto · formato
          </h2>
          <p className="max-w-[68ch]">
            Pense em pedir algo a um colega muito capaz que acabou de chegar: ele faz exatamente o que você
            diz, mas não adivinha o que você quer. Diga <strong>quem ele é</strong>,{" "}
            <strong>o que fazer</strong>, <strong>com que material</strong> e{" "}
            <strong>em que formato</strong>.
          </p>

          <PromptBlock className="my-5">
            <PromptComment># papel</PromptComment>
            <br />
            Você é um <PromptVar>{"{redator de e-mails}"}</PromptVar> objetivo.
            <br />
            <PromptComment># tarefa + contexto</PromptComment>
            <br />
            Escreva um e-mail recusando educadamente o convite abaixo, alegando agenda.
            <br />
            <PromptComment># formato</PromptComment>
            <br />
            <PromptKey>Máximo 4 frases. Tom cordial. Sem emojis.</PromptKey>
          </PromptBlock>

          <h2 id="contraste" className="mt-9 mb-3.5 scroll-mt-[92px] font-display text-[1.9rem] font-medium">
            O contraste que muda tudo
          </h2>
          <p className="max-w-[68ch]">
            O mesmo pedido, vago e específico. A diferença não está no modelo — está em você.
          </p>

          <RightWrong
            className="my-6"
            good="Escreva um e-mail recusando o convite, em tom cordial, máximo 4 frases, citando agenda como motivo."
            bad="responde esse convite pra mim aí"
          />

          <h3 id="por-que" className="mt-7 mb-2.5 scroll-mt-[92px] font-display text-[1.3rem] font-medium">
            Por que funciona
          </h3>
          <p className="max-w-[68ch]">
            O pedido bom remove ambiguidade em três pontos: a <strong>ação</strong> (recusar), as{" "}
            <strong>restrições</strong> (tom, tamanho) e o <strong>motivo</strong> (agenda). O pedido ruim
            deixa o modelo adivinhar — e ele vai adivinhar errado com frequência.
          </p>

          <KeyMessage className="my-7">
            Grátis. Se te ajudou, 100% da doação vai para a causa.
          </KeyMessage>

          <h2 id="pratique" className="mt-9 mb-3.5 scroll-mt-[92px] font-display text-[1.9rem] font-medium">
            Pratique agora
          </h2>
          <p className="max-w-[68ch]">
            Pegue um pedido que você faria hoje à IA e reescreva-o usando a receita. Compare as duas
            respostas. A melhora costuma ser imediata.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
            <Button asChild className="rounded-[10px]">
              <Link href="#">Próxima lição: Dar contexto →</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-clay font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
            >
              <Link href="/doar">
                <span aria-hidden>♥</span> Doar
              </Link>
            </Button>
          </div>
        </article>

        {/* RIGHT: on-this-page TOC */}
        <aside className="sticky top-[92px] hidden self-start xl:block">
          <p className={`mb-3 ${eyebrow}`}>Nesta página</p>
          <nav className="flex flex-col border-l border-line">
            {TOC.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className={
                  (t.active
                    ? "-ml-px border-l-2 border-green text-green "
                    : "-ml-px border-l-2 border-transparent text-ink-soft hover:text-ink ") +
                  "py-1 text-[0.85rem] " +
                  (t.sub ? "pl-6" : "pl-3")
                }
              >
                {t.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}
