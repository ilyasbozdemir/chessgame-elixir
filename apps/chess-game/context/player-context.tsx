"use client";

import { useChessStore } from "@/lib/chess-store";
import { socket } from "@/lib/socket";
import { PlayerDoc } from "@/models/player";
import { UserDoc } from "@/models/user";
import { TableService } from "@/services/table.service";
import React, { createContext, useContext, useEffect, useState } from "react";

interface PlayerContextType {
  user: UserDoc | null;
  player: PlayerDoc | null;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerDoc | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  isLoggedIn: boolean;
  channel: any;
  refresh: () => Promise<void>;
  presenceList?: string[];
  presenceCount?: number;
}

const PlayerContext = createContext<PlayerContextType>({
  user: null,
  player: null,
  setPlayer: () => {},
  loading: true,
  login: async () => false,
  logout: async () => {},
  refresh: async () => {},
  isLoggedIn: false,
  channel: null,
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDoc | null>(null);
  const [player, setPlayer] = useState<PlayerDoc | null>(null);
  const [channel, setChannel] = useState<any>(null);

  const [presenceList, setPresenceList] = useState<string[]>([]);
  const [presenceCount, setPresenceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadUserAndPlayer = async () => {
    try {
      setLoading(true);

      // 1️⃣ User bilgisini al
      const resUser = await fetch("/api/me", { credentials: "include" });
      const dataUser = await resUser.json();
      setUser(dataUser.user ?? null);
      setPlayer(dataUser.player ?? null);

      if (!dataUser.user?._id) {
        setPlayer(null);
        return;
      }
    } catch (err) {
      console.error("❌ loadUserAndPlayer error:", err);
      setUser(null);
      setPlayer(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      await loadUserAndPlayer();
      return true;
    } catch (err) {
      console.error("❌ Login error:", err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("❌ Logout error:", err);
    } finally {
      setUser(null);
      setPlayer(null);
      socket.disconnect();
      setChannel(null);
    }
  };

  const isLoggedIn = !!user;

  useEffect(() => {
    loadUserAndPlayer();
  }, []);

  // 🔌 Socket bağlantısı player'a göre çalışacak (user değil!)
  useEffect(() => {
    if (!player) return;

    const topic = "game:lobby:players";

    console.log("🌐 [Socket] Başlatılıyor:", topic, "-", name);

    socket.connect();

    const ch = socket.channel(topic, { name });
    ch.join()
      .receive("ok", (resp) => console.log("✅ Kanal bağlandı:", resp))
      .receive("error", (err) => console.error("❌ Kanal hatası:", err));

    setChannel(ch);

    (async () => {
      try {
        const tableService = new TableService(channel);
        await tableService.list();
      } catch (err) {
        console.error("❌ Table listesi yüklenemedi:", err);
      }
    })();

    return () => {
      console.log("🔌 Kanal kapatıldı");
      ch.leave();
      socket.disconnect();
      setChannel(null);
    };
  }, [player?._id]);

  return (
    <PlayerContext.Provider
      value={{
        user,
        player,
        setPlayer,
        loading,
        login,
        logout,
        refresh: loadUserAndPlayer,
        isLoggedIn,
        channel,
        presenceList,
        presenceCount,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  return useContext(PlayerContext);
}
