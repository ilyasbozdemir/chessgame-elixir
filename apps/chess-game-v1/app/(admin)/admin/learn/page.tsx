"use client"

import { useState } from "react"
import { Plus, Search, GraduationCap, BookOpen, Video, FileText, Edit, Trash2, Eye } from "lucide-react"
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

interface LearningContent {
  id: string
  title: string
  description: string
  type: "video" | "article" | "interactive"
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  views: number
  status: "published" | "draft"
  createdAt: string
}

const mockContent: LearningContent[] = [
  {
    id: "1",
    title: "Açılış Prensipleri",
    description: "Satranç açılışlarında dikkat edilmesi gereken temel prensipler",
    type: "video",
    category: "Opening",
    difficulty: "beginner",
    duration: "15 dk",
    views: 4567,
    status: "published",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Taktik Kombinasyonlar",
    description: "İleri seviye taktik kombinasyonları ve pratik örnekler",
    type: "interactive",
    category: "Tactics",
    difficulty: "advanced",
    duration: "30 dk",
    views: 2345,
    status: "published",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    title: "Son Oyun Stratejileri",
    description: "Piyon son oyunlarında kazanma teknikleri",
    type: "article",
    category: "Endgame",
    difficulty: "intermediate",
    duration: "10 dk",
    views: 1890,
    status: "draft",
    createdAt: "2024-02-01",
  },
]

export default function LearnPage() {
  const [content, setContent] = useState<LearningContent[]>(mockContent)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getTypeBadge = (type: LearningContent["type"]) => {
    const config = {
      video: {
        icon: Video,
        className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
        label: "Video",
      },
      article: {
        icon: FileText,
        className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        label: "Makale",
      },
      interactive: {
        icon: BookOpen,
        className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        label: "İnteraktif",
      },
    }
    const { icon: Icon, className, label } = config[type]
    return (
      <Badge className={className}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Badge>
    )
  }

  const getDifficultyBadge = (difficulty: LearningContent["difficulty"]) => {
    const variants = {
      beginner: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
      intermediate: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
      advanced: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    }
    const labels = {
      beginner: "Başlangıç",
      intermediate: "Orta",
      advanced: "İleri",
    }
    return <Badge className={variants[difficulty]}>{labels[difficulty]}</Badge>
  }

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || item.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Öğrenme İçerikleri</h1>
          <p className="text-muted-foreground mt-1">Eğitim materyallerini yönetin</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni İçerik
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Öğrenme İçeriği</DialogTitle>
              <DialogDescription>Kullanıcılar için yeni eğitim materyali ekleyin</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Başlık</Label>
                <Input id="title" placeholder="İçerik başlığı" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea id="description" placeholder="İçerik açıklaması" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">İçerik Tipi</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="article">Makale</SelectItem>
                      <SelectItem value="interactive">İnteraktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Zorluk</Label>
                  <Select>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Başlangıç</SelectItem>
                      <SelectItem value="intermediate">Orta</SelectItem>
                      <SelectItem value="advanced">İleri</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="opening">Opening</SelectItem>
                      <SelectItem value="middlegame">Middlegame</SelectItem>
                      <SelectItem value="endgame">Endgame</SelectItem>
                      <SelectItem value="tactics">Tactics</SelectItem>
                      <SelectItem value="strategy">Strategy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Süre</Label>
                  <Input id="duration" placeholder="15 dk" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">İçerik URL / Metin</Label>
                <Textarea id="content" placeholder="Video URL veya makale metni" rows={4} />
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
            <CardTitle className="text-sm font-medium">Toplam İçerik</CardTitle>
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Eğitim materyali</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video İçerik</CardTitle>
            <Video className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.filter((c) => c.type === "video").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Video dersler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Görüntülenme</CardTitle>
            <Eye className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.reduce((acc, c) => acc + c.views, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Tüm içerikler</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="İçerik ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tip filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="article">Makale</SelectItem>
                <SelectItem value="interactive">İnteraktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İçerik</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Zorluk</TableHead>
                <TableHead>Süre</TableHead>
                <TableHead>Görüntülenme</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="max-w-md">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{item.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(item.type)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{getDifficultyBadge(item.difficulty)}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{item.views.toLocaleString()}</TableCell>
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
