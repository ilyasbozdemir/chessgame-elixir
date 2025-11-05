"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChessStore } from "@/lib/chess-store";
import { Crown, LogOut, Swords, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePlayer } from "@/context/player-context";
import { useRouter } from "next/navigation";

interface PageClientProps {
  id: string;
}

export default function PageClient({ id }: PageClientProps) {
  const { player } = usePlayer();
  const router = useRouter();

  const leaveTable = useChessStore((s) => s.leaveTable);
  const startGame = useChessStore((s) => s.startGame);
  const gameState = useChessStore((s) => s.gameState);
  const setPlayerReady = useChessStore((s) => s.setPlayerReady);

  const tables = useChessStore((s) => s.tables);
  const table = tables.find((t) => t._id?.toString() === id);

  const handleStartGame = () => {
    startGame();
    router.push("/game");
  };

  const handleLeaveTable = () => {
    router.push(`/lobby`);
  };

  const canStartGame = (): Boolean => {
    // TODO

    return true;
  };

  const handleReady = () => {
    // TODO
  };

  const handleJoinTable = async (tableId: string) => {
    if (player) {
      console.log("🎮 Oyuncu masaya eklendi:", player.name);
    }
  };

  if (!table) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-muted-foreground">
        Masa bulunamadı veya yükleniyor...
      </div>
    );
  }

  return (
    <>

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
                  {table.name}
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
                <span>Oyuncular {(table.players ?? []).length}/ 2</span>
              </div>

              <div className="grid gap-2 sm:gap-3">
                {table.players?.map((player, index) => {
                  if (!player?.name) return null;
                  return (
                    <Card
                      key={player?.id?.toString() + String(index)}
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
                                <Badge variant="secondary" className="text-xs">
                                  Siz
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {table?.players?.find(
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

                {(table?.players ?? []).length < 2 && (
                  <Card className="border-dashed">
                    <CardContent className="flex items-center justify-center p-6 sm:p-8 text-muted-foreground">
                      <p className="text-xs sm:text-sm">Oyuncu bekleniyor...</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {player && table?.players?.length === 2 && (
              <Button
                onClick={handleReady}
                className="w-full"
                size="default"
                variant={
                  table.players.find(
                    (p) => p.id?.toString() === player._id?.toString()
                  )?.isReady
                    ? "outline"
                    : "default"
                }
              >
                {table.players.find(
                  (p) => p.id?.toString() === player._id?.toString()
                )?.isReady
                  ? "Hazır Değilim"
                  : "Hazırım"}
              </Button>
            )}

            {(table.players ?? []).length === 1 && (
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
