"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, MessageCircle, Heart, Share2, Trophy } from "lucide-react"

const mockFriends = [
  {
    id: "user-1",
    name: "Ahmet Yılmaz",
    avatar: "AY",
    rating: 1850,
    status: "online",
    gamesPlayed: 234,
  },
  {
    id: "user-2",
    name: "Ayşe Kaya",
    avatar: "AK",
    rating: 2100,
    status: "playing",
    gamesPlayed: 567,
  },
  {
    id: "user-3",
    name: "Mehmet Demir",
    avatar: "MD",
    rating: 1920,
    status: "offline",
    gamesPlayed: 189,
  },
]

const mockPosts = [
  {
    id: "post-1",
    author: "Fatma Şahin",
    avatar: "FS",
    rating: 2050,
    time: "2 saat önce",
    content: "Bugün harika bir oyun oynadım! Mat in 3 ile kazandım. Satranç ne kadar güzel bir oyun 🎯",
    likes: 45,
    comments: 12,
    shares: 3,
  },
  {
    id: "post-2",
    author: "Ali Çelik",
    avatar: "AÇ",
    rating: 1650,
    time: "5 saat önce",
    content: "Yeni açılış stratejisi öğreniyorum. İtalyan Oyunu gerçekten çok etkili! Tavsiye ederim.",
    likes: 23,
    comments: 8,
    shares: 5,
  },
  {
    id: "post-3",
    author: "Zeynep Arslan",
    avatar: "ZA",
    rating: 1680,
    time: "1 gün önce",
    content: "Turnuvada 3. oldum! Çok mutluyum 🏆 Herkese teşekkürler!",
    likes: 89,
    comments: 34,
    shares: 12,
  },
]

export default function SocialPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] p-3 sm:p-4 md:p-8 lg:ml-64">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Users className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold">Sosyal</CardTitle>
            </div>
            <CardDescription>Arkadaşlarınızla bağlantı kurun ve topluluğa katılın</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <textarea
                  placeholder="Ne düşünüyorsun?"
                  className="w-full min-h-[100px] p-3 bg-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex items-center justify-end gap-2 mt-3">
                  <Button size="sm">Paylaş</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {mockPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                        {post.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold">{post.author}</h4>
                          <Badge variant="outline" className="text-xs">
                            {post.rating}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{post.time}</span>
                        </div>
                        <p className="text-sm mt-2">{post.content}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-3 border-t">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        <span className="text-xs">{post.shares}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Arkadaşlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {friend.avatar}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                          friend.status === "online"
                            ? "bg-green-500"
                            : friend.status === "playing"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{friend.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {friend.rating}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{friend.gamesPlayed} oyun</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Arkadaş Ekle
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Başarılar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <p className="text-sm font-semibold">İlk Zafer</p>
                    <p className="text-xs text-muted-foreground">İlk oyununu kazan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <p className="text-sm font-semibold">Seri Kazanan</p>
                    <p className="text-xs text-muted-foreground">5 oyun üst üste kazan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded opacity-50">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <p className="text-sm font-semibold">Bulmaca Ustası</p>
                    <p className="text-xs text-muted-foreground">100 bulmaca çöz</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
