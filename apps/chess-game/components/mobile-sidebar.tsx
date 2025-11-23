"use client";

import {
  Home,
  Settings,
  Users,
  X,
  Crown,
  Trophy,
  History,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Lobiye Dön",
    icon: Home,
    href: "/lobby",
  },
  {
    title: "Yeni Oyun",
    icon: Crown,
    href: "/",
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
    title: "Geçmiş",
    icon: History,
    href: "/history",
  },
  {
    title: "Ayarlar",
    icon: Settings,
    href: "/settings",
  },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex h-16 items-center border-b border-sidebar-border px-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold group"
            >
              <div className="p-2 rounded-full bg-primary/15 ">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <span className="tracking-tight">
                <span className="font-bold">Chess</span>
                <span className="text-primary font-bold">Game</span>
              </span>
            </Link>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon; // ← burası önemli

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-4 w-4" /> 
                {item.title}
              </Link>
            );
          })}
        </nav>

    
      </aside>
    </>
  );
}
