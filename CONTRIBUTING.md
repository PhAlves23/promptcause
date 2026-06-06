# Contributing to PromptCause

Thanks for wanting to help! Every contribution — content, a skill, a translation or code — earns a spot on the [contributors page](https://promptcause.com/en/contribuidores). 💚

## Ways to contribute

### 📚 Content (the easiest way to start)
The guide teaches AI in a practical way. New topics are open as tasks:

- See the [`help wanted` issues](https://github.com/PhAlves23/promptcause/issues?q=is%3Aopen+label%3A%22help+wanted%22) — RAG, MCP, Fine-tuning, AI Agents, Evals, Embeddings and more.
- Comment on the issue to claim it, so there's no duplicate work.
- Content lives in `content/biblia/<language>.json`. Follow the format of the existing techniques: **what it is · when to use · when to avoid · right/wrong example · why**.
- Write in **one language** (PT or EN) — the others can be filled by the AI translation pipeline.

### 🧩 Skills
Skills live in the [marketplace](https://github.com/PhAlves23/prompt-cause-marketplace). Keep your skill in your own repo; we list it pinned to a reviewed commit (`sha`). See its `CONTRIBUTING`.

### 🌍 Translation
- The UI lives in `messages/<language>.json`.
- PT/EN/ES are reviewed; the rest use fallback. Translation improvements are very welcome.

### 💻 Code
- Open an issue before large changes.
- Match the style of the surrounding code.

## Local setup

```bash
npm install
cp .env.example .env       # set the variables
npx prisma generate && npx prisma db push
npm run dev
```

Before opening a PR:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Standards

- Educational content must be **correct** — it is reviewed before merge.
- No secrets in code (use environment variables; `.env` is ignored).
- Sensitive areas (`app/api`, `app/admin`, `prisma`, payments, auth) go through maintainer review via `CODEOWNERS`.

## Contribution license

By contributing, you agree to license **code** under MIT and **content** under CC BY-SA 4.0.
