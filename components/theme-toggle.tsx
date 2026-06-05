"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

/** Light/dark toggle (dark theme is aimed at developers). Icon swaps via CSS. */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      aria-label="Alternar tema claro/escuro"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="hidden dark:inline">☀</span>
      <span className="inline dark:hidden">◐</span>
    </Button>
  );
}
