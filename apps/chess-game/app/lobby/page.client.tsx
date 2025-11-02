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
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Crown,
  Eye,
  LogOut,
  PlayCircle,
  Swords,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { usePlayer } from "@/context/player-context";

import { joinTable as joinTableDB } from "@/app/actions/db/table";
import { Logger } from "@/lib/utils";
import mongoose from "mongoose";
import { RealtimeListener } from "@/components/realtime-listener";
import { useTableButtonResolver } from "@/hooks/get-table-button-state";
import { PlayerProfileDialog } from "./components/dialogs/player-profile-dialog";
import { CreateTableDialog } from "./components/dialogs/create-table-dialog";
import { DeleteTableDialog } from "./components/dialogs/delete-table-dialog";
import { TableList } from "./components/tables/table-list";
import { TableDetailDialog } from "./components/dialogs/table-detail-dialog";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  const { player, channel, loading, presenceCount, refresh } = usePlayer();

  const router = useRouter();

  const [playerName, setPlayerName] = useState("");

  const tables = useChessStore((s) => s.tables);
  const addPlayer = useChessStore((s) => s.addPlayer);
  const deleteTable = useChessStore((s) => s.deleteTable);
  const joinTable = useChessStore((s) => s.joinTable);
  const leaveTable = useChessStore((s) => s.leaveTable);
  const setPlayerReady = useChessStore((s) => s.setPlayerReady);
  const startGame = useChessStore((s) => s.startGame);
  const gameState = useChessStore((s) => s.gameState);
  const currentTable = useChessStore((s) => s.currentTable);

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

  const handleWatchGame = (tableId: string) => {
    console.log("Oyun izleniyor:", tableId);
  };

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

  const handleLeaveTable = () => {
    console.log("🚪 Oyuncu masadan ayrılıyor:", {
      currentTableId: currentTable?._id,
      playerName,
      player,
    });

    useChessStore.setState({
      currentTable: null,
    });

    leaveTable();
  };

  const handleReady = () => {
    if (player?._id && currentTable?.players) {
      const playerInTable = currentTable.players.find(
        (p: { id: mongoose.Types.ObjectId | null; isReady: boolean }) =>
          p.id?.toString() === player._id?.toString()
      );

      setPlayerReady(player._id.toString(), !playerInTable?.isReady);
    }
  };

  const handleStartGame = () => {
    startGame();
    router.push("/game");
  };

  const canStartGame =
    currentTable &&
    currentTable.players?.length === 2 &&
    currentTable.players.every((p) => p.isReady) &&
    gameState.gameStatus === "ready";

  const resolveTableButton = useTableButtonResolver(player, {
    onPreview: (id) => console.log("Masa önizlemesi:", id),
    onJoin: handleJoinTable,
    onGoToTable: (id) => {
      const t = useChessStore
        .getState()
        .tables.find((tt) => tt._id?.toString() === id);
      if (t) useChessStore.setState({ currentTable: t });
    },
    onWatch: handleWatchGame,
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

  if (currentTable) {
    return (
      <>
        <TableDetailDialog
          table={currentTable}
          onJoin={handleJoinTable}
          onWatch={handleWatchGame}
          trigger={
            <Button variant="outline" size="sm">
              Masayı İncele
            </Button>
          }
        />

        <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex items-center justify-center p-3 sm:p-4 lg:ml-64">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLeaveTable}
                  className="shrink-0"
                >
                  <LogOut className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Masalara Dön</span>
                </Button>
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                  <CardTitle className="text-xl sm:text-3xl font-bold truncate">
                    {currentTable.name}
                  </CardTitle>
                  <Swords className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                </div>
                <div className="w-12 sm:w-20 shrink-0" />
              </div>
              <CardDescription className="text-sm sm:text-base">
                Oyuncular hazır olduğunda oyun başlayacak
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>
                    Oyuncular {(currentTable.players ?? []).length}/ 2
                  </span>
                </div>

                <div className="grid gap-2 sm:gap-3">
                  {currentTable.players?.map((player, index) => {
                    if (!player?.name) return null;
                    return (
                      <Card
                        key={player?.id?.toString() + String(index) }
                        className={
                          player &&
                          player.id?.toString() === player.id?.toString()
                            ? "border-primary"
                            : ""
                        }
                      >
                        <CardContent className="flex items-center justify-between p-3 sm:p-4 gap-2">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0 text-sm sm:text-base">
                              {player?.name[0].toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm sm:text-base truncate">
                                {player.name}
                              </p>
                              <div className="flex items-center gap-1.5 sm:gap-2 mt-1 flex-wrap">
                                {player.color && (
                                  <Badge variant="outline" className="text-xs">
                                    {player.color === "white"
                                      ? "⚪ Beyaz"
                                      : "⚫ Siyah"}
                                  </Badge>
                                )}
                                {player?.id?.toString() ===
                                  player.id?.toString() && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Siz
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {currentTable?.players?.find(
                              (p) => p.id?.toString() === player.id?.toString()
                            )?.isReady ? (
                              <Badge className="bg-primary text-xs sm:text-sm">
                                Hazır
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-xs sm:text-sm"
                              >
                                Bekliyor
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                  {(currentTable?.players ?? []).length < 2 && (
                    <Card className="border-dashed">
                      <CardContent className="flex items-center justify-center p-6 sm:p-8 text-muted-foreground">
                        <p className="text-xs sm:text-sm">
                          Oyuncu bekleniyor...
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {player && currentTable?.players?.length === 2 && (
                <Button
                  onClick={handleReady}
                  className="w-full"
                  size="default"
                  variant={
                    currentTable.players.find(
                      (p) => p.id?.toString() === player._id?.toString()
                    )?.isReady
                      ? "outline"
                      : "default"
                  }
                >
                  {currentTable.players.find(
                    (p) => p.id?.toString() === player._id?.toString()
                  )?.isReady
                    ? "Hazır Değilim"
                    : "Hazırım"}
                </Button>
              )}

              {canStartGame && (
                <Button onClick={handleStartGame} className="w-full" size="lg">
                  Oyunu Başlat
                </Button>
              )}

              {(currentTable.players ?? []).length === 1 && (
                <div className="text-center text-xs sm:text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  İkinci oyuncunun katılması bekleniyor...
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-5xl space-y-6">
        <RealtimeListener channel={channel} />

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

        {!player ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
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
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSetPlayerName()
                    }
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
          </div>
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
