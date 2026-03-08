"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Clock, Gamepad2, Crown, Flame, Zap, Star, Award, Medal, Swords, Shield, Brain, TrendingUp, Users } from 'lucide-react'

type Achievement = {
  id: number
  name: string
  description: string
  icon: any
  category: "oyun" | "zafer" | "sosyal" | "beceri"
  earned: boolean
  progress?: number
  total?: number
  rarity: "common" | "rare" | "epic" | "legendary"
  earnedDate?: string
  points: number
}

const achievements: Achievement[] = [
  // Oyun Başarımları
  {
    id: 1,
    name: "İlk Adım",
    description: "İlk oyununu tamamla",
    icon: Gamepad2,
    category: "oyun",
    earned: true,
    earnedDate: "2024-03-15",
    rarity: "common",
    points: 10
  },
  {
    id: 2,
    name: "Deneyimli Oyuncu",
    description: "100 oyun tamamla",
    icon: Gamepad2,
    category: "oyun",
    earned: true,
    progress: 100,
    total: 100,
    earnedDate: "2024-03-20",
    rarity: "rare",
    points: 50
  },
  {
    id: 3,
    name: "Satranç Ustası",
    description: "500 oyun tamamla",
    icon: Crown,
    category: "oyun",
    earned: false,
    progress: 234,
    total: 500,
    rarity: "epic",
    points: 100
  },
  {
    id: 4,
    name: "Efsane Oyuncu",
    description: "1000 oyun tamamla",
    icon: Crown,
    category: "oyun",
    earned: false,
    progress: 234,
    total: 1000,
    rarity: "legendary",
    points: 200
  },

  // Zafer Başarımları
  {
    id: 5,
    name: "İlk Zafer",
    description: "İlk galibiyetini al",
    icon: Trophy,
    category: "zafer",
    earned: true,
    earnedDate: "2024-03-15",
    rarity: "common",
    points: 10
  },
  {
    id: 6,
    name: "Galibiyetler",
    description: "10 galibiyet kazan",
    icon: Target,
    category: "zafer",
    earned: true,
    progress: 10,
    total: 10,
    earnedDate: "2024-03-18",
    rarity: "common",
    points: 25
  },
  {
    id: 7,
    name: "Şampiyon",
    description: "50 galibiyet kazan",
    icon: Medal,
    category: "zafer",
    earned: true,
    progress: 50,
    total: 50,
    earnedDate: "2024-03-25",
    rarity: "rare",
    points: 75
  },
  {
    id: 8,
    name: "Büyük Usta",
    description: "100 galibiyet kazan",
    icon: Crown,
    category: "zafer",
    earned: false,
    progress: 67,
    total: 100,
    rarity: "epic",
    points: 150
  },
  {
    id: 9,
    name: "Yenilmez",
    description: "Arka arkaya 10 galibiyet",
    icon: Flame,
    category: "zafer",
    earned: false,
    progress: 5,
    total: 10,
    rarity: "epic",
    points: 100
  },
  {
    id: 10,
    name: "Efsane Seri",
    description: "Arka arkaya 25 galibiyet",
    icon: Zap,
    category: "zafer",
    earned: false,
    progress: 5,
    total: 25,
    rarity: "legendary",
    points: 250
  },

  // Sosyal Başarımları
  {
    id: 11,
    name: "Sosyal Oyuncu",
    description: "İlk arkadaşını ekle",
    icon: Users,
    category: "sosyal",
    earned: true,
    earnedDate: "2024-03-16",
    rarity: "common",
    points: 10
  },
  {
    id: 12,
    name: "Popüler",
    description: "10 arkadaş edin",
    icon: Users,
    category: "sosyal",
    earned: true,
    progress: 10,
    total: 10,
    earnedDate: "2024-03-22",
    rarity: "rare",
    points: 50
  },
  {
    id: 13,
    name: "Sosyal Kelebek",
    description: "50 arkadaş edin",
    icon: Star,
    category: "sosyal",
    earned: false,
    progress: 12,
    total: 50,
    rarity: "epic",
    points: 100
  },

  // Beceri Başarımları
  {
    id: 14,
    name: "Hızlı Oyuncu",
    description: "Blitz oyunu kazan (5 dakika)",
    icon: Clock,
    category: "beceri",
    earned: true,
    earnedDate: "2024-03-17",
    rarity: "common",
    points: 25
  },
  {
    id: 15,
    name: "Taktik Dehası",
    description: "20 hamleden kısa oyun kazan",
    icon: Brain,
    category: "beceri",
    earned: true,
    earnedDate: "2024-03-19",
    rarity: "rare",
    points: 50
  },
  {
    id: 16,
    name: "Strateji Ustası",
    description: "60+ hamle uzun oyun kazan",
    icon: Shield,
    category: "beceri",
    earned: false,
    progress: 2,
    total: 5,
    rarity: "rare",
    points: 50
  },
  {
    id: 17,
    name: "Rating Yıldızı",
    description: "2000+ ELO'ya ulaş",
    icon: TrendingUp,
    category: "beceri",
    earned: false,
    progress: 1850,
    total: 2000,
    rarity: "epic",
    points: 150
  },
  {
    id: 18,
    name: "Grandmaster",
    description: "2500+ ELO'ya ulaş",
    icon: Crown,
    category: "beceri",
    earned: false,
    progress: 1850,
    total: 2500,
    rarity: "legendary",
    points: 500
  },
]

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const earnedCount = achievements.filter(a => a.earned).length
  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-500 bg-gray-500/10"
      case "rare":
        return "border-blue-500 bg-blue-500/10"
      case "epic":
        return "border-purple-500 bg-purple-500/10"
      case "legendary":
        return "border-amber-500 bg-amber-500/10"
      default:
        return ""
    }
  }

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "common":
        return <Badge variant="secondary" className="bg-gray-500/20">Yaygın</Badge>
      case "rare":
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-600">Nadir</Badge>
      case "epic":
        return <Badge variant="secondary" className="bg-purple-500/20 text-purple-600">Epik</Badge>
      case "legendary":
        return <Badge variant="secondary" className="bg-amber-500/20 text-amber-600">Efsane</Badge>
      default:
        return null
    }
  }

  const filteredAchievements = selectedCategory === "all" 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Stats */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Başarımlar ve Rozetler</h1>
        <p className="text-muted-foreground">İlerlemenizi takip edin ve rozetler kazanın</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Kazanılan Rozetler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{earnedCount}/{achievements.length}</div>
            <Progress value={(earnedCount / achievements.length) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Toplam Puan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <Star className="w-8 h-8 text-amber-500" />
              {totalPoints}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {achievements.reduce((sum, a) => sum + a.points, 0)} puan mevcut
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tamamlanma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round((earnedCount / achievements.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {achievements.length - earnedCount} rozet kaldı
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="oyun">Oyun</TabsTrigger>
          <TabsTrigger value="zafer">Zafer</TabsTrigger>
          <TabsTrigger value="sosyal">Sosyal</TabsTrigger>
          <TabsTrigger value="beceri">Beceri</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`relative overflow-hidden transition-all hover:shadow-lg ${
                  achievement.earned 
                    ? getRarityColor(achievement.rarity)
                    : "opacity-60 grayscale"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-3 rounded-full ${
                        achievement.earned
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <achievement.icon className="w-6 h-6" />
                    </div>
                    {getRarityBadge(achievement.rarity)}
                  </div>
                  <CardTitle className="mt-4">{achievement.name}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievement.progress !== undefined && achievement.total !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">İlerleme</span>
                        <span className="font-medium">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span>{achievement.points} puan</span>
                    </div>
                    {achievement.earned && achievement.earnedDate && (
                      <Badge variant="outline" className="text-xs">
                        {new Date(achievement.earnedDate).toLocaleDateString("tr-TR")}
                      </Badge>
                    )}
                    {!achievement.earned && (
                      <Badge variant="secondary" className="text-xs">
                        Kilitli
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
