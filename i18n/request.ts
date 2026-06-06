import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { defaultLocale } from "./locales";

type Messages = Record<string, unknown>;

// Deep-merge so partially-translated locales fall back to English per-key.
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const key of Object.keys(override)) {
    const b = base[key];
    const o = override[key];
    out[key] =
      b && o && typeof b === "object" && typeof o === "object" && !Array.isArray(b) && !Array.isArray(o)
        ? deepMerge(b as Messages, o as Messages)
        : o;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  // Variantes herdam do idioma-pai antes do próprio arquivo (pt-PT ⊃ pt, zh-TW ⊃ zh).
  const parentLocale: Record<string, string> = { "pt-PT": "pt", "zh-TW": "zh" };

  const base = (await import(`../messages/${defaultLocale}.json`)).default as Messages;
  let messages: Messages = base;

  const parent = parentLocale[locale];
  if (parent) {
    try {
      const parentMessages = (await import(`../messages/${parent}.json`)).default as Messages;
      messages = deepMerge(messages, parentMessages);
    } catch {
      // pai ausente → segue com base (inglês)
    }
  }

  if (locale !== defaultLocale) {
    try {
      const localeMessages = (await import(`../messages/${locale}.json`)).default as Messages;
      messages = deepMerge(messages, localeMessages);
    } catch {
      // sem arquivo do locale → fica com o que já temos (base, ou base+pai)
    }
  }

  return { locale, messages };
});
