"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Clock,
  Trophy,
  Crown,
  Calendar,
  Users,
  Heart,
  MessageCircle,
  Share2,
  UserPlus,
  Rewind,
  PlayCircleIcon,
  FastForward,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ChessBoardUI from "@/components/chess-board";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Link from "next/link";

const mockLiveGames = [
  {
    id: "game-1",
    whitePlayer: "Ahmet Yılmaz",
    blackPlayer: "Mehmet Demir",
    whiteRating: 1850,
    blackRating: 1920,
    viewers: 45,
    duration: "12:34",
    status: "playing" as const,
  },
  {
    id: "game-2",
    whitePlayer: "Ayşe Kaya",
    blackPlayer: "Fatma Şahin",
    whiteRating: 2100,
    blackRating: 2050,
    viewers: 128,
    duration: "08:15",
    status: "playing" as const,
  },
  {
    id: "game-3",
    whitePlayer: "Ali Çelik",
    blackPlayer: "Zeynep Arslan",
    whiteRating: 1650,
    blackRating: 1680,
    viewers: 23,
    duration: "25:47",
    status: "playing" as const,
  },
  {
    id: "game-4",
    whitePlayer: "Mustafa Öztürk",
    blackPlayer: "Elif Yıldız",
    whiteRating: 1980,
    blackRating: 1995,
    viewers: 67,
    duration: "18:22",
    status: "playing" as const,
  },
];

const mockFriends = [
  {
    id: "user-1",
    username: "ahmetyilmaz",
    name: "Ahmet Yılmaz",
    avatar: "AY",
    rating: 1850,
    status: "online",
    gamesPlayed: 234,
  },
  {
    id: "user-2",
    username: "aysekaya",
    name: "Ayşe Kaya",
    avatar: "AK",
    rating: 2100,
    status: "playing",
    gamesPlayed: 567,
  },
  {
    id: "user-3",
    username: "mehmetdemir",
    name: "Mehmet Demir",
    avatar: "MD",
    rating: 1920,
    status: "offline",
    gamesPlayed: 189,
  },
];

const mockPosts = [
  {
    id: "post-1",
    author: "Fatma Şahin",
    username: "fatmasahin",
    avatar: "FS",
    rating: 2050,
    time: "2 saat önce",
    content:
      "Bugün harika bir oyun oynadım! Mat in 3 ile kazandım. Satranç ne kadar güzel bir oyun 🎯",
    likes: 45,
    comments: 12,
    shares: 3,
  },
  {
    id: "post-2",
    author: "Ali Çelik",
    username: "alicelik",
    avatar: "AÇ",
    rating: 1650,
    time: "5 saat önce",
    content:
      "Yeni açılış stratejisi öğreniyorum. İtalyan Oyunu gerçekten çok etkili! Tavsiye ederim.",
    likes: 23,
    comments: 8,
    shares: 5,
  },
  {
    id: "post-3",
    author: "Zeynep Arslan",
    username: "zeyneparslan",
    avatar: "ZA",
    rating: 1680,
    time: "1 gün önce",
    content: "Turnuvada 3. oldum! Çok mutluyum 🏆 Herkese teşekkürler!",
    likes: 89,
    comments: 34,
    shares: 12,
  },
];

const upcomingTournaments = [
  {
    id: 1,
    name: "Haftalık Blitz Turnuvası",
    date: "15 Mayıs 2025",
    participants: 64,
    prize: "1000 Puan",
  },
  {
    id: 2,
    name: "Aylık Rapid Şampiyonası",
    date: "20 Mayıs 2025",
    participants: 128,
    prize: "5000 Puan",
  },
];

export default function WatchPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  if (selectedGame) {
    return (
      <React.Fragment>
        <div className="p-3 sm:p-4">
          <Button
            variant="outline"
            onClick={() => setSelectedGame(null)}
            className="mb-4"
          >
            ← Geri Dön
          </Button>
        </div>
        <ChessBoardUI mode="spectate" tableId={selectedGame} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="max-w-6xl mx-auto space-y-6">
        <Tabs defaultValue="live" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="live">Canlı İzle</TabsTrigger>
            <TabsTrigger value="replay">Geçmiş Oyunlar</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            <Card>
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Eye className="w-8 h-8 text-primary" />
                  <CardTitle className="text-3xl font-bold">
                    Canlı Maçları İzle
                  </CardTitle>
                </div>
                <CardDescription>
                  Devam eden maçları gerçek zamanlı takip edin
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Canlı Oyunlar ({mockLiveGames.length})
                </h3>
                <Badge variant="secondary" className="animate-pulse">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 inline-block" />
                  CANLI
                </Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {mockLiveGames.map((game) => (
                  <Card
                    key={game.id}
                    className="hover:border-primary transition-colors cursor-pointer"
                    onClick={() => setSelectedGame(game.id)}
                  >
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {game.viewers} izleyici
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{game.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              ⚪
                            </Badge>
                            <span className="font-semibold text-sm">
                              {game.whitePlayer}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {game.whiteRating}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-center">
                          <span className="text-xs text-muted-foreground font-medium">
                            VS
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              ⚫
                            </Badge>
                            <span className="font-semibold text-sm">
                              {game.blackPlayer}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {game.blackRating}
                          </Badge>
                        </div>
                      </div>

                      <Button className="w-full" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        İzle
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="replay" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Oyun Tekrarı</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ChessBoardUI
                  mode="replay"
                  tableId={selectedGame as "play" | "spectate" | "replay"}
                />
                <div className="flex items-center justify-center gap-3">
                  <Button variant="outline" size="sm">
                    <Rewind className="w-4 h-4" />
                  </Button>
                  <Button size="sm">
                    <PlayCircleIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <FastForward className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </React.Fragment>
  );
}
