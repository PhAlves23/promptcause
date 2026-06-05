"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

/** Light/dark toggle (dark theme is aimed at developers). Icon swaps via CSS. */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("common");

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer rounded-full"
      aria-label={t("themeToggle")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="hidden dark:inline">☀</span>
      <span className="inline dark:hidden">◐</span>
    </Button>
  );
}
