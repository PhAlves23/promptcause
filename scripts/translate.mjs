// Pipeline de tradução por IA (Claude) — traduz um namespace de messages/pt.json
// para todos os idiomas do projeto. Incremental (só traduz o que falta) por padrão.
//
// Uso:
//   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs [namespace] [--force]
//   ex: node scripts/translate.mjs ongs
//
// A chave da API fica SÓ no ambiente — nunca no repositório.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const DIR = "messages";
const SOURCE = "pt";
const NS = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "ongs";
const FORCE = process.argv.includes("--force");
const MODEL = process.env.TRANSLATE_MODEL || "claude-haiku-4-5-20251001";
const KEY = process.env.ANTHROPIC_API_KEY;

const LANG = {
  ar: "Arabic", bn: "Bengali", cs: "Czech", da: "Danish", de: "German", el: "Greek",
  en: "English", es: "Spanish", fa: "Persian (Farsi)", fi: "Finnish", fil: "Filipino",
  fr: "French", he: "Hebrew", hi: "Hindi", id: "Indonesian", it: "Italian", ja: "Japanese",
  ko: "Korean", ms: "Malay", nl: "Dutch", no: "Norwegian", pl: "Polish",
  ro: "Romanian", ru: "Russian", sv: "Swedish", th: "Thai", tr: "Turkish",
  uk: "Ukrainian", vi: "Vietnamese", "zh-TW": "Traditional Chinese", zh: "Simplified Chinese",
};

if (!KEY) {
  console.error("✗ Defina ANTHROPIC_API_KEY no ambiente. Ex: ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs ongs");
  process.exit(1);
}

// chaves de um objeto (recursivo) para comparar estrutura
function shape(obj) {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    return Object.fromEntries(Object.keys(obj).sort().map((k) => [k, shape(obj[k])]));
  }
  return 0;
}
const sameShape = (a, b) => JSON.stringify(shape(a)) === JSON.stringify(shape(b));

async function translate(json, langName) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      system:
        `You are a professional localizer for a free, open-source AI education project. ` +
        `Translate the JSON values from Brazilian Portuguese to ${langName}. ` +
        `Rules: (1) keep the EXACT same key structure — never translate or change keys (they are identifiers/slugs); ` +
        `(2) translate only the string values; (3) keep proper nouns (NGO names, place names, brand names) untranslated; ` +
        `(4) preserve technical AI/programming terms appropriately; (5) keep a warm, clear tone. ` +
        `Output ONLY the translated JSON — no markdown fences, no comments, no explanation.`,
      messages: [{ role: "user", content: JSON.stringify(json, null, 2) }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  let text = (data.content?.[0]?.text ?? "").trim();
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/```$/, "").trim();
  return JSON.parse(text);
}

const src = JSON.parse(readFileSync(path.join(DIR, `${SOURCE}.json`), "utf8"));
const sourceNs = src[NS];
if (!sourceNs) {
  console.error(`✗ Namespace "${NS}" não existe em ${SOURCE}.json`);
  process.exit(1);
}

const locales = readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(".json", ""))
  .filter((l) => l !== SOURCE);

console.log(`Traduzindo namespace "${NS}" (${MODEL}) para ${locales.length} idiomas...\n`);

let done = 0, skipped = 0, failed = 0;
for (const loc of locales) {
  const file = path.join(DIR, `${loc}.json`);
  const m = JSON.parse(readFileSync(file, "utf8"));
  if (!FORCE && m[NS] && sameShape(m[NS], sourceNs)) {
    console.log(`· ${loc}: já traduzido`);
    skipped++;
    continue;
  }
  const langName = LANG[loc] || loc;
  try {
    let out = await translate(sourceNs, langName);
    if (!sameShape(out, sourceNs)) out = await translate(sourceNs, langName); // 1 retry
    if (!sameShape(out, sourceNs)) throw new Error("estrutura divergente após retry");
    m[NS] = out;
    writeFileSync(file, JSON.stringify(m, null, 2) + "\n");
    console.log(`✓ ${loc} (${langName})`);
    done++;
  } catch (e) {
    console.error(`✗ ${loc}: ${e.message}`);
    failed++;
  }
}

console.log(`\nConcluído: ${done} traduzidos, ${skipped} já ok, ${failed} falharam.`);
