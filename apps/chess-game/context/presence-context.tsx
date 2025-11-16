"use client";

import React, { createContext, useContext, useState } from "react";

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
  setLobbyCount: () => {},

  globalCount: 0,
  setGlobalCount: () => {},

  gameCount: 0,
  setGameCount: () => {},
});

export const PresenceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lobbyCount, setLobbyCount] = useState(0);
  const [globalCount, setGlobalCount] = useState(0);
  const [gameCount, setGameCount] = useState(0);

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
