import { notFound } from "next/navigation";

// Catch-all so unknown paths under /[locale]/ trigger the localized not-found page.
export default function CatchAllPage() {
  notFound();
}
