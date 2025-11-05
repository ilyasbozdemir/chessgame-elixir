"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Crown, LayoutDashboard, Users, Gamepad2, Flag, Settings, LogOut, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Kullanıcılar", icon: Users },
  { href: "/admin/games", label: "Oyunlar", icon: Gamepad2 },
  { href: "/admin/reports", label: "Raporlar", icon: Flag },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
]

interface AdminSidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border z-40 transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Admin Info Section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">Admin Panel</p>
                <p className="text-xs text-muted-foreground">Yönetici</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-border space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-transparent"
              asChild
              onClick={onClose}
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
