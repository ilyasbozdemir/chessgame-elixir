import type { Metadata } from "next";

import "./globals.css";
import { AppProviders } from "./providers";

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
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
