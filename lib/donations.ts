import { prisma } from "@/lib/db";

/** Total doado (centavos) — soma de todas as doações confirmadas. Fonte do contador. */
export async function getImpactTotalCents(): Promise<number> {
  const agg = await prisma.doacao.aggregate({ _sum: { valorCents: true } });
  return agg._sum.valorCents ?? 0;
}

/** Total doado em reais (inteiro) — o `ImpactCounter` espera reais. */
export async function getImpactTotalReais(): Promise<number> {
  return Math.round((await getImpactTotalCents()) / 100);
}

/** ONGs parceiras ativas, na ordem de exibição. */
export async function getActiveOngs() {
  return prisma.ong.findMany({
    where: { ativo: true },
    orderBy: [{ ordem: "asc" }, { nome: "asc" }],
  });
}

/** Linhas do ledger público (repasses registrados), mais recentes primeiro. */
export async function getLedger() {
  return prisma.repasse.findMany({
    orderBy: { criadoEm: "desc" },
    take: 12,
    include: { ong: true },
  });
}

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export function formatBRLCents(cents: number): string {
  return BRL.format(cents / 100);
}

/** Acrescenta `?ref=promptcause` ao link de doação da ONG (atribuição de origem). */
export function donationHref(linkDoacao: string): string {
  try {
    const url = new URL(linkDoacao);
    if (!url.searchParams.has("ref")) url.searchParams.set("ref", "promptcause");
    return url.toString();
  } catch {
    return linkDoacao;
  }
}
