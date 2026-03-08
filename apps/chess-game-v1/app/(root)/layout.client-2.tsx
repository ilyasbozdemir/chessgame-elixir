"use client";

import { useState } from "react";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { AppSidebar2 } from "@/components/app-sidebar-2";
import { AppNavbar } from "@/components/app-navbar";
import { SidebarProvider } from "@/components/sidebar-provider";

export function ClientLayout2({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar2 />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-56">
        <AppNavbar onMenuClick={() => setIsMobileMenuOpen(true)} />

        {children}
      </div>
    </div>
  );
}
