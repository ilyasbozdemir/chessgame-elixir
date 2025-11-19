'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Search, UserPlus, MoreVertical, MessageSquare, Swords, Check, X, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Friend {
  id: string
  name: string
  username: string
  avatar: string
  status: 'online' | 'offline' | 'in-game'
  elo: number
  lastSeen?: string
}

interface FriendRequest {
  id: string
  name: string
  username: string
  avatar: string
  elo: number
  mutualFriends: number
}

interface SuggestedPlayer {
  id: string
  name: string
  username: string
  avatar: string
  elo: number
  mutualFriends: number
  gamesPlayed: number
}

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [discoverDialogOpen, setDiscoverDialogOpen] = useState(false)
  const [showTableCreation, setShowTableCreation] = useState(false)
  const [usernameSearch, setUsernameSearch] = useState('')
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
  const [timeControl, setTimeControl] = useState('10+0')
  const router = useRouter()

  const friends: Friend[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      username: 'ahmet_chess',
      avatar: '/turkish-male-chess-player.jpg',
      status: 'online',
      elo: 1850,
    },
    {
      id: '2',
      name: 'Zeynep Kaya',
      username: 'zeynep_master',
      avatar: '/turkish-female-chess-player.jpg',
      status: 'in-game',
      elo: 2100,
    },
    {
      id: '3',
      name: 'Mehmet Demir',
      username: 'mehmet_gambit',
      avatar: '/turkish-chess-player-2.jpg',
      status: 'online',
      elo: 1650,
    },
    {
      id: '4',
      name: 'Ayşe Şahin',
      username: 'ayse_queen',
      avatar: '/female-chess-player-avatar.jpg',
      status: 'offline',
      elo: 1920,
      lastSeen: '2 saat önce',
    },
    {
      id: '5',
      name: 'Can Özkan',
      username: 'can_knight',
      avatar: '/male-chess-player-avatar.jpg',
      status: 'online',
      elo: 1780,
    },
  ]

  const friendRequests: FriendRequest[] = [
    {
      id: '1',
      name: 'Emre Yıldız',
      username: 'emre_rook',
      avatar: '/chess-player-avatar-1.png',
      elo: 1890,
      mutualFriends: 3,
    },
    {
      id: '2',
      name: 'Selin Aydın',
      username: 'selin_bishop',
      avatar: '/female-player-avatar-1.jpg',
      elo: 1720,
      mutualFriends: 1,
    },
  ]

  const suggestedPlayers: SuggestedPlayer[] = [
    {
      id: '10',
      name: 'Ali Kılıç',
      username: 'ali_tactical',
      avatar: '/turkish-male-chess-player.jpg',
      elo: 1875,
      mutualFriends: 2,
      gamesPlayed: 1250,
    },
    {
      id: '11',
      name: 'Elif Yıldırım',
      username: 'elif_strategist',
      avatar: '/turkish-female-chess-player.jpg',
      elo: 1920,
      mutualFriends: 1,
      gamesPlayed: 890,
    },
    {
      id: '12',
      name: 'Burak Çelik',
      username: 'burak_endgame',
      avatar: '/male-chess-player.jpg',
      elo: 2050,
      mutualFriends: 0,
      gamesPlayed: 2100,
    },
    {
      id: '13',
      name: 'Deniz Arslan',
      username: 'deniz_blitz',
      avatar: '/female-chess-player.jpg',
      elo: 1780,
      mutualFriends: 3,
      gamesPlayed: 650,
    },
  ]

  const getStatusColor = (status: Friend['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'in-game':
        return 'bg-yellow-500'
      case 'offline':
        return 'bg-gray-400'
    }
  }

  const getStatusText = (status: Friend['status']) => {
    switch (status) {
      case 'online':
        return 'Çevrimiçi'
      case 'in-game':
        return 'Oyunda'
      case 'offline':
        return 'Çevrimdışı'
    }
  }

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSuggestedPlayers = suggestedPlayers.filter(
    (player) =>
      player.username.toLowerCase().includes(usernameSearch.toLowerCase()) ||
      player.name.toLowerCase().includes(usernameSearch.toLowerCase())
  )

  const handleInvite = (friend: Friend) => {
    setSelectedFriend(friend)
    setInviteDialogOpen(true)
  }

  const handleSendInvite = () => {
    console.log('Sending invite to', selectedFriend?.name, 'with time control', timeControl)
    setShowTableCreation(true)
  }

  const handleCreateTable = () => {
    console.log('Creating table with time control', timeControl)
    setInviteDialogOpen(false)
    setShowTableCreation(false)
    setSelectedFriend(null)
    router.push('/')
  }

  const handleMessageClick = (friend: Friend) => {
    router.push(`/chat?user=${friend.username}`)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Arkadaşlar</h1>
            <p className="text-muted-foreground mt-1">{friends.length} arkadaş</p>
          </div>
          <Button className="w-full sm:w-auto" onClick={() => setDiscoverDialogOpen(true)}>
            <Users className="w-4 h-4 mr-2" />
            Keşfet
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Arkadaş ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-grid">
            <TabsTrigger value="all">Tümü</TabsTrigger>
            <TabsTrigger value="online">Çevrimiçi</TabsTrigger>
            <TabsTrigger value="requests">
              İstekler
              {friendRequests.length > 0 && (
                <Badge variant="destructive" className="ml-2 px-1.5 py-0 text-xs">
                  {friendRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* All Friends */}
          <TabsContent value="all" className="space-y-3 mt-6">
            {filteredFriends.map((friend) => (
              <Card key={friend.id} className="hover:bg-accent/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(
                          friend.status
                        )}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{friend.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {friend.elo}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">@{friend.username}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs ${friend.status === 'offline' ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {getStatusText(friend.status)}
                        </span>
                        {friend.lastSeen && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{friend.lastSeen}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="hidden sm:flex" onClick={() => handleMessageClick(friend)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Mesaj
                      </Button>
                      <Button size="sm" disabled={friend.status === 'offline'} onClick={() => handleInvite(friend)}>
                        <Swords className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Davet Et</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Profili Görüntüle</DropdownMenuItem>
                          <DropdownMenuItem className="sm:hidden" onClick={() => handleMessageClick(friend)}>
                            Mesaj Gönder
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/game-history/${friend.id}`}>Oyun Geçmişi</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Arkadaşlıktan Çıkar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Online Friends */}
          <TabsContent value="online" className="space-y-3 mt-6">
            {filteredFriends
              .filter((f) => f.status !== 'offline')
              .map((friend) => (
                <Card key={friend.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(
                            friend.status
                          )}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{friend.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {friend.elo}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">@{friend.username}</p>
                        <span className="text-xs text-foreground">{getStatusText(friend.status)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="hidden sm:flex" onClick={() => handleMessageClick(friend)}>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Mesaj
                        </Button>
                        <Button size="sm" onClick={() => handleInvite(friend)}>
                          <Swords className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Davet Et</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          {/* Friend Requests */}
          <TabsContent value="requests" className="space-y-3 mt-6">
            {friendRequests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Arkadaşlık isteği bulunmuyor</p>
                </CardContent>
              </Card>
            ) : (
              friendRequests.map((request) => (
                <Card key={request.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                        <AvatarFallback>{request.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{request.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {request.elo}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">@{request.username}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {request.mutualFriends} ortak arkadaş
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <X className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Reddet</span>
                        </Button>
                        <Button size="sm">
                          <Check className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Kabul Et</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Invite Dialog */}
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            {!showTableCreation ? (
              <>
                <DialogHeader>
                  <DialogTitle>Oyuna Davet Et</DialogTitle>
                  <DialogDescription>
                    {selectedFriend?.name} adlı oyuncuyu bir oyuna davet et
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedFriend?.avatar || "/placeholder.svg"} alt={selectedFriend?.name} />
                      <AvatarFallback>{selectedFriend?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedFriend?.name}</p>
                      <p className="text-sm text-muted-foreground">ELO: {selectedFriend?.elo}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Zaman Kontrolü</Label>
                    <RadioGroup value={timeControl} onValueChange={setTimeControl}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1+0" id="bullet" />
                        <Label htmlFor="bullet" className="flex items-center gap-2 cursor-pointer">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Bullet (1+0)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3+0" id="blitz-3" />
                        <Label htmlFor="blitz-3" className="flex items-center gap-2 cursor-pointer">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Blitz (3+0)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3+2" id="blitz-3-2" />
                        <Label htmlFor="blitz-3-2" className="flex items-center gap-2 cursor-pointer">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Blitz (3+2)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5+0" id="blitz-5" />
                        <Label htmlFor="blitz-5" className="flex items-center gap-2 cursor-pointer">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Blitz (5+0)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10+0" id="rapid" />
                        <Label htmlFor="rapid" className="flex items-center gap-2 cursor-pointer">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Rapid (10+0)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="15+10" id="rapid-15" />
                        <Label htmlFor="rapid-15" className="flex items-center gap-2 cursor-pointer">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Rapid (15+10)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="30+0" id="classical" />
                        <Label htmlFor="classical" className="flex items-center gap-2 cursor-pointer">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Classical (30+0)</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                    İptal
                  </Button>
                  <Button onClick={handleSendInvite}>
                    <Swords className="w-4 h-4 mr-2" />
                    Davet Gönder
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Masa Oluştur</DialogTitle>
                  <DialogDescription>
                    {selectedFriend?.name} için oyun masası oluşturuluyor
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-6">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="/diverse-user-avatars.png" alt="Sen" />
                        <AvatarFallback>AK</AvatarFallback>
                      </Avatar>
                      <div className="text-2xl font-bold text-muted-foreground">VS</div>
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={selectedFriend?.avatar || "/placeholder.svg"} alt={selectedFriend?.name} />
                        <AvatarFallback>{selectedFriend?.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-lg px-4 py-1.5">
                        <Clock className="w-4 h-4 mr-2" />
                        {timeControl}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Masa oluşturulacak ve {selectedFriend?.name} davet edilecek
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowTableCreation(false)}>
                    Geri
                  </Button>
                  <Button onClick={handleCreateTable} className="bg-green-600 hover:bg-green-700">
                    <Swords className="w-4 h-4 mr-2" />
                    Masa Oluştur ve Başlat
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Discover Dialog */}
        <Dialog open={discoverDialogOpen} onOpenChange={setDiscoverDialogOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yeni Oyuncular Keşfet</DialogTitle>
              <DialogDescription>
                Username ile arama yaparak yeni oyuncular bul ve arkadaş ekle
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Username ile ara..."
                  value={usernameSearch}
                  onChange={(e) => setUsernameSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {usernameSearch ? 'Arama Sonuçları' : 'Önerilen Oyuncular'}
                </Label>
                {filteredSuggestedPlayers.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground text-sm">
                        {usernameSearch ? 'Oyuncu bulunamadı' : 'Önerilen oyuncu yok'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredSuggestedPlayers.map((player) => (
                    <Card key={player.id} className="hover:bg-accent/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                            <AvatarFallback>{player.name[0]}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-sm truncate">{player.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {player.elo}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">@{player.username}</p>
                            <div className="flex items-center gap-3 mt-1">
                              {player.mutualFriends > 0 && (
                                <p className="text-xs text-muted-foreground">
                                  {player.mutualFriends} ortak arkadaş
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                {player.gamesPlayed} oyun
                              </p>
                            </div>
                          </div>

                          <Button size="sm">
                            <UserPlus className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Ekle</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
