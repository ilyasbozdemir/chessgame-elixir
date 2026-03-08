"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Crown, TrendingUp, TrendingDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const mockLeaderboard = [
  {
    rank: 1,
    name: "Ayşe Kaya",
    avatar: "AK",
    rating: 2350,
    gamesPlayed: 567,
    winRate: 68,
    trend: "up",
    country: "TR",
  },
  {
    rank: 2,
    name: "Mehmet Demir",
    avatar: "MD",
    rating: 2280,
    gamesPlayed: 423,
    winRate: 65,
    trend: "up",
    country: "TR",
  },
  {
    rank: 3,
    name: "Fatma Şahin",
    avatar: "FS",
    rating: 2210,
    gamesPlayed: 389,
    winRate: 63,
    trend: "down",
    country: "TR",
  },
  {
    rank: 4,
    name: "Ali Çelik",
    avatar: "AÇ",
    rating: 0,
    gamesPlayed: 512,
    winRate: 61,
    trend: "up",
    country: "TR",
  },
  {
    rank: 5,
    name: "Zeynep Arslan",
    avatar: "ZA",
    rating: 2100,
    gamesPlayed: 445,
    winRate: 59,
    trend: "same",
    country: "TR",
  },
  {
    rank: 6,
    name: "Ahmet Yılmaz",
    avatar: "AY",
    rating: 2050,
    gamesPlayed: 378,
    winRate: 58,
    trend: "up",
    country: "TR",
  },
  {
    rank: 7,
    name: "Elif Yıldız",
    avatar: "EY",
    rating: 2020,
    gamesPlayed: 456,
    winRate: 57,
    trend: "down",
    country: "TR",
  },
  {
    rank: 8,
    name: "Mustafa Öztürk",
    avatar: "MÖ",
    rating: 1980,
    gamesPlayed: 334,
    winRate: 56,
    trend: "up",
    country: "TR",
  },
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return null;
};

const getTrendIcon = (trend: string) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (trend === "down")
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <span className="text-muted-foreground">—</span>;
};

export default function LeaderboardPage() {
  return (
    <React.Fragment>
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold">
                Liderlik Tablosu
              </CardTitle>
            </div>
            <CardDescription>
              En iyi oyuncuları görün ve sıralamada yükselmeye çalışın
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="global">Genel</TabsTrigger>
            <TabsTrigger value="weekly">Haftalık</TabsTrigger>
            <TabsTrigger value="monthly">Aylık</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-3 mt-6">
            <div className="grid gap-3 sm:grid-cols-3 mb-6">
              {mockLeaderboard.slice(0, 3).map((player) => (
                <Card
                  key={player.rank}
                  className={`${
                    player.rank === 1
                      ? "border-yellow-500 bg-yellow-500/5"
                      : player.rank === 2
                      ? "border-gray-400 bg-gray-400/5"
                      : "border-amber-600 bg-amber-600/5"
                  }`}
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      {getRankIcon(player.rank)}
                    </div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                      {player.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{player.name}</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Badge>
                          <img
                            src={`https://flagcdn.com/w20/${player.country.toLowerCase()}.png`}
                            alt={player.country}
                            className="mr-1"
                          />
                        </Badge>
                        <Badge variant="secondary" className="text-sm">
                          {player.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-muted/50 p-2 rounded">
                        <p className="text-muted-foreground">Oyun</p>
                        <p className="font-semibold">{player.gamesPlayed}</p>
                      </div>
                      <div className="bg-muted/50 p-2 rounded">
                        <p className="text-muted-foreground">Kazanma</p>
                        <p className="font-semibold">{player.winRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              {mockLeaderboard.slice(3).map((player) => (
                <Card
                  key={player.rank}
                  className="hover:border-primary transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-center font-bold text-muted-foreground">
                        #{player.rank}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                        {player.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold truncate">
                            {player.name}
                          </p>
                          <img
                            src={`https://flagcdn.com/w20/${player.country.toLowerCase()}.png`}
                            alt={player.country}
                            className="mr-1"
                          />
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{player.gamesPlayed} oyun</span>
                          <span>•</span>
                          <span>{player.winRate}% kazanma</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {getTrendIcon(player.trend)}
                        <Badge variant="secondary" className="text-sm">
                          {player.rating}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Haftalık liderlik tablosu yakında...
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Aylık liderlik tablosu yakında...
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </React.Fragment>
  );
}
