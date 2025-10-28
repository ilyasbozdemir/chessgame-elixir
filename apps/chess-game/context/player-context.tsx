"use client";

import { socket } from "@/lib/socket";
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
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  loading: boolean;
  channel: any;
  refresh: () => Promise<void>;
  presenceList?: string[];
  presenceCount?: number;
}

const PlayerContext = createContext<PlayerContextType>({
  player: null,
  setPlayer: () => {},
  loading: true,
  channel: null,
  refresh: async () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [channel, setChannel] = useState<any>(null);

  const [presenceList, setPresenceList] = useState<string[]>([]);
  const [presenceCount, setPresenceCount] = useState(0);

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

  useEffect(() => {
    if (loading) return;

    const name = player?.name || "Anonim";
    const topic = player ? "game:lobby:players" : "game:lobby:guests";

    console.log("🌐 [Socket] Başlatılıyor:", topic, "-", name);

    socket.connect();

    const ch = socket.channel(topic, { name });
    ch.join()
      .receive("ok", (resp) => console.log("✅ Kanal bağlandı:", resp))
      .receive("error", (err) => console.error("❌ Kanal hatası:", err));

    ch.push("update_player", { name });

    ch.on("player_joined", (msg) =>
      console.log("👋 Oyuncu katıldı:", msg.name)
    );
    ch.on("player_left", (msg) => console.log("🚪 Oyuncu ayrıldı:", msg.name));

    setChannel(ch);

    return () => {
      console.log("🔌 [Socket] Kanal kapatılıyor:", topic);
      ch.leave();
      socket.disconnect();
      setChannel(null);
    };
  }, [player, loading]);

  useEffect(() => {
    if (!channel) return;

    // 🔹 Başlangıç listesi
    channel.on("presence_state", (state: Record<string, any>) => {
      const playerNames = Object.keys(state);
      console.log("📋 Mevcut oyuncular:", playerNames);
      setPresenceList(playerNames);
      setPresenceCount(playerNames.length);
    });

    // 🔹 Giren-çıkan farkları
    channel.on("presence_diff", (diff: Record<string, any>) => {
      console.log("🔄 Presence diff:", diff);
      setPresenceList((prev) => {
        const joined = Object.keys(diff.joins || {});
        const left = Object.keys(diff.leaves || {});
        let next = Array.from(new Set([...prev, ...joined]));
        next = next.filter((p) => !left.includes(p));
        setPresenceCount(next.length);
        return next;
      });
    });

    return () => {
      channel.off("presence_state");
      channel.off("presence_diff");
    };
  }, [channel]);

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        loading,
        refresh: loadPlayer,
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
