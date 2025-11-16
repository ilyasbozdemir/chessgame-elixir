"use client"

import { Crown, Trophy, Users, Clock, History, Settings, Eye, Award } from 'lucide-react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Yeni Oyun",
    icon: Crown,
    href: "/",
  },
  {
    title: "Canlı Oyunlar",
    icon: Eye,
    href: "/lobby",
  },
  {
    title: "Turnuvalar",
    icon: Trophy,
    href: "/tournaments",
  },
  {
    title: "Arkadaşlar",
    icon: Users,
    href: "/friends",
  },
  {
    title: "Oyun Geçmişi",
    icon: History,
    href: "/history",
  },
  {
    title: "Başarımlar",
    icon: Award,
    href: "/achievements",
  },
  {
    title: "Ayarlar",
    icon: Settings,
    href: "/settings",
  },
]

export function LobbySidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0">
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Crown className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold text-sidebar-foreground">Satranç</span>
        </div>
      </div>

      <nav className="space-y-1 px-2 py-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
