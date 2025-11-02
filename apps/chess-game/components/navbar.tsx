"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayerProfileDialog } from "@/app/lobby/components/dialogs/player-profile-dialog";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/lobby", label: "Lobi" },
    { href: "/how-to-play", label: "Nasıl Oynanır" },
    { href: "/tournament", label: "Turnuva (Beta)" },
    { href: "/about", label: "Hakkında" },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-base sm:text-lg font-semibold"
          >
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="hidden xs:inline">Satranç Oyunu</span>
            <span className="xs:hidden">Satranç</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <PlayerProfileDialog />
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-3 space-y-1 border-t border-border">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <PlayerProfileDialog />
          </div>
        )}
      </div>
    </nav>
  );
}
