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
      "CETINATEC: informática e programação de software para crianças e adolescentes em vulnerabilidade, em Jaboatão dos Guararapes (PE).",
    cnpj: "21.362.399/0001-20",
    site: "https://www.mimsocial.org",
    donationType: "pix",
    pixKey: "mimsocial.org@gmail.com",
    pixKeyType: "E-mail",
    gateway: "manual",
    ordem: 1,
  },
];

for (const data of ongs) {
  await prisma.ong.create({ data });
}

console.log(`Seed: ${ongs.length} ONG(s) — contador começa em R$ 0 (lance doações pelo /admin).`);
await prisma.$disconnect();
