"use client"

import { Swords, Clock, UserPlus, Trophy, CheckCheck, Trash2, Filter } from 'lucide-react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  const [filter, setFilter] = useState<string>('all')

  const allNotifications = [
    {
      id: 1,
      type: 'invite',
      title: 'Oyun Daveti',
      message: 'Ahmet Yılmaz seni 10+0 Rapid oyununa davet etti',
      time: '2 dakika önce',
      unread: true,
      actions: ['Kabul Et', 'Reddet']
    },
    {
      id: 2,
      type: 'friend_request',
      title: 'Arkadaşlık İsteği',
      message: 'Zeynep Kaya seni arkadaş olarak eklemek istiyor',
      time: '15 dakika önce',
      unread: true,
      actions: ['Kabul Et', 'Reddet']
    },
    {
      id: 3,
      type: 'invite',
      title: 'Oyun Daveti',
      message: 'Mehmet Demir seni 5+3 Blitz oyununa davet etti',
      time: '30 dakika önce',
      unread: true,
      actions: ['Kabul Et', 'Reddet']
    },
    {
      id: 4,
      type: 'game_result',
      title: 'Oyun Kazandın',
      message: 'Mehmet Demir ile oynadığın oyunu kazandın! +12 ELO',
      time: '1 saat önce',
      unread: false,
    },
    {
      id: 5,
      type: 'tournament',
      title: 'Turnuva Hatırlatma',
      message: 'Haftalık Blitz Turnuvası 30 dakika içinde başlıyor',
      time: '2 saat önce',
      unread: false,
    },
    {
      id: 6,
      type: 'friend_request',
      title: 'Arkadaşlık İsteği',
      message: 'Can Özkan seni arkadaş olarak eklemek istiyor',
      time: '3 saat önce',
      unread: false,
      actions: ['Kabul Et', 'Reddet']
    },
    {
      id: 7,
      type: 'game_result',
      title: 'Oyun Kaybettin',
      message: 'Ayşe Yıldız ile oynadığın oyunu kaybettin. -8 ELO',
      time: '5 saat önce',
      unread: false,
    },
    {
      id: 8,
      type: 'tournament',
      title: 'Turnuva Sonucu',
      message: 'Haftalık Rapid Turnuvasında 3. oldun! 50 puan kazandın',
      time: '1 gün önce',
      unread: false,
    },
    {
      id: 9,
      type: 'invite',
      title: 'Oyun Daveti',
      message: 'Fatma Şahin seni 15+10 Classical oyununa davet etti',
      time: '1 gün önce',
      unread: false,
      actions: ['Kabul Et', 'Reddet']
    },
    {
      id: 10,
      type: 'game_result',
      title: 'Berabere',
      message: 'Ali Kara ile oynadığın oyun berabere bitti',
      time: '2 gün önce',
      unread: false,
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'invite':
        return <Swords className="w-5 h-5 text-blue-500" />
      case 'friend_request':
        return <UserPlus className="w-5 h-5 text-green-500" />
      case 'game_result':
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 'tournament':
        return <Clock className="w-5 h-5 text-purple-500" />
      default:
        return null
    }
  }

  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'invite':
        return 'bg-blue-500/10'
      case 'friend_request':
        return 'bg-green-500/10'
      case 'game_result':
        return 'bg-yellow-500/10'
      case 'tournament':
        return 'bg-purple-500/10'
      default:
        return 'bg-muted'
    }
  }

  const filteredNotifications = filter === 'all' 
    ? allNotifications 
    : filter === 'unread'
    ? allNotifications.filter(n => n.unread)
    : allNotifications.filter(n => n.type === filter)

  const unreadCount = allNotifications.filter(n => n.unread).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bildirimler</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} okunmamış bildirim` : 'Tüm bildirimler okundu'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CheckCheck className="w-4 h-4 mr-2" />
            Tümünü Okundu İşaretle
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Tümünü Temizle
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="all" onClick={() => setFilter('all')}>
            Tümü
            {allNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2 rounded-full px-2 py-0">
                {allNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread" onClick={() => setFilter('unread')}>
            Okunmamış
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 rounded-full px-2 py-0">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="invite" onClick={() => setFilter('invite')}>
            Davetler
          </TabsTrigger>
          <TabsTrigger value="friend_request" onClick={() => setFilter('friend_request')}>
            Arkadaşlık
          </TabsTrigger>
          <TabsTrigger value="game_result" onClick={() => setFilter('game_result')}>
            Sonuçlar
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-3 mt-6">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-muted p-4">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium">Bildirim Bulunamadı</p>
                <p className="text-sm text-muted-foreground">
                  Bu kategoride henüz bildirim bulunmuyor
                </p>
              </div>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 transition-colors hover:bg-muted/50 ${
                  notification.unread ? 'border-l-4 border-l-blue-500 bg-blue-500/5' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-full p-3 ${getIconBgColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {notification.unread && (
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                      
                      {notification.actions && (
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="default">
                            {notification.actions[0]}
                          </Button>
                          <Button size="sm" variant="outline">
                            {notification.actions[1]}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
