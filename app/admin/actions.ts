"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/lib/auth";

export type ActionState = { error?: string; ok?: boolean };

// Revalida as páginas públicas que leem do banco após uma mutação.
function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/admin");
}

/** Converte o textarea de mídia (uma URL por linha) no JSON do campo `media`. YouTube → vídeo. */
function mediaJson(raw?: string): string | null {
  if (!raw) return null;
  const items = raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((url) => ({ type: /youtube\.com|youtu\.be/.test(url) ? "video" : "image", url }));
  return items.length ? JSON.stringify(items) : null;
}

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------- Auth ----------
export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  if (!password || !checkPassword(password)) return { error: "Senha inválida." };
  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await requireAdmin();
  await destroySession();
  redirect("/admin/login");
}

// ---------- ONG ----------
const ongSchema = z
  .object({
    nome: z.string().trim().min(2, "Nome muito curto"),
    slug: z.string().trim().optional(),
    regiaoUf: z.string().trim().max(2).optional().or(z.literal("")),
    descricao: z.string().trim().optional().or(z.literal("")),
    cnpj: z.string().trim().optional().or(z.literal("")),
    site: z.string().trim().url("Site inválido").optional().or(z.literal("")),
    media: z.string().optional().or(z.literal("")),
    donationType: z.enum(["link", "pix"]),
    linkDoacao: z.string().trim().optional().or(z.literal("")),
    pixKey: z.string().trim().optional().or(z.literal("")),
    pixKeyType: z.string().trim().optional().or(z.literal("")),
    gateway: z.enum(["manual", "asaas", "mercadopago", "stripe"]),
    webhookSecret: z.string().trim().optional().or(z.literal("")),
  })
  .superRefine((d, ctx) => {
    if (d.donationType === "link") {
      try {
        new URL(d.linkDoacao || "");
      } catch {
        ctx.addIssue({ code: "custom", path: ["linkDoacao"], message: "Link de doação inválido" });
      }
    } else if (!d.pixKey) {
      ctx.addIssue({ code: "custom", path: ["pixKey"], message: "Informe a chave PIX" });
    }
  });

export async function createOng(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = ongSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  const d = parsed.data;
  const slug = d.slug && d.slug.length > 0 ? slugify(d.slug) : slugify(d.nome);

  const exists = await prisma.ong.findUnique({ where: { slug } });
  if (exists) return { error: `Já existe ONG com o slug "${slug}".` };

  const count = await prisma.ong.count();
  await prisma.ong.create({
    data: {
      slug,
      nome: d.nome,
      regiaoUf: d.regiaoUf || null,
      descricao: d.descricao || null,
      cnpj: d.cnpj || null,
      site: d.site || null,
      media: mediaJson(d.media),
      donationType: d.donationType,
      linkDoacao: d.donationType === "link" ? d.linkDoacao : null,
      pixKey: d.donationType === "pix" ? d.pixKey : null,
      pixKeyType: d.donationType === "pix" ? d.pixKeyType || null : null,
      gateway: d.gateway,
      webhookSecret: d.webhookSecret || null,
      ordem: count + 1,
    },
  });
  revalidatePublic();
  return { ok: true };
}

export async function updateOng(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "ID ausente." };
  const parsed = ongSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  const d = parsed.data;
  await prisma.ong.update({
    where: { id },
    data: {
      nome: d.nome,
      regiaoUf: d.regiaoUf || null,
      descricao: d.descricao || null,
      cnpj: d.cnpj || null,
      site: d.site || null,
      media: mediaJson(d.media),
      donationType: d.donationType,
      linkDoacao: d.donationType === "link" ? d.linkDoacao : null,
      pixKey: d.donationType === "pix" ? d.pixKey : null,
      pixKeyType: d.donationType === "pix" ? d.pixKeyType || null : null,
      gateway: d.gateway,
      // só altera o segredo se um novo valor foi informado (vazio = mantém)
      ...(d.webhookSecret ? { webhookSecret: d.webhookSecret } : {}),
    },
  });
  revalidatePublic();
  return { ok: true };
}

export async function toggleOng(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const ong = await prisma.ong.findUnique({ where: { id } });
  if (ong) await prisma.ong.update({ where: { id }, data: { ativo: !ong.ativo } });
  revalidatePublic();
}

// ---------- Lançamentos (doação / repasse) ----------
const lancamentoSchema = z.object({
  ongId: z.string().min(1, "Selecione a ONG"),
  valor: z.coerce.number().positive("Valor deve ser maior que zero"),
  periodo: z.string().trim().optional().or(z.literal("")),
});

export async function addDoacao(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = lancamentoSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  const d = parsed.data;
  await prisma.doacao.create({
    data: {
      ongId: d.ongId,
      valorCents: Math.round(d.valor * 100),
      origem: "manual",
      periodo: d.periodo || null,
    },
  });
  revalidatePublic();
  return { ok: true };
}

export async function addRepasse(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const schema = lancamentoSchema.extend({
    periodo: z.string().trim().min(1, "Informe o período"),
    comprovanteUrl: z.string().trim().url().optional().or(z.literal("")),
  });
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  const d = parsed.data;
  await prisma.repasse.create({
    data: {
      ongId: d.ongId,
      valorCents: Math.round(d.valor * 100),
      periodo: d.periodo,
      comprovanteUrl: d.comprovanteUrl || null,
    },
  });
  revalidatePublic();
  return { ok: true };
}
