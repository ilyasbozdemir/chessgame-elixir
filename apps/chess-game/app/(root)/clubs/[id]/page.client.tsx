"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Users,
  Calendar,
  MessageSquare,
  Trophy,
  Shield,
  Star,
  Send,
  Heart,
  Share2,
  Zap,
  Crown,
  Flame,
  MessageCircle,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock club data
const mockClub = {
  id: "istanbul-chess",
  name: "İstanbul Satranç Kulübü",
  description: "İstanbul'daki en aktif satranç topluluğu",
  members: 1250,
  level: "Profesyonel",
  location: "İstanbul",
  image:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
  founded: "2015",
  founded_by: "Ahmet Karagöz",
  website: "www.istanbulchessclub.com",
  details:
    "Profesyonel ve amatör oyuncular için açık bir topluluk. Düzenli turnuvalar, eğitim seansları ve sosyal etkinlikler düzenliyoruz. Katılımcılar her seviyeden hoş geldiniz!",
};

// Mock members
const mockMembers = [
  {
    id: 1,
    name: "Ahmet Karagöz",
    role: "Kurucu",
    rating: 2450,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop",
    joinedDate: "2015",
  },
  {
    id: 2,
    name: "Fatih Yıldız",
    role: "Yönetici",
    rating: 2150,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&fit=crop",
    joinedDate: "2016",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    role: "Moderatör",
    rating: 1950,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&fit=crop",
    joinedDate: "2017",
  },
  {
    id: 4,
    name: "Mehmet Şahin",
    role: "Üye",
    rating: 1750,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop",
    joinedDate: "2020",
  },
  {
    id: 5,
    name: "Leyla Kaya",
    role: "Üye",
    rating: 1650,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&fit=crop",
    joinedDate: "2021",
  },
];

const mockForumCategories = [
  {
    id: "genel",
    name: "Genel Tartışmalar",
    icon: MessageSquare,
    discussions: [
      {
        id: 1,
        author: "Ahmet Karagöz",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop",
        role: "Kurucu",
        title: "Yeni Turnuva Formatı Hakkında Fikirler",
        content:
          "Bu sezon için yeni bir turnuva formatı denemeyi düşünüyoruz. Herkesin fikirlerini almak istiyoruz. Swiss sistemi kullanarak mı devam edelim yoksa round-robin denesek?",
        replies: 12,
        likes: 34,
        time: "2 saat önce",
        category: "genel",
      },
      {
        id: 2,
        author: "Mehmet Şahin",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop",
        role: "Üye",
        title: "Yeni Üyeleri Karşılama",
        content:
          "Geçen hafta kulübe katılan herkese hoş geldiniz demek istiyoruz! Tanışma seansı düzenleyebilir miyiz?",
        replies: 5,
        likes: 18,
        time: "1 gün önce",
        category: "genel",
      },
    ],
  },
  {
    id: "stratejiler",
    name: "Stratejiler & İpuçları",
    icon: Zap,
    discussions: [
      {
        id: 3,
        author: "Zeynep Demir",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop",
        role: "Moderatör",
        title: "Sicilian Defense: Açılış Stratejileri",
        content:
          "Sicilian Defense'ın en etkili varyasyonlarını analiz edelim. Özellikle 1.e4 c5 açılışında nelere dikkat etmeliyiz?",
        replies: 23,
        likes: 56,
        time: "3 saat önce",
        category: "stratejiler",
      },
      {
        id: 4,
        author: "Fatih Yıldız",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&fit=crop",
        role: "Yönetici",
        title: "Endgame Teknikleri: Pion Endgame'ler",
        content:
          "Pion endgame'lerde kazanmanın kritik pozisyonları var. Bunları öğrenmek için güzel bir rehber hazırladım.",
        replies: 18,
        likes: 42,
        time: "2 gün önce",
        category: "stratejiler",
      },
    ],
  },
  {
    id: "etkinlikler",
    name: "Etkinlik Duyuruları",
    icon: Calendar,
    discussions: [
      {
        id: 5,
        author: "Ahmet Karagöz",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop",
        role: "Kurucu",
        title: "İstanbul Açık Şampiyonası - Kayıt Başladı",
        content:
          "15-20 Mart'ta düzenlenecek İstanbul Açık Şampiyonası'na kayıtlar başlamıştır. Tüm seviyelerdeki oyuncular katılabilir. Ücret: 500 TL",
        replies: 28,
        likes: 78,
        time: "3 saat önce",
        category: "etkinlikler",
      },
      {
        id: 6,
        author: "Leyla Kaya",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop",
        role: "Üye",
        title: "Çarşamba Antrenman Seansı Programı",
        content:
          "Her çarşamba akşam 19:00'da temel stratejiler üzerine antrenman yapacağız. İlk oturumda Gambit açılışları anlatılacak.",
        replies: 8,
        likes: 25,
        time: "5 saat önce",
        category: "etkinlikler",
      },
    ],
  },
];

