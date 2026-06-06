// All supported locales — major technology/AI markets worldwide.
// Translations exist for the "ready" ones; the rest fall back to English
// until their message file is added (adding a language = adding one JSON file).

export const locales = [
  "en", "pt", "pt-PT", "es", "fr", "de", "it", "nl", "sv", "pl", "tr",
  "ru", "uk", "ar", "he", "fa", "hi", "bn", "id", "ms", "vi",
  "th", "zh", "zh-TW", "ja", "ko", "fil", "ro", "cs", "el", "da",
  "fi", "no",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Right-to-left scripts.
export const rtlLocales: Locale[] = ["ar", "he", "fa"];

// Locales with a complete, human-reviewed translation today.
export const readyLocales: Locale[] = ["en", "pt", "es"];

export const localeMeta: Record<Locale, { native: string; english: string; flag: string }> = {
  en: { native: "English", english: "English", flag: "🇺🇸" },
  pt: { native: "Português (Brasil)", english: "Portuguese (Brazil)", flag: "🇧🇷" },
  "pt-PT": { native: "Português (Portugal)", english: "Portuguese (Portugal)", flag: "🇵🇹" },
  es: { native: "Español", english: "Spanish", flag: "🇪🇸" },
  fr: { native: "Français", english: "French", flag: "🇫🇷" },
  de: { native: "Deutsch", english: "German", flag: "🇩🇪" },
  it: { native: "Italiano", english: "Italian", flag: "🇮🇹" },
  nl: { native: "Nederlands", english: "Dutch", flag: "🇳🇱" },
  sv: { native: "Svenska", english: "Swedish", flag: "🇸🇪" },
  pl: { native: "Polski", english: "Polish", flag: "🇵🇱" },
  tr: { native: "Türkçe", english: "Turkish", flag: "🇹🇷" },
  ru: { native: "Русский", english: "Russian", flag: "🇷🇺" },
  uk: { native: "Українська", english: "Ukrainian", flag: "🇺🇦" },
  ar: { native: "العربية", english: "Arabic", flag: "🇸🇦" },
  he: { native: "עברית", english: "Hebrew", flag: "🇮🇱" },
  fa: { native: "فارسی", english: "Persian", flag: "🇮🇷" },
  hi: { native: "हिन्दी", english: "Hindi", flag: "🇮🇳" },
  bn: { native: "বাংলা", english: "Bengali", flag: "🇧🇩" },
  id: { native: "Bahasa Indonesia", english: "Indonesian", flag: "🇮🇩" },
  ms: { native: "Bahasa Melayu", english: "Malay", flag: "🇲🇾" },
  vi: { native: "Tiếng Việt", english: "Vietnamese", flag: "🇻🇳" },
  th: { native: "ไทย", english: "Thai", flag: "🇹🇭" },
  zh: { native: "简体中文", english: "Chinese (Simplified)", flag: "🇨🇳" },
  "zh-TW": { native: "繁體中文", english: "Chinese (Traditional)", flag: "🇹🇼" },
  ja: { native: "日本語", english: "Japanese", flag: "🇯🇵" },
  ko: { native: "한국어", english: "Korean", flag: "🇰🇷" },
  fil: { native: "Filipino", english: "Filipino", flag: "🇵🇭" },
  ro: { native: "Română", english: "Romanian", flag: "🇷🇴" },
  cs: { native: "Čeština", english: "Czech", flag: "🇨🇿" },
  el: { native: "Ελληνικά", english: "Greek", flag: "🇬🇷" },
  da: { native: "Dansk", english: "Danish", flag: "🇩🇰" },
  fi: { native: "Suomi", english: "Finnish", flag: "🇫🇮" },
  no: { native: "Norsk", english: "Norwegian", flag: "🇳🇴" },
};

export function localeDir(locale: string): "rtl" | "ltr" {
  return rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";
}
