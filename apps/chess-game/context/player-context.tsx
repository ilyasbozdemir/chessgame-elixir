"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PlayerDoc } from "@/models/player";
import { socket } from "@/lib/socket";
import { TableService } from "@/services/table.service";
import { useUser } from "@/context/user-context";
import { useChannel } from "./channel-context";

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

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();

  const [player, setPlayer] = useState<PlayerDoc | null>(null);

  const { channel } = useChannel();

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

      const tableService = new TableService(channel);
      await tableService.list();
    })();
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
