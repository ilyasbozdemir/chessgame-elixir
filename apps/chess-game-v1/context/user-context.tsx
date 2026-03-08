"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserDoc } from "@/models/user";
import { PlayerDoc } from "@/models/player";

interface UserContextType {
  user: UserDoc | null;
  playerUser: PlayerDoc | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  playerUser: null,
  loading: true,
  login: async () => false,
  logout: async () => {},
  refresh: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDoc | null>(null);
  const [playerUser, setPlayerUser] = useState<PlayerDoc | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const res = await fetch("/api/me", { credentials: "include" });
    const data = await res.json();
    setUser(data.user ?? null);
    setPlayerUser(data.player ?? null);
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      await refresh();
      return true;
    }
    return false;
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, playerUser, loading, login, logout, refresh }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}
