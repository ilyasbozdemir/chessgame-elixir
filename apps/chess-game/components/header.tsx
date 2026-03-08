"use client"

import { Crown, Bell, Mail, User, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/use-theme"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface HeaderProps {
  onOpenLobby: () => void
}

const notifications = [
  { id: 1, title: "Yeni turnuva!", message: "Weekend Blitz Cup başlıyor", time: "5 dk önce", unread: true },
  { id: 2, title: "Arkadaş isteği", message: "GrandMaster42 sizi eklemek istiyor", time: "1 saat önce", unread: true },
  {
    id: 3,
    title: "Sıralama güncellemesi",
    message: "Tebrikler! 1500 ELO'ya ulaştınız",
    time: "3 saat önce",
    unread: false,
  },
]

const messages = [
  {
    id: 1,
    user: "ChessMaster",
    message: "İyi oyun, tekrar oynayalım!",
    time: "10 dk önce",
    avatar: "CM",
    unread: true,
  },
  { id: 2, user: "QueenGambit", message: "O hamle harikaydı", time: "2 saat önce", avatar: "QG", unread: true },
  { id: 3, user: "RookPlayer", message: "Analiz için teşekkürler", time: "5 saat önce", avatar: "RP", unread: false },
]

export function Header({ onOpenLobby }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const unreadNotifications = notifications.filter((n) => n.unread).length
  const unreadMessages = messages.filter((m) => m.unread).length

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold group">
          <div className="p-2 rounded-full bg-primary/15 group-hover:bg-primary/25 transition-colors">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <span className="hidden sm:inline tracking-tight">
            <span className="font-bold text-foreground">Chess</span>
            <span className="text-primary font-bold">Game</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-primary/10 transition-all hover:scale-105"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-orange-500 animate-in spin-in-180" />
            ) : (
              <Moon className="w-5 h-5 text-primary animate-in spin-in-180" />
            )}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 transition-all hover:scale-105 relative"
              >
                <Mail className="w-5 h-5" />
                {unreadMessages > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-foreground">Mesajlar</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Tümünü gör
                </Button>
              </div>
              <ScrollArea className="h-[300px]">
                <div className="p-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                        msg.unread ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                          {msg.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm text-foreground truncate">{msg.user}</p>
                            {msg.unread && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 transition-all hover:scale-105 relative"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-foreground">Bildirimler</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Tümünü işaretle
                </Button>
              </div>
              <ScrollArea className="h-[300px]">
                <div className="p-2">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                        notif.unread ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-sm text-foreground">{notif.title}</p>
                            {notif.unread && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 transition-all hover:scale-105"
              >
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-3 border-b">
                <p className="text-sm font-medium text-foreground">Misafir Kullanıcı</p>
                <p className="text-xs text-muted-foreground mt-1">Oturum açarak kaydet</p>
              </div>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/profile" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">İstatistikler</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Ayarlar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer font-semibold text-primary">Giriş Yap</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={onOpenLobby}>
                Anonim Oyna
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
