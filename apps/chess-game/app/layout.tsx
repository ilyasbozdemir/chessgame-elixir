import type { Metadata } from "next";

import "./globals.css";
import { AppProviders } from "./providers";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export const metadata: Metadata = {
  title: "Chess Game — Gerçek Zamanlı Satranç",
  description: "Canlı oyuncularla anında eşleş. Elixir Phoenix + Next.js ile güçlendirilmiş realtime satranç.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="font-sans antialiased">
        <AppProviders>
          {children}
          <MobileBottomNav />
        </AppProviders>
      </body>
    </html>
  );
}
