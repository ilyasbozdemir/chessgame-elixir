"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Gamepad2, AlertCircle, Activity, Crown } from "lucide-react"

const stats = [
  {
    title: "Toplam Kullanıcı",
    value: "12,543",
    change: "+12.5%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Aktif Oyunlar",
    value: "234",
    change: "+5.2%",
    icon: Gamepad2,
    trend: "up",
  },
  {
    title: "Günlük Aktif",
    value: "3,421",
    change: "-2.1%",
    icon: Activity,
    trend: "down",
  },
  {
    title: "Raporlar",
    value: "12",
    change: "Bekliyor",
    icon: AlertCircle,
    trend: "neutral",
  },
]

const recentUsers = [
  { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", rating: 1850, status: "active" },
  { id: 2, name: "Ayşe Kaya", email: "ayse@example.com", rating: 2100, status: "active" },
  { id: 3, name: "Mehmet Demir", email: "mehmet@example.com", rating: 1920, status: "banned" },
  { id: 4, name: "Fatma Şahin", email: "fatma@example.com", rating: 2050, status: "active" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Crown className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Admin Paneli</h1>
          <p className="text-muted-foreground">Satranç oyunu yönetim paneline hoş geldiniz</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : stat.trend === "down"
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Son Kullanıcılar</CardTitle>
            <CardDescription>Sisteme yeni katılan kullanıcılar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{user.rating}</Badge>
                    <Badge variant={user.status === "active" ? "default" : "destructive"}>
                      {user.status === "active" ? "Aktif" : "Yasaklı"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistem Aktivitesi</CardTitle>
            <CardDescription>Son 24 saatteki aktiviteler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Yeni kullanıcı kaydı</p>
                  <p className="text-xs text-muted-foreground">Ahmet Yılmaz sisteme katıldı</p>
                  <p className="text-xs text-muted-foreground mt-1">5 dakika önce</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Turnuva başladı</p>
                  <p className="text-xs text-muted-foreground">Haftalık Blitz Turnuvası başladı</p>
                  <p className="text-xs text-muted-foreground mt-1">1 saat önce</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Kullanıcı raporu</p>
                  <p className="text-xs text-muted-foreground">Yeni bir kullanıcı raporu alındı</p>
                  <p className="text-xs text-muted-foreground mt-1">3 saat önce</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
