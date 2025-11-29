"use client";

import { usePathname } from "next/navigation";
import React from "react";

export type SidebarMode = "root" | "game";

interface SidebarProviderProps {
  children: (mode: SidebarMode) => React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const pathname = usePathname();

  const isGameMode = [
    "/game",
    "/lobby",
    "/watch",
    "/spectate",
    "/tables",
    "/play/online/tournaments",
    "/puzzles",
    "/leaderboard",
    "/profile",
  ].some((p) => pathname.startsWith(p));

  const mode: SidebarMode = isGameMode ? "game" : "root";

  return <>{children(mode)}</>;
}
