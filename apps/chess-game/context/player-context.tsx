"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PlayerDoc } from "@/models/player";
import { socket } from "@/lib/socket";
import { TableService } from "@/services/table.service";
import { useUser } from "@/context/user-context";

interface PlayerContextType {
  player: PlayerDoc | null;
  channel: any;
  refresh: () => Promise<void>;
  presenceCount?: number;
}

const PlayerContext = createContext<PlayerContextType>({
  player: null,
  channel: null,
  refresh: async () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [player, setPlayer] = useState<PlayerDoc | null>(null);
  const [channel, setChannel] = useState<any>(null);
  const [presenceCount, setPresenceCount] = useState(0);

  const refresh = async () => {
    const res = await fetch("/api/player/me");
    const data = await res.json();
    setPlayer(data.player ?? null);
  };

  useEffect(() => {
    if (!user) return;

    (async () => {
      await refresh();
      socket.connect();
      const ch = socket.channel("game:lobby:players", {});
      ch.join()
        .receive("ok", () => console.log("✅ Lobby joined"))
        .receive("error", console.error);
      setChannel(ch);

      const tableService = new TableService(ch);
      await tableService.list();
    })();

    return () => {
      channel?.leave();
      socket.disconnect();
    };
  }, [user?._id]);

  return (
    <PlayerContext.Provider value={{ player, channel, refresh, presenceCount }}>
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  return useContext(PlayerContext);
}
