"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Gamepad2,
  Crown,
  MessageSquare,
  UserPlus,
  Shield,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const getPlayerData = (username: string) => ({
  username: username,
  fullName: "Test User",
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
    {
      id: 1,
      opponent: "TurkeyKnight",
      result: "win",
      moves: 42,
      date: "2024-04-15",
      rating: "+12",
    },
    {
      id: 2,
      opponent: "IstanbulPro",
      result: "loss",
      moves: 38,
      date: "2024-04-14",
      rating: "-8",
    },
    {
      id: 3,
      opponent: "AnkaraChess",
      result: "win",
      moves: 51,
      date: "2024-04-14",
      rating: "+10",
    },
    {
      id: 4,
      opponent: "SmyrnaKing",
      result: "draw",
      moves: 67,
      date: "2024-04-13",
      rating: "0",
    },
    {
      id: 5,
      opponent: "BosphorusGM",
      result: "win",
      moves: 45,
      date: "2024-04-12",
      rating: "+15",
    },
  ],
  achievements: [
    { id: 1, name: "İlk Zafer", icon: Trophy, earned: true },
    { id: 2, name: "10 Galibiyet", icon: Target, earned: true },
    { id: 3, name: "Hızlı Oyuncu", icon: Clock, earned: true },
    { id: 4, name: "100 Oyun", icon: Gamepad2, earned: true },
    { id: 5, name: "Turnuva Şampiyonu", icon: Crown, earned: false },
  ],
});

export default function ProfilePageClient({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddFriendDialog, setShowAddFriendDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [friendNote, setFriendNote] = useState("");

  const { toast } = useToast();
  const router = useRouter();

  const player = getPlayerData(username);

  const handleAddFriend = () => {
    toast({
      title: "Arkadaşlık İsteği Gönderildi",
      description: `${player.username} kullanıcısına arkadaşlık isteği gönderildi.`,
    });
    setShowAddFriendDialog(false);
    setFriendNote("");
  };

  const handleSendMessage = () => {
    // Navigate to chat page with username
    router.push(`/chat?user=${player.username}`);
  };

  const handleReport = () => {
    if (!reportReason || !reportDetails.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen rapor sebebi ve detaylarını doldurun.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Rapor Gönderildi",
      description: `${player.username} kullanıcısı için raporunuz alındı. İncelenecektir.`,
    });
    setShowReportDialog(false);
    setReportReason("");
    setReportDetails("");
  };

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
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
              />
              {(player?.username ?? username ?? "??").slice(0, 2).toUpperCase()}
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold">{player.username}</h1>
                <Badge variant="outline" className="text-lg px-3">
                  {player.rating} ELO
                </Badge>
                <Badge>
                  <img
                    src={`https://flagcdn.com/w20/${player.country.toLowerCase()}.png`}
                    alt={player.country}
                    className="mr-1"
                  />
                  {player.country}
                </Badge>
              </div>
              <p className="text-muted-foreground">{player.fullName}</p>
              <p className="text-sm">{player.bio}</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={() => setShowAddFriendDialog(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Arkadaş Ekle
                </Button>
                <Button size="sm" variant="outline" onClick={handleSendMessage}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Mesaj Gönder
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowReportDialog(true)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Rapor Et
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Toplam Oyun
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{player.stats.totalGames}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <Gamepad2 className="w-3 h-3 mr-1" />
              Tamamlanmış
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Kazanma Oranı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {player.stats.winRate}%
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <Trophy className="w-3 h-3 mr-1" />
              {player.stats.wins} Galibiyet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Seri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {player.stats.currentStreak}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Ardışık Galibiyet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Berabere
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{player.stats.draws}</div>
            <p className="text-xs text-muted-foreground">
              Oyunların %
              {((player.stats.draws / player.stats.totalGames) * 100).toFixed(
                1
              )}
              'i
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
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
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${player.stats.winRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {player.stats.wins}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Berabere</span>
                  <div className="flex items-center gap-2">
                    <div className="w-48 bg-muted rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (player.stats.draws / player.stats.totalGames) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {player.stats.draws}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mağlubiyet</span>
                  <div className="flex items-center gap-2">
                    <div className="w-48 bg-muted rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (player.stats.losses / player.stats.totalGames) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {player.stats.losses}
                    </span>
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
                  <span className="text-sm text-muted-foreground">
                    Üyelik Tarihi
                  </span>
                  <span className="text-sm font-medium">
                    {new Date(player.joined).toLocaleDateString("tr-TR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ülke</span>
                  <span className="text-sm font-medium">{player.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <span className="text-sm font-medium">
                    {player.rating} ELO
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Toplam Oyun
                  </span>
                  <span className="text-sm font-medium">
                    {player.stats.totalGames}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="games">
          <Card>
            <CardHeader>
              <CardTitle>Son Oyunlar</CardTitle>
              <CardDescription>
                Son oynanan {player.recentGames.length} oyun
              </CardDescription>
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
                  {player.recentGames.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell className="font-medium">
                        {game.opponent}
                      </TableCell>
                      <TableCell>{getResultBadge(game.result)}</TableCell>
                      <TableCell>{game.moves}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(game.date).toLocaleDateString("tr-TR")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${
                            game.rating.startsWith("+")
                              ? "text-green-600"
                              : game.rating.startsWith("-")
                              ? "text-red-600"
                              : "text-muted-foreground"
                          }`}
                        >
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
              <CardDescription>
                Kazanılmış rozetler ve başarılar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {player.achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={
                      achievement.earned ? "border-primary" : "opacity-50"
                    }
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <div
                        className={`p-3 rounded-full ${
                          achievement.earned
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.earned ? "Kazanıldı" : "Kilitli"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAddFriendDialog} onOpenChange={setShowAddFriendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Arkadaş Ekle</DialogTitle>
            <DialogDescription>
              {player.username} kullanıcısına arkadaşlık isteği göndermek
              üzeresiniz.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="friend-note">Not (Opsiyonel)</Label>
              <Textarea
                id="friend-note"
                placeholder="Arkadaşlık isteğinize bir not ekleyebilirsiniz..."
                value={friendNote}
                onChange={(e) => setFriendNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddFriendDialog(false)}
            >
              İptal
            </Button>
            <Button onClick={handleAddFriend}>İstek Gönder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kullanıcıyı Rapor Et</DialogTitle>
            <DialogDescription>
              {player.username} kullanıcısını bildirmek için lütfen sebebini ve
              detayları belirtin.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-reason">Rapor Sebebi</Label>
              <Select value={reportReason} onValueChange={setReportReason}>
                <SelectTrigger id="report-reason">
                  <SelectValue placeholder="Bir sebep seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="harassment">
                    Taciz / Rahatsız Etme
                  </SelectItem>
                  <SelectItem value="offensive">
                    Saldırgan Dil / İçerik
                  </SelectItem>
                  <SelectItem value="cheating">Hile / Aldatma</SelectItem>
                  <SelectItem value="spam">Spam / Reklam</SelectItem>
                  <SelectItem value="inappropriate">Uygunsuz Profil</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-details">Detaylar</Label>
              <Textarea
                id="report-details"
                placeholder="Lütfen durumu detaylı olarak açıklayın..."
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReportDialog(false)}
            >
              İptal
            </Button>
            <Button variant="destructive" onClick={handleReport}>
              Rapor Gönder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
