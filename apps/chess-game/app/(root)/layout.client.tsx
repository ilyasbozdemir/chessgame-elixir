"use client";

import { Navbar } from "@/components/navbar";
import { AppSidebar } from "@/components/app-sidebar";
import React, { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
       <Navbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex">
        {/* Sidebar */}
        <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Page content */}
        <main className="flex-1 lg:ml-64 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
