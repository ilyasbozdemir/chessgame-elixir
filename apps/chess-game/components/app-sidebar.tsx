"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Crown,
  Gamepad2,
  Puzzle,
  GraduationCap,
  Eye,
  Newspaper,
  Users,
  Home,
  Trophy,
  Settings,
  HelpCircle,
  Info,
  Award,
  MessageCircle,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@/context/user-context";

const sidebarItems = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "/lobby", label: "Oyna", icon: Gamepad2 },
  { href: "/watch", label: "İzle", icon: Eye },
  { href: "/chat", label: "Mesajlar", icon: MessageCircle },
  { href: "/puzzles", label: "Bulmacalar", icon: Puzzle },
  { href: "/learn", label: "Öğren", icon: GraduationCap },
  { href: "/tournament", label: "Turnuvalar", icon: Trophy },
  { href: "/news", label: "Haberler", icon: Newspaper },
  { href: "/community", label: "Topluluk", icon: Globe },
  { href: "/friends", label: "Arkadaşlar", icon: Users },
  { href: "/leaderboard", label: "Liderlik Tablosu", icon: Award },
  { href: "/about", label: "Hakkında", icon: Info },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  width: number;
}

export function AppSidebar({ isOpen, onClose, width }: AppSidebarProps) {
  const { user, loading: userLoading, login, logout } = useUser();

  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        style={{ "--sidebar-width": `${width}px` } as React.CSSProperties}
        className={cn(
          "fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300 ease-in-out overflow-y-auto",
          "w-[var(--sidebar-width)]",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div className="flex flex-col ">
          <div className="flex flex-col  items-center">
            {user ? (
              <div className="p-4 border-b border-sidebar-border w-full flex justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex flex-col items-center text-center gap-2 w-full focus:outline-none">
                      <Avatar>
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=Ilyas+Bozdemir&background=0D8ABC&color=fff`}
                        />
                        <AvatarFallback>
                          {user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm text-sidebar-foreground truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-sidebar-foreground/60 truncate">
                          {user.email}
                        </p>
                      </div>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem
                      onClick={() => router.push(`/my-profile`)}
                    >
                      Profilim
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      Ayarlar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="text-red-500">
                      Çıkış
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="p-4 border-b border-sidebar-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-sidebar-foreground truncate">
                      Misafir
                    </p>
                    <Link href="/login">
                      <p className="text-xs text-sidebar-foreground/60">
                        Giriş Yap
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

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
  );
}
