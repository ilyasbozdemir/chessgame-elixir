"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Building2, Settings, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const dashboardItems = [
  { href: "/dashboard", label: "Yönetilen Kulüpler", icon: Building2 },
  { href: "/dashboard#settings", label: "Ayarlar", icon: Settings },
]

interface DashboardSidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
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
          {/* Dashboard Header */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-sidebar-foreground truncate">Kontrol Paneli</p>
                <p className="text-xs text-sidebar-foreground/60">Dashboard Menüsü</p>
              </div>
            </div>
          </div>

          {/* Dashboard Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            {dashboardItems.map((item) => {
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
        </div>
      </aside>
    </>
  )
}
