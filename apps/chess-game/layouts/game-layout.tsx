import { AppProviders } from "@/app/providers";
import { GameNavbar } from "@/components/game/game-navbar";
import { GameSidebar } from "@/components/game/game-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Geist, Geist_Mono } from "next/font/google";


const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] })


export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <GameSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <GameNavbar />
          <main className="flex-1 overflow-auto">
            <AppProviders>{children}</AppProviders>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
