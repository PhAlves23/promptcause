import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manifesto" };

export default function ManifestoPage() {
  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-[760px] px-7">
        <p className="font-mono text-[0.72rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
          Manifesto
        </p>
        <h1 className="mt-3 font-display text-[2.6rem] font-medium">
          IA é a nova alfabetização. E alfabetização não se vende.
        </h1>
        <p className="mt-4 text-[1.2rem] leading-[1.55] text-ink-soft">Em construção.</p>
      </div>
    </section>
  );
}
