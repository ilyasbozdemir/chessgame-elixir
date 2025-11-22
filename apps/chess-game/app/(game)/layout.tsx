import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import ClientLayout from "./layout.client";
import { ClientLayout2 } from "./layout.client-2";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chess Game",
  description: "Play chess online against friends or AI.",
  generator: "ilyasbozdemir.dev", 
};

export default function AppRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout2>{children}</ClientLayout2>;
}
