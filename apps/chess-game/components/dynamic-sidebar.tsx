"use client"

import { usePathname } from "next/navigation"
import {
  Home,
  Puzzle,
  BookOpen,
  Video,
  Users,
  Wrench,
  Heart,
  Trophy,
  Clock,
  ChevronDown,
  FileText,
  Info,
  Play,
  Calendar,
  History,
  TrendingUp,
  Zap,
  Radio,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"

const defaultMenuItems = [
  { icon: Home, label: "Ana Sayfa", href: "/" },
  { icon: Puzzle, label: "Bulmacalar", href: "/puzzles" },
  { icon: BookOpen, label: "Öğren", href: "/learn" },
  { icon: Video, label: "İzle", href: "/watch" },
  { icon: Users, label: "Topluluk", href: "/community" },
  { icon: Trophy, label: "Turnuvalar", href: "/tournaments" },
]

const moreItems = [
  { icon: Clock, label: "Geçmiş", href: "/history" },
  { icon: Wrench, label: "Araçlar", href: "/tools" },
  { icon: Radio, label: "Canlı Yayın", href: "/stream" }, // Added streaming page to more items
  { icon: FileText, label: "Şartlar", href: "/terms" },
  { icon: Info, label: "Hakkında", href: "/about" },
  { icon: Heart, label: "Bağış Yap", href: "/donate", special: true },
]

const watchMenuItems = [
  { icon: Home, label: "Ana Sayfa", href: "/" },
  { icon: Play, label: "Canlı Oyunlar", href: "/watch" },
  { icon: Calendar, label: "Etkinlikler", href: "/watch" },
  { icon: History, label: "Geçmiş Oyunlar", href: "/watch" },
]

const toolsMenuItems = [
  { icon: Home, label: "Ana Sayfa", href: "/" },
  { icon: Zap, label: "FEN to GIF", href: "/tools/fen-to-gif" },
  { icon: TrendingUp, label: "ELO Hesaplayıcı", href: "/tools" },
  { icon: FileText, label: "PGN Viewer", href: "/tools" },
  { icon: Radio, label: "Canlı Yayın", href: "/stream" }, // Added streaming to tools menu
]

export function DynamicSidebar() {
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  let menuItems = defaultMenuItems

  if (pathname.startsWith("/watch")) {
    menuItems = [
      { icon: Home, label: "Ana Sayfa", href: "/" },
      ...watchMenuItems,
      { icon: Users, label: "Topluluk", href: "/community" },
    ]
  } else if (pathname.startsWith("/tools")) {
    menuItems = [
      { icon: Home, label: "Ana Sayfa", href: "/" },
      ...toolsMenuItems,
      { icon: Wrench, label: "Tüm Araçlar", href: "/tools" },
    ]
  }

  return (
    <nav className="flex flex-col h-full py-6">
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-foreground">Menü</h2>
      </div>
      <div className="flex-1 px-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground",
                !isActive && "text-muted-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}

        <div className="pt-2">
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "text-muted-foreground",
            )}
          >
            <span>Daha Fazlası</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", isMoreOpen && "rotate-180")} />
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-200",
              isMoreOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0",
            )}
          >
            {moreItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground",
                    !isActive && "text-muted-foreground",
                    item.special && !isActive && "text-primary hover:text-primary hover:bg-primary/10",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
