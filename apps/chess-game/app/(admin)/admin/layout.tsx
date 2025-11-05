"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Crown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/admin-sidebar"

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: () => <span>Dashboard Icon</span> },
  { href: "/admin/users", label: "Kullanıcılar", icon: () => <span>Users Icon</span> },
  { href: "/admin/games", label: "Oyunlar", icon: () => <span>Games Icon</span> },
  { href: "/admin/reports", label: "Raporlar", icon: () => <span>Reports Icon</span> },
  { href: "/admin/settings", label: "Ayarlar", icon: () => <span>Settings Icon</span> },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-5 h-5" />
              </Button>
              <Link href="/admin" className="flex items-center gap-2 text-lg font-semibold">
                <Crown className="w-6 h-6 text-primary" />
                <span>Admin Panel</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">Ana Sayfa</Link>
              </Button>
              <Button variant="ghost" size="sm">
                <span className="w-4 h-4 mr-2">LogOut Icon</span>
                Çıkış
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Admin Content */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  )
}
