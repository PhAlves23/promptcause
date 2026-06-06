import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { redirect } from "next/navigation";

// Autenticação de admin único (Fase 1): senha em env + sessão em cookie assinado (HMAC).
// Sem dependência de auth externa; suficiente p/ um painel interno de operador.

const COOKIE = "pc_admin";
const MAX_AGE_S = 60 * 60 * 8; // 8h

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET não configurado");
  return s;
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

/** Comparação em tempo constante (evita timing attack). */
function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** Valida a senha do admin contra a env, em tempo constante. */
export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD não configurado");
  return safeEqual(password, expected);
}

/** Cria a sessão (cookie assinado) após login bem-sucedido. */
export async function createSession(): Promise<void> {
  const payload = `${randomBytes(16).toString("hex")}.${Date.now() + MAX_AGE_S * 1000}`;
  const token = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_S,
  });
}

/** True se há sessão válida (assinatura + expiração). */
export async function isAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [rand, exp, sig] = parts;
  const payload = `${rand}.${exp}`;
  if (!safeEqual(sig, sign(payload))) return false;
  if (Number(exp) < Date.now()) return false;
  return true;
}

/** Guard p/ server actions e páginas: redireciona ao login se não autenticado. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}
