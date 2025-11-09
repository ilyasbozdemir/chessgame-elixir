"use client"

import { useState } from "react"
import { Plus, Search, Trophy, Calendar, Users, Edit, Trash2, Eye, ChevronRight } from 'lucide-react'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

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

// <CHANGE> Added more realistic mock data with various statuses
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
  {
    id: "4",
    name: "Hızlı Satranç Şampiyonası",
    description: "Blitz formatında heyecanlı müsabakalar",
    startDate: "2024-04-10",
    endDate: "2024-04-12",
    status: "active",
    participants: 89,
    maxParticipants: 128,
    prizePool: "7,500 TL",
    format: "Swiss System",
  },
]

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [editForm, setEditForm] = useState<Partial<Tournament>>({})
  const { toast } = useToast()

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

  // <CHANGE> Added view tournament handler
  const handleViewTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setIsViewDialogOpen(true)
  }

  // <CHANGE> Added edit tournament handler
  const handleEditTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setEditForm(tournament)
    setIsEditDialogOpen(true)
  }

  // <CHANGE> Added save edit handler
  const handleSaveEdit = () => {
    if (selectedTournament) {
      setTournaments(tournaments.map(t => 
        t.id === selectedTournament.id ? { ...t, ...editForm } : t
      ))
      toast({
        title: "Turnuva güncellendi",
        description: "Turnuva bilgileri başarıyla güncellendi.",
      })
      setIsEditDialogOpen(false)
      setSelectedTournament(null)
      setEditForm({})
    }
  }

  // <CHANGE> Added delete tournament handler
  const handleDeleteTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setIsDeleteDialogOpen(true)
  }

  // <CHANGE> Added confirm delete handler
  const handleConfirmDelete = () => {
    if (selectedTournament) {
      setTournaments(tournaments.filter(t => t.id !== selectedTournament.id))
      toast({
        title: "Turnuva silindi",
        description: `${selectedTournament.name} başarıyla silindi.`,
        variant: "destructive",
      })
      setIsDeleteDialogOpen(false)
      setSelectedTournament(null)
    }
  }

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
                    {/* <CHANGE> Made action buttons functional */}
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewTournament(tournament)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditTournament(tournament)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteTournament(tournament)}
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

      {/* <CHANGE> Added view tournament dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Turnuva Detayları</DialogTitle>
            <DialogDescription>Turnuva bilgilerini görüntüleyin</DialogDescription>
          </DialogHeader>
          {selectedTournament && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{selectedTournament.name}</h3>
                  <p className="text-muted-foreground mt-1">{selectedTournament.description}</p>
                </div>
                {getStatusBadge(selectedTournament.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label className="text-muted-foreground">Başlangıç Tarihi</Label>
                  <p className="font-medium mt-1">
                    {new Date(selectedTournament.startDate).toLocaleDateString("tr-TR", { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Bitiş Tarihi</Label>
                  <p className="font-medium mt-1">
                    {new Date(selectedTournament.endDate).toLocaleDateString("tr-TR", { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Katılımcılar</Label>
                  <p className="font-medium mt-1">
                    {selectedTournament.participants} / {selectedTournament.maxParticipants}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Ödül Havuzu</Label>
                  <p className="font-medium mt-1">{selectedTournament.prizePool}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Turnuva Formatı</Label>
                <p className="font-medium mt-1">{selectedTournament.format}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Kapat
            </Button>
            {selectedTournament && (
              <Button onClick={() => {
                setIsViewDialogOpen(false)
                handleEditTournament(selectedTournament)
              }}>
                Düzenle <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <CHANGE> Added edit tournament dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Turnuvayı Düzenle</DialogTitle>
            <DialogDescription>Turnuva bilgilerini güncelleyin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Turnuva Adı</Label>
              <Input 
                id="edit-name" 
                value={editForm.name || ''} 
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Açıklama</Label>
              <Textarea 
                id="edit-description" 
                value={editForm.description || ''} 
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                rows={3} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-startDate">Başlangıç Tarihi</Label>
                <Input 
                  id="edit-startDate" 
                  type="date" 
                  value={editForm.startDate || ''} 
                  onChange={(e) => setEditForm({...editForm, startDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endDate">Bitiş Tarihi</Label>
                <Input 
                  id="edit-endDate" 
                  type="date" 
                  value={editForm.endDate || ''} 
                  onChange={(e) => setEditForm({...editForm, endDate: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-maxParticipants">Max Katılımcı</Label>
                <Input 
                  id="edit-maxParticipants" 
                  type="number" 
                  value={editForm.maxParticipants || ''} 
                  onChange={(e) => setEditForm({...editForm, maxParticipants: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-prizePool">Ödül Havuzu</Label>
                <Input 
                  id="edit-prizePool" 
                  value={editForm.prizePool || ''} 
                  onChange={(e) => setEditForm({...editForm, prizePool: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-format">Turnuva Formatı</Label>
              <Select 
                value={editForm.format || ''} 
                onValueChange={(value) => setEditForm({...editForm, format: value})}
              >
                <SelectTrigger id="edit-format">
                  <SelectValue placeholder="Format seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Swiss System">Swiss System</SelectItem>
                  <SelectItem value="Elimination">Eleme Usulü</SelectItem>
                  <SelectItem value="Round Robin">Round Robin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Durum</Label>
              <Select 
                value={editForm.status || ''} 
                onValueChange={(value) => setEditForm({...editForm, status: value as Tournament["status"]})}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Yaklaşan</SelectItem>
                  <SelectItem value="active">Devam Ediyor</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveEdit}>Kaydet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <CHANGE> Added delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Turnuvayı Sil</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. <strong>{selectedTournament?.name}</strong> turnuvası kalıcı olarak silinecektir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
