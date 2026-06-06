import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin · PromptCause",
  robots: { index: false, follow: false }, // painel interno — fora dos buscadores
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" data-theme="light" className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper-sunk text-ink">{children}</body>
    </html>
  );
}
