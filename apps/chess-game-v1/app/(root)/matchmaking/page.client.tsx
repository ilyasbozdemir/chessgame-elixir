"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Loader2,
  Users,
  Clock,
  Zap,
  Trophy,
  Search,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import {
  findBestMatch,
  estimateWaitTime,
  expandRatingRange,
  type MatchmakingPlayer,
} from "@/lib/matchmaking-algorithm";

export default function MatchmakingPageClient() {
  const player = {
    _id: "mock-user-1",
    name: "GuestPlayer",
    rating: 1650,
    gamesPlayed: 120,
    gamesWon: 72,
  };
  const router = useRouter();

  const [isSearching, setIsSearching] = useState(false);
  const [waitTime, setWaitTime] = useState(0);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [estimatedWait, setEstimatedWait] = useState(0);

  // Matchmaking preferences
  const [timeControl, setTimeControl] = useState("5+0");
  const [ratingRange, setRatingRange] = useState([200]);
  const [colorPreference, setColorPreference] = useState<
    "white" | "black" | "random"
  >("random");
  const [autoAccept, setAutoAccept] = useState(true);

  // Mock queue data
  const [queue, setQueue] = useState<MatchmakingPlayer[]>([
    {
      id: "q1",
      name: "TurkeyMaster",
      rating: 1850,
      timeControl: "5+0",
      joinedAt: new Date(Date.now() - 45000),
      preferences: {},
    },
    {
      id: "q2",
      name: "IstanbulPro",
      rating: 1920,
      timeControl: "10+0",
      joinedAt: new Date(Date.now() - 30000),
      preferences: {},
    },
    {
      id: "q3",
      name: "AnkaraStar",
      rating: 1780,
      timeControl: "5+0",
      joinedAt: new Date(Date.now() - 60000),
      preferences: {},
    },
  ]);

  // Timer for wait time
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isSearching) {
      interval = setInterval(() => {
        setWaitTime((prev) => prev + 1);
      }, 1000);
    } else {
      setWaitTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSearching]);

  // Simulate matchmaking
  useEffect(() => {
    if (!isSearching || !player) return;

    const checkInterval = setInterval(() => {
      const currentPlayer: MatchmakingPlayer = {
        id: player._id?.toString() || "current",
        name: player.name,
        rating: player.rating || 1500,
        timeControl,
        joinedAt: new Date(Date.now() - waitTime * 1000),
        preferences: {
          minRating: (player.rating || 1500) - ratingRange[0],
          maxRating: (player.rating || 1500) + ratingRange[0],
          color: colorPreference,
        },
      };

      // Expand rating range if waiting too long
      const expandedPlayer = expandRatingRange(currentPlayer, waitTime);
      const match = findBestMatch(expandedPlayer, queue);

      if (match) {
        // Found a match!
        setIsSearching(false);
        toast.success("Rakip bulundu!", {
          description: `${match.name} (${match.rating}) ile eşleştirildiniz`,
        });

        setTimeout(() => {
          //router.push(`/game/-${'6921edf82bcd7fd0960bb0fe'}`);
        }, 2000);
      } else {
        // Update estimated wait time
        const estimated = estimateWaitTime(expandedPlayer, queue);
        setEstimatedWait(estimated);
      }
    }, 3000);

    return () => clearInterval(checkInterval);
  }, [
    isSearching,
    player,
    timeControl,
    ratingRange,
    colorPreference,
    waitTime,
    queue,
    router,
  ]);

  const startMatchmaking = () => {
    if (!player) {
      toast.error("Giriş yapmanız gerekiyor");
      router.push("/login");
      return;
    }

    setIsSearching(true);
    setQueuePosition(Math.floor(Math.random() * 5) + 1);
    toast.info("Rakip aranıyor...", {
      description: "Size uygun bir rakip bulunuyor",
    });
  };

  const cancelMatchmaking = () => {
    setIsSearching(false);
    setQueuePosition(null);
    toast.info("Arama iptal edildi");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Otomatik Eşleştirme</h1>
        <p className="text-muted-foreground">
          Rating ve tercihlerinize göre size uygun rakip bulun
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Matchmaking Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Eşleştirme Tercihleri
            </CardTitle>
            <CardDescription>
              Rakip arama kriterlerinizi belirleyin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Time Control */}
            <div className="space-y-2">
              <Label>Zaman Kontrolü</Label>
              <Select
                value={timeControl}
                onValueChange={setTimeControl}
                disabled={isSearching}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1+0">Bullet (1+0)</SelectItem>
                  <SelectItem value="3+0">Blitz (3+0)</SelectItem>
                  <SelectItem value="5+0">Blitz (5+0)</SelectItem>
                  <SelectItem value="10+0">Rapid (10+0)</SelectItem>
                  <SelectItem value="15+10">Rapid (15+10)</SelectItem>
                  <SelectItem value="30+0">Classical (30+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rating Range */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Rating Aralığı</Label>
                <Badge variant="secondary">±{ratingRange[0]}</Badge>
              </div>
              <Slider
                value={ratingRange}
                onValueChange={setRatingRange}
                min={50}
                max={500}
                step={50}
                disabled={isSearching}
              />
              <p className="text-xs text-muted-foreground">
                {player?.rating ? (
                  <>
                    {player.rating - ratingRange[0]} -{" "}
                    {player.rating + ratingRange[0]} arası oyuncular
                  </>
                ) : (
                  "Giriş yapın"
                )}
              </p>
            </div>

            {/* Color Preference */}
            <div className="space-y-2">
              <Label>Renk Tercihi</Label>
              <Select
                value={colorPreference}
                onValueChange={(v: any) => setColorPreference(v)}
                disabled={isSearching}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Rastgele</SelectItem>
                  <SelectItem value="white">Beyaz</SelectItem>
                  <SelectItem value="black">Siyah</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Auto Accept */}
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-accept">Otomatik Kabul</Label>
              <Switch
                id="auto-accept"
                checked={autoAccept}
                onCheckedChange={setAutoAccept}
                disabled={isSearching}
              />
            </div>

            {/* Start/Cancel Button */}
            {!isSearching ? (
              <Button onClick={startMatchmaking} className="w-full" size="lg">
                <Search className="h-4 w-4 mr-2" />
                Rakip Ara
              </Button>
            ) : (
              <Button
                onClick={cancelMatchmaking}
                variant="destructive"
                className="w-full"
                size="lg"
              >
                Aramayı İptal Et
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Status & Queue Info */}
        <div className="space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isSearching ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Rakip Aranıyor
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    Hazır
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {isSearching
                  ? "Size uygun bir rakip bulunuyor..."
                  : "Eşleştirme başlatmak için ayarlarınızı yapın"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isSearching && (
                <>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Bekleme Süresi
                      </span>
                    </div>
                    <Badge variant="outline">{formatTime(waitTime)}</Badge>
                  </div>

                  {queuePosition && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="text-sm font-medium">Sıra</span>
                      </div>
                      <Badge variant="outline">#{queuePosition}</Badge>
                    </div>
                  )}

                  {estimatedWait > 0 && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Tahmini Süre
                        </span>
                      </div>
                      <Badge variant="outline">~{estimatedWait}s</Badge>
                    </div>
                  )}
                </>
              )}

              {!isSearching && player && (
                <div className="space-y-2 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Rating
                    </span>
                    <span className="font-semibold">
                      {player.rating || 1500}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Oyun Sayısı
                    </span>
                    <span className="font-semibold">
                      {player.gamesPlayed || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Kazanma Oranı
                    </span>
                    <span className="font-semibold">
                      {player.gamesPlayed
                        ? Math.round(
                            ((player.gamesWon || 0) / player.gamesPlayed) * 100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Queue Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Kuyruk İstatistikleri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Bekleyen Oyuncu
                </span>
                <Badge>{queue.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Zaman Kontrolü: {timeControl}
                </span>
                <Badge variant="secondary">
                  {queue.filter((p) => p.timeControl === timeControl).length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Ortalama Bekleme
                </span>
                <Badge variant="outline">~45s</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
