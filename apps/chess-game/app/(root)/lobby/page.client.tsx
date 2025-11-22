"use client";

import React, { useMemo } from "react";

import { PlayCircle, Trophy, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { useTableButtonResolver } from "@/hooks/get-table-button-state";
import { CreateTableDialog } from "./components/dialogs/create-table-dialog";
import { DeleteTableDialog } from "./components/dialogs/delete-table-dialog";
import { TableList } from "./components/tables/table-list";
import { StatsWrapper } from "./components/stats/stat-wrapper";
import { useUser } from "@/context/user-context";
import { usePresence } from "@/context/presence-context";
import { TableService } from "@/services/table.service";
import { useChessStore } from "@/stores/chess-store";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({ }) => {
  const tableService = new TableService();

  const { user, playerUser, loading: userLoading } = useUser();

  const { lobbyCount, gameCount, globalCount } = usePresence();

  const router = useRouter();

  const tables = useChessStore((s) => s.tables);

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

  const resolveTableButton = useTableButtonResolver(playerUser, {
    onPreview: (id) => router.push(`/tables/${id}`),

    onJoin: async (tableId: string) => {
      if (playerUser && user?._id) {
        const joinTable = await tableService.addPlayer(
          tableId,
          user?._id.toString()
        );

        if (!joinTable.ok) {
          console.warn("❌ Oyuncu masaya eklenemedi:", joinTable.error);
          return;
        }

        console.log("🎮 Oyuncu masaya eklendi:", user.displayName);
        console.log("🧩 Masa:", joinTable.table);
      }
    },
    onGoToTable: (id) => router.push(`/tables/${id}`),
    onWatch: (id) => router.push(`/spectate/${id}`),
  });

  if (userLoading) {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="w-full max-w-5xl space-y-6">
        <StatsWrapper
          stats={[
            {
              label: "Aktif Oyuncu",
              value: lobbyCount ?? 0,
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
              renderDelete={(table) => {
                return table.ownerId === playerUser?.userId ? (
                  <DeleteTableDialog table={table} />
                ) : null;
              }}
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
    </React.Fragment>
  );
};
export default PageClient;