// Mock direct messages
const mockConversations = [
  {
    id: 1,
    name: "Ahmet Karagöz",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop",
    lastMessage: "Evet, turnuvada görüşürüz!",
    time: "2 dakika önce",
    unread: 2,
    messages: [
      { id: 1, sender: "Ahmet", content: "Merhaba, nasılsın?", time: "10:30" },
      {
        id: 2,
        sender: "Sen",
        content: "İyiyim teşekkür ederim. Sen nasılsın?",
        time: "10:32",
      },
      {
        id: 3,
        sender: "Ahmet",
        content: "Evet, turnuvada görüşürüz!",
        time: "10:35",
      },
    ],
  },
  {
    id: 2,
    name: "Zeynep Demir",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop",
    lastMessage: "Antrenman programı hazır",
    time: "1 saat önce",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "Zeynep",
        content: "Antrenman programı hazır",
        time: "09:15",
      },
      {
        id: 2,
        sender: "Sen",
        content: "Harika! Ne zaman başlayabilirim?",
        time: "09:20",
      },
    ],
  },
  {
    id: 3,
    name: "Fatih Yıldız",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop",
    lastMessage: "Partimiz sonraki çarşambaya taşınıyor",
    time: "3 saat önce",
    unread: 1,
    messages: [
      {
        id: 1,
        sender: "Fatih",
        content: "Partimiz sonraki çarşambaya taşınıyor",
        time: "08:00",
      },
    ],
  },
];

// Mock tournaments
const mockTournaments = [
  {
    id: 1,
    name: "İstanbul Açık Şampiyonası 2025",
    date: "15-20 Mart 2025",
    participants: 64,
    prize: "₺50.000",
    format: "Swiss - 7 tur",
    status: "Yakında",
  },
  {
    id: 2,
    name: "Blitz Ligi - Kış Sezon",
    date: "Haftalık - Cuma 20:00",
    participants: 120,
    prize: "Elo puanları",
    format: "Round-Robin",
    status: "Devam Ediyor",
  },
  {
    id: 3,
    name: "Genç Oyuncular Finalleri",
    date: "Nisan 2025",
    participants: 32,
    prize: "Madalyalar",
    format: "Knockout",
    status: "Müsabakalı",
  },
];

// Mock leaderboard
const mockLeaderboard = [
  { rank: 1, name: "Ahmet Karagöz", rating: 2450, wins: 45, losses: 12 },
  { rank: 2, name: "Fatih Yıldız", rating: 2150, wins: 38, losses: 15 },
  { rank: 3, name: "Zeynep Demir", rating: 1950, wins: 35, losses: 18 },
  { rank: 4, name: "Mehmet Şahin", rating: 1750, wins: 28, losses: 22 },
  { rank: 5, name: "Leyla Kaya", rating: 1650, wins: 24, losses: 26 },
  { rank: 6, name: "Eren Bayrak", rating: 1550, wins: 20, losses: 30 },
  { rank: 7, name: "Selin Akçay", rating: 1480, wins: 18, losses: 32 },
  { rank: 8, name: "Buğra Kılıç", rating: 1420, wins: 15, losses: 35 },
];

interface Discussion {
  title: string;
  author: string;
  time: string;
  content: string;
}

interface DiscussionReplyModalProps {
  discussion: Discussion;
  onClose: () => void;
  onSubmit: (reply: string) => void;
}

