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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  UserPlus,
  MessageCircle,
  Heart,
  Share2,
  Trophy,
  Calendar,
  Crown,
} from "lucide-react";
import Link from "next/link";
import React from "react";

type Post = {
  id: string;
  author: string;
  username: string;
  avatar: string;
  rating: number;
  time: string;
  content: string;
  likes: number;
  likedBy?: string[];
  comments: number;
  shares: number;
};

const mockPosts: Post[] = [
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
    likedBy: [], // burayı ekledik
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
    likedBy: [],
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
    likedBy: [],
    comments: 34,
    shares: 12,
  },
];

export default function CommunityPage() {
  return (
    <React.Fragment>
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Users className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold">Sosyal</CardTitle>
            </div>
            <CardDescription>
              Arkadaşlarınızla bağlantı kurun ve topluluğa katılın
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 ">
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
                    <Link href={`/profile/${post.username}`}>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0 hover:bg-primary/20 transition-colors cursor-pointer">
                        {post.avatar}
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/profile/${post.username}`}
                          className="hover:underline"
                        >
                          <h4 className="font-semibold">{post.author}</h4>
                        </Link>
                        <Badge variant="outline" className="text-xs">
                          {post.rating}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {post.time}
                        </span>
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
      </div>
    </React.Fragment>
  );
}
