"use client";

import React, { useMemo } from "react";
import { useChessStore } from "@/lib/chess-store";

import { PlayCircle, Trophy, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { usePlayer } from "@/context/player-context";

import { joinTable as joinTableDB } from "@/app/actions/db/table";
import { RealtimeListener } from "@/components/realtime-listener";
import { useTableButtonResolver } from "@/hooks/get-table-button-state";
import { CreateTableDialog } from "./components/dialogs/create-table-dialog";
import { DeleteTableDialog } from "./components/dialogs/delete-table-dialog";
import { TableList } from "./components/tables/table-list";
import { StatsWrapper } from "./components/stats/stat-wrapper";
import { PlayerProfileDialog } from "./components/dialogs/player-profile-dialog";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  const { player, channel, loading, presenceCount, refresh } = usePlayer();

  const router = useRouter();

  const tables = useChessStore((s) => s.tables);
  const joinTable = useChessStore((s) => s.joinTable);
  const sortedTables = useMemo(() => {
    if (!Array.isArray(tables)) return [];

    return [...tables].sort((a, b) => {
      const timeA = new Date(a.createdAt ?? 0).getTime() || 0;
      const timeB = new Date(b.createdAt ?? 0).getTime() || 0;
      return timeB - timeA;
    });
  }, [tables]);

  const waitingTables = useMemo(
    () => sortedTables.filter((t) => t.status === "waiting"),
    [sortedTables]
  );

  const activeTables = useMemo(
    () => sortedTables.filter((t) => t.status === "playing"),
    [sortedTables]
  );

  const resolveTableButton = useTableButtonResolver(player, {
    onPreview: (id) => console.log("Masa önizlemesi:", id),
    onJoin: async (tableId: string) => {
      if (player) {
        joinTable(tableId, player);
        await joinTableDB(tableId, {
          id: player._id!.toString(),
          name: player.name,
        });
        console.log("🎮 Oyuncu masaya eklendi:", player.name);
      }
    },
    onGoToTable: (id) => router.push(`/tables/${id}`),
    onWatch: (id) => router.push(`/spectate/${id}`),
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-80 p-6 rounded-2xl border border-border bg-card shadow-md animate-pulse">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted" />

            <div className="space-y-2 w-full">
              <div className="h-5 w-2/3 bg-muted rounded mx-auto" />
              <div className="h-4 w-1/2 bg-muted rounded mx-auto" />
            </div>

            <div className="w-full h-10 bg-muted rounded-lg mt-4" />
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground animate-pulse">
          Oyuncu bilgileri yükleniyor...
        </p>
      </div>
    );
  }
  if (!player) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6 p-8 rounded-2xl border border-border bg-card shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-accent flex items-center justify-center">
            <Users className="w-8 h-8 text-accent-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Oyuncu Bilgisi Eksik
            </h2>
            <p className="text-muted-foreground text-sm">
              Masaları görebilmek ve oyuna katılabilmek için önce bir oyuncu
              ismi belirlemeniz gerekiyor.
            </p>
          </div>
          <PlayerProfileDialog /> 
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-5xl space-y-6">
        <RealtimeListener channel={channel} />
        <StatsWrapper
          stats={[
            {
              label: "Aktif Oyuncu",
              value: presenceCount ?? 0,
              icon: Users,
              gradient: "from-accent/60 to-accent/20",
              iconBg: "bg-primary/10",
              iconColor: "text-primary",
            },
            {
              label: "Aktif Oyun",
              value: activeTables?.length ?? 0,
              icon: PlayCircle,
              gradient: "from-chart-1/20 to-accent/10",
              iconBg: "bg-chart-1/10",
              iconColor: "text-chart-1",
            },
            {
              label: "Bekleyen Masa",
              value: waitingTables?.length ?? 0,
              icon: Trophy,
              gradient: "from-chart-2/20 to-accent/10",
              iconBg: "bg-chart-2/10",
              iconColor: "text-chart-2",
            },
          ]}
        />

        <React.Fragment>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Lobi</h2>
            <CreateTableDialog />
          </div>

          <div className="container mx-auto px-4 py-8">
            <TableList
              title="Bekleyen Masalar"
              items={waitingTables}
              badgeLabel={`${waitingTables.length} Masa`}
              resolve={resolveTableButton}
              renderDelete={(table) =>
                table.ownerId === player?._id ? (
                  <DeleteTableDialog table={table} />
                ) : null
              }
            />

            <TableList
              title="Devam Eden Oyunlar"
              items={activeTables}
              badgeLabel={`${activeTables.length} Oyun`}
              resolve={resolveTableButton}
            />
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};
export default PageClient;
