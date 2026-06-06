import { prisma } from "@/lib/db";

// Diagnóstico temporário de deploy/banco. Remover após resolver.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const raw = process.env.DATABASE_URL ?? "";
  const hasDbUrl = raw.length > 0;
  // prefixo curto (revela se há aspas ou se o protocolo está certo) — NÃO expõe senha
  const urlPrefix = raw.slice(0, 13);

  let db = "ok";
  let ongs = -1;
  try {
    ongs = await prisma.ong.count();
  } catch (e) {
    const err = e as { name?: string; code?: string; message?: string };
    db = `${err.name ?? "Error"}${err.code ? ` [${err.code}]` : ""}: ${String(err.message ?? e).slice(0, 180)}`;
  }

  return Response.json({ hasDbUrl, urlPrefix, ongs, db });
}
