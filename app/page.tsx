import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LevelBadge } from "@/components/level-badge";
import { KeyMessage } from "@/components/key-message";
import { ImpactCounter } from "@/components/impact-counter";
import { PromptBlock, PromptVar, PromptKey, PromptComment } from "@/components/prompt-block";
import { RightWrong } from "@/components/right-wrong";

const PATHS = [
  {
    level: 1 as const,
    title: "Nunca escrevi um prompt",
    desc: "O que é um prompt, por que a forma importa e como obter respostas úteis na primeira tentativa.",
  },
  {
    level: 2 as const,
    title: "Uso IA no trabalho",
    desc: "Estruture pedidos, dê contexto e exemplos, e construa fluxos confiáveis para o dia a dia.",
  },
  {
    level: 3 as const,
    title: "Quero engenharia avançada",
    desc: "Chain-of-thought, ferramentas, avaliação, segurança e padrões de produção.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-[88px] pb-14">
        <div className="mx-auto max-w-[1180px] px-7">
          <span className="inline-flex items-center gap-[7px] rounded-full border border-green-tint-2 bg-green-tint px-3 py-[5px] font-mono text-[0.74rem] font-medium text-green-deep">
            <span className="size-[7px] rounded-full bg-green-bright" /> 100% grátis · sem paywall · sem anúncios
          </span>
          <p className="mt-6 font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
            A referência aberta de prompt engineering
          </p>
          <h1 className="mt-3.5 max-w-[15ch] font-display text-[clamp(2.8rem,6.5vw,5rem)] leading-[1.04] font-medium tracking-[-0.018em]">
            Aprenda a conversar com a IA.{" "}
            <span className="text-green">De graça, para sempre.</span>
            <span className="pc-caret text-green">_</span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-[1.2rem] leading-[1.55] text-ink-soft">
            Do primeiro prompt à engenharia avançada — um guia sério, claro e gratuito. Se ele te ajudar,
            cada doação vai integralmente para ONGs que levam tecnologia a quem não tem acesso. O dinheiro
            nunca passa por nós.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-[10px] px-6 text-base">
              <Link href="/aprender">Começar de graça →</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-[10px] px-6 text-base">
              <Link href="/causa">Conhecer a causa</Link>
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
                Total doado à causa — repassado integralmente
              </div>
              <ImpactCounter
                target={248730}
                className="my-2 block font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-none font-medium tracking-[-0.02em] text-white"
              />
              <div className="text-[0.96rem] text-[#b9cfc0]">
                <span className="font-semibold text-white">100% repassado.</span> Atualizado em tempo real.
                Cada centavo vai para ONGs parceiras de inclusão digital.
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-clay px-6 text-base font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
              >
                <Link href="/doar">
                  <span aria-hidden>♥</span> Doar
                </Link>
              </Button>
              <Link
                href="/causa#ledger"
                className="border-b border-white/25 pb-px text-[0.92rem] text-[#cde0d3] hover:text-white"
              >
                Ver para onde vai
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* PATHS */}
      <section className="py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className="font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
            Escolha por onde começar
          </p>
          <h2 className="mt-2 max-w-[18ch] font-display text-[2.4rem] font-medium">
            O mesmo site, três profundidades. Avance no seu ritmo.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {PATHS.map((p) => (
              <Card
                key={p.level}
                className="group gap-0 rounded-[16px] border-line bg-paper-card p-[26px] transition-all hover:-translate-y-[3px] hover:border-line-strong hover:shadow-[0_4px_16px_-6px_rgba(32,28,21,0.14)]"
              >
                <LevelBadge level={p.level} />
                <h3 className="mt-[18px] mb-2 font-display text-[1.5rem] font-medium">{p.title}</h3>
                <p className="text-[0.96rem] text-ink-soft">{p.desc}</p>
                <Link
                  href="/aprender"
                  className="mt-4 text-[0.92rem] font-semibold text-green group-hover:underline"
                >
                  Entrar →
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
              <p className="font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
                Como ensinamos
              </p>
              <h2 className="mt-2 mb-3.5 max-w-[16ch] font-display text-[2.2rem] font-medium">
                Toda técnica vem com o jeito certo e o errado.
              </h2>
              <p className="max-w-[46ch] text-ink-soft">
                Sem teoria vazia. Você vê o prompt, o porquê, e o contraste lado a lado.
              </p>
              <KeyMessage className="mt-[22px] max-w-[52ch]">
                Grátis. Se te ajudou, 100% da doação vai para a causa.
              </KeyMessage>
            </div>
            <div>
              <PromptBlock className="mb-4">
                <PromptComment># papel · tarefa · formato</PromptComment>
                <br />
                Você é um <PromptVar>{"{revisor}"}</PromptVar>. Reescreva em <PromptKey>tom formal</PromptKey>,
                no máximo <PromptKey>3 frases</PromptKey>, mantendo os números.
              </PromptBlock>
              <RightWrong
                good="Reescreva em tom formal, máx. 3 frases, mantendo os números."
                bad="deixa isso mais bonito"
              />
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* WHY FREE */}
      <section className="py-[88px]">
        <div className="mx-auto max-w-[760px] px-7 text-center">
          <p className="font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
            Por que de graça?
          </p>
          <p className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.18] font-medium tracking-[-0.015em]">
            IA é a nova alfabetização. E alfabetização não se vende.
          </p>
          <p className="mx-auto mt-5 max-w-[54ch] text-[1.2rem] leading-[1.55] text-ink-soft">
            Saber usar IA virou alfabetização. E alfabetização não se vende. Cobrar por isso só aprofunda a
            desigualdade que a gente quer combater. Por isso o conhecimento fica aberto e quem puder retribuir
            financia inclusão digital para quem ainda nem chegou à internet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-[10px] px-6 text-base">
              <Link href="/aprender">Começar a aprender →</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-clay px-6 text-base font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep"
            >
              <Link href="/doar">
                <span aria-hidden>♥</span> Doar
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
