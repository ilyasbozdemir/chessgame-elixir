"use client"

import { Home, MessageSquare, User, Puzzle, LayoutGrid, Trophy } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useState } from "react"
import { GlobalChat } from "./global-chat"
import { DynamicSidebar } from "./dynamic-sidebar"
import { usePresence } from "@/context/presence-context"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { icon: Home, label: "Ana Sayfa", href: "/" },
  { icon: Puzzle, label: "Bulmacalar", href: "/puzzles" },
  { icon: Trophy, label: "Turnuvalar", href: "/tournaments" },
  { icon: User, label: "Profil", href: "/profile" },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const [chatOpen, setChatOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lobbyCount } = usePresence()

  return (
    <>
      {/* Fixed bottom nav bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border h-16 px-2 safe-area-pb">
        <div className="flex items-center justify-around h-full max-w-lg mx-auto">

          {/* Main nav items */}
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-primary bg-primary/10 scale-110"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium leading-none mt-0.5">{item.label}</span>
              </Link>
            )
          })}

          {/* Chat Button */}
          <button
            onClick={() => setChatOpen(true)}
            className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 text-muted-foreground hover:text-foreground"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[9px] font-medium leading-none mt-0.5">Sohbet</span>
            {lobbyCount > 0 && (
              <span className="absolute -top-0.5 right-1 w-4 h-4 bg-green-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {lobbyCount > 9 ? "9+" : lobbyCount}
              </span>
            )}
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 text-muted-foreground hover:text-foreground"
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[9px] font-medium leading-none mt-0.5">Menü</span>
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="lg:hidden h-16" />

      {/* Chat Sheet */}
      <Sheet open={chatOpen} onOpenChange={setChatOpen}>
        <SheetContent side="bottom" className="h-[82vh] p-0 rounded-t-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-semibold">Global Sohbet</span>
            </div>
            {lobbyCount > 0 && (
              <Badge variant="secondary" className="text-xs gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse inline-block" />
                {lobbyCount} çevrimiçi
              </Badge>
            )}
          </div>
          <GlobalChat />
        </SheetContent>
      </Sheet>

      {/* Sidebar Sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-72 p-0 overflow-y-auto">
          <DynamicSidebar />
        </SheetContent>
      </Sheet>
    </>
  )
}
