import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-[120px]">
      <div className="mx-auto max-w-[640px] px-7 text-center">
        <p className="font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
          Erro 404
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,3.6rem)] font-medium">
          Este prompt não retornou nada.
        </h1>
        <p className="mx-auto mt-4 max-w-[44ch] text-[1.1rem] leading-[1.55] text-ink-soft">
          A página que você procura não existe ou foi movida. Que tal recomeçar do início?
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="h-12 rounded-[10px] px-6 text-base">
            <Link href="/">Voltar ao início →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
