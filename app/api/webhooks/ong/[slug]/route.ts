import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

// Webhook por ONG (Fase 1). Cada ONG configura, no painel do gateway DELA, a URL
// /api/webhooks/ong/<slug>. Aqui só LEMOS a confirmação para somar o contador —
// a plataforma não processa nem custodia pagamento.
export const runtime = "nodejs"; // precisa do raw body p/ validar assinatura

type NormalizedEvent = { eventId: string; amountCents: number; currency: string };

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const raw = await req.text(); // raw body — NÃO usar req.json() antes de validar assinatura

  const ong = await prisma.ong.findUnique({ where: { slug } });
  if (!ong || !ong.ativo) {
    return Response.json({ error: "ong not found" }, { status: 404 });
  }

  // Gate de autenticação por token (Asaas e genérico).
  // TODO Fase 2: HMAC forte p/ Stripe (stripe.webhooks.constructEvent) e Mercado Pago (x-signature).
  if (ong.webhookSecret) {
    const token =
      req.headers.get("asaas-access-token") ?? req.headers.get("x-webhook-token");
    if (token !== ong.webhookSecret) {
      return Response.json({ error: "invalid signature" }, { status: 401 });
    }
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const event = normalizeEvent(ong.gateway, payload);
  // evento que não é de pagamento confirmado → reconhece e ignora
  if (!event) return Response.json({ received: true, ignored: true });

  try {
    await prisma.doacao.create({
      data: {
        ongId: ong.id,
        valorCents: event.amountCents,
        moeda: event.currency,
        origem: "webhook",
        providerEventId: `${ong.gateway}:${event.eventId}`,
      },
    });
  } catch (e) {
    // idempotência: unique(providerEventId) → reentrega do mesmo evento não duplica
    if (typeof e === "object" && e !== null && (e as { code?: string }).code === "P2002") {
      return Response.json({ received: true, duplicate: true });
    }
    throw e;
  }

  return Response.json({ received: true });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function normalizeEvent(gateway: string, p: any): NormalizedEvent | null {
  switch (gateway) {
    case "asaas": {
      if (!["PAYMENT_RECEIVED", "PAYMENT_CONFIRMED"].includes(p?.event)) return null;
      const pay = p.payment ?? {};
      const amount = Number(pay.value);
      if (!amount) return null;
      return { eventId: String(pay.id), amountCents: Math.round(amount * 100), currency: "BRL" };
    }
    case "mercadopago": {
      // Valor real exige refetch GET /v1/payments/{id} com access token da ONG.
      // TODO Fase 2: refetch. Por ora aceita transaction_amount se vier no payload.
      if (p?.type !== "payment") return null;
      const amount = Number(p?.data?.transaction_amount ?? p?.transaction_amount);
      if (!amount) return null;
      return { eventId: String(p?.data?.id), amountCents: Math.round(amount * 100), currency: "BRL" };
    }
    case "stripe": {
      // TODO Fase 2: verificar assinatura com o SDK 'stripe' antes de confiar no corpo.
      if (p?.type !== "payment_intent.succeeded") return null;
      const obj = p?.data?.object ?? {};
      const amount = Number(obj.amount_received ?? obj.amount);
      if (!amount) return null;
      return {
        eventId: String(p?.id ?? obj.id),
        amountCents: Math.round(amount), // Stripe já envia em centavos
        currency: String(obj.currency ?? "brl").toUpperCase(),
      };
    }
    default:
      return null; // gateway "manual" não recebe webhook
  }
}
