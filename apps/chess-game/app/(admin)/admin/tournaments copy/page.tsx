"use client"

import { useState } from "react"
import { Plus, Search, Trophy, Calendar, Users, Edit, Trash2, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Tournament {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  status: "upcoming" | "active" | "completed"
  participants: number
  maxParticipants: number
  prizePool: string
  format: string
}

const mockTournaments: Tournament[] = [
  {
    id: "1",
    name: "Bahar Şampiyonası 2024",
    description: "İlkbahar sezonunun en büyük turnuvası",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    status: "active",
    participants: 128,
    maxParticipants: 256,
    prizePool: "10,000 TL",
    format: "Swiss System",
  },
  {
    id: "2",
    name: "Yaz Kupası",
    description: "Yaz aylarının büyük turnuvası",
    startDate: "2024-06-01",
    endDate: "2024-06-07",
    status: "upcoming",
    participants: 64,
    maxParticipants: 128,
    prizePool: "5,000 TL",
    format: "Elimination",
  },
  {
    id: "3",
    name: "Kış Ligi Finali",
    description: "Kış sezonunun son turnuvası",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    status: "completed",
    participants: 256,
    maxParticipants: 256,
    prizePool: "15,000 TL",
    format: "Round Robin",
  },
]

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getStatusBadge = (status: Tournament["status"]) => {
    const variants = {
      upcoming: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
      active: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
      completed: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
    }
    const labels = {
      upcoming: "Yaklaşan",
      active: "Devam Ediyor",
      completed: "Tamamlandı",
    }
    return <Badge className={variants[status]}>{labels[status]}</Badge>
  }

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || tournament.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Turnuvalar</h1>
          <p className="text-muted-foreground mt-1">Tüm turnuvaları yönetin</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Turnuva
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Turnuva Oluştur</DialogTitle>
              <DialogDescription>Yeni bir turnuva organizasyonu başlatın</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Turnuva Adı</Label>
                <Input id="name" placeholder="Örn: Bahar Şampiyonası" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea id="description" placeholder="Turnuva hakkında detaylı açıklama" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Bitiş Tarihi</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Katılımcı</Label>
                  <Input id="maxParticipants" type="number" placeholder="256" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prizePool">Ödül Havuzu</Label>
                  <Input id="prizePool" placeholder="10,000 TL" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="format">Turnuva Formatı</Label>
                <Select>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Format seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="swiss">Swiss System</SelectItem>
                    <SelectItem value="elimination">Eleme Usulü</SelectItem>
                    <SelectItem value="roundrobin">Round Robin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>Oluştur</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Turnuva</CardTitle>
            <Trophy className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tournaments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Tüm turnuvalar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Turnuvalar</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tournaments.filter((t) => t.status === "active").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Şu anda devam ediyor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Katılımcı</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tournaments.reduce((acc, t) => acc + t.participants, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Aktif oyuncular</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Turnuva ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Durum filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="upcoming">Yaklaşan</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="completed">Tamamlanan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Turnuva</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Katılımcılar</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Ödül</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTournaments.map((tournament) => (
                <TableRow key={tournament.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{tournament.name}</div>
                      <div className="text-sm text-muted-foreground">{tournament.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(tournament.startDate).toLocaleDateString("tr-TR")}</div>
                      <div className="text-muted-foreground">
                        {new Date(tournament.endDate).toLocaleDateString("tr-TR")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(tournament.status)}</TableCell>
                  <TableCell>
                    {tournament.participants} / {tournament.maxParticipants}
                  </TableCell>
                  <TableCell>{tournament.format}</TableCell>
                  <TableCell className="font-medium">{tournament.prizePool}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
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
    </div>
  )
}
