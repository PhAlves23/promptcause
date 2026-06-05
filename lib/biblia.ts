import { promises as fs } from "fs";
import path from "path";

export type Technique = {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  whatIs: string;
  when: string;
  wrong: string;
  right: string;
  why: string;
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
