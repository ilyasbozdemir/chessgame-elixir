import { Card } from "@/components/ui/card"
import { Puzzle, BookOpen, Video, Users, Wrench, Trophy, TrendingUp, Brain, Lightbulb } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Puzzle,
    title: "Günlük Bulmacalar",
    description: "Her gün yeni satranç problemleri çözün",
    color: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-500/10",
    href: "/puzzles",
  },
  {
    icon: BookOpen,
    title: "Eğitim Programı",
    description: "Adım adım satranç öğrenin",
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
    href: "/learn",
  },
  {
    icon: Video,
    title: "Maç İzle",
    description: "Canlı ve kayıtlı oyunları izleyin",
    color: "text-green-500 dark:text-green-400",
    bgColor: "bg-green-500/10",
    href: "/watch",
  },
  {
    icon: Users,
    title: "Topluluk",
    description: "Diğer oyuncularla iletişime geçin",
    color: "text-purple-500 dark:text-purple-400",
    bgColor: "bg-purple-500/10",
    href: "/community",
  },
  {
    icon: Trophy,
    title: "Turnuvalar",
    description: "Yarışmalara katılın ve ödüller kazanın",
    color: "text-yellow-500 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10",
    href: "/play/online/tournaments",
  },
  {
    icon: TrendingUp,
    title: "İstatistikler",
    description: "Performansınızı analiz edin",
    color: "text-pink-500 dark:text-pink-400",
    bgColor: "bg-pink-500/10",
    href: "/stats",
  },
  {
    icon: Brain,
    title: "Yapay Zeka Analizi",
    description: "Oyunlarınızı AI ile inceleyin",
    color: "text-cyan-500 dark:text-cyan-400",
    bgColor: "bg-cyan-500/10",
    href: "/analysis",
  },
  {
    icon: Wrench,
    title: "Açılış Kütüphanesi",
    description: "Binlerce açılış hamlesi öğrenin",
    color: "text-red-500 dark:text-red-400",
    bgColor: "bg-red-500/10",
    href: "/openings",
  },
  {
    icon: Lightbulb,
    title: "Taktikler",
    description: "Taktik becerilerinizi geliştirin",
    color: "text-indigo-500 dark:text-indigo-400",
    bgColor: "bg-indigo-500/10",
    href: "/tactics",
  },
]

export function FeaturesGrid() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Keşfet</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link key={feature.title} href={feature.href}>
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group hover:border-primary/50 h-full">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${feature.bgColor} shrink-0`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base text-card-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
