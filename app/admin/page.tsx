import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getImpactTotalReais, parseMedia } from "@/lib/donations";
import { AdminClient } from "./admin-client";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();

  const [rows, totalReais] = await Promise.all([
    prisma.ong.findMany({ orderBy: { ordem: "asc" } }),
    getImpactTotalReais(),
  ]);

  // Nunca expõe webhookSecret ao client — só indica se existe.
  const ongs = rows.map((o) => ({
    id: o.id,
    slug: o.slug,
    nome: o.nome,
    regiaoUf: o.regiaoUf ?? "",
    descricao: o.descricao ?? "",
    cnpj: o.cnpj ?? "",
    site: o.site ?? "",
    mediaUrls: parseMedia(o.media).map((m) => m.url).join("\n"),
    donationType: o.donationType,
    linkDoacao: o.linkDoacao ?? "",
    pixKey: o.pixKey ?? "",
    pixKeyType: o.pixKeyType ?? "",
    gateway: o.gateway,
    hasSecret: Boolean(o.webhookSecret),
    ativo: o.ativo,
  }));

  return <AdminClient ongs={ongs} totalReais={totalReais} />;
}
