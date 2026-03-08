"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  Download,
  Eye,
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import Link from "next/link";

interface Game {
  id: string;
  date: string;
  result: "win" | "loss" | "draw";
  yourColor: "white" | "black";
  moves: number;
  opening: string;
  timeControl: string;
  yourElo: number;
  opponentElo: number;
}

const friends = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    username: "ahmet_chess",
    avatar: "/turkish-male-chess-player.jpg",
    elo: 1850,
  },
  {
    id: "2",
    name: "Zeynep Kaya",
    username: "zeynep_master",
    avatar: "/turkish-female-chess-player.jpg",
    elo: 2100,
  },
  {
    id: "3",
    name: "Mehmet Demir",
    username: "mehmet_gambit",
    avatar: "/turkish-chess-player-2.jpg",
    elo: 1650,
  },
  {
    id: "4",
    name: "Ayşe Şahin",
    username: "ayse_queen",
    avatar: "/female-chess-player-avatar.jpg",
    elo: 1920,
  },
  {
    id: "5",
    name: "Can Özkan",
    username: "can_knight",
    avatar: "/male-chess-player-avatar.jpg",
    elo: 1780,
  },
];

const gamesData: Record<string, Game[]> = {
  "1": [
    {
      id: "1",
      date: "15 Ocak 2025",
      result: "win",
      yourColor: "white",
      moves: 42,
      opening: "İtalyan Oyunu",
      timeControl: "10+0",
      yourElo: 1842,
      opponentElo: 1850,
    },
    {
      id: "2",
      date: "14 Ocak 2025",
      result: "loss",
      yourColor: "black",
      moves: 38,
      opening: "İspanyol Açılışı",
      timeControl: "10+0",
      yourElo: 1850,
      opponentElo: 1845,
    },
    {
      id: "3",
      date: "13 Ocak 2025",
      result: "draw",
      yourColor: "white",
      moves: 56,
      opening: "Vezir Gambiti",
      timeControl: "15+10",
      yourElo: 1848,
      opponentElo: 1847,
    },
  ],
  "2": [
    {
      id: "4",
      date: "14 Ocak 2025",
      result: "loss",
      yourColor: "white",
      moves: 35,
      opening: "Sicilya Savunması",
      timeControl: "10+0",
      yourElo: 1845,
      opponentElo: 2100,
    },
    {
      id: "5",
      date: "12 Ocak 2025",
      result: "loss",
      yourColor: "black",
      moves: 41,
      opening: "Fransız Savunması",
      timeControl: "15+10",
      yourElo: 1850,
      opponentElo: 2095,
    },
  ],
  "3": [
    {
      id: "6",
      date: "15 Ocak 2025",
      result: "win",
      yourColor: "black",
      moves: 48,
      opening: "Karo-Kann Savunması",
      timeControl: "10+0",
      yourElo: 1838,
      opponentElo: 1650,
    },
    {
      id: "7",
      date: "13 Ocak 2025",
      result: "win",
      yourColor: "white",
      moves: 32,
      opening: "Londra Sistemi",
      timeControl: "5+3",
      yourElo: 1835,
      opponentElo: 1645,
    },
    {
      id: "8",
      date: "11 Ocak 2025",
      result: "draw",
      yourColor: "black",
      moves: 62,
      opening: "Vezir Gambiti",
      timeControl: "15+10",
      yourElo: 1832,
      opponentElo: 1648,
    },
  ],
  "4": [
    {
      id: "9",
      date: "14 Ocak 2025",
      result: "win",
      yourColor: "white",
      moves: 45,
      opening: "İngiliz Açılışı",
      timeControl: "10+0",
      yourElo: 1840,
      opponentElo: 1920,
    },
    {
      id: "10",
      date: "10 Ocak 2025",
      result: "loss",
      yourColor: "black",
      moves: 39,
      opening: "Sicilya Savunması",
      timeControl: "10+0",
      yourElo: 1845,
      opponentElo: 1918,
    },
  ],
  "5": [
    {
      id: "11",
      date: "15 Ocak 2025",
      result: "win",
      yourColor: "white",
      moves: 40,
      opening: "İtalyan Oyunu",
      timeControl: "10+0",
      yourElo: 1843,
      opponentElo: 1780,
    },
  ],
};
interface PageClientProps {
  id: string;
}

export default function PageClient({ id }: PageClientProps) {
  const friend = friends.find((f) => f.id === id);
  const games = gamesData[id] || [];

  if (!friend) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-muted-foreground">
            Arkadaş bulunamadı
          </p>
        </div>
      </div>
    );
  }

  const wins = games.filter((g) => g.result === "win").length;
  const losses = games.filter((g) => g.result === "loss").length;
  const draws = games.filter((g) => g.result === "draw").length;
  const winRate =
    games.length > 0 ? ((wins / games.length) * 100).toFixed(0) : 0;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Button */}
        <Link href="/friends">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Arkadaşlara Dön
          </Button>
        </Link>

        {/* Friend Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={friend.avatar || "/placeholder.svg"}
                  alt={friend.name}
                />
                <AvatarFallback>{friend.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <h1 className="text-2xl font-bold">{friend.name}</h1>
                  <Badge variant="secondary">{friend.elo} ELO</Badge>
                </div>
                <p className="text-muted-foreground">@{friend.username}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Toplam Oyun</p>
              <p className="text-3xl font-bold mt-1">{games.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Galibiyet</p>
              <p className="text-3xl font-bold mt-1 text-green-500">{wins}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Mağlubiyet</p>
              <p className="text-3xl font-bold mt-1 text-red-500">{losses}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Kazanma Oranı</p>
              <p className="text-3xl font-bold mt-1">{winRate}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Games List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Oyun Geçmişi</h2>
          {games.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Bu arkadaşınızla henüz oyun oynamadınız
                </p>
              </CardContent>
            </Card>
          ) : (
            games.map((game) => (
              <Card
                key={game.id}
                className="hover:bg-accent/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                          game.result === "win"
                            ? "bg-green-500/20 text-green-500"
                            : game.result === "loss"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {game.result === "win" ? (
                          <Trophy className="w-6 h-6" />
                        ) : game.result === "loss" ? (
                          <TrendingDown className="w-6 h-6" />
                        ) : (
                          <Minus className="w-6 h-6" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant={
                              game.result === "win"
                                ? "default"
                                : game.result === "loss"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {game.result === "win"
                              ? "Galibiyet"
                              : game.result === "loss"
                              ? "Mağlubiyet"
                              : "Berabere"}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {game.yourColor === "white"
                              ? "⚪ Beyaz"
                              : "⚫ Siyah"}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{game.opening}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>{game.date}</span>
                          <span>•</span>
                          <span>{game.moves} hamle</span>
                          <span>•</span>
                          <span>{game.timeControl}</span>
                          <span>•</span>
                          <span>
                            {game.yourElo} vs {game.opponentElo}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        İncele
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
