"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SOCKET_CHANNELS, SOCKET_EVENTS } from "@/const/elixir-socket-names";
import { useChannel } from "@/context/channel-context";
import { useChessStore } from "@/lib/chess-store";
import { usePlayer } from "@/context/player-context";
import { Logger } from "@/lib/utils";
import { TableService } from "@/services/table.service";
import { GameService } from "@/services/game.service";
import { TournamentService } from "@/services/tournament.service";

interface GameContextType {
  joinMatch: (matchId: string) => void;
  leaveMatch: () => void;
  pushMove: (to: any) => void;
  pushStart: () => void;
}

const GameContext = createContext<GameContextType>({
  joinMatch: () => {},
  leaveMatch: () => {},
  pushMove: () => {},
  pushStart: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const logger = new Logger("GameContext");
  const { joinChannel, leaveChannel, getChannel } = useChannel();
  const { player } = usePlayer();
  const { startGame, resetGame, makeMove } = useChessStore();

  const [matchId, setMatchId] = useState<string | null>(null);

useEffect(() => {
  (async () => {
    const tableService = new TableService();
    const gameService = new GameService(); 
    const tournamentService = new TournamentService();

    await Promise.all([
      tableService.list(),
      // gameService.list(),        
      // tournamentService.list(),  
    ]);

  })();
}, []);


  // Channel join
  const joinMatch = (matchId: string) => {
    setMatchId(matchId);

    const ch = joinChannel(SOCKET_CHANNELS.GAME.MATCH(matchId), {
      playerId: player?._id,
    });

    if (!ch) return;

    // incoming events
    ch.on(SOCKET_EVENTS.MATCH.START, () => startGame());
    ch.on(SOCKET_EVENTS.MATCH.RESET, () => resetGame());
    ch.on(SOCKET_EVENTS.MATCH.MOVE, (data) => makeMove(data.to));
  };

  // leave match
  const leaveMatch = () => {
    if (matchId) leaveChannel(SOCKET_CHANNELS.GAME.MATCH(matchId));
    setMatchId(null);
  };

  // outgoing events
  const pushMove = (to: any) => {
    const ch = matchId ? getChannel(SOCKET_CHANNELS.GAME.MATCH(matchId)) : null;
    if (!ch) return;
    ch.push(SOCKET_EVENTS.MATCH.MOVE, { to });
  };

  const pushStart = () => {
    const ch = matchId ? getChannel(SOCKET_CHANNELS.GAME.MATCH(matchId)) : null;
    if (!ch) return;
    ch.push(SOCKET_EVENTS.MATCH.START, {});
  };

  return (
    <GameContext.Provider
      value={{
        joinMatch,
        leaveMatch,
        pushMove,
        pushStart,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  return useContext(GameContext);
}
