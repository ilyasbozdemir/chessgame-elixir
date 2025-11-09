import type React from "react";
import ClientLayout from "./layout.client";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giriş • Satranç Oyunu",
  description: "Satranç oyununa erişmek için giriş yapın veya kayıt olun.",
  generator: "ilyasbozdemir.dev",
};


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}
