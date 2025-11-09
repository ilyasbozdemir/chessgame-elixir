import type { Metadata } from "next";

import "./globals.css";

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
