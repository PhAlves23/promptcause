import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BrandLogo } from "@/components/brand-logo";
import { LevelBadge } from "@/components/level-badge";
import { KeyMessage } from "@/components/key-message";
import { RightWrong } from "@/components/right-wrong";
import { ImpactCounter } from "@/components/impact-counter";
import { PromptBlock, PromptVar, PromptKey, PromptComment } from "@/components/prompt-block";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Marca",
  description:
    "A identidade da PromptCause: logotipo, cores, tipografia, componentes e voz. A fonte da verdade visual.",
};

const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

const ESSENCE = [
  { k: "Propósito", v: "Tornar o domínio da IA acessível a qualquer pessoa — e transformar gratidão em inclusão digital." },
  { k: "Personalidade", v: "Professora paciente, não guru. Clara, generosa, honesta sobre dinheiro. Autoridade sem arrogância." },
  { k: "Promessa", v: "Grátis de verdade. Se te ajudou, 100% da doação vai para a causa. O dinheiro nunca passa por nós." },
];

const COLOR_GROUPS: { title: string; swatches: { nm: string; hex: string; cls: string }[] }[] = [
  {
    title: "Marca",
    swatches: [
      { nm: "Verde-floresta", hex: "#16684A · primary", cls: "bg-green" },
      { nm: "Verde profundo", hex: "#0E4A35", cls: "bg-green-deep" },
      { nm: "Verde claro", hex: "#1E8A63", cls: "bg-green-bright" },
      { nm: "Clay (causa)", hex: "#C25B36 · accent", cls: "bg-clay" },
    ],
  },
  {
    title: "Tinta & papel",
    swatches: [
      { nm: "Tinta", hex: "#201C15", cls: "bg-ink" },
      { nm: "Tinta suave", hex: "#6B6356", cls: "bg-ink-soft" },
      { nm: "Papel", hex: "#F7F4EC · bg", cls: "bg-paper ring-1 ring-inset ring-line" },
      { nm: "Papel cartão", hex: "#FFFDF7", cls: "bg-paper-card ring-1 ring-inset ring-line" },
    ],
  },
  {
    title: "Semântica · certo / errado",
    swatches: [
      { nm: "Certo · fundo", hex: "#E7F0EA", cls: "bg-green-tint" },
      { nm: "Errado", hex: "#B23A2E", cls: "bg-wrong" },
      { nm: "Errado · fundo", hex: "#F6E3DE", cls: "bg-wrong-tint" },
      { nm: "Clay · fundo", hex: "#F7E8DF", cls: "bg-clay-tint" },
    ],
  },
];

const SCALE: { tag: string; node: React.ReactNode }[] = [
  { tag: "Display", node: <span className="font-display text-[3rem] font-medium">Aprenda a conversar</span> },
  { tag: "H2", node: <span className="font-display text-[2rem] font-medium">Como ensinamos</span> },
  { tag: "Lede", node: <span className="text-[1.2rem] text-ink-soft">Do primeiro prompt à engenharia avançada.</span> },
  { tag: "Corpo", node: <span>Texto base em 17px, entrelinha generosa para leitura longa.</span> },
  { tag: "Eyebrow", node: <span className={eyebrow}>Como ensinamos</span> },
];

/** Brand mark for the brand-guide variations. */
function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-[30px] place-items-center rounded-lg bg-green font-mono text-[18px] font-semibold text-white",
        className,
      )}
    >
      ›
      <i className="absolute -top-1.5 -right-[7px] grid size-[15px] place-items-center rounded-full bg-paper text-[9px] leading-none text-clay not-italic shadow-[0_0_0_1px_var(--line)]">
        ♥
      </i>
    </span>
  );
}

