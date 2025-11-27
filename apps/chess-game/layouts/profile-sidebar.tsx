"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Gamepad2, BarChart3, Users, Award, Building2, ArrowLeft, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const profileItems = [
  { href: "/profile", label: "Genel", icon: User },
  { href: "/profile#games", label: "Oyunlar", icon: Gamepad2 },
  { href: "/profile#stats", label: "İstatistikler", icon: BarChart3 },
  { href: "/profile#friends", label: "Arkadaşlar", icon: Users },
  { href: "/profile#achievements", label: "Ödüller", icon: Award },
  { href: "/profile#clubs", label: "Kulüpler", icon: Building2 },
]

interface ProfileSidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          "fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Profile Header */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-sidebar-foreground truncate">Profilim</p>
                <p className="text-xs text-sidebar-foreground/60">Profil Menüsü</p>
              </div>
            </div>
          </div>

          {/* Profile Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            {profileItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.includes(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Back to Home */}
          <div className="p-3 border-t border-sidebar-border">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            >
              <ArrowLeft className="w-5 h-5 shrink-0" />
              <span>Geri Dön</span>
            </Link>
          </div>

          {/* Settings */}
          <div className="p-3 border-t border-sidebar-border">
            <Link
              href="/settings"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            >
              <Settings className="w-5 h-5 shrink-0" />
              <span>Ayarlar</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
