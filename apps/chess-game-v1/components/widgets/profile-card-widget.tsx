"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfileCardWidget() {
  const userData = {
    name: "Ahmet Yılmaz",
    rating: 1850,
    level: "Maestro",
    wins: 487,
    losses: 143,
    draws: 56,
    winrate: 76.8,
    joinDate: "Ocak 2024",
  }

  return (
    <Card className="w-full max-w-sm mx-auto p-6 bg-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <Avatar className="w-16 h-16">
          <AvatarImage src="/chess-player-avatar.png" alt={userData.name} />
          <AvatarFallback>AY</AvatarFallback>
        </Avatar>
        <Badge className="bg-primary text-primary-foreground">{userData.level}</Badge>
      </div>

      {/* User Info */}
      <h3 className="text-xl font-bold text-foreground mb-1">{userData.name}</h3>
      <p className="text-2xl font-bold text-primary mb-4">{userData.rating} ELO</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 bg-background rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">{userData.wins}</div>
          <div className="text-xs text-muted-foreground">Kazanış</div>
        </div>
        <div className="text-center p-3 bg-background rounded-lg">
          <div className="text-2xl font-bold text-destructive mb-1">{userData.losses}</div>
          <div className="text-xs text-muted-foreground">Kayıp</div>
        </div>
        <div className="text-center p-3 bg-background rounded-lg">
          <div className="text-2xl font-bold text-accent mb-1">{userData.draws}</div>
          <div className="text-xs text-muted-foreground">Berabere</div>
        </div>
      </div>

      {/* Win Rate */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Kazanma Oranı</span>
          <span className="text-sm font-bold text-primary">%{userData.winrate}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: `${userData.winrate}%` }} />
        </div>
      </div>

      {/* Join Date */}
      <p className="text-xs text-muted-foreground border-t border-border pt-4">
        Üyesi olduğu tarih: {userData.joinDate}
      </p>
    </Card>
  )
}
