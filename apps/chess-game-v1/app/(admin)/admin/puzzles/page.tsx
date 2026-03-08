"use client"

import { useState } from "react"
import { Plus, Search, Puzzle, TrendingUp, Target, Edit, Trash2, Play } from "lucide-react"
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

interface PuzzleItem {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced" | "expert"
  category: string
  rating: number
  attempts: number
  successRate: number
  createdAt: string
  status: "active" | "draft" | "archived"
}

const mockPuzzles: PuzzleItem[] = [
  {
    id: "1",
    title: "Mat in 2 Moves",
    description: "Beyaz oynar ve 2 hamlede mat eder",
    difficulty: "intermediate",
    category: "Checkmate",
    rating: 1450,
    attempts: 1234,
    successRate: 78,
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    title: "Fork Tactic",
    description: "Çatal taktiği ile avantaj kazanın",
    difficulty: "beginner",
    category: "Tactics",
    rating: 1200,
    attempts: 2456,
    successRate: 85,
    createdAt: "2024-01-20",
    status: "active",
  },
  {
    id: "3",
    title: "Endgame Mastery",
    description: "Karmaşık bir son oyun pozisyonu",
    difficulty: "expert",
    category: "Endgame",
    rating: 1850,
    attempts: 456,
    successRate: 42,
    createdAt: "2024-02-01",
    status: "active",
  },
]

export default function PuzzlesPage() {
  const [puzzles, setPuzzles] = useState<PuzzleItem[]>(mockPuzzles)
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getDifficultyBadge = (difficulty: PuzzleItem["difficulty"]) => {
    const variants = {
      beginner: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
      intermediate: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
      advanced: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
      expert: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    }
    const labels = {
      beginner: "Başlangıç",
      intermediate: "Orta",
      advanced: "İleri",
      expert: "Uzman",
    }
    return <Badge className={variants[difficulty]}>{labels[difficulty]}</Badge>
  }

  const filteredPuzzles = puzzles.filter((puzzle) => {
    const matchesSearch =
      puzzle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      puzzle.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || puzzle.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bulmacalar</h1>
          <p className="text-muted-foreground mt-1">Satranç bulmacalarını yönetin</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Bulmaca
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Bulmaca Oluştur</DialogTitle>
              <DialogDescription>Kullanıcılar için yeni bir bulmaca ekleyin</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Başlık</Label>
                <Input id="title" placeholder="Örn: Mat in 3 Moves" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea id="description" placeholder="Bulmaca açıklaması" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="expert">Uzman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checkmate">Checkmate</SelectItem>
                      <SelectItem value="tactics">Tactics</SelectItem>
                      <SelectItem value="endgame">Endgame</SelectItem>
                      <SelectItem value="opening">Opening</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input id="rating" type="number" placeholder="1400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fen">FEN Pozisyonu</Label>
                <Textarea id="fen" placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" rows={2} />
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
            <CardTitle className="text-sm font-medium">Toplam Bulmaca</CardTitle>
            <Puzzle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puzzles.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Aktif bulmacalar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Deneme</CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puzzles.reduce((acc, p) => acc + p.attempts, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Tüm bulmacalar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ort. Başarı Oranı</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(puzzles.reduce((acc, p) => acc + p.successRate, 0) / puzzles.length)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Genel başarı</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Bulmaca ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Zorluk filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="beginner">Başlangıç</SelectItem>
                <SelectItem value="intermediate">Orta</SelectItem>
                <SelectItem value="advanced">İleri</SelectItem>
                <SelectItem value="expert">Uzman</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bulmaca</TableHead>
                <TableHead>Zorluk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Denemeler</TableHead>
                <TableHead>Başarı Oranı</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPuzzles.map((puzzle) => (
                <TableRow key={puzzle.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{puzzle.title}</div>
                      <div className="text-sm text-muted-foreground">{puzzle.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getDifficultyBadge(puzzle.difficulty)}</TableCell>
                  <TableCell>{puzzle.category}</TableCell>
                  <TableCell className="font-medium">{puzzle.rating}</TableCell>
                  <TableCell>{puzzle.attempts.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                        <div className="bg-primary h-full transition-all" style={{ width: `${puzzle.successRate}%` }} />
                      </div>
                      <span className="text-sm font-medium">{puzzle.successRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Play className="w-4 h-4" />
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
