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
import { Users, Crown, Swords, Plus, LogOut, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  const [playerName, setPlayerName] = useState("");
  const [newTableName, setNewTableName] = useState("");
  const [showCreateTable, setShowCreateTable] = useState(false);
  const router = useRouter();

  const {
    tables,
    currentTable,
    currentPlayer,
    players,
    createTable,
    joinTable,
    leaveTable,
    setPlayerReady,
    startGame,
    gameState,
  } = useChessStore();

  const handleCreateTable = () => {
    if (newTableName.trim()) {
      createTable(newTableName.trim());
      setNewTableName("");
      setShowCreateTable(false);
    }
  };

  const handleJoinTable = (tableId: string) => {
    if (playerName.trim()) {
      joinTable(tableId, playerName.trim());
      setPlayerName("");
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

  if (currentTable) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex items-center justify-center p-3 sm:p-4">
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
    <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] p-3 sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        <Card>
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <CardTitle className="text-2xl sm:text-4xl font-bold">
                Satranç Lobi
              </CardTitle>
              <Swords className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <CardDescription className="text-sm sm:text-base">
              Bir masaya katılın veya yeni masa oluşturun
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Adınızı girin"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={() => setShowCreateTable(!showCreateTable)}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yeni Masa
              </Button>
            </div>

            {showCreateTable && (
              <Card className="border-primary">
                <CardContent className="p-3 sm:p-4 space-y-3">
                  <Input
                    placeholder="Masa adı"
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateTable()}
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
                      className="flex-1 sm:flex-none"
                    >
                      İptal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 px-1">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            Açık Masalar ({tables.filter((t) => t.status === "waiting").length})
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
                      <h4 className="font-semibold text-base sm:text-lg truncate">
                        {table.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span>{formatTime(table.createdAt)}</span>
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
                      !playerName.trim() ||
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

                  {table.status === "playing" && (
                    <Button
                      onClick={() => router.push(`/spectate/${table.id}`)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      👁️ İzle
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageClient;
