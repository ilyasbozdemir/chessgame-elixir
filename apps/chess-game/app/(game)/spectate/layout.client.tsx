"use client";

import { SpectatorBottomNav } from "@/components/game/spectator-bottom-navbar";

export function ClientLayout2({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}

      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
        <SpectatorBottomNav />
      </div>
    </div>
  );
}
