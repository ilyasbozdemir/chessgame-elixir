"use client";

import { useState } from "react";
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
  LogOut,
  Plus,
  Swords,
  User,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useIdentityStore } from "@/lib/identity-store";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  const [playerName, setPlayerName] = useState("");
  const [newTableName, setNewTableName] = useState("");
  const [showCreateTable, setShowCreateTable] = useState(false);
  const [isPlayerNameSet, setIsPlayerNameSet] = useState(false);
  const router = useRouter();

  const {
    tables,
    currentTable,
    players,
    createTable,
    joinTable,
    leaveTable,
    setPlayerReady,
    setCurrentPlayer,
    startGame,
    gameState,
  } = useChessStore();

  const { ensureIdentity, currentPlayer } = useIdentityStore();

  const handleSetPlayerName = () => {
    if (playerName.trim()) {
      const player = ensureIdentity(playerName.trim());
      setCurrentPlayer(player);
      setIsPlayerNameSet(true);

      console.log("✅ Oyuncu store’a kaydedildi:", player);
      setIsPlayerNameSet(true);
    }
  };

  const handleCreateTable = () => {
    if (newTableName.trim() && isPlayerNameSet && currentPlayer) {
      console.log("🧩 Masa oluşturma başlatıldı:", {
        tableName: newTableName,
        playerName,
        currentPlayer,
      });

      const tableId = createTable(newTableName.trim(), currentPlayer);

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
        isPlayerNameSet,
        currentPlayer,
      });
    }
  };

  const handleJoinTable = (tableId: string) => {
    if (isPlayerNameSet) {
      joinTable(tableId, playerName);
    }
  };

  const handleLeaveTable = () => {
    leaveTable();
  };

  const handleReady = () => {
    if (currentPlayer) {
      const player = players.find((p) => p.id === currentPlayer.id);
      setPlayerReady(currentPlayer.id, !player?.isReady);
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

    if (table && table.ownerId === currentPlayer?.id) {
      useChessStore.setState((state) => ({
        tables: state.tables.filter((t) => t.id !== tableId),
      }));
    }
  };

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
                    key={player.id}
                    className={
                      currentPlayer?.id === player.id ? "border-primary" : ""
                    }
                  >
                    <CardContent className="flex items-center justify-between p-3 sm:p-4 gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0 text-sm sm:text-base">
                          {player.name[0].toUpperCase()}
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
                            {currentPlayer?.id === player.id && (
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
                  players.find((p) => p.id === currentPlayer.id)?.isReady
                    ? "outline"
                    : "default"
                }
              >
                {players.find((p) => p.id === currentPlayer.id)?.isReady
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
    <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] p-3 sm:p-4 md:p-8 lg:ml-64">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {!isPlayerNameSet ? (
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
          <>
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-base sm:text-lg">
                      {playerName[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-base sm:text-lg">
                        {playerName}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Oyuncu
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowCreateTable(!showCreateTable)}
                    variant="default"
                    size="default"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Masa Oluştur
                  </Button>
                </div>
              </CardHeader>

              {showCreateTable && (
                <CardContent className="p-4 sm:p-6 pt-0">
                  <Card className="border-primary">
                    <CardContent className="p-3 sm:p-4 space-y-3">
                      <Input
                        placeholder="Masa adı"
                        value={newTableName}
                        onChange={(e) => setNewTableName(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleCreateTable()
                        }
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleCreateTable}
                          disabled={!newTableName.trim()}
                          className="flex-1"
                        >
                          Oluştur
                        </Button>
                        <Button
                          onClick={() => setShowCreateTable(false)}
                          variant="outline"
                          className="flex-1"
                        >
                          İptal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              )}
            </Card>

            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 px-1">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                Açık Masalar (
                {tables.filter((t) => t.status === "waiting").length})
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {tables.map((table) => (
                  <Card
                    key={table.id}
                    className={table.status === "playing" ? "opacity-60" : ""}
                  >
                    <CardContent className="p-3 sm:p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-base sm:text-lg truncate">
                              {table.name}
                            </h4>
                            {table.ownerId === currentPlayer?.id && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 shrink-0"
                                onClick={() => deleteTable(table.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Clock className="w-3 h-3 shrink-0" />
                            <span>{formatTime(table.createdAt)}</span>
                            {table.ownerName && (
                              <>
                                <span>•</span>
                                <span className="truncate">
                                  Sahibi: {table.ownerName}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <Badge
                          variant={
                            table.status === "waiting"
                              ? "default"
                              : table.status === "playing"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs shrink-0"
                        >
                          {table.status === "waiting"
                            ? "Bekliyor"
                            : table.status === "playing"
                            ? "Oyunda"
                            : "Bitti"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                        <span className="text-xs sm:text-sm font-medium">
                          {table.players.length}/{table.maxPlayers} Oyuncu
                        </span>
                      </div>

                      {table.players.length > 0 && (
                        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                          {table.players.map((player) => (
                            <Badge
                              key={player.id}
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
                          table.players.length >= table.maxPlayers ||
                          table.status !== "waiting"
                        }
                        className="w-full"
                        size="sm"
                      >
                        {table.status === "playing"
                          ? "Oyunda"
                          : table.players.length >= table.maxPlayers
                          ? "Dolu"
                          : "Katıl"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default PageClient;
