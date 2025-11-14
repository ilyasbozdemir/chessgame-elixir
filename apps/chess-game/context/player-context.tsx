"use client";

import React, { createContext, useContext, useState } from "react";
import { PlayerDoc } from "@/models/player";
import { useUser } from "@/context/user-context";

interface PlayerContextType {
  player: PlayerDoc | null;
  refresh: () => Promise<void>;
  presenceCount?: number;
}

const PlayerContext = createContext<PlayerContextType>({
  player: null,
  refresh: async () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();

  const [player, setPlayer] = useState<PlayerDoc | null>(null);

  const [presenceCount, setPresenceCount] = useState(0);

  const refresh = async () => {
    const res = await fetch("/api/me");
    const data = await res.json();
    setPlayer(data.player ?? null);
  };


  return (
    <PlayerContext.Provider value={{ player, refresh, presenceCount }}>
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  return useContext(PlayerContext);
}
