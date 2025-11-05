import "./globals.css";
import type { Metadata } from "next";
import { PlayerProvider } from "@/context/player-context";
import ClientLayout from "./(root)/layout.client";

export const metadata: Metadata = {
  title: "Chess Game",
  description: "Play chess online against friends or AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <>{children}</>
      </body>
    </html>
  );
}
