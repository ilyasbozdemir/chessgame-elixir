"use client";

import { Navbar } from "@/components/navbar";
import { usePlayer } from "@/context/player-context";
import { useChessStore } from "@/lib/chess-store";
import { PlayCircle, Trophy, Users } from "lucide-react";
import React from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { presenceCount } = usePlayer();

  const { tables } = useChessStore();

  const waitingTables = tables.filter((t) => t.status === "waiting");
  const activeTables = tables.filter((t) => t.status === "playing");

  return (
    <React.Fragment>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Aktif Oyuncu */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-accent/60 to-accent/20 border border-border shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Aktif Oyuncu
              </p>
              <p className="text-2xl font-semibold text-foreground tracking-tight">
                {presenceCount}
              </p>
            </div>
          </div>

          {/* Aktif Oyun */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-chart-1/20 to-accent/10 border border-border shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-chart-1/10 flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-chart-1" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Aktif Oyun
              </p>
              <p className="text-2xl font-semibold text-foreground tracking-tight">
                {activeTables.length}
              </p>
            </div>
          </div>

          {/* Bekleyen Masa */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-chart-2/20 to-accent/10 border border-border shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-chart-2/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-chart-2" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Bekleyen Masa
              </p>
              <p className="text-2xl font-semibold text-foreground tracking-tight">
                {waitingTables.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {children}
    </React.Fragment>
  );
}
