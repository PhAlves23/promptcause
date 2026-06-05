import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { KeyMessage } from "@/components/key-message";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "IA é a nova alfabetização. E alfabetização não se vende. Por que o PromptCause existe e os quatro princípios que não negociamos.",
};

const eyebrow = "font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase";

const PRINCIPLES: { n: string; title: string; body: React.ReactNode }[] = [
  {
    n: "01",
    title: "Conhecimento aberto, sem pedágio",
    body: "Sem paywall, sem anúncio, sem login obrigatório. Aprender a usar IA é direito, não produto. Use, traduza e compartilhe à vontade.",
  },
  {
    n: "02",
    title: "O dinheiro nunca passa por nós",
    body: (
      <>
        Cada doação vai direto à conta das ONGs parceiras. Retemos R$ 0,00 — e provamos isso, linha por
        linha.{" "}
        <Link href="/causa#ledger" className="text-green hover:underline">
          Ver o razão público →
        </Link>
      </>
    ),
  },
  {
    n: "03",
    title: "Ensinar com honestidade",
    body: 'Nada de "hack secreto" ou promessa de atalho mágico. Mostramos o jeito certo e o errado, lado a lado, e sempre explicamos o porquê.',
  },
  {
    n: "04",
    title: "Na língua de cada um",
    body: "Conteúdo multilíngue por princípio. Inclusão começa por entender — por isso qualquer pessoa pode ler PromptCause no seu próprio idioma.",
  },
];

export default function ManifestoPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-[88px] pb-10">
        <div className="mx-auto max-w-[760px] px-7">
          <p className={eyebrow}>Manifesto · Por que existimos</p>
          <h1 className="mt-4 font-display text-[clamp(2.3rem,5.2vw,4rem)] leading-[1.1] font-medium tracking-[-0.015em]">
            IA é a nova alfabetização. E alfabetização não se vende.
          </h1>
          <p className="mt-[22px] text-[1.2rem] leading-[1.55] text-ink-soft">
            Saber usar IA virou alfabetização. E alfabetização não se vende. Cobrar por isso só aprofunda a
            desigualdade que a gente quer combater. Por isso o conhecimento fica aberto e quem puder retribuir
            financia inclusão digital para quem ainda nem chegou à internet.
          </p>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* STORY */}
      <section className="py-[88px]">
        <div className="mx-auto max-w-[760px] px-7">
          <p className={eyebrow}>A história</p>
          <h2 className="mt-2 mb-4 font-display text-[2rem] font-medium">
            Começou com uma conta que não fechava.
          </h2>
          <div className="space-y-4 text-ink [&_strong]:text-ink">
            <p>
              De um lado, a IA virou a ferramenta mais poderosa que uma pessoa comum já teve nas mãos. Do
              outro, o conhecimento de como usá-la bem ficou trancado: cursos caros, fóruns rasos, threads que
              prometem &quot;hacks&quot; e entregam ruído. Quem mais precisa é exatamente quem menos alcança.
            </p>
            <p>
              PromptCause nasceu para desfazer esse nó. Reunimos, em um só lugar, um guia sério e gratuito — do
              primeiro prompt à engenharia avançada — sem paywall, sem anúncio, sem login obrigatório. E demos
              a ele um propósito além do ensino: transformar gratidão em inclusão digital.
            </p>
            <p>
              Porque não basta ensinar IA para quem já tem computador, internet e tempo. A próxima pessoa a
              aprender pode ser alguém que ainda nem chegou à rede. É para ela que vai cada doação.
            </p>
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* PRINCIPLES */}
      <section className="bg-paper-sunk py-[88px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className={eyebrow}>Em que acreditamos</p>
          <h2 className="mt-2 mb-8 font-display text-[2.2rem] font-medium">Quatro princípios inegociáveis.</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <Card key={p.n} className="gap-0 rounded-[16px] border-line bg-paper-card p-[26px]">
                <div className="mb-2.5 font-mono text-[0.9rem] text-green">{p.n}</div>
                <h3 className="mb-2 font-display text-[1.4rem] font-medium">{p.title}</h3>
                <p className="text-ink-soft">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* PROMISE */}
      <section className="py-[88px]">
        <div className="mx-auto max-w-[760px] px-7 text-center">
          <p className={eyebrow}>Nossa promessa</p>
          <p className="mt-3.5 mb-6 font-display text-[clamp(1.7rem,3.6vw,2.4rem)] leading-[1.3] font-medium">
            &ldquo;Grátis. Se te ajudou, 100% da doação vai para a causa.&rdquo;
          </p>
          <KeyMessage className="inline-flex text-left">
            PromptCause é mantido por voluntários. Os custos do site saem do nosso bolso, não das doações — por
            isso o contador pode mostrar, com honestidade, 100% repassado.
          </KeyMessage>
        </div>
      </section>

      <Separator className="bg-line" />

      {/* CLOSING CTA */}
      <section className="bg-paper-sunk py-[88px]">
        <div className="mx-auto max-w-[760px] px-7 text-center">
          <h2 className="mb-4 font-display text-[2.2rem] font-medium">Aprenda. Depois passe adiante.</h2>
          <p className="mx-auto mb-7 max-w-[46ch] text-ink-soft">
            Comece de graça hoje. Se um dia isso te abrir uma porta, ajude a abrir a próxima para alguém.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
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
