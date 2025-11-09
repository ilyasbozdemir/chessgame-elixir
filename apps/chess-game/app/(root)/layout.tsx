import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import { PlayerProvider } from "@/context/player-context";
import ClientLayout from "./layout.client";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chess Game",
  description: "Play chess online against friends or AI.",
  generator: "ilyasbozdemir.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PlayerProvider>
      <ClientLayout>{children}</ClientLayout>
    </PlayerProvider>
  );
}
