"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useChannel } from "./channel-context";
import { SOCKET_CHANNELS } from "@/const/elixir-socket-names";

interface PresenceContextType {
  lobbyCount: number;
  setLobbyCount: (n: number) => void;
  globalCount: number;
  setGlobalCount: (n: number) => void;
  gameCount: number;
  setGameCount: (n: number) => void;
}

const PresenceContext = createContext<PresenceContextType>({
  lobbyCount: 0,
  setLobbyCount: () => { },
  globalCount: 0,
  setGlobalCount: () => { },
  gameCount: 0,
  setGameCount: () => { },
});

export const PresenceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lobbyCount, setLobbyCount] = useState(0);
  const [globalCount, setGlobalCount] = useState(0);
  const [gameCount, setGameCount] = useState(0);

  const { socketConnected, getChannel } = useChannel();

  useEffect(() => {
    if (!socketConnected) return;

    const lobbyChannel = getChannel(SOCKET_CHANNELS.GAME.LOBBY.PLAYERS);
    if (!lobbyChannel) return;

    // presence_state: initial snapshot when user joins
    lobbyChannel.on("presence_state", (state: any) => {
      const count = Object.keys(state).length;
      setLobbyCount(count);
      setGlobalCount(count); // treat lobby as the global online metric for now
    });

    // presence_diff: incremental join/leave updates
    lobbyChannel.on("presence_diff", (diff: any) => {
      const joins = Object.keys(diff.joins || {}).length;
      const leaves = Object.keys(diff.leaves || {}).length;
      setLobbyCount((prev) => Math.max(0, prev + joins - leaves));
      setGlobalCount((prev) => Math.max(0, prev + joins - leaves));
    });

    return () => {
      lobbyChannel.off("presence_state");
      lobbyChannel.off("presence_diff");
    };
  }, [socketConnected, getChannel]);

  return (
    <PresenceContext.Provider
      value={{
        lobbyCount,
        setLobbyCount,
        globalCount,
        setGlobalCount,
        gameCount,
        setGameCount,
      }}
    >
      {children}
    </PresenceContext.Provider>
  );
};

export function usePresence() {
  return useContext(PresenceContext);
}
