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

  const base = (await import(`../messages/${defaultLocale}.json`)).default as Messages;
  let messages: Messages = base;
  if (locale !== defaultLocale) {
    try {
      const localeMessages = (await import(`../messages/${locale}.json`)).default as Messages;
      messages = deepMerge(base, localeMessages);
    } catch {
      messages = base; // no translation file yet → English
    }
  }

  return { locale, messages };
});
