# Contribuir com o PromptCause

Obrigado por querer ajudar! Toda contribuição — conteúdo, skill, tradução ou código — ganha lugar na [página de contribuidores](https://promptcause.com/pt/contribuidores). 💚

## Formas de contribuir

### 📚 Conteúdo (a forma mais fácil de começar)
O guia ensina IA de forma prática. Temas novos estão abertos como tarefas:

- Veja as [issues `help wanted`](https://github.com/PhAlves23/promptcause/issues?q=is%3Aopen+label%3A%22help+wanted%22) — RAG, MCP, Fine-tuning, AI Agents, Evals, Embeddings e mais.
- Comente na issue dizendo que vai pegar, para não haver trabalho duplicado.
- O conteúdo vive em `content/biblia/<idioma>.json`. Siga o formato das técnicas existentes: **o que é · quando usar · quando evitar · exemplo certo/errado · por quê**.
- Escreva em **um idioma** (PT ou EN) — a tradução para os demais pode ser feita pelo pipeline de IA.

### 🧩 Skills
Skills ficam no [marketplace](https://github.com/PhAlves23/prompt-cause-marketplace). Mantenha sua skill no seu próprio repositório; nós a listamos fixada a um commit (`sha`) revisado. Veja o `CONTRIBUTING` de lá.

### 🌍 Tradução
- A interface vive em `messages/<idioma>.json`.
- PT/EN/ES são revisados; os demais usam fallback. Melhorias de tradução são muito bem-vindas.

### 💻 Código
- Abra uma issue antes de mudanças grandes.
- Mantenha o estilo do código vizinho.

## Setup local

```bash
npm install
cp .env.example .env       # configure as variáveis
npx prisma generate && npx prisma db push
npm run dev
```

Antes de abrir o PR:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Padrões

- Conteúdo educacional precisa estar **correto** — ele é revisado antes do merge.
- Sem segredos no código (use variáveis de ambiente; `.env` é ignorado).
- Áreas sensíveis (`app/api`, `app/admin`, `prisma`, pagamento, auth) passam por revisão do mantenedor via `CODEOWNERS`.

## Licença das contribuições

Ao contribuir, você concorda em licenciar **código** sob MIT e **conteúdo** sob CC BY-SA 4.0.
