"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Video, Award, ChevronRight } from "lucide-react"

const learningCategories = [
  {
    id: "beginner",
    title: "Başlangıç",
    description: "Satranç temellerini öğrenin",
    icon: GraduationCap,
    lessons: 12,
    duration: "2 saat",
    progress: 75,
    color: "bg-green-500/10 text-green-700 dark:text-green-400",
  },
  {
    id: "intermediate",
    title: "Orta Seviye",
    description: "Taktik ve strateji geliştirin",
    icon: BookOpen,
    lessons: 24,
    duration: "5 saat",
    progress: 45,
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
  {
    id: "advanced",
    title: "İleri Seviye",
    description: "Usta seviyesi teknikler",
    icon: Award,
    lessons: 18,
    duration: "4 saat",
    progress: 12,
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  },
]

const recentLessons = [
  {
    id: "lesson-1",
    title: "Açılış Prensipleri",
    category: "Başlangıç",
    duration: "15 dk",
    completed: true,
  },
  {
    id: "lesson-2",
    title: "Merkez Kontrolü",
    category: "Başlangıç",
    duration: "12 dk",
    completed: true,
  },
  {
    id: "lesson-3",
    title: "Taş Gelişimi",
    category: "Başlangıç",
    duration: "18 dk",
    completed: false,
  },
  {
    id: "lesson-4",
    title: "Çatal ve Şiş Taktikleri",
    category: "Orta Seviye",
    duration: "20 dk",
    completed: false,
  },
]

export default function LearnPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] p-3 sm:p-4 md:p-8 lg:ml-64">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold">Satranç Öğren</CardTitle>
            </div>
            <CardDescription>Başlangıçtan ileri seviyeye satranç dersleri</CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold px-1">Öğrenme Yolları</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {learningCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.id} className="hover:border-primary transition-colors">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.lessons} ders
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">{category.title}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>İlerleme</span>
                        <span>{category.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${category.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">{category.duration}</span>
                      <Button size="sm" variant="ghost">
                        Devam Et
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold px-1">Son Dersler</h3>
          <div className="grid gap-3">
            {recentLessons.map((lesson) => (
              <Card key={lesson.id} className="hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <Video className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm truncate">{lesson.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {lesson.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant={lesson.completed ? "outline" : "default"}>
                      {lesson.completed ? "Tekrar İzle" : "İzle"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
