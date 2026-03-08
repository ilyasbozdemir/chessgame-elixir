"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Users, Star } from "lucide-react";

export default function DashboardPage() {
  const stats = {
    todayLessons: 2,
    pendingRequests: 3,
    students: 18,
    rating: 4.9,
  };

  const upcoming = [
    { id: 1, time: "19:00", student: "İlyas B.", topic: "Blitz Eğitimi" },
    { id: 2, time: "21:00", student: "Ahmet K.", topic: "Açılış Pratiği" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Koç Paneli</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">Bugünkü Ders</p>
            <p className="text-2xl font-bold">{stats.todayLessons}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">Bekleyen Talep</p>
            <p className="text-2xl font-bold">{stats.pendingRequests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">Öğrenci Sayısı</p>
            <p className="text-2xl font-bold">{stats.students}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">Puan</p>
            <p className="text-2xl font-bold">{stats.rating} ⭐</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Yaklaşan Dersler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcoming.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between border p-3 rounded-lg"
            >
              <div>
                <p className="font-semibold">{u.time}</p>
                <p className="text-sm text-muted-foreground">{u.student}</p>
                <p className="text-xs">{u.topic}</p>
              </div>
              <CheckCircle className="text-green-500 w-5 h-5" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button><Calendar className="w-4 h-4 mr-2" />Takvimi Aç</Button>
        <Button variant="secondary"><Users className="w-4 h-4 mr-2" />Talepleri Gör</Button>
        <Button variant="outline"><Star className="w-4 h-4 mr-2" />Profilim</Button>
      </div>
    </div>
  );
}
