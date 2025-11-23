"use client";

import {
  Crown,
  Trophy,
  Users,
  Clock,
  History,
  Settings,
  Home,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const menuItems = [
  {
    title: "Lobiye Dön",
    icon: Home,
    href: "/lobby",
  },
  {
    title: "Yeni Oyun",
    icon: Crown,
    href: "/",
  },
  {
    title: "Turnuvalar",
    icon: Trophy,
    href: "/tournaments",
  },
  {
    title: "Arkadaşlar",
    icon: Users,
    href: "/friends",
  },
  {
    title: "Geçmiş",
    icon: History,
    href: "/history",
  },
  {
    title: "Ayarlar",
    icon: Settings,
    href: "/settings",
  },
];

type Move = {
  move: number;
  white: string;
  black?: string;
};

const moveHistory: Move[] = [
  // { move: 1, white: "e4", black: "e5" },
  // { move: 2, white: "Nf3", black: "Nc6" },
  // { move: 3, white: "Bc4", black: "Bc5" },
  // { move: 4, white: "c3", black: "Nf6" },
  // { move: 5, white: "d4", black: "exd4" },
];

export function AppSidebar2() {
  const pathname = usePathname();

  const [capturedPieces, setCapturedPieces] = useState<{
    white: string[];
    black: string[];
  }>({ white: [], black: [] });

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0">
      {/* Logo */}

      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold group"
        >
          <div className="p-2 rounded-full bg-primary/15 ">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <span className="tracking-tight">
            <span className="font-bold">Chess</span>
            <span className="text-primary font-bold">Game</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 px-2 py-3 border-b border-sidebar-border">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-b border-sidebar-border p-3">
        <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/60 mb-2">
          Oyun Bilgisi
        </h3>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-sidebar-foreground/70">Beyaz</span>
            <Badge variant="outline" className="bg-white text-black text-xs">
              Sen
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-sidebar-foreground/70">Siyah</span>
            <span className="text-sidebar-foreground font-medium text-xs">
              Rakip
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3 py-3">
        <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/60 mb-2">
          Hamle Geçmişi
        </h3>
        <ScrollArea className="h-[250px]">
          <div className="space-y-0.5">
            {moveHistory.map((move) => (
              <div
                key={move.move}
                className="flex items-center gap-2 text-xs py-0.5"
              >
                <span className="w-5 text-sidebar-foreground/60">
                  {move.move}.
                </span>
                <span className="flex-1 font-mono text-sidebar-foreground">
                  {move.white}
                </span>
                <span className="flex-1 font-mono text-sidebar-foreground">
                  {move.black}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-sidebar-border p-3">
        <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/60 mb-2">
          Alınan Taşlar
        </h3>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 text-base">
            <span className="text-sidebar-foreground/60 text-xs mr-1">
              Beyaz:
            </span>
            {capturedPieces.white.length > 0 ? (
              capturedPieces.white.map((piece, idx) => (
                <span key={idx}>{piece}</span>
              ))
            ) : (
              <span className="text-xs text-sidebar-foreground/40">
                Hiç taş alınmadı
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-base">
            <span className="text-sidebar-foreground/60 text-xs mr-1">
              Siyah:
            </span>
            {capturedPieces.black.length > 0 ? (
              capturedPieces.black.map((piece, idx) => (
                <span key={idx}>{piece}</span>
              ))
            ) : (
              <span className="text-xs text-sidebar-foreground/40">
                Hiç taş alınmadı
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
