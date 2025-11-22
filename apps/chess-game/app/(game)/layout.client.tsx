"use client";

import { Navbar } from "@/components/navbar";
import { AppSidebar } from "@/components/app-sidebar";
import React, { useState } from "react";
import { useBreakpointValue } from "@/hooks/use-breakpoint-value";
import { PageContainer } from "@/components/page-container";
import { RealtimeListener } from "@/components/realtime-listener";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarWidth =
    useBreakpointValue({
      base: 0,
      md: 200,
      lg: 220,
      xl: 250,
    }) ?? 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className="flex"
        style={{ ["--sidebar-width" as any]: `${sidebarWidth}px` }}
      >
        <AppSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          width={sidebarWidth}
        />

        <main
          className="flex-1 p-4 transition-all"
          style={{ marginLeft: "var(--sidebar-width)" }}
        >
          <PageContainer>{children}</PageContainer>
        </main>
        <RealtimeListener />
      </div>
    </div>
  );
}
