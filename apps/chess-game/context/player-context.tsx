"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Player {
  _id: string;
  name: string;
  color: string;
  isReady: boolean;
  createdAt: string;
}

interface PlayerContextType {
  player: Player | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType>({
  player: null,
  loading: true,
  refresh: async () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPlayer = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/me", { credentials: "include" });
      const data = await res.json();
      setPlayer(data.player);
    } catch (err) {
      console.error("❌ PlayerContext load error:", err);
      setPlayer(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlayer();
  }, []);

  return (
    <PlayerContext.Provider value={{ player, loading, refresh: loadPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  return useContext(PlayerContext);
}
