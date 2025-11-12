"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useChannel } from "@/context/channel-context";
import { usePlayer } from "@/context/player-context";
import { useChessStore } from "@/lib/chess-store";
import type { Position } from "@/lib/chess-types";
import { Logger } from "@/lib/utils";

interface GameContextType {
  startGame: () => void;
  makeMove: (to: Position) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType>({
  startGame: () => {},
  makeMove: () => {},
  resetGame: () => {},
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const logger = new Logger("GameContext");
  const { channel, joinChannel } = useChannel();
  const { player } = usePlayer();
  const { gameState, startGame, makeMove, resetGame } = useChessStore();

  // 🎯 Socket kanalı başlat (örneğin "game:room:<tableId>")
  useEffect(() => {
    if (!player) return;

    const ch = joinChannel("game:lobby:match", { playerId: player._id });
    if (!ch) return;

    ch.on("game:move", (payload: any) => {
      logger.info("♟️ Move received:", payload);
      makeMove(payload.to);
    });

    ch.on("game:start", () => {
      logger.info("🚀 Game started via socket");
      startGame();
    });

    ch.on("game:reset", () => {
      logger.info("🔄 Game reset via socket");
      resetGame();
    });

    return () => {
      ch.leave();
    };
  }, [player?._id]);

  // ♟️ Move broadcast helper
  const emitMove = (to: Position) => {
    makeMove(to);
    channel?.push("game:move", { to });
  };

  return (
    <GameContext.Provider
      value={{
        startGame,
        makeMove: emitMove,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  return useContext(GameContext);
}