export default function MarcaPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-[88px] pb-12">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>Brand Guide · v1.0 · 2026</p>
          <h1 className="mt-3.5 mb-4 max-w-[16ch] font-display text-[clamp(2.6rem,6vw,4.6rem)] font-medium">
            A identidade da PromptCause.
          </h1>
          <p className="max-w-[60ch] text-[1.2rem] leading-[1.55] text-ink-soft">
            Uma publicação séria sobre IA com a alma de uma causa. Editorial e confiável como uma boa
            documentação; humana e calorosa como o motivo de ela existir. Este guia é a fonte da verdade
            visual.
          </p>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* ESSENCE */}
      <section className="py-14">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-7 md:grid-cols-3">
          {ESSENCE.map((e) => (
            <div key={e.k}>
              <p className={eyebrow}>{e.k}</p>
              <p className="mt-2.5 font-display text-[1.25rem] leading-[1.4]">{e.v}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-line" />

      {/* LOGO */}
      <section className="py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>01 — Logotipo</p>
          <h2 className="mt-2 mb-7 font-display text-[2.2rem] font-medium">O símbolo: o prompt que vira causa.</h2>

          <div className="grid items-stretch gap-6 md:grid-cols-2">
            <Card className="grid place-items-center rounded-[16px] border-line bg-paper-card p-14">
              <BrandLogo className="scale-[1.4]" />
            </Card>
            <Card className="content-center gap-3.5 rounded-[16px] border-line bg-paper-card p-[26px] text-ink-soft">
              <p>
                O <strong className="text-ink">caret ›</strong> é o símbolo universal do prompt — onde a
                conversa começa. Em verde, dentro de um quadrado de cantos suaves, ele carrega a ideia de
                início, foco e crescimento.
              </p>
              <p>
                No canto, um pequeno <strong className="text-clay">coração ♥</strong> em clay: o prompt que
                existe por uma causa. É o elo entre o que ensinamos e por que ensinamos.
              </p>
              <p>
                <strong className="text-ink">&quot;Prompt&quot;</strong> em tinta,{" "}
                <strong className="text-green">&quot;Cause&quot;</strong> em verde: a leitura é literal — o
                prompt existe por uma causa.
              </p>
            </Card>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {/* dark bg */}
            <Card className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px] text-center">
              <div className="mb-3 grid place-items-center rounded-[10px] bg-ink p-8">
                <BrandLogo variant="footer" />
              </div>
              <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-faint uppercase">Sobre fundo escuro</span>
            </Card>
            {/* brand-color bg */}
            <Card className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px] text-center">
              <div className="mb-3 grid place-items-center rounded-[10px] bg-green-deep p-8">
                <span className="inline-flex items-center gap-2.5">
                  <span className="relative grid size-[30px] place-items-center rounded-lg bg-white font-mono text-[18px] font-semibold text-green-deep">
                    ›
                    <i className="absolute -top-1.5 -right-[7px] grid size-[15px] place-items-center rounded-full bg-paper text-[9px] leading-none text-clay not-italic">
                      ♥
                    </i>
                  </span>
                  <span className="font-display text-[1.32rem] font-semibold tracking-tight text-white">
                    Prompt<b className="font-semibold text-white">Cause</b>
                  </span>
                </span>
              </div>
              <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-faint uppercase">Sobre a cor-marca</span>
            </Card>
            {/* isolated mark */}
            <Card className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px] text-center">
              <div className="mb-3 grid place-items-center rounded-[10px] bg-paper-sunk p-8">
                <Mark className="size-[46px] rounded-[12px] text-[27px]" />
              </div>
              <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-faint uppercase">
                Mark isolado · app/favicon
              </span>
            </Card>
          </div>

          <div className="mt-6 flex items-center gap-3.5 rounded-[10px] border border-[#ebcfc9] bg-wrong-tint px-[18px] py-3.5 font-medium text-wrong">
            <span aria-hidden className="text-[1.3rem] leading-none">
              ✕
            </span>
            <span>
              Não incline, não troque por roxo-gradiente, não adicione robôs ou ícones de IA, não estique a
              fonte. O mark sempre quadrado, o caret sempre apontando para a direita.
            </span>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* COLOR */}
      <section className="bg-paper-sunk py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>02 — Cor</p>
          <h2 className="mt-2 mb-2.5 font-display text-[2.2rem] font-medium">Verde aprende. Clay dá.</h2>
          <p className="mb-7 max-w-[62ch] text-[1.2rem] leading-[1.55] text-ink-soft">
            Fundo de papel quente em vez de branco-tech. Verde-floresta como cor-marca (conhecimento,
            crescimento, inclusão). Um terracota quente reservado <em>apenas</em> à causa e à doação — o calor
            humano do projeto.
          </p>
          {COLOR_GROUPS.map((group) => (
            <div key={group.title} className="mb-7 last:mb-0">
              <p className={cn(eyebrow, "mb-2.5")}>{group.title}</p>
              <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]">
                {group.swatches.map((s) => (
                  <div key={s.nm} className="overflow-hidden rounded-[10px] border border-line bg-paper-card">
                    <div className={cn("h-[84px]", s.cls)} />
                    <div className="px-3 py-2.5">
                      <div className="text-[0.9rem] font-semibold">{s.nm}</div>
                      <div className="font-mono text-[0.76rem] text-ink-faint uppercase">{s.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-line" />

      {/* TYPE */}
      <section className="py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>03 — Tipografia</p>
          <h2 className="mt-2 mb-7 font-display text-[2.2rem] font-medium">Três vozes, um tom.</h2>
          <div className="grid gap-5 md:grid-cols-3">
            <Card className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
              <div className="mb-2 font-display text-[3.4rem] leading-none">Ag</div>
              <div className="font-semibold">Newsreader</div>
              <p className="mt-1.5 text-[0.9rem] text-ink-soft">
                Títulos &amp; editorial. Serifa literária — autoridade calorosa.{" "}
                <span className="font-display italic">Itálico para nuance.</span>
              </p>
            </Card>
            <Card className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
              <div className="mb-2 font-sans text-[3.4rem] leading-none font-semibold">Ag</div>
              <div className="font-semibold">IBM Plex Sans</div>
              <p className="mt-1.5 text-[0.9rem] text-ink-soft">
                Texto, UI e navegação. Humanista e técnica — legível e confiável em qualquer tamanho.
              </p>
            </Card>
            <Card className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
              <div className="mb-2 font-mono text-[3.4rem] leading-none font-medium">Ag</div>
              <div className="font-semibold">IBM Plex Mono</div>
              <p className="mt-1.5 text-[0.9rem] text-ink-soft">
                Prompts, código, números e labels. O &quot;material bruto&quot; da IA, sempre em mono.
              </p>
            </Card>
          </div>

          <Card className="mt-5 gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
            <p className={eyebrow}>Escala</p>
            <div className="mt-3.5 grid gap-3.5">
              {SCALE.map((row) => (
                <div
                  key={row.tag}
                  className="flex items-baseline gap-[18px] border-b border-line pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="w-[90px] shrink-0 font-mono text-[0.75rem] text-ink-faint">{row.tag}</span>
                  {row.node}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* COMPONENTS */}
      <section className="bg-paper-sunk py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>04 — Componentes</p>
          <h2 className="mt-2 mb-7 font-display text-[2.2rem] font-medium">As peças do sistema.</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
              <p className={cn(eyebrow, "mb-3.5")}>Botões</p>
              <div className="flex flex-wrap items-center gap-2.5">
                <Button className="rounded-[10px]">Começar a aprender</Button>
                <Button className="rounded-full bg-clay font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep">
                  <span aria-hidden>♥</span> Doar
                </Button>
                <Button variant="outline">Saiba mais</Button>
              </div>
              <p className="mt-4 text-[0.88rem] text-ink-soft">
                Verde = aprender/agir. Clay arredondado = doar (sempre visível). Ghost = secundário.
              </p>
            </Card>

            <Card className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
              <p className={cn(eyebrow, "mb-3.5")}>Badges de nível</p>
              <div className="flex flex-wrap gap-2.5">
                <LevelBadge level={1} />
                <LevelBadge level={2} />
                <LevelBadge level={3} />
              </div>
              <p className="mt-4 text-[0.88rem] text-ink-soft">
                As barras crescem com o nível. Guiam todo o conteúdo.
              </p>
            </Card>

            <Card className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
              <p className={cn(eyebrow, "mb-3.5")}>Bloco de prompt</p>
              <PromptBlock>
                <PromptComment># papel + tarefa + formato</PromptComment>
                <br />
                Você é um <PromptVar>{"{revisor de texto}"}</PromptVar>. Reescreva o parágrafo abaixo em{" "}
                <PromptKey>tom formal</PromptKey>, máximo <PromptKey>3 frases</PromptKey>.
              </PromptBlock>
            </Card>

            <Card className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
              <p className={cn(eyebrow, "mb-3.5")}>Mensagem-chave</p>
              <KeyMessage>Grátis. Se te ajudou, 100% da doação vai para a causa.</KeyMessage>
              <p className="mt-4 text-[0.88rem] text-ink-soft">Repetida em pontos-chave. Sempre em clay.</p>
            </Card>
          </div>

          <Card className="mt-5 gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
            <p className={cn(eyebrow, "mb-3.5")}>Caixas certo / errado</p>
            <RightWrong
              good="Resuma este artigo em 3 bullets, foco em decisões de produto, para um gerente sem tempo."
              bad="resume isso aí pra mim"
            />
          </Card>

          <div className="mt-5 rounded-[16px] bg-green-deep px-10 py-[38px] text-[#eaf1ec]">
            <div className="font-mono text-[0.72rem] tracking-[0.16em] text-[#9dbca9] uppercase">
              Total doado à causa — repassado integralmente
            </div>
            <ImpactCounter
              target={248730}
              className="my-2 block font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-none font-medium tracking-[-0.02em] text-white"
            />
            <div className="text-[0.96rem] text-[#b9cfc0]">
              <span className="font-semibold text-white">100% repassado.</span> Atualizado em tempo real. Cada
              centavo vai para ONGs parceiras de inclusão digital.
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* VOICE */}
      <section className="py-[88px]">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-7 md:grid-cols-2">
          <div>
            <p className={eyebrow}>05 — Voz &amp; tom</p>
            <h2 className="mt-2 mb-4 font-display text-[2.2rem] font-medium">Como falamos.</h2>
            <p className="text-ink-soft">
              Direto e generoso. Explicamos sem condescendência e sem jargão gratuito. Quando falamos de
              dinheiro, somos radicalmente transparentes. Nunca prometemos atalhos mágicos.
            </p>
          </div>
          <RightWrong
            goodLabel="Dizemos"
            badLabel="Não dizemos"
            good='"Vamos do zero. Em 5 minutos você escreve um prompt que funciona."'
            bad='"Domine a IA e 10x sua produtividade com este hack secreto!"'
          />
        </div>
      </section>
    </>
  );
}
