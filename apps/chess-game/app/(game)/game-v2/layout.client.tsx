"use client";

import { BottomNavBar, Move } from "@/components/game/game-bottom-navbar";
import { useState } from "react";

export function ClientLayout2({ children }: { children: React.ReactNode }) {
  const [isSpectatorMode, setIsSpectatorMode] = useState(false);

  const [boardRotated, setBoardRotated] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [moveHistory, setMoveHistory] = useState<Move[]>([]);

  const [capturedPieces, setCapturedPieces] = useState<{
    white: string[];
    black: string[];
  }>({ white: [], black: [] });

  const [whiteTimeLeft, setWhiteTimeLeft] = useState(600); // 10 minutes in seconds
  const [blackTimeLeft, setBlackTimeLeft] = useState(600); // 10 minutes in seconds

  return (
    <div>
      {children}

      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
        <BottomNavBar
          boardRotated={boardRotated}
          onToggleBoardRotation={() => setBoardRotated(!boardRotated)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          notificationsEnabled={notificationsEnabled}
          onToggleNotifications={() =>
            setNotificationsEnabled(!notificationsEnabled)
          }
          moveHistory={moveHistory}
          currentPlayer={{
            name: "Sen",
            rating: 1400,
            capturedPieces: capturedPieces.white,
            timeLeft: whiteTimeLeft,
          }}
          opponent={{
            name: "Rakip",
            rating: 1500,
            capturedPieces: capturedPieces.black,
            timeLeft: blackTimeLeft,
          }}
        />
      </div>
    </div>
  );
}
