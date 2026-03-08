"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Eye, Trash2, AlertTriangle, Filter, Clock, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const mockGames = [
  {
    id: 1,
    player1: { name: "Ahmet Yılmaz", rating: 1850 },
    player2: { name: "Ayşe Kaya", rating: 1790 },
    status: "ongoing",
    moves: 24,
    time: "10+5",
    started: "2024-04-15 14:30",
    timeControl: "Blitz",
  },
  {
    id: 2,
    player1: { name: "Mehmet Demir", rating: 2100 },
    player2: { name: "Fatma Şahin", rating: 2050 },
    status: "completed",
    moves: 45,
    time: "15+10",
    started: "2024-04-15 13:20",
    winner: "Mehmet Demir",
    timeControl: "Rapid",
    result: "checkmate",
  },
  {
    id: 3,
    player1: { name: "Ali Çelik", rating: 1650 },
    player2: { name: "Zeynep Yıldız", rating: 1700 },
    status: "ongoing",
    moves: 18,
    time: "5+3",
    started: "2024-04-15 14:45",
    timeControl: "Blitz",
  },
  {
    id: 4,
    player1: { name: "Can Arslan", rating: 1950 },
    player2: { name: "Elif Özkan", rating: 1980 },
    status: "completed",
    moves: 67,
    time: "30+0",
    started: "2024-04-15 12:00",
    winner: "Elif Özkan",
    timeControl: "Classical",
    result: "resignation",
  },
  {
    id: 5,
    player1: { name: "Burak Koç", rating: 1750 },
    player2: { name: "Selin Aydın", rating: 1820 },
    status: "reported",
    moves: 32,
    time: "10+5",
    started: "2024-04-15 11:30",
    timeControl: "Blitz",
    reportReason: "Hile şüphesi",
  },
]

export default function AdminGamesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedGame, setSelectedGame] = useState<(typeof mockGames)[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const filteredGames = mockGames.filter((game) => {
    const matchesSearch =
      game.player1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.player2.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || game.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ongoing":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Devam Ediyor
          </Badge>
        )
      case "completed":
        return <Badge variant="secondary">Tamamlandı</Badge>
      case "reported":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Raporlandı
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleViewGame = (game: (typeof mockGames)[0]) => {
    setSelectedGame(game)
    setShowDetailsDialog(true)
  }

  const handleDeleteGame = (gameId: number) => {
    if (confirm("Bu oyunu silmek istediğinizden emin misiniz?")) {
      toast.success(`Oyun #${gameId} başarıyla silindi`)
    }
  }

  const handleResolveReport = (gameId: number) => {
    toast.success(`Oyun #${gameId} raporu işleme alındı`)
    setShowDetailsDialog(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Oyun Yönetimi</h1>
        <p className="text-muted-foreground">Tüm oyunları görüntüleyin ve yönetin</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Devam Eden
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockGames.filter((g) => g.status === "ongoing").length}</div>
            <p className="text-xs text-muted-foreground">Şu anda oynanıyor</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Tamamlanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockGames.filter((g) => g.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">Toplam oyun</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Raporlanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {mockGames.filter((g) => g.status === "reported").length}
            </div>
            <p className="text-xs text-muted-foreground">İnceleme bekliyor</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Toplam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockGames.length}</div>
            <p className="text-xs text-muted-foreground">Tüm oyunlar</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <CardTitle>Oyunlar</CardTitle>
              <CardDescription>Toplam {filteredGames.length} oyun gösteriliyor</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Oyuncu ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="ongoing">Devam Eden</SelectItem>
                  <SelectItem value="completed">Tamamlanan</SelectItem>
                  <SelectItem value="reported">Raporlanan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Oyuncular</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Hamle</TableHead>
                <TableHead>Zaman Kontrolü</TableHead>
                <TableHead>Başlangıç</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGames.map((game) => (
                <TableRow key={game.id}>
                  <TableCell className="font-medium">#{game.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{game.player1.name}</span>
                      <span className="text-xs text-muted-foreground">vs</span>
                      <span className="text-sm font-medium">{game.player2.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs">
                      <span>{game.player1.rating}</span>
                      <span className="text-muted-foreground">{game.player2.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(game.status)}</TableCell>
                  <TableCell>{game.moves}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{game.timeControl}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{game.started}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewGame(game)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      {game.status === "reported" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-orange-600"
                          onClick={() => handleViewGame(game)}
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDeleteGame(game.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Oyun Detayları #{selectedGame?.id}</DialogTitle>
            <DialogDescription>Oyun bilgileri ve işlemler</DialogDescription>
          </DialogHeader>
          {selectedGame && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Beyaz</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{selectedGame.player1.name}</p>
                    <p className="text-sm text-muted-foreground">Rating: {selectedGame.player1.rating}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Siyah</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{selectedGame.player2.name}</p>
                    <p className="text-sm text-muted-foreground">Rating: {selectedGame.player2.rating}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Durum:</span>
                  <div className="mt-1">{getStatusBadge(selectedGame.status)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Zaman Kontrolü:</span>
                  <p className="font-medium">{selectedGame.timeControl}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Hamle Sayısı:</span>
                  <p className="font-medium">{selectedGame.moves}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Başlangıç:</span>
                  <p className="font-medium">{selectedGame.started}</p>
                </div>
              </div>

              {selectedGame.winner && (
                <Card className="border-green-200 bg-green-50 dark:bg-green-950">
                  <CardContent className="pt-4">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Kazanan:</span>
                      <span className="font-medium ml-2">{selectedGame.winner}</span>
                    </p>
                    {selectedGame.result && (
                      <p className="text-sm mt-1">
                        <span className="text-muted-foreground">Sonuç:</span>
                        <span className="font-medium ml-2 capitalize">{selectedGame.result}</span>
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {selectedGame.status === "reported" && selectedGame.reportReason && (
                <Card className="border-red-200 bg-red-50 dark:bg-red-950">
                  <CardContent className="pt-4">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Rapor Sebebi:</span>
                      <span className="font-medium ml-2">{selectedGame.reportReason}</span>
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2 justify-end pt-4">
                {selectedGame.status === "reported" && (
                  <Button onClick={() => handleResolveReport(selectedGame.id)}>Raporu İşle</Button>
                )}
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Kapat
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
