"use client";

import React, { useMemo } from "react";
import { useChessStore } from "@/lib/chess-store";

import { PlayCircle, Trophy, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { usePlayer } from "@/context/player-context";

import { joinTableAction as joinTableAction } from "@/app/actions/db/table";
import { useTableButtonResolver } from "@/hooks/get-table-button-state";
import { CreateTableDialog } from "./components/dialogs/create-table-dialog";
import { DeleteTableDialog } from "./components/dialogs/delete-table-dialog";
import { TableList } from "./components/tables/table-list";
import { StatsWrapper } from "./components/stats/stat-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import { useChannel } from "@/context/channel-context";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  const { user, loading: userLoading } = useUser();
  const { player, presenceCount } = usePlayer();

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
    onPreview: (id) => router.push(`/tables/${id}`),

    onJoin: async (tableId: string) => {
      if (player && user) {
        joinTable(tableId, player);
        await joinTableAction(tableId, {
          id: player._id!.toString(),
          name: user?.displayName || "Anonim",
        });
        console.log("🎮 Oyuncu masaya eklendi:", user?.displayName);
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
  if (!user) {
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

          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Giriş Yap</Link>
          </Button>
        </div>
      </div>
    );
  }

  console.group("🔍 User & Player Kontrol");

  console.log("👤 User:", {
    id: user?._id,
    username: user?.username,
    displayName: user?.displayName,
    email: user?.email,
  });

  console.log(
    "🧩 Player:",
    player
      ?player
      : "❌ Player kaydı yok"
  );

  console.groupEnd();

  return (
    <React.Fragment>
      <div className="w-full max-w-5xl space-y-6">
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
    </React.Fragment>
  );
};
export default PageClient;
