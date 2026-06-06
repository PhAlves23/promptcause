// Seed de DEV — ONGs reais parceiras (Fase 1).
// Limpa e recria. Em produção, cadastrar/editar pelo /admin.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.doacao.deleteMany();
await prisma.repasse.deleteMany();
await prisma.ong.deleteMany();

const ongs = [
  {
    slug: "mim-social",
    nome: "MIM - Social Misericórdia",
    regiaoUf: "PE",
    descricao:
      "Educação com tecnologia: alfabetização e inclusão digital para crianças e adolescentes na favela da Nestlé, Jaboatão dos Guararapes (PE).",
    cnpj: "21.362.399/0001-20",
    site: "https://www.mimsocial.org",
    // Campanha Benfeitoria dedicada → atribuição rastreável (melhor que PIX direto)
    donationType: "link",
    linkDoacao: "https://benfeitoria.com/projeto/mim-social-educao-com-tecnologia-1w0z",
    gateway: "manual",
    ordem: 1,
  },
  {
    slug: "jovens-hackers",
    nome: "Jovens Hackers",
    regiaoUf: "SP",
    descricao:
      "Escola de programação, robótica e cultura maker por e para as periferias. Mais de mil alunos desde 2017.",
    site: "https://jovenshackers.com.br",
    donationType: "link",
    // PROVISÓRIO: trocar pelo link de campanha Benfeitoria dedicado (com ?ref=promptcause)
    linkDoacao: "https://jovenshackers.com.br",
    gateway: "manual",
    ordem: 2,
  },
];

for (const data of ongs) {
  await prisma.ong.create({ data });
}

console.log(`Seed: ${ongs.length} ONG(s) — contador começa em R$ 0 (lance doações pelo /admin).`);
await prisma.$disconnect();