export function DiscussionReplyModal({
  discussion,
  onClose,
  onSubmit,
}: DiscussionReplyModalProps) {
  const [reply, setReply] = useState<string>("");

  const handleSubmit = () => {
    if (reply.trim()) {
      onSubmit(reply);
      setReply("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <div>
            <h3 className="font-bold text-base sm:text-lg">
              {discussion.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {discussion.author} • {discussion.time}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Original Message */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 border-b">
          <p className="text-sm sm:text-base text-muted-foreground">
            {discussion.content}
          </p>
        </div>

        {/* Reply Input */}
        <div className="p-4 sm:p-6 space-y-4">
          <Textarea
            placeholder="Yanıtınızı yazın..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="min-h-24 resize-none text-sm sm:text-base"
          />
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-xs sm:text-sm bg-transparent"
            >
              İptal
            </Button>
            <Button onClick={handleSubmit} className="gap-2 text-xs sm:text-sm">
              <Send className="w-4 h-4" />
              Yanıtla
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface Message {
  id: string | number;
  sender: string;
  content: string;
  time: string;
}

interface Conversation {
  name: string;
  avatar?: string;
  messages: Message[];
}

interface MessageThreadModalProps {
  conversation: Conversation;
  onClose: () => void;
}

export function MessageThreadModal({
  conversation,
  onClose,
}: MessageThreadModalProps) {
  const [newMessage, setNewMessage] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <div className="flex items-center gap-3">
            <img
              src={conversation.avatar || "/placeholder.svg"}
              alt={conversation.name}
              className="w-10 h-10 rounded-full"
            />
            <h3 className="font-bold text-base sm:text-lg">
              {conversation.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
          {conversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "Sen" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  msg.sender === "Sen"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 sm:p-6 border-t flex gap-2">
          <Input
            placeholder="Mesaj yazın..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="text-sm"
          />
          <Button size="sm" className="gap-2">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default function ClubDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [joined, setJoined] = useState<boolean>(false);

  const [activeCategory, setActiveCategory] = useState("genel");
  const [selectedReply, setSelectedReply] = useState<Discussion | null>(null);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const currentCategory = mockForumCategories.find(
    (cat) => cat.id === activeCategory
  );

  return (
    <div className="container mx-auto p-6 h-[calc(100vh-8rem)]">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/clubs">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Geri Dön
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-muted">
        <img
          src={mockClub.image || "/placeholder.svg"}
          alt={mockClub.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Club Info Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {mockClub.name}
              </h1>
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs sm:text-sm font-semibold rounded-full">
                {mockClub.level}
              </span>
            </div>
            <p className="text-white/80 text-sm sm:text-base">
              {mockClub.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {mockClub.members}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                Üye
              </div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {mockTournaments.length}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                Turnuva
              </div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {mockClub.founded}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                Kuruluş Yılı
              </div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {mockForumCategories.reduce(
                  (sum, cat) => sum + cat.discussions.length,
                  0
                )}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                Tartışma
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => setJoined(!joined)}
            >
              {joined ? (
                <Check className="w-5 h-5" />
              ) : (
                <Users className="w-5 h-5" />
              )}

              {joined ? (
                <>
                  <span className="hidden sm:inline">Kayıtlı</span>
                  <span className="sm:hidden">✔</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Kulübe Katıl</span>
                  <span className="sm:hidden">Katıl</span>
                </>
              )}
            </Button>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="forum" className="w-full">
            <TabsList className="grid w-full grid-cols-5 gap-1">
              <TabsTrigger value="forum" className="text-xs sm:text-sm">
                <MessageSquare className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline">Forum</span>
              </TabsTrigger>
              <TabsTrigger
                value="messaging"
                id="messaging-tab"
                className="text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline">İletişim</span>
              </TabsTrigger>
              <TabsTrigger value="tournaments" className="text-xs sm:text-sm">
                <Trophy className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline">Turnuvalar</span>
              </TabsTrigger>
              <TabsTrigger value="members" className="text-xs sm:text-sm">
                <Users className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline">Üyeler</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="text-xs sm:text-sm">
                <Zap className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline">Liderlik</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="forum" className="space-y-4 sm:space-y-6">
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {mockForumCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors flex-shrink-0 ${
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* New Discussion Input */}
              <Card className="p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Input
                      placeholder="Tartışma başlat..."
                      className="bg-muted border-0 placeholder:text-muted-foreground text-sm sm:text-base"
                    />
                    <div className="flex gap-2 mt-3 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs sm:text-sm bg-transparent"
                      >
                        İptal
                      </Button>
                      <Button size="sm" className="gap-2 text-xs sm:text-sm">
                        <Send className="w-4 h-4" />
                        Paylaş
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Discussions List */}
              {currentCategory?.discussions.map((discussion) => (
                <Card
                  key={discussion.id}
                  className="p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedReply(discussion)}
                >
                  <div className="flex gap-3 sm:gap-4">
                    <img
                      src={discussion.avatar || "/placeholder.svg"}
                      alt={discussion.author}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1 sm:mb-2">
                        <span className="font-semibold text-sm sm:text-base">
                          {discussion.author}
                        </span>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {discussion.role}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {discussion.time}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base mb-2">
                        {discussion.title}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2">
                        {discussion.content}
                      </p>
                      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span>{discussion.replies} yanıt</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>{discussion.likes} beğeni</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>Paylaş</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="messaging" className="space-y-4">
              <div className="grid gap-4">
                {mockConversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    className="p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={conversation.avatar || "/placeholder.svg"}
                        alt={conversation.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-sm sm:text-base">
                            {conversation.name}
                          </h3>
                          {conversation.unread > 0 && (
                            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full flex-shrink-0">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-xs sm:text-sm truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {conversation.time}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tournaments Tab */}
            <TabsContent value="tournaments" className="space-y-4">
              <div className="grid gap-4">
                {mockTournaments.map((tournament) => (
                  <Card key={tournament.id} className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm sm:text-base mb-1">
                          {tournament.name}
                        </h3>
                        <div className="flex gap-2 text-xs text-muted-foreground mb-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {tournament.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {tournament.participants} katılımcı
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full inline-block">
                          {tournament.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm border-t border-border pt-3">
                      <div>
                        <span className="text-muted-foreground">Format</span>
                        <div className="font-semibold">{tournament.format}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Ödül</span>
                        <div className="font-semibold text-primary">
                          {tournament.prize}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members" className="space-y-4">
              <div className="grid gap-4">
                {mockMembers.map((member) => (
                  <Card key={member.id} className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm sm:text-base">
                            {member.name}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                              member.role === "Kurucu"
                                ? "bg-yellow-500/20 text-yellow-700"
                                : member.role === "Yönetici"
                                ? "bg-red-500/20 text-red-700"
                                : member.role === "Moderatör"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-gray-500/20 text-gray-700"
                            }`}
                          >
                            {member.role === "Kurucu" && (
                              <Crown className="w-3 h-3 inline mr-1" />
                            )}
                            {member.role === "Yönetici" && (
                              <Shield className="w-3 h-3 inline mr-1" />
                            )}
                            {member.role === "Moderatör" && (
                              <Star className="w-3 h-3 inline mr-1" />
                            )}
                            {member.role}
                          </span>
                        </div>
                        <div className="flex gap-4 text-xs sm:text-sm text-muted-foreground mt-1">
                          <span>
                            Rating:{" "}
                            <span className="font-semibold text-foreground">
                              {member.rating}
                            </span>
                          </span>
                          <span>
                            Üye:{" "}
                            <span className="font-semibold text-foreground">
                              {member.joinedDate}
                            </span>
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-shrink-0 text-xs bg-transparent"
                      >
                        Mesaj
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-4">
              <Card className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {mockLeaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {player.rank === 1 && (
                            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                          )}
                          {player.rank === 2 && (
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          )}
                          {player.rank === 3 && (
                            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                          )}
                          {player.rank > 3 && (
                            <span className="font-bold text-xs sm:text-sm text-muted-foreground">
                              #{player.rank}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm sm:text-base truncate">
                            {player.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {player.wins}W - {player.losses}L
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-primary text-sm sm:text-base">
                          {player.rating}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rating
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedReply && (
        <DiscussionReplyModal
          discussion={selectedReply}
          onClose={() => setSelectedReply(null)}
          onSubmit={(reply) => console.log("Reply submitted:", reply)}
        />
      )}

      {selectedConversation && (
        <MessageThreadModal
          conversation={selectedConversation}
          onClose={() => setSelectedConversation(null)}
        />
      )}
    </div>
  );
}
