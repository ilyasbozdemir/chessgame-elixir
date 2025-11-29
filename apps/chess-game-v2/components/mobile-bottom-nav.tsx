"use client"

import { Home, MessageSquare, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { GlobalChat } from "./global-chat"

export function MobileBottomNav() {
  const pathname = usePathname()
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border h-16 px-4">
        <div className="flex items-center justify-around h-full max-w-md mx-auto">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Ana Sayfa</span>
          </Link>

          <Sheet open={chatOpen} onOpenChange={setChatOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors text-muted-foreground hover:text-primary">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs font-medium">Sohbet</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] p-0">
              <GlobalChat />
            </SheetContent>
          </Sheet>

          <Link
            href="/profile"
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
              pathname === "/profile" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profil</span>
          </Link>
        </div>
      </div>
      <div className="lg:hidden h-16" />
    </>
  )
}
