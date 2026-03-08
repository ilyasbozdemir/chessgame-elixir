"use client";

import { use } from "react";
import ProfileCardWidget from "@/components/widgets/profile-card-widget";
import GameStatsWidget from "@/components/widgets/game-stats-widget";
import ChessClockWidget from "@/components/widgets/chess-clock-widget";
import TournamentWidget from "@/components/widgets/tournament-widget";

interface PageClientProps {
  id: string;
}

const PageClient: React.FC<PageClientProps> = ({ id }) => {
  const renderWidget = () => {
    switch (id) {
      case "profile-card":
        return <ProfileCardWidget />;
      case "game-stats":
        return <GameStatsWidget />;
      case "chess-clock":
        return <ChessClockWidget />;
      case "tournament":
        return <TournamentWidget />;
      default:
        return <div className="p-4">Widget bulunamadı</div>;
    }
  };

  return (
    <div className="w-full h-full bg-background text-foreground p-4">
      {renderWidget()}
    </div>
  );
};

export default PageClient;
