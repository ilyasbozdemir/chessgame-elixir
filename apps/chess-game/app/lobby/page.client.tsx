"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  BarChart3,
  Clock,
  Crown,
  Eye,
  Loader2,
  LogOut,
  PlayCircle,
  Plus,
  Settings,
  Swords,
  Trophy,
  User,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { usePlayer } from "@/context/player-context";

import {
  createTable as createTableDB,
  joinTable as joinTableDB,
} from "@/app/actions/db/table";
import { formatTime, Logger } from "@/lib/utils";
import mongoose from "mongoose";
import { PlayerDoc } from "@/models/player";
import { RealtimeListener } from "@/components/realtime-listener";
import { useTableButtonResolver } from "@/hooks/get-table-button-state";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  const { player, channel, setPlayer, loading, refresh } = usePlayer();

  const router = useRouter();

  const [playerName, setPlayerName] = useState("");
  const [newTableName, setNewTableName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [profileSection, setProfileSection] = useState<
    "main" | "edit" | "settings" | "stats"
  >("main");
  const [editName, setEditName] = useState("");

  const {
    tables,
    currentTable,
    players,
    addPlayer,
    createTable,
    joinTable,
    leaveTable,
    setPlayerReady,
    startGame,
    gameState,
  } = useChessStore();

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

  const handleCreateTable = async () => {
    if (!player?._id) {
      console.warn("Oyuncunun _id değeri yok, tablo oluşturulamadı.");
      return;
    }
    if (newTableName.trim() && player) {
      console.log("🧩 Masa oluşturma başlatıldı:", {
        tableName: newTableName,
        playerName,
        player,
      });
      try {
        const tableId = await createTable(newTableName.trim(), player, channel);
        console.log("✅ createTable dönen ID:", tableId);
        if (tableId) {
          console.log("🎮 Oyuncu masaya katıldı:", { tableId, playerName });
          setNewTableName("");
        } else {
          console.warn("⚠️ createTable bir ID döndürmedi!");
        }
      } catch (error: any) {
        console.error("❌ Masa oluşturma hatası:", {
          message: error.message || error,
          stack: error.stack,
        });
      }
    } else {
      console.warn("🚫 Eksik bilgi:", { newTableName, player });
    }
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
      players: [],
    });

    leaveTable();
  };

  const handleReady = () => {
    const currentTable = useChessStore.getState().currentTable;
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

  const deleteTable = (tableId: string) => {
    const { tables } = useChessStore.getState();

    console.group("🗑️ [Zustand-DeleteTable]");
    console.log("🎯 Silme isteği geldi:", { tableId, player });

    const table = tables.find((t) => t._id?.toString() === tableId);

    if (!table) {
      console.warn("⚠️ Tablo bulunamadı:", tableId);
      console.groupEnd();
      return;
    }

    console.log("📋 Bulunan tablo:", table);

    if (table.ownerId?.toString() !== player?._id?.toString()) {
      console.warn("⛔ Silme yetkisi yok! Sahip:", table.ownerId?.toString());
      console.groupEnd();
      return;
    }

    useChessStore.setState((state) => {
      const updatedTables = state.tables.filter(
        (t) => t._id?.toString() !== tableId
      );

      console.log("✅ Güncel tablo listesi:", updatedTables);
      console.groupEnd();

      return { tables: updatedTables };
    });
  };

  const handleGoToTable = (_tableId?: string) => {
    // TODO: masaya git yönlendirmesi
  };

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

  useEffect(() => {
    console.log(waitingTables);
  }, [tables]);

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
                <span className="hidden sm:inline">Ayrıl</span>
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
                <span>Oyuncular ({players.length}/ 2)</span>
              </div>

              <div className="grid gap-2 sm:gap-3">
                {players.map((player, index) => {
                  if (!player?.name) return null;
                  return (
                    <Card
                      key={player._id?.toString()}
                      className={
                        player &&
                        player._id?.toString() === player._id?.toString()
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
                              {player?._id?.toString() ===
                                player._id?.toString() && (
                                <Badge variant="secondary" className="text-xs">
                                  Siz
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {currentTable?.players?.find(
                            (p) => p.id?.toString() === player._id?.toString()
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

                {players.length < 2 && (
                  <Card className="border-dashed">
                    <CardContent className="flex items-center justify-center p-6 sm:p-8 text-muted-foreground">
                      <p className="text-xs sm:text-sm">Oyuncu bekleniyor...</p>
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

            {players.length === 1 && player && (
              <div className="text-center text-xs sm:text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                İkinci oyuncunun katılması bekleniyor...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-5xl space-y-6">
        <RealtimeListener channel={channel} />

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
                  {player ? (
                    <Dialog
                      onOpenChange={(open) =>
                        !open && setProfileSection("main")
                      }
                    >
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors cursor-pointer">
                          <UserCircle className="w-5 h-5 text-accent-foreground" />
                          <span className="font-medium text-accent-foreground">
                            {player.name}
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            {profileSection === "main" && "Oyuncu Profili"}
                            {profileSection === "edit" && "Profili Düzenle"}
                            {profileSection === "settings" && "Oyun Ayarları"}
                            {profileSection === "stats" && "İstatistikler"}
                          </DialogTitle>
                          <DialogDescription>
                            {profileSection === "main" &&
                              "Hesap ayarlarınızı yönetin"}
                            {profileSection === "edit" &&
                              "Profil bilgilerinizi güncelleyin"}
                            {profileSection === "settings" &&
                              "Oyun tercihlerinizi ayarlayın"}
                            {profileSection === "stats" &&
                              "Oyun performansınızı görüntüleyin"}
                          </DialogDescription>
                        </DialogHeader>

                        {profileSection === "main" && (
                          <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                                <UserCircle className="w-10 h-10 text-primary-foreground" />
                              </div>
                              <div>
                                <p className="font-bold text-lg text-foreground">
                                  {player && player.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Oyuncu ID: {player?._id?.toString()}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Button
                                variant="outline"
                                className="w-full justify-start bg-transparent"
                                onClick={() => {
                                  setEditName(player.name);
                                  setProfileSection("edit");
                                }}
                              >
                                <UserCircle className="w-4 h-4 mr-2" />
                                Profili Düzenle
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-start bg-transparent"
                                onClick={() => setProfileSection("settings")}
                              >
                                <Settings className="w-4 h-4 mr-2" />
                                Oyun Ayarları
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-start bg-transparent"
                                onClick={() => setProfileSection("stats")}
                              >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                İstatistikler
                              </Button>
                            </div>

                            <div className="pt-4 border-t border-border">
                              <Button
                                variant="destructive"
                                className="w-full"
                                onClick={async () => {
                                  setPlayer(null);
                                  setProfileSection("main");
                                  const res = await fetch("/api/logout", {
                                    method: "POST",
                                  });
                                  if (res.ok) {
                                    console.log("✅ Oyuncu çıkış yaptı");
                                    setPlayer(null);
                                  } else {
                                    console.error("❌ Çıkış hatası");
                                  }
                                  await refresh();
                                }}
                              >
                                Çıkış Yap
                              </Button>
                            </div>
                          </div>
                        )}

                        {profileSection === "edit" && (
                          <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Oyuncu İsmi</Label>
                              <Input
                                id="edit-name"
                                placeholder="Yeni isminiz"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="flex-1 bg-transparent"
                                onClick={() => setProfileSection("main")}
                              >
                                İptal
                              </Button>
                              <Button
                                className="flex-1"
                                disabled={!editName.trim()}
                                onClick={() => {
                                  setPlayer({
                                    ...player,
                                    name: editName,
                                  });
                                  setProfileSection("main");
                                }}
                              >
                                Kaydet
                              </Button>
                            </div>
                          </div>
                        )}

                        {profileSection === "settings" && (
                          <div className="space-y-4 pt-4">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                                <div>
                                  <p className="font-medium text-foreground">
                                    Ses Efektleri
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Oyun seslerini aç/kapat
                                  </p>
                                </div>
                                <Button variant="outline" size="sm">
                                  Açık
                                </Button>
                              </div>
                              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                                <div>
                                  <p className="font-medium text-foreground">
                                    Bildirimler
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Masa bildirimleri
                                  </p>
                                </div>
                                <Button variant="outline" size="sm">
                                  Açık
                                </Button>
                              </div>
                              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                                <div>
                                  <p className="font-medium text-foreground">
                                    Otomatik Katılım
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Boş masalara otomatik katıl
                                  </p>
                                </div>
                                <Button variant="outline" size="sm">
                                  Kapalı
                                </Button>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              className="w-full bg-transparent"
                              onClick={() => setProfileSection("main")}
                            >
                              Geri Dön
                            </Button>
                          </div>
                        )}

                        {profileSection === "stats" && (
                          <div className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-4 rounded-lg bg-accent/50 text-center">
                                <Trophy className="w-6 h-6 text-chart-2 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-foreground">
                                  24
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Kazanılan Oyun
                                </p>
                              </div>
                              <div className="p-4 rounded-lg bg-accent/50 text-center">
                                <PlayCircle className="w-6 h-6 text-chart-1 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-foreground">
                                  42
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Toplam Oyun
                                </p>
                              </div>
                              <div className="p-4 rounded-lg bg-accent/50 text-center">
                                <BarChart3 className="w-6 h-6 text-primary mx-auto mb-2" />
                                <p className="text-2xl font-bold text-foreground">
                                  57%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Kazanma Oranı
                                </p>
                              </div>
                              <div className="p-4 rounded-lg bg-accent/50 text-center">
                                <Users className="w-6 h-6 text-chart-3 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-foreground">
                                  156
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Toplam Hamle
                                </p>
                              </div>
                            </div>
                            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                              <p className="text-sm font-medium text-foreground mb-1">
                                En İyi Seri
                              </p>
                              <p className="text-2xl font-bold text-primary">
                                7 Galibiyet
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              className="w-full bg-transparent"
                              onClick={() => setProfileSection("main")}
                            >
                              Geri Dön
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <UserCircle className="w-4 h-4 mr-2" />
                          İsim Belirle
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Oyuncu İsmi</DialogTitle>
                          <DialogDescription>
                            Lobide görünecek isminizi girin
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="player-name">İsim</Label>
                            <Input
                              id="player-name"
                              placeholder="Oyuncu isminiz"
                              value={playerName}
                              onChange={(e) => setPlayerName(e.target.value)}
                            />
                          </div>
                          <Button
                            onClick={handleSetPlayerName}
                            className="w-full"
                            disabled={!playerName.trim()}
                          >
                            Kaydet
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {player && (
                    <Dialog
                      open={isCreateDialogOpen}
                      onOpenChange={setIsCreateDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <Plus className="w-4 h-4" />
                          Yeni Masa
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Yeni Masa Oluştur</DialogTitle>
                          <DialogDescription>
                            Oyun masanızın detaylarını belirleyin
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="table-name">Masa Adı</Label>
                            <Input
                              id="table-name"
                              placeholder="Örn: Hızlı Oyun"
                              value={newTableName}
                              onChange={(e) => setNewTableName(e.target.value)}
                            />
                          </div>

                          <Button
                            onClick={handleCreateTable}
                            className="w-full"
                            disabled={!newTableName.trim()}
                          >
                            Masa Oluştur
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>
            </Card>

            <div className="container mx-auto px-4 py-8">
              <div className="space-y-8">
                {/* Waiting Tables */}
                {tables.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-foreground">
                        Bekleyen Masalar
                      </h2>
                      <Badge variant="secondary" className="text-sm">
                        {waitingTables.length} Masa
                      </Badge>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {waitingTables.map((table, index) => {
                        const { label, disabled, action } = resolveTableButton(
                          table._id?.toString()
                        );
                        return (
                          <Card
                            key={table._id?.toString()}
                            className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative overflow-hidden"
                          >
                            <div className="absolute top-2 right-2 text-4xl opacity-10 pointer-events-none">
                              {table.status === "waiting"
                                ? "♙"
                                : table.status === "playing"
                                ? "♔"
                                : "♕"}
                            </div>
                            <CardContent className="p-5 space-y-4 relative z-10">
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1 min-w-0 flex-1">
                                  <h3 className="font-bold text-lg text-foreground truncate">
                                    {table.name}
                                  </h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-3.5 h-3.5 shrink-0" />
                                    <span>{formatTime(table.createdAt)}</span>
                                  </div>
                                  {table.ownerName && (
                                    <p className="text-xs text-muted-foreground">
                                      Sahibi: {table.ownerName}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <Badge
                                    variant="default"
                                    className="shrink-0 bg-chart-2 text-chart-2-foreground"
                                  >
                                    Bekliyor
                                  </Badge>
                                  {table.ownerId === player?._id && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 shrink-0 hover:bg-destructive/10 hover:text-destructive"
                                      onClick={() =>
                                        deleteTable(table._id?.toString() ?? "")
                                      }
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/50">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-semibold text-foreground">
                                  {table.players && table.players.length}/ 2
                                  Oyuncu
                                </span>
                                <div className="flex-1" />
                                <div className="flex gap-1">
                                  {Array.from({ length: 2 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`text-sm ${
                                        i < (table.players?.length ?? 0)
                                          ? "opacity-100"
                                          : "opacity-20"
                                      }`}
                                    >
                                      {i % 2 === 0 ? "♟" : "♙"}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {(table.players?.length ?? 0) > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                  {table.players?.map((player, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {player.name}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              <Button
                                onClick={action}
                                disabled={disabled}
                                className="w-full"
                                size="lg"
                              >
                                {label}
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Active Games */}
                {activeTables.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-foreground">
                        Devam Eden Oyunlar
                      </h2>
                      <Badge variant="secondary" className="text-sm">
                        {activeTables.length} Oyun
                      </Badge>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {activeTables.map((table, index) => (
                        <Card
                          key={index}
                          className="group hover:shadow-lg transition-all duration-300 border-chart-1/30 relative overflow-hidden"
                        >
                          <div className="absolute top-2 right-2 text-4xl opacity-10 pointer-events-none">
                            {table.status === "playing"
                              ? "♚"
                              : table.status === "waiting"
                              ? "♙"
                              : "♛"}
                          </div>

                          <CardContent className="p-5 space-y-4 relative z-10">
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-1 min-w-0 flex-1">
                                <h3 className="font-bold text-lg text-foreground truncate">
                                  {table.name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-3.5 h-3.5 shrink-0" />
                                  <span>{formatTime(table.createdAt)}</span>
                                </div>
                              </div>
                              <Badge
                                variant="secondary"
                                className="shrink-0 bg-chart-1/20 text-chart-1"
                              >
                                Oyunda
                              </Badge>
                            </div>

                            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/30">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-semibold text-foreground">
                                {table.players?.length ?? 0}/ 2 Oyuncu
                              </span>
                            </div>

                            {(table.players?.length ?? 0) > 0 && (
                              <div className="flex gap-2 flex-wrap">
                                {table.players?.map((player) => (
                                  <Badge
                                    key={player.id?.toString() ?? player.name}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {player.name}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            <Button
                              onClick={() =>
                                handleWatchGame(table._id?.toString() ?? "")
                              }
                              className="w-full gap-2"
                              variant="outline"
                              size="lg"
                            >
                              <Eye className="w-4 h-4" />
                              Oyunu İzle
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default PageClient;
