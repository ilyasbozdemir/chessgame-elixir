import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChessGame - Gerçek Zamanlı Açık Kaynak Satranç Platformu",
  description:
    "Elixir Phoenix ve Next.js ile geliştirilmiş, kendi sunucunuzda deploy edebileceğiniz profesyonel satranç platformu. Tamamen ücretsiz ve açık kaynak.",
  keywords: ["satranç", "chess", "real-time", "elixir", "phoenix", "nextjs", "mongodb", "self-hosted", "açık kaynak"],
  authors: [{ name: "ChessGame Team" }],
  openGraph: {
    title: "ChessGame - Gerçek Zamanlı Satranç Platformu",
    description: "Kendi sunucunuzda deploy edebileceğiniz profesyonel satranç platformu",
    type: "website",
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
