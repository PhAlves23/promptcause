import type { Metadata } from "next";
import { KeyMessage } from "@/components/key-message";
import { ImpactCounter } from "@/components/impact-counter";
import { DonateWidget } from "@/components/donate-widget";

export const metadata: Metadata = {
  title: "Doar",
  description:
    "Retribua. 100% vira inclusão digital. Escolha um valor — ele vai integralmente para uma ONG parceira, com comprovante de repasse.",
};

export default function DoarPage() {
  return (
    <section className="py-[88px]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-14 px-7 lg:grid-cols-2">
        {/* LEFT: pitch */}
        <div>
          <p className="font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
            Transparência radical
          </p>
          <h1 className="mt-3.5 mb-4 max-w-[14ch] font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-medium">
            Retribua. 100% vira inclusão.
          </h1>
          <p className="text-[1.2rem] leading-[1.55] text-ink-soft">
            Escolha um valor. Ele vai integralmente para uma ONG parceira — você recebe o comprovante de
            repasse.
          </p>

          <div className="my-7 rounded-[16px] bg-green-deep px-9 py-7 text-[#eaf1ec]">
            <div className="font-mono text-[0.72rem] tracking-[0.16em] text-[#9dbca9] uppercase">
              Total doado à causa — repassado integralmente
            </div>
            <ImpactCounter
              target={248730}
              className="my-2 block font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none font-medium tracking-[-0.02em] text-white"
            />
            <div className="text-[0.96rem] text-[#b9cfc0]">
              <span className="font-semibold text-white">100% repassado.</span>
            </div>
          </div>

          <KeyMessage>Grátis. Se te ajudou, 100% da doação vai para a causa.</KeyMessage>
        </div>

        {/* RIGHT: widget */}
        <DonateWidget />
      </div>
    </section>
  );
}
