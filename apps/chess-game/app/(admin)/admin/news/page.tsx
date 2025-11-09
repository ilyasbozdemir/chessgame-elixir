"use client"

import { useState } from "react"
import { Plus, Search, Newspaper, Eye, Edit, Trash2, CheckCircle } from "lucide-react"
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

interface NewsItem {
  id: string
  title: string
  excerpt: string
  author: string
  category: string
  status: "published" | "draft" | "scheduled"
  views: number
  createdAt: string
  publishedAt: string | null
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Yeni Turnuva Sistemi Duyurusu",
    excerpt: "Platformumuza yeni turnuva sistemi eklendi. Artık daha fazla turnuvaya katılabilir...",
    author: "Admin",
    category: "Duyuru",
    status: "published",
    views: 3456,
    createdAt: "2024-01-15",
    publishedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Mart Ayı Şampiyonu Belli Oldu",
    excerpt: "Mart ayının en başarılı oyuncusu belirlendi. Tebrikler...",
    author: "Admin",
    category: "Turnuva",
    status: "published",
    views: 2134,
    createdAt: "2024-03-01",
    publishedAt: "2024-03-01",
  },
  {
    id: "3",
    title: "Yeni Özellikler Geliyor",
    excerpt: "Önümüzdeki hafta platformumuza yeni özellikler eklenecek...",
    author: "Editor",
    category: "Güncelleme",
    status: "draft",
    views: 0,
    createdAt: "2024-03-10",
    publishedAt: null,
  },
]

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(mockNews)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getStatusBadge = (status: NewsItem["status"]) => {
    const variants = {
      published: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
      draft: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
      scheduled: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    }
    const labels = {
      published: "Yayında",
      draft: "Taslak",
      scheduled: "Zamanlanmış",
    }
    return <Badge className={variants[status]}>{labels[status]}</Badge>
  }

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Haberler</h1>
          <p className="text-muted-foreground mt-1">Haber ve duyuruları yönetin</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Haber
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Yeni Haber Oluştur</DialogTitle>
              <DialogDescription>Platform için yeni bir haber veya duyuru ekleyin</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Başlık</Label>
                <Input id="title" placeholder="Haber başlığı" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Özet</Label>
                <Textarea id="excerpt" placeholder="Kısa özet (önizleme için)" rows={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">İçerik</Label>
                <Textarea id="content" placeholder="Haber içeriği" rows={6} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Duyuru</SelectItem>
                      <SelectItem value="tournament">Turnuva</SelectItem>
                      <SelectItem value="update">Güncelleme</SelectItem>
                      <SelectItem value="event">Etkinlik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Durum</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Taslak</SelectItem>
                      <SelectItem value="published">Yayınla</SelectItem>
                      <SelectItem value="scheduled">Zamanla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishDate">Yayın Tarihi (opsiyonel)</Label>
                <Input id="publishDate" type="datetime-local" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>Kaydet</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Haber</CardTitle>
            <Newspaper className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Tüm haberler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yayında</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.filter((n) => n.status === "published").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Aktif haberler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Görüntülenme</CardTitle>
            <Eye className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.reduce((acc, n) => acc + n.views, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Tüm haberler</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Haber ara..."
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
                <SelectItem value="published">Yayında</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
                <SelectItem value="scheduled">Zamanlanmış</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Haber</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Yazar</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Görüntülenme</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="max-w-md">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{item.excerpt}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span>{item.views.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(item.createdAt).toLocaleDateString("tr-TR")}</div>
                  </TableCell>
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
