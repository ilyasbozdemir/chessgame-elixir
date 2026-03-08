"use client";

import {
  Menu,
  Moon,
  Sun,
  Bell,
  Swords,
  Clock,
  UserPlus,
  Trophy,
  Crown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import { getAvatarUrl, getDisplayInitials } from "@/lib/utils";

export function AppNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const {
    user,
    playerUser,
    loading: userLoading,
    refresh,
    login,
    logout,
  } = useUser();

  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const notifications = [
    {
      id: 1,
      type: "invite",
      title: "Oyun Daveti",
      message: "Ahmet Yılmaz seni 10+0 Rapid oyununa davet etti",
      time: "2 dakika önce",
      unread: true,
    },
    {
      id: 2,
      type: "friend_request",
      title: "Arkadaşlık İsteği",
      message: "Zeynep Kaya seni arkadaş olarak eklemek istiyor",
      time: "15 dakika önce",
      unread: true,
    },
    {
      id: 3,
      type: "game_result",
      title: "Oyun Sonucu",
      message: "Mehmet Demir ile oynadığın oyunu kazandın! +12 ELO",
      time: "1 saat önce",
      unread: false,
    },
    {
      id: 4,
      type: "tournament",
      title: "Turnuva Hatırlatma",
      message: "Haftalık Blitz Turnuvası 30 dakika içinde başlıyor",
      time: "2 saat önce",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "invite":
        return <Swords className="w-4 h-4 text-blue-500" />;
      case "friend_request":
        return <UserPlus className="w-4 h-4 text-green-500" />;
      case "game_result":
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case "tournament":
        return <Clock className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold group lg:hidden"
        >
          <div className="p-2 rounded-full bg-primary/15 ">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          {/* Yazıyı sadece büyük ekranlarda göster */}
          <span className="hidden sm:inline tracking-tight">
            <span className="font-bold">Chess</span>
            <span className="text-primary font-bold">Game</span>
          </span>
        </Link>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Bildirimler</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="px-2 py-0 text-xs">
                  {unreadCount} yeni
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        {notification.unread && (
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-center text-sm font-medium">
              Tümünü Gör
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Badge variant="secondary" className="hidden sm:flex font-semibold">
          0
        </Badge>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 gap-2 rounded-full pl-2 pr-3"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={getAvatarUrl(user?.displayName || "user")}
                  alt="User"
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getDisplayInitials(user?.displayName || "UN")}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium lg:inline-block">
                {user?.displayName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <p className="text-sm font-medium">{user?.displayName}</p>
                <p className="text-xs text-muted-foreground">Rating: 0</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>İstatistikler</DropdownMenuItem>
            <DropdownMenuItem>Ayarlar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
