"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Puzzle, Star, ArrowLeft, RotateCcw, Lightbulb, CheckCircle2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"

const mockPuzzles = [
  {
    id: "puzzle-1",
    title: "Mat in 2",
    difficulty: "Kolay",
    rating: 1200,
    solved: 1543,
    category: "Checkmate",
    description: "Beyaz 2 hamlede mat yapar",
    solution: "1. Qh7+ Kf8 2. Qh8#",
    hint: "Veziri kullanarak şahı köşeye sıkıştırın",
  },
  {
    id: "puzzle-2",
    title: "Taktik Kombinasyon",
    difficulty: "Orta",
    rating: 1650,
    solved: 892,
    category: "Tactics",
    description: "Vezir fedası ile kazanç",
    solution: "1. Qxh7+ Kxh7 2. Rh3#",
    hint: "Vezir fedası sonrası kale ile mat",
  },
  {
    id: "puzzle-3",
    title: "Son Oyun",
    difficulty: "Zor",
    rating: 2100,
    solved: 234,
    category: "Endgame",
    description: "Piyon terfi stratejisi",
    solution: "1. e7 Re8 2. Kf7 Rxe7+ 3. Kxe7",
    hint: "Şahı piyonun önüne getirin",
  },
  {
    id: "puzzle-4",
    title: "Açılış Tuzağı",
    difficulty: "Kolay",
    rating: 1350,
    solved: 2156,
    category: "Opening",
    description: "Yaygın açılış hatası",
    solution: "1. Qh5 Nf6 2. Qxf7#",
    hint: "F7 karesi zayıf",
  },
  {
    id: "puzzle-5",
    title: "Çatal Atağı",
    difficulty: "Orta",
    rating: 1800,
    solved: 567,
    category: "Tactics",
    description: "At ile çifte saldırı",
    solution: "1. Nf6+ Kh8 2. Nxd7",
    hint: "At ile şah ve vezire aynı anda saldırın",
  },
  {
    id: "puzzle-6",
    title: "Kale Finali",
    difficulty: "Zor",
    rating: 2250,
    solved: 145,
    category: "Endgame",
    description: "Lucena pozisyonu",
    solution: "1. Re4 Kd7 2. Kf7 Rf1+ 3. Kg6",
    hint: "Kaleyi köprü olarak kullanın",
  },
]

const difficultyColors = {
  Kolay: "bg-green-500/10 text-green-700 dark:text-green-400",
  Orta: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  Zor: "bg-red-500/10 text-red-700 dark:text-red-400",
}

export default function PuzzleDetailPage() {
  const router = useRouter()
  const params = useParams()
  const puzzleId = params.id as string

  const puzzle = mockPuzzles.find((p) => p.id === puzzleId)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [isSolved, setIsSolved] = useState(false)

  if (!puzzle) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] p-3 sm:p-4 md:p-8 lg:ml-64 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Bulmaca bulunamadı</p>
            <Button onClick={() => router.push("/puzzles")} className="mt-4">
              Geri Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] p-3 sm:p-4 md:p-8 lg:ml-64">
      <div className="max-w-6xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => router.push("/puzzles")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{puzzle.title}</CardTitle>
                  <CardDescription>{puzzle.description}</CardDescription>
                </div>
                <Badge className={difficultyColors[puzzle.difficulty as keyof typeof difficultyColors]}>
                  {puzzle.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{puzzle.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{puzzle.solved} çözüm</span>
                </div>
                <Badge variant="outline">{puzzle.category}</Badge>
              </div>

              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Satranç Tahtası</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowHint(!showHint)}>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  İpucu
                </Button>
                <Button variant="outline" onClick={() => {}}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {showHint && (
                <Card className="bg-yellow-500/10 border-yellow-500/20">
                  <CardContent className="p-4">
                    <p className="text-sm">
                      <strong>İpucu:</strong> {puzzle.hint}
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulmaca Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Zorluk</span>
                  <Badge className={difficultyColors[puzzle.difficulty as keyof typeof difficultyColors]}>
                    {puzzle.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Rating</span>
                  <span className="font-semibold">{puzzle.rating}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Kategori</span>
                  <Badge variant="outline">{puzzle.category}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Çözüm Sayısı</span>
                  <span className="font-semibold">{puzzle.solved}</span>
                </div>
              </div>

              {isSolved && (
                <Card className="bg-green-500/10 border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                    <p className="font-semibold text-green-700 dark:text-green-400">Tebrikler!</p>
                    <p className="text-sm text-muted-foreground mt-1">Bulmacayı başarıyla çözdünüz</p>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <Button className="w-full" size="lg" onClick={() => setIsSolved(true)}>
                  <Puzzle className="w-4 h-4 mr-2" />
                  Çözümü Kontrol Et
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setShowSolution(!showSolution)}
                >
                  {showSolution ? "Çözümü Gizle" : "Çözümü Göster"}
                </Button>
              </div>

              {showSolution && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium mb-2">Çözüm:</p>
                    <p className="text-sm font-mono">{puzzle.solution}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
