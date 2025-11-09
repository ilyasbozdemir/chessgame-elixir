"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Newspaper,
  Clock,
  TrendingUp,
  MessageCircle,
  Eye,
  Share2,
  BookmarkPlus,
} from "lucide-react";
import React, { useState } from "react";

const mockNews = [
  {
    id: "news-1",
    title: "Dünya Satranç Şampiyonası Başlıyor",
    excerpt:
      "2025 Dünya Satranç Şampiyonası yarın Dubai'de başlayacak. 16 ülkeden 32 oyuncu katılacak.",
    content:
      "Dünyanın en prestijli satranç turnuvası olan Dünya Satranç Şampiyonası, Dubai'de düzenlenecek. Turnuvaya Türkiye'den 3 grandmaster katılacak. Toplam ödül havuzu 2 milyon dolar.",
    category: "Turnuva",
    date: "2 saat önce",
    image: "/chess-tournament.png",
    comments: 45,
    views: 1234,
    trending: true,
    author: "Ahmet Yılmaz",
  },
  {
    id: "news-2",
    title: "Yeni Açılış Stratejisi Keşfedildi",
    excerpt:
      "Rus Grandmaster Petrov, İtalyan Oyunu'nda yeni bir varyant geliştirdi.",
    content:
      "Grandmaster Petrov'un geliştirdiği yeni varyant, İtalyan Oyunu'nda beyaz için yeni imkanlar sunuyor. Strateji, 5. hamlede sürpriz bir fil fedası içeriyor.",
    category: "Strateji",
    date: "5 saat önce",
    image: "/chess-strategy.jpg",
    comments: 23,
    views: 892,
    trending: false,
    author: "Zeynep Kaya",
  },
  {
    id: "news-3",
    title: "Türkiye Satranç Ligi Sonuçları",
    excerpt:
      "Türkiye Satranç Ligi'nin 5. haftası tamamlandı. İstanbul takımı liderliğini sürdürüyor.",
    content:
      "Türkiye Satranç Ligi'nde heyecan devam ediyor. İstanbul takımı 5. haftayı da galibiyetle kapattı ve liderliğini sürdürdü. Ankara takımı ikinci sırada yer alıyor.",
    category: "Yerel",
    date: "1 gün önce",
    image: "/chess-league.jpg",
    comments: 67,
    views: 2156,
    trending: true,
    author: "Mehmet Demir",
  },
  {
    id: "news-4",
    title: "Yapay Zeka Satranç Motoru Güncellendi",
    excerpt: "Stockfish 17 sürümü yayınlandı. Yeni sürüm %15 daha güçlü.",
    content:
      "Dünyanın en güçlü satranç motoru Stockfish'in 17. sürümü yayınlandı. Yeni sürüm, önceki versiyona göre %15 daha güçlü ve daha hızlı analiz yapabiliyor.",
    category: "Teknoloji",
    date: "2 gün önce",
    image: "/chess-ai-computer.jpg",
    comments: 89,
    views: 3421,
    trending: false,
    author: "Ali Öztürk",
  },
  {
    id: "news-5",
    title: "Genç Yetenek Grandmaster Oldu",
    excerpt:
      "15 yaşındaki Zeynep Yılmaz, Türkiye'nin en genç kadın Grandmaster'ı oldu.",
    content:
      "Zeynep Yılmaz, 15 yaşında Grandmaster unvanını alarak Türkiye'nin en genç kadın Grandmaster'ı oldu. Zeynep, 8 yaşında satranca başlamış ve kısa sürede büyük başarılar elde etmiş.",
    category: "Başarı",
    date: "3 gün önce",
    image: "/young-chess-player.jpg",
    comments: 156,
    views: 5678,
    trending: true,
    author: "Ayşe Şahin",
  },
  {
    id: "news-6",
    title: "Online Satranç Turnuvası Duyurusu",
    excerpt:
      "Gelecek hafta başlayacak online turnuvaya kayıtlar açıldı. Ödül havuzu 50.000 TL.",
    content:
      "Gelecek hafta başlayacak online satranç turnuvasına kayıtlar başladı. Turnuva 3 gün sürecek ve toplam ödül havuzu 50.000 TL. Tüm seviyelerden oyuncular katılabilir.",
    category: "Turnuva",
    date: "4 gün önce",
    image: "/online-chess.jpg",
    comments: 234,
    views: 4321,
    trending: false,
    author: "Can Yıldız",
  },
];

const categories = [
  "Tümü",
  "Turnuva",
  "Strateji",
  "Yerel",
  "Teknoloji",
  "Başarı",
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedNews, setSelectedNews] = useState<string | null>(null);

  const filteredNews =
    selectedCategory === "Tümü"
      ? mockNews
      : mockNews.filter((news) => news.category === selectedCategory);

  const newsDetail = selectedNews
    ? mockNews.find((n) => n.id === selectedNews)
    : null;

  if (newsDetail) {
    return (
      <React.Fragment>
        <div className="max-w-4xl mx-auto space-y-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedNews(null)}
            className="mb-4"
          >
            ← Geri Dön
          </Button>

          <Card>
            <div className="relative">
              <img
                src={newsDetail.image || "/placeholder.svg"}
                alt={newsDetail.title}
                className="w-full h-96 object-cover rounded-t-lg"
              />
              {newsDetail.trending && (
                <Badge className="absolute top-4 right-4 bg-red-500">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trend
                </Badge>
              )}
            </div>

            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{newsDetail.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{newsDetail.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{newsDetail.views} görüntülenme</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold">{newsDetail.title}</h1>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                    {newsDetail.author[0]}
                  </div>
                  <span>Yazar: {newsDetail.author}</span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-lg leading-relaxed">{newsDetail.content}</p>
                <p className="text-base leading-relaxed mt-4">
                  {newsDetail.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Paylaş
                </Button>
                <Button variant="outline" size="sm">
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Kaydet
                </Button>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold">
                    {newsDetail.comments} Yorum
                  </span>
                </div>
                <div className="space-y-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                          M
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Mehmet Yılmaz</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Harika bir haber! Turnuvayı merakla bekliyorum.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            1 saat önce
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                          A
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Ayşe Demir</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Çok güzel bir gelişme. Başarılar dilerim.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            3 saat önce
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Newspaper className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold">
                Satranç Haberleri
              </CardTitle>
            </div>
            <CardDescription>
              Satranç dünyasından son haberler ve gelişmeler
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {filteredNews.map((news) => (
            <Card
              key={news.id}
              className="hover:border-primary transition-colors cursor-pointer overflow-hidden"
              onClick={() => setSelectedNews(news.id)}
            >
              <div className="relative">
                <img
                  src={news.image || "/placeholder.svg"}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                {news.trending && (
                  <Badge className="absolute top-3 right-3 bg-red-500">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trend
                  </Badge>
                )}
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {news.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="w-3 h-3" />
                    <span>{news.views}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {news.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                    {news.author[0]}
                  </div>
                  <span>{news.author}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground pt-2 border-t">
                  <MessageCircle className="w-4 h-4" />
                  <span>{news.comments} yorum</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
