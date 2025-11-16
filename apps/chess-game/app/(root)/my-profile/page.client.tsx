"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Target, Clock, TrendingUp, Gamepad2, Crown, Settings, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from "@/context/user-context";

const CURRENT_USER = {
  username: "ilyas-bozdemir",
  fullName: "İlyas Bozdemir",
  rating: 1850,
  country: "TR",
  joined: "2023-06-15",
  bio: "Satranç tutkunuyum. Haftasonları genelde online oynuyorum.",
  stats: {
    totalGames: 456,
    wins: 234,
    draws: 112,
    losses: 110,
    winRate: 51.3,
    currentStreak: 5,
  },
  recentGames: [
    { id: 1, opponent: "TurkeyKnight", result: "win" as const, moves: 42, date: "2024-04-15", rating: "+12" },
    { id: 2, opponent: "IstanbulPro", result: "loss" as const, moves: 38, date: "2024-04-14", rating: "-8" },
    { id: 3, opponent: "AnkaraChess", result: "win" as const, moves: 51, date: "2024-04-14", rating: "+10" },
    { id: 4, opponent: "SmyrnaKing", result: "draw" as const, moves: 67, date: "2024-04-13", rating: "0" },
    { id: 5, opponent: "BosphorusGM", result: "win" as const, moves: 45, date: "2024-04-12", rating: "+15" },
  ],
  achievements: [
    { id: 1, name: "İlk Zafer", icon: Trophy, earned: true },
    { id: 2, name: "10 Galibiyet", icon: Target, earned: true },
    { id: 3, name: "Hızlı Oyuncu", icon: Clock, earned: true },
    { id: 4, name: "100 Oyun", icon: Gamepad2, earned: true },
    { id: 5, name: "Turnuva Şampiyonu", icon: Crown, earned: false },
  ],
};

export default function MyProfilePage() {
  const { user, loading: userLoading, login, logout } = useUser();



  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  const getResultBadge = (result: string) => {
    switch (result) {
      case "win":
        return <Badge className="bg-green-500">Kazandı</Badge>;
      case "loss":
        return <Badge variant="destructive">Kaybetti</Badge>;
      case "draw":
        return <Badge variant="secondary">Berabere</Badge>;
      default:
        return <Badge variant="outline">{result}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${user&& user.displayName}&background=0D8ABC&color=fff`} />
              <AvatarFallback>{user&& user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold">{CURRENT_USER.username}</h1>
                <Badge variant="outline" className="text-lg px-3">{CURRENT_USER.rating} ELO</Badge>
                <Badge>
                  <img src={`https://flagcdn.com/w20/${CURRENT_USER.country.toLowerCase()}.png`} alt={CURRENT_USER.country} className="mr-1" />
                  {CURRENT_USER.country}
                </Badge>
              </div>
              <p className="text-muted-foreground">{CURRENT_USER.fullName}</p>
              <p className="text-sm">{CURRENT_USER.bio}</p>
              
              <div className="flex gap-2 pt-2 flex-wrap">
                <Button size="sm" onClick={() => router.push('/settings')}>
                  <Edit className="w-4 h-4 mr-2" />
                  Profili Düzenle
                </Button>
                <Button size="sm" variant="outline" onClick={() => router.push('/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Ayarlar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Oyun</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{CURRENT_USER.stats.totalGames}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <Gamepad2 className="w-3 h-3 mr-1" />
              Tamamlanmış
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Kazanma Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{CURRENT_USER.stats.winRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <Trophy className="w-3 h-3 mr-1" />
              {CURRENT_USER.stats.wins} Galibiyet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Seri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{CURRENT_USER.stats.currentStreak}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Ardışık Galibiyet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Berabere</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{CURRENT_USER.stats.draws}</div>
            <p className="text-xs text-muted-foreground">
              Oyunların %{((CURRENT_USER.stats.draws / CURRENT_USER.stats.totalGames) * 100).toFixed(1)}'i
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="games">Son Oyunlar</TabsTrigger>
          <TabsTrigger value="achievements">Başarılar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performans</CardTitle>
                <CardDescription>Son 30 günlük istatistikler</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Galibiyet</span>
                  <div className="flex items-center gap-2">
                    <div className="w-48 bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${CURRENT_USER.stats.winRate}%` }} />
                    </div>
                    <span className="text-sm font-medium">{CURRENT_USER.stats.wins}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Berabere</span>
                  <div className="flex items-center gap-2">
                    <div className="w-48 bg-muted rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(CURRENT_USER.stats.draws / CURRENT_USER.stats.totalGames) * 100}%` }} />
                    </div>
                    <span className="text-sm font-medium">{CURRENT_USER.stats.draws}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mağlubiyet</span>
                  <div className="flex items-center gap-2">
                    <div className="w-48 bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(CURRENT_USER.stats.losses / CURRENT_USER.stats.totalGames) * 100}%` }} />
                    </div>
                    <span className="text-sm font-medium">{CURRENT_USER.stats.losses}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Oyuncu Bilgileri</CardTitle>
                <CardDescription>Hesap detayları</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Üyelik Tarihi</span>
                  <span className="text-sm font-medium">{new Date(CURRENT_USER.joined).toLocaleDateString("tr-TR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ülke</span>
                  <span className="text-sm font-medium">{CURRENT_USER.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <span className="text-sm font-medium">{CURRENT_USER.rating} ELO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Toplam Oyun</span>
                  <span className="text-sm font-medium">{CURRENT_USER.stats.totalGames}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="games">
          <Card>
            <CardHeader>
              <CardTitle>Son Oyunlar</CardTitle>
              <CardDescription>Son oynanan {CURRENT_USER.recentGames.length} oyun</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rakip</TableHead>
                    <TableHead>Sonuç</TableHead>
                    <TableHead>Hamle</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Rating Değişimi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CURRENT_USER.recentGames.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell className="font-medium">{game.opponent}</TableCell>
                      <TableCell>{getResultBadge(game.result)}</TableCell>
                      <TableCell>{game.moves}</TableCell>
                      <TableCell className="text-muted-foreground">{new Date(game.date).toLocaleDateString("tr-TR")}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${game.rating.startsWith("+") ? "text-green-600" : game.rating.startsWith("-") ? "text-red-600" : "text-muted-foreground"}`}>
                          {game.rating}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Başarılar</CardTitle>
              <CardDescription>Kazanılmış rozetler ve başarılar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {CURRENT_USER.achievements.map((achievement) => (
                  <Card key={achievement.id} className={achievement.earned ? "border-primary" : "opacity-50"}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className={`p-3 rounded-full ${achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">{achievement.earned ? "Kazanıldı" : "Kilitli"}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
