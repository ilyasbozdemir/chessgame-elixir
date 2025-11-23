"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Trophy, Clock, Settings, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Ana Sayfa", url: "/", icon: Home },
  { title: "Yeni Oyun", url: "/new-game", icon: Plus },
  { title: "Oyunlarım", url: "/games", icon: Trophy },
  { title: "Geçmiş", url: "/history", icon: Clock },
  { title: "Ayarlar", url: "/settings", icon: Settings },
];

export function GameSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar  collapsible="icon">
      <SidebarContent className="mt-2">
        <SidebarGroup>
          {open && <SidebarGroupLabel>Menü</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-primary font-medium"
                            : "hover:bg-sidebar-accent text-sidebar-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {open && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
