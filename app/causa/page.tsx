import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { KeyMessage } from "@/components/key-message";
import { ImpactCounter } from "@/components/impact-counter";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "A Causa",
  description:
    "O dinheiro nunca passa por nós. Toda doação vai direto para ONGs de inclusão digital — com razão público, linha por linha.",
};

const FLOW = [
  { n: "01", icon: "♥", title: "Você doa", desc: "Via PIX ou cartão, direto no checkout da ONG parceira.", highlight: false },
  { n: "02", icon: "→", title: "Vai direto à ONG", desc: "A conta de destino é da instituição, não nossa. Não passamos a mão no valor.", highlight: true },
  { n: "03", icon: "✓", title: "Comprovante público", desc: "Cada repasse aparece no razão aberto abaixo, com data e destino.", highlight: false },
];

const LEDGER: { label: string; amount: string; dir: "in" | "out" }[] = [
  { label: "Repasse → Instituto Conectar (SP)", amount: "− R$ 12.400", dir: "out" },
  { label: "Doações PIX · maio/26", amount: "+ R$ 12.400", dir: "in" },
  { label: "Repasse → Rede Digital Norte (PA)", amount: "− R$ 8.900", dir: "out" },
  { label: "Doações cartão · maio/26", amount: "+ R$ 8.900", dir: "in" },
  { label: "Repasse → AlfaTech Comunidade (BA)", amount: "− R$ 15.200", dir: "out" },
  { label: "Doações PIX · abril/26", amount: "+ R$ 15.200", dir: "in" },
];

const PARTNERS = [
  { name: "Instituto Conectar", desc: "Laboratórios de IA em escolas públicas da periferia de São Paulo." },
  { name: "Rede Digital Norte", desc: "Internet e equipamentos para comunidades ribeirinhas do Pará." },
  { name: "AlfaTech Comunidade", desc: "Formação em IA para jovens e adultos no interior da Bahia." },
];

const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

export default function CausaPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-[88px] pb-10">
        <div className="mx-auto max-w-[760px] px-7">
          <p className={eyebrow}>Transparência radical</p>
          <h1 className="mt-3.5 mb-4 max-w-[14ch] font-display text-[clamp(2.4rem,5.5vw,4rem)] font-medium">
            O dinheiro nunca passa por nós.
          </h1>
          <p className="text-[1.2rem] leading-[1.55] text-ink-soft">
            Toda doação vai direto para a conta das ONGs parceiras. Nós não tocamos, não retemos taxa, não
            pagamos salário com isso. Aqui está a prova, linha por linha.
          </p>
        </div>
      </section>

      {/* IMPACT */}
      <section className="pb-12">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="rounded-[16px] bg-green-deep px-10 py-[38px] text-center text-[#eaf1ec]">
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

      {/* FLOW */}
      <section className="py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>Como o dinheiro flui</p>
          <h2 className="mt-2 mb-8 max-w-[20ch] font-display text-[2.2rem] font-medium">
            Três passos. Zero retenção no meio.
          </h2>
          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {FLOW.map((step, i) => (
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
                {i < FLOW.length - 1 && (
                  <div aria-hidden className="hidden text-center text-[1.6rem] text-green md:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
          <KeyMessage className="mt-7">Grátis. Se te ajudou, 100% da doação vai para a causa.</KeyMessage>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* LEDGER */}
      <section id="ledger" className="scroll-mt-[88px] bg-paper-sunk py-[88px]">
        <div className="mx-auto max-w-[760px] px-7">
          <p className={eyebrow}>Razão público</p>
          <h2 className="mt-2 mb-1.5 font-display text-[2.2rem] font-medium">Cada repasse, à vista de todos.</h2>
          <p className="mb-6 text-ink-soft">
            Entradas em cinza, repasses em verde. Saldo retido por nós: sempre R$ 0,00.
          </p>
          <Card className="gap-0 rounded-[16px] border-line bg-paper-card px-6 py-2">
            {LEDGER.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3.5 border-b border-line py-[13px] text-[0.94rem] last:border-b-0"
              >
                <span>{row.label}</span>
                <span
                  className={cn(
                    "font-mono font-medium",
                    row.dir === "out" ? "text-green" : "text-ink-soft",
                  )}
                >
                  {row.amount}
                </span>
              </div>
            ))}
          </Card>
          <div className="mt-[18px] flex items-center justify-between rounded-[10px] border border-green-tint-2 bg-green-tint px-6 py-4">
            <span className="font-semibold text-green-deep">Retido por nós</span>
            <span className="font-mono font-semibold text-green-deep">R$ 0,00</span>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* PARTNERS */}
      <section id="partners" className="scroll-mt-[88px] py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>ONGs parceiras</p>
          <h2 className="mt-2 mb-7 max-w-[22ch] font-display text-[2.2rem] font-medium">
            Quem leva a tecnologia até a ponta.
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {PARTNERS.map((p) => (
              <Card key={p.name} className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
                <div
                  className="mb-3.5 grid aspect-video place-items-center rounded-[6px]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, var(--paper-sunk), var(--paper-sunk) 9px, var(--line) 9px, var(--line) 10px)",
                  }}
                >
                  <span className="font-mono text-[0.72rem] text-ink-faint">logo da ONG</span>
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
                <span aria-hidden>♥</span> Doar
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
