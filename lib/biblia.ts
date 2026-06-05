import { promises as fs } from "fs";
import path from "path";

export type Source = { label: string; url: string };
export type Example = { wrong?: string; right: string; note?: string };

export type Technique = {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  /** one-line plain-language summary (enriched) */
  simple?: string;
  whatIs: string;
  when: string;
  /** when NOT to use / pitfalls (enriched) */
  whenNot?: string;
  /** richer multi-example list (enriched); falls back to wrong/right below */
  examples?: Example[];
  wrong?: string;
  right?: string;
  why: string;
  /** practical tip (enriched) */
  tip?: string;
  /** backing sources / papers (enriched) */
  sources?: Source[];
};

export type BibliaPart = { id: string; title: string; techniques: Technique[] };

export type Biblia = {
  title: string;
  subtitle: string;
  tocTitle: string;
  whatIsLabel: string;
  whenLabel: string;
  wrongLabel: string;
  rightLabel: string;
  whyLabel: string;
  simpleLabel?: string;
  whenNotLabel?: string;
  tipLabel?: string;
  sourcesLabel?: string;
  parts: BibliaPart[];
};

/** Loads the prompt-engineering guide content for a locale, falling back to pt → en. */
export async function getBiblia(locale: string): Promise<Biblia> {
  const dir = path.join(process.cwd(), "content/biblia");
  for (const l of [locale, "pt", "en"]) {
    try {
      const raw = await fs.readFile(path.join(dir, `${l}.json`), "utf8");
      return JSON.parse(raw) as Biblia;
    } catch {
      // try next fallback
    }
  }
  throw new Error("Biblia content not found");
}
