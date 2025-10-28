"use client";

import React, { useEffect, useState } from "react";
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
import { socket } from "@/lib/socket";
import { usePresence } from "@/hooks/use-presence";
import { usePresenceCount } from "@/hooks/use-presence-count";
import { usePlayer } from "@/context/player-context";
import { PlayerDoc } from "@/models/player";
import { Player } from "@/lib/chess-types";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  const { player, loading, refresh } = usePlayer();

  const [currentPlayer, setCurrentPlayer] = useState<PlayerDoc | null>(null);

  const router = useRouter();

  const [playerName, setPlayerName] = useState("");
  const [newTableName, setNewTableName] = useState("");
  const [showCreateTable, setShowCreateTable] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [profileSection, setProfileSection] = useState<
    "main" | "edit" | "settings" | "stats"
  >("main");
  const [editName, setEditName] = useState("");

  const [channel, setChannel] = useState<any>(null);
  const playersOnline = usePresence(channel);
  const playersOnlineCount = usePresenceCount(channel);

  console.log("🏓 [lobby/page.client.tsx] Aktif Player:", player);

  const {
    tables,
    currentTable,
    players,
    createTable,
    joinTable,
    leaveTable,
    setPlayerReady,
    startGame,
    gameState,
  } = useChessStore();

  const waitingTables = tables.filter((t) => t.status === "waiting");
  const activeTables = tables.filter((t) => t.status === "playing");

  const handleWatchGame = (tableId: string) => {
    console.log("Oyun izleniyor:", tableId);
  };

  const handleSetPlayerName = async () => {
    if (playerName.trim()) {
      const res = await fetch("/api/player", {
        method: "POST",
        body: JSON.stringify({ name: playerName }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log("📦 Player API response:", JSON.stringify(data, null, 2));

      setCurrentPlayer(data as PlayerDoc);

      if (!res.ok) console.warn("player kaydı hatası", await res.text());
      else console.log("player server'a kaydedildi ve cookie atıldı");
    }
  };

  const handleCreateTable = () => {
    if (!currentPlayer?._id) {
      console.warn("Oyuncunun _id değeri yok, tablo oluşturulamadı.");
      return;
    }

    if (newTableName.trim() && player && currentPlayer) {
      console.log("🧩 Masa oluşturma başlatıldı:", {
        tableName: newTableName,
        playerName,
        currentPlayer,
      });

      const tableId = createTable(newTableName.trim(), {
        ...currentPlayer,
        _id: currentPlayer?._id.toString(),
      } as unknown as Player);

      console.log("✅ createTable dönen ID:", tableId);

      if (tableId) {
        joinTable(tableId, playerName);
        console.log("🎮 Oyuncu masaya katıldı:", { tableId, playerName });

        setNewTableName("");
        setShowCreateTable(false);
      } else {
        console.warn("⚠️ createTable bir ID döndürmedi!");
      }
    } else {
      console.warn("🚫 Eksik bilgi:", {
        newTableName,
        currentPlayer,
      });
    }
  };

  const handleJoinTable = (tableId: string) => {
    if (player) {
      joinTable(tableId, playerName);
    }
  };

  const handleLeaveTable = () => {
    console.log("🚪 Oyuncu masadan ayrılıyor:", {
      currentTableId: currentTable?.id,
      playerName,
      currentPlayer,
    });

    leaveTable();
  };

  const handleReady = () => {
    if (currentPlayer?._id) {
      const player = players.find(
        (p) => p._id?.toString() === currentPlayer._id?.toString()
      );

      setPlayerReady(currentPlayer._id.toString(), !player?.isReady);
    }
  };

  const handleStartGame = () => {
    startGame();
    router.push("/game");
  };

  const canStartGame =
    players.length === 2 &&
    players.every((p) => p.isReady) &&
    gameState.gameStatus === "ready";

  const formatTime = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "Az önce";
    if (minutes < 60) return `${minutes} dakika önce`;
    return `${Math.floor(minutes / 60)} saat önce`;
  };

  const deleteTable = (tableId: string) => {
    const { tables, currentPlayer } = useChessStore.getState();
    const table = tables.find((t) => t.id === tableId);

    if (table && table.ownerId === currentPlayer?._id) {
      useChessStore.setState((state) => ({
        tables: state.tables.filter((t) => t.id !== tableId),
      }));
    }
  };

  useEffect(() => {
    console.log("🌐 Hazır oyuncu ile socket başlatılıyor:", player);
    socket.connect();

    const channel = socket.channel("game:lobby", {
      name: player?.name || "Anonim",
    });

    setChannel(channel);

    channel
      .join()
      .receive("ok", (resp) => console.log("✅ Lobby'e bağlandı:", resp))
      .receive("error", (err) =>
        console.error("❌ Lobby bağlantı hatası:", err)
      );

    channel.on("player_joined", (msg) =>
      console.log("👋 Oyuncu katıldı:", msg.name)
    );
    channel.on("player_left", (msg) =>
      console.log("🚪 Oyuncu ayrıldı:", msg.name)
    );

    channel.push("update_player", { name: player?.name || "Anonim" });

    return () => {
      console.log("🔌 Kanal bağlantısı kapatılıyor...");
      channel.leave();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!player) {
      console.log("⏳ Oyuncu yok, socket bağlanmıyor.");
      return;
    }

    setCurrentPlayer(player as unknown as PlayerDoc);

    console.log("🌐 Socket başlatılıyor, oyuncu:", player.name);
    socket.connect();

    const channel = socket.channel("game:lobby", { name: player.name });
    setChannel(channel);

    channel
      .join()
      .receive("ok", (resp) => console.log("✅ Lobby'e bağlandı:", resp))
      .receive("error", (err) =>
        console.error("❌ Lobby bağlantı hatası:", err)
      );

    channel.on("player_joined", (msg) =>
      console.log("👋 Oyuncu katıldı:", msg.name)
    );
    channel.on("player_left", (msg) =>
      console.log("🚪 Oyuncu ayrıldı:", msg.name)
    );

    channel.push("update_player", { name: player.name });

    return () => {
      console.log("🔌 Kanal bağlantısı kapatılıyor...");
      channel.leave();
      socket.disconnect();
    };
  }, [player]);

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
                <span>
                  Oyuncular ({players.length}/{currentTable.maxPlayers})
                </span>
              </div>

              <div className="grid gap-2 sm:gap-3">
                {players.map((player) => (
                  <Card
                    key={player._id}
                    className={
                      currentPlayer &&
                      currentPlayer._id?.toString() === player._id?.toString()
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
                            {currentPlayer?._id?.toString() ===
                              player._id?.toString() && (
                              <Badge variant="secondary" className="text-xs">
                                Siz
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {player.isReady ? (
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
                ))}

                {players.length < currentTable.maxPlayers && (
                  <Card className="border-dashed">
                    <CardContent className="flex items-center justify-center p-6 sm:p-8 text-muted-foreground">
                      <p className="text-xs sm:text-sm">Oyuncu bekleniyor...</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {currentPlayer && players.length === 2 && (
              <Button
                onClick={handleReady}
                className="w-full"
                size="default"
                variant={
                  players.find(
                    (p) => p._id?.toString() === currentPlayer._id?.toString()
                  )?.isReady
                    ? "outline"
                    : "default"
                }
              >
                {players.find(
                  (p) => p._id?.toString() === currentPlayer._id?.toString()
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

            {players.length === 1 && currentPlayer && (
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
        {!currentPlayer ? (
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
                  Oyuna Başla
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Devam ederek kullanım şartlarını kabul etmiş olursunuz
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <React.Fragment>
            {/* Stats Bar */}
            <div>
              <div className="container mx-auto px-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Aktif Oyuncu
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {playersOnline.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                    <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                      <PlayCircle className="w-5 h-5 text-chart-1" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Aktif Oyun
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {activeTables.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                    <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-chart-2" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Bekleyen Masa
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {waitingTables.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  {currentPlayer ? (
                    <Dialog
                      onOpenChange={(open) =>
                        !open && setProfileSection("main")
                      }
                    >
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors cursor-pointer">
                          <UserCircle className="w-5 h-5 text-accent-foreground" />
                          <span className="font-medium text-accent-foreground">
                            {currentPlayer.name}
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
                                  Oyuncu ID: {player?._id}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Button
                                variant="outline"
                                className="w-full justify-start bg-transparent"
                                onClick={() => {
                                  setEditName(currentPlayer.name);
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
                                onClick={() => {
                                  setCurrentPlayer(null);
                                  setProfileSection("main");
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
                                  setCurrentPlayer({
                                    ...currentPlayer,
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
                {activeTables.length > 0 && (
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
                      {waitingTables.map((table) => (
                        <Card
                          key={table.id}
                          className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative overflow-hidden"
                        >
                          <div className="absolute top-2 right-2 text-4xl opacity-10 pointer-events-none">
                            {table.id === "1"
                              ? "♔"
                              : table.id === "3"
                              ? "♕"
                              : "♖"}
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
                                {table.ownerId === currentPlayer?._id && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 shrink-0 hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() => deleteTable(table.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/50">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-semibold text-foreground">
                                {table.players.length}/{table.maxPlayers} Oyuncu
                              </span>
                              <div className="flex-1" />
                              <div className="flex gap-1">
                                {Array.from({ length: table.maxPlayers }).map(
                                  (_, i) => (
                                    <div
                                      key={i}
                                      className={`text-sm ${
                                        i < table.players.length
                                          ? "opacity-100"
                                          : "opacity-20"
                                      }`}
                                    >
                                      {i % 2 === 0 ? "♟" : "♙"}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {table.players.length > 0 && (
                              <div className="flex gap-2 flex-wrap">
                                {table.players.map((player) => (
                                  <Badge
                                    key={player._id}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {player.name}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            <Button
                              onClick={() => handleJoinTable(table.id)}
                              disabled={
                                table.players.length >= table.maxPlayers
                              }
                              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                              size="lg"
                            >
                              {table.players.length >= table.maxPlayers
                                ? "Masa Dolu"
                                : "Masaya Katıl"}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
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
                      {activeTables.map((table) => (
                        <Card
                          key={table.id}
                          className="group hover:shadow-lg transition-all duration-300 border-chart-1/30 relative overflow-hidden"
                        >
                          <div className="absolute top-2 right-2 text-4xl opacity-10 pointer-events-none">
                            {table.id === "2" ? "♚" : "♛"}
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
                                {table.players.length}/{table.maxPlayers} Oyuncu
                              </span>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                              {table.players.map((player) => (
                                <Badge
                                  key={player._id}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {player.name}
                                </Badge>
                              ))}
                            </div>

                            <Button
                              onClick={() => handleWatchGame(table.id)}
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
