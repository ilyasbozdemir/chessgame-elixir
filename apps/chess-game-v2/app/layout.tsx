import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChessGame - Online Satranç Platformu",
  description:
    "Modern online satranç platformu. Bullet, Blitz, Rapid oyunlar, bulmacalar ve daha fazlası.",
  generator: "ilyasbozdemir.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`font-sans antialiased`}>
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}
