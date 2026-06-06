// Seed de DEV — ONGs e valores de EXEMPLO (placeholders).
// Em produção, cadastrar ONGs reais pelo admin e remover estes dados.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ongs = [
  {
    slug: "instituto-conectar",
    nome: "Instituto Conectar",
    regiaoUf: "SP",
    descricao: "Laboratórios de IA em escolas públicas da periferia de São Paulo.",
    linkDoacao: "https://benfeitoria.com/instituto-conectar",
    gateway: "manual",
    ordem: 1,
    doacoesCents: 1_240_000, // R$ 12.400 (exemplo)
  },
  {
    slug: "rede-digital-norte",
    nome: "Rede Digital Norte",
    regiaoUf: "PA",
    descricao: "Internet e equipamentos para comunidades ribeirinhas do Pará.",
    linkDoacao: "https://benfeitoria.com/rede-digital-norte",
    gateway: "manual",
    ordem: 2,
    doacoesCents: 890_000, // R$ 8.900
  },
  {
    slug: "alfatech-comunidade",
    nome: "AlfaTech Comunidade",
    regiaoUf: "BA",
    descricao: "Formação em IA para jovens e adultos no interior da Bahia.",
    linkDoacao: "https://benfeitoria.com/alfatech-comunidade",
    gateway: "manual",
    ordem: 3,
    doacoesCents: 1_520_000, // R$ 15.200
  },
];

for (const o of ongs) {
  const { doacoesCents, ...data } = o;
  const ong = await prisma.ong.upsert({
    where: { slug: o.slug },
    update: data,
    create: data,
  });
  // uma doação-resumo de exemplo por ONG (idempotente pelo providerEventId)
  await prisma.doacao.upsert({
    where: { providerEventId: `seed:${o.slug}` },
    update: { valorCents: doacoesCents },
    create: {
      ongId: ong.id,
      valorCents: doacoesCents,
      origem: "manual",
      periodo: "maio/26",
      providerEventId: `seed:${o.slug}`,
    },
  });
  // repasse de exemplo p/ o ledger público
  await prisma.repasse.deleteMany({ where: { ongId: ong.id, periodo: "maio/26" } });
  await prisma.repasse.create({
    data: { ongId: ong.id, valorCents: doacoesCents, periodo: "maio/26" },
  });
}

console.log("Seed concluído:", ongs.length, "ONGs");
await prisma.$disconnect();
