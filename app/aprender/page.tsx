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

const SIDEBAR: { level: string; active?: boolean; items: { label: string; active?: boolean }[] }[] = [
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

export default function AprenderPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-7 pt-10 pb-20">
      <div className="grid items-start gap-12 lg:grid-cols-[248px_1fr]">
        {/* SIDEBAR */}
        <aside className="sticky top-[92px] hidden lg:block">
          {SIDEBAR.map((group) => (
            <div key={group.level}>
              <h5 className="mt-[22px] mb-2 font-mono text-[0.68rem] tracking-[0.14em] text-ink-faint uppercase first:mt-0">
                {group.level}
              </h5>
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href="#"
                  className={
                    item.active
                      ? "block border-l-2 border-green bg-green-tint px-3 py-1.5 text-[0.92rem] font-semibold text-green"
                      : "block border-l-2 border-transparent px-3 py-1.5 text-[0.92rem] text-ink-soft hover:bg-paper-sunk hover:text-ink"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </aside>

        {/* LESSON */}
        <article>
          <div className="flex flex-wrap items-center gap-3">
            <LevelBadge level={1} />
            <span className="rounded-[6px] border border-line px-[7px] py-[2px] font-mono text-[0.68rem] tracking-[0.1em] text-ink-faint uppercase">
              Lição 01 · 5 min
            </span>
          </div>

          <h1 className="mt-[18px] mb-3 font-display text-[clamp(2rem,4.5vw,3rem)] font-medium">
            A anatomia de um bom prompt
          </h1>
          <p className="text-[1.2rem] leading-[1.55] text-ink-soft">
            Um prompt não é uma pergunta solta — é uma instrução. Quanto mais clara a instrução, melhor a
            resposta. Existe uma receita simples que funciona quase sempre.
          </p>

          <h2 className="mt-9 mb-3.5 font-display text-[1.9rem] font-medium">
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

          <h2 className="mt-9 mb-3.5 font-display text-[1.9rem] font-medium">
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

          <h3 className="mt-7 mb-2.5 font-display text-[1.3rem] font-medium">Por que funciona</h3>
          <p className="max-w-[68ch]">
            O pedido bom remove ambiguidade em três pontos: a <strong>ação</strong> (recusar), as{" "}
            <strong>restrições</strong> (tom, tamanho) e o <strong>motivo</strong> (agenda). O pedido ruim
            deixa o modelo adivinhar — e ele vai adivinhar errado com frequência.
          </p>

          <KeyMessage className="my-7">
            Grátis. Se te ajudou, 100% da doação vai para a causa.
          </KeyMessage>

          <h2 className="mt-9 mb-3.5 font-display text-[1.9rem] font-medium">Pratique agora</h2>
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
      </div>
    </div>
  );
}
