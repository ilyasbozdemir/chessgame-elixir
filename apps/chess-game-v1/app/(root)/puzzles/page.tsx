"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Puzzle, Star, Trophy, Target, Zap, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const mockPuzzles = [
  {
    id: "puzzle-1",
    title: "Mat in 2",
    difficulty: "Kolay",
    rating: 1200,
    solved: 1543,
    category: "Checkmate",
    description: "Beyaz 2 hamlede mat yapar",
  },
  {
    id: "puzzle-2",
    title: "Taktik Kombinasyon",
    difficulty: "Orta",
    rating: 1650,
    solved: 892,
    category: "Tactics",
    description: "Vezir fedası ile kazanç",
  },
  {
    id: "puzzle-3",
    title: "Son Oyun",
    difficulty: "Zor",
    rating: 2100,
    solved: 234,
    category: "Endgame",
    description: "Piyon terfi stratejisi",
  },
  {
    id: "puzzle-4",
    title: "Açılış Tuzağı",
    difficulty: "Kolay",
    rating: 1350,
    solved: 2156,
    category: "Opening",
    description: "Yaygın açılış hatası",
  },
  {
    id: "puzzle-5",
    title: "Çatal Atağı",
    difficulty: "Orta",
    rating: 1800,
    solved: 567,
    category: "Tactics",
    description: "At ile çifte saldırı",
  },
  {
    id: "puzzle-6",
    title: "Kale Finali",
    difficulty: "Zor",
    rating: 2250,
    solved: 145,
    category: "Endgame",
    description: "Lucena pozisyonu",
  },
];

const difficultyColors = {
  Kolay: "bg-green-500/10 text-green-700 dark:text-green-400",
  Orta: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  Zor: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function PuzzlesPage() {
  const [filter, setFilter] = useState<string>("all");
  const router = useRouter();

  const filteredPuzzles =
    filter === "all"
      ? mockPuzzles
      : mockPuzzles.filter((p) => p.difficulty === filter);

  const handleSolvePuzzle = (puzzleId: string) => {
    router.push(`/puzzles/${puzzleId}`);
  };

  return (
    <React.Fragment>
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Puzzle className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold">
                Satranç Bulmacaları
              </CardTitle>
            </div>
            <CardDescription>
              Satranç becerilerinizi geliştirmek için bulmacaları çözün
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card className="bg-primary/5">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">Çözülen</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardContent className="p-4 text-center">
                  <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-xs text-muted-foreground">Başarı</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">1650</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardContent className="p-4 text-center">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Seri</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Tümü
          </Button>
          <Button
            variant={filter === "Kolay" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("Kolay")}
          >
            Kolay
          </Button>
          <Button
            variant={filter === "Orta" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("Orta")}
          >
            Orta
          </Button>
          <Button
            variant={filter === "Zor" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("Zor")}
          >
            Zor
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPuzzles.map((puzzle) => (
            <Card
              key={puzzle.id}
              className="hover:border-primary transition-colors"
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="font-semibold">{puzzle.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {puzzle.description}
                    </p>
                  </div>
                  <Badge
                    className={
                      difficultyColors[
                        puzzle.difficulty as keyof typeof difficultyColors
                      ]
                    }
                  >
                    {puzzle.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{puzzle.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    <span>{puzzle.solved} çözüm</span>
                  </div>
                </div>

                <Badge variant="outline" className="text-xs">
                  {puzzle.category}
                </Badge>

                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => handleSolvePuzzle(puzzle.id)}
                >
                  <Puzzle className="w-4 h-4 mr-2" />
                  Çöz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
