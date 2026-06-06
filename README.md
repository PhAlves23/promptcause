<div align="center">

<img src="assets/banner.svg" alt="PromptCause" width="100%">

<br>

**O guia aberto e gratuito de IA — e cada doação vai 100% para a inclusão digital.**

[![License: MIT](https://img.shields.io/badge/code-MIT-16684a.svg)](LICENSE)
[![Content: CC BY-SA](https://img.shields.io/badge/content-CC--BY--SA-c25b36.svg)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-1e8a63.svg)](CONTRIBUTING.md)
[![Languages](https://img.shields.io/badge/i18n-32%20idiomas-16684a.svg)](#-tradução-i18n)
[![Deploy](https://img.shields.io/badge/deploy-Vercel-201c15.svg)](https://promptcause.com)

[**Site**](https://promptcause.com) · [Aprender](https://promptcause.com/pt/aprender) · [Skills](https://promptcause.com/pt/skills) · [A Causa](https://promptcause.com/pt/causa) · [Contribuir](#-contribuir)

</div>

---

## O que é

**PromptCause** é um guia **aberto e gratuito** de inteligência artificial — do primeiro prompt à engenharia avançada — em **32 idiomas**. O conteúdo é grátis para sempre. Quem aprende e quer retribuir encontra no site uma lista de **ONGs de inclusão digital**: escolhe uma e doa. **100% vai direto para a ONG** — a plataforma nunca custodia nem retém nada.

> **Transparência radical:** o dinheiro nunca passa por nós. Doações vão direto para a conta da instituição.

## ✨ Destaques

- 📚 **Guia de prompt engineering** — 38 técnicas, com exemplos do jeito certo e errado.
- 🌍 **32 idiomas** com fallback automático (next-intl).
- 🧩 **Marketplace de Skills** — catálogo aberto de skills para Claude Code, Copilot, Cursor e mais (`sha`-pinned).
- 💚 **Doações 100% repassadas** — ONGs parceiras com botão direto e ledger público.
- 🤝 **Open source** — conteúdo, skills e código construídos pela comunidade.
- 👥 **Página de contribuidores** — visibilidade para quem constrói.

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Banco | Postgres (Neon) + Prisma |
| i18n | next-intl (32 idiomas) |
| UI | Tailwind CSS v4 + shadcn/ui |
| Hospedagem | Vercel |

## 🚀 Rodando localmente

```bash
git clone https://github.com/PhAlves23/promptcause.git
cd promptcause
npm install

cp .env.example .env          # configure DATABASE_URL, ADMIN_PASSWORD, SESSION_SECRET
npx prisma generate
npx prisma db push            # cria as tabelas
node prisma/seed.mjs          # ONGs de exemplo (opcional)

npm run dev                   # http://localhost:3000
```

> Precisa de um Postgres. O [Neon](https://neon.tech) tem um plano gratuito que funciona direto com a Vercel.

## 🗂️ Estrutura

```
app/[locale]/         páginas (home, aprender, skills, causa, doar, contribuidores)
app/api/webhooks/     ingestão de webhooks de doação (por gateway da ONG)
app/admin/            painel do operador (login + cadastro de ONG + lançamentos)
components/           UI (widgets de doação, skills, mídia, header…)
content/biblia/       conteúdo do guia, um JSON por idioma
lib/                  donations, skills, contributors, biblia, db, auth
messages/             traduções da interface (um JSON por idioma)
prisma/               schema + seed
scripts/translate.mjs pipeline de tradução por IA
```

## 🌍 Tradução (i18n)

A interface está em **32 idiomas** (PT/EN/ES revisados; demais por fallback). Para traduzir um namespace via IA:

```bash
ANTHROPIC_API_KEY=sk-... npm run translate <namespace>
```

## 🤝 Contribuir

Toda contribuição é bem-vinda — e ganha lugar na [página de contribuidores](https://promptcause.com/pt/contribuidores).

- **Conteúdo** — pegue uma tarefa em [issues `help wanted`](https://github.com/PhAlves23/promptcause/issues?q=is%3Aopen+label%3A%22help+wanted%22) (RAG, MCP, Fine-tuning, Agents, Evals, Embeddings…).
- **Skills** — publique uma skill no [marketplace](https://github.com/PhAlves23/prompt-cause-marketplace).
- **Código / tradução** — abra um PR.

Leia o [CONTRIBUTING.md](CONTRIBUTING.md). Áreas sensíveis (pagamento, admin, infra) passam por revisão do mantenedor (`CODEOWNERS`).

## 💚 A causa

Saber usar IA virou alfabetização — e alfabetização não se vende. Por isso o conhecimento fica aberto, e quem puder retribuir financia inclusão digital para quem ainda nem chegou à internet.

## 📄 Licença

- **Código:** [MIT](LICENSE)
- **Conteúdo** (guia, textos): **CC BY-SA 4.0** — use, traduza, compartilhe.
