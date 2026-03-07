import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} antialiased`}>
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}
