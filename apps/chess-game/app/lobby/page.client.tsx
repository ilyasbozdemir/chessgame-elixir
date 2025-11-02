"use client";

import React, { useMemo, useState } from "react";
import { useChessStore } from "@/lib/chess-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crown, PlayCircle, Trophy, User, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { usePlayer } from "@/context/player-context";

import { joinTable as joinTableDB } from "@/app/actions/db/table";
import { Logger } from "@/lib/utils";
import { RealtimeListener } from "@/components/realtime-listener";
import { useTableButtonResolver } from "@/hooks/get-table-button-state";
import { PlayerProfileDialog } from "./components/dialogs/player-profile-dialog";
import { CreateTableDialog } from "./components/dialogs/create-table-dialog";
import { DeleteTableDialog } from "./components/dialogs/delete-table-dialog";
import { TableList } from "./components/tables/table-list";
import { StatsWrapper } from "./components/stats/stat-wrapper";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  const { player, channel, loading, presenceCount, refresh } = usePlayer();

  const router = useRouter();

  const [playerName, setPlayerName] = useState("");

  const tables = useChessStore((s) => s.tables);
  const addPlayer = useChessStore((s) => s.addPlayer);
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

  const handleSetPlayerName = async () => {
    const logger = new Logger("ChessGame-LOBBY");

    logger.group("👤 [Player Setup]");
    logger.info("🟢 handleSetPlayerName çağrıldı.");

    await addPlayer(playerName);
    logger.success("✅ Oyuncu eklendi:", playerName);

    await refresh();
    logger.info("🌐 refresh() tamamlandı.");
    logger.groupEnd();
  };

  const handleJoinTable = async (tableId: string) => {
    if (player) {
      joinTable(tableId, player);
      await joinTableDB(tableId, {
        id: player._id!.toString(),
        name: player.name,
      });
      console.log("🎮 Oyuncu masaya eklendi:", player.name);
    }
  };

  const resolveTableButton = useTableButtonResolver(player, {
    onPreview: (id) => console.log("Masa önizlemesi:", id),
    onJoin: handleJoinTable,
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

        {/* Alt açıklama */}
        <p className="mt-6 text-sm text-muted-foreground animate-pulse">
          Oyuncu bilgileri yükleniyor...
        </p>
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

        {!player ? (
          <Card className="border-primary shadow-lg w-full max-w-md">
            <CardHeader className="text-center p-6 sm:p-8 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                <Crown className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Hoş Geldiniz
                </CardTitle>
                <CardDescription className="text-base">
                  Satranç dünyasına adım atmak için adınızı girin
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6 sm:p-8 pt-0">
              <div className="space-y-2">
                <label className="text-sm font-medium">Oyuncu Adı</label>
                <Input
                  placeholder="Adınızı girin"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSetPlayerName()}
                  className="text-center text-lg h-12"
                  autoFocus
                />
              </div>
              <Button
                onClick={handleSetPlayerName}
                disabled={!playerName.trim()}
                className="w-full h-12 text-base"
                size="lg"
              >
                <User className="w-5 h-5 mr-2" />
                Kaydet
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Devam ederek kullanım şartlarını kabul etmiş olursunuz
              </p>
            </CardContent>
          </Card>
        ) : (
          <React.Fragment>
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <PlayerProfileDialog />
                  <CreateTableDialog />
                </div>
              </CardHeader>
            </Card>

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
        )}
      </div>
    </div>
  );
};
export default PageClient;
