"use client";

import { useChessStore } from "@/lib/chess-store";
import { socket } from "@/lib/socket";
import { PlayerDoc } from "@/models/player";
import { TableDoc } from "@/models/table";
import React, { createContext, useContext, useEffect, useState } from "react";

interface PlayerContextType {
  player: PlayerDoc | null;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerDoc | null>>;
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
  const [player, setPlayer] = useState<PlayerDoc | null>(null);
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

  async function fetchTables() {
    try {
      const res = await fetch("/api/tables", { cache: "no-store" });
      const data = await res.json();
      useChessStore.setState({ tables: data });
    } catch (err) {
      console.error("❌ Masalar alınamadı:", err);
    }
  }

  useEffect(() => {
    loadPlayer();
    fetchTables();
  }, []);

  useEffect(() => {
    const name = player?.name || "Anonim";
    const topic = player ? "game:lobby:players" : "game:lobby:guests";

    console.log("🌐 [Socket] Başlatılıyor:", topic, "-", name);

    socket.connect();

    const ch = socket.channel(topic, { name });
    ch.join()
      .receive("ok", (resp) => console.log("✅ Kanal bağlandı:", resp))
      .receive("error", (err) => console.error("❌ Kanal hatası:", err));

    ch.push("update_player", { name });

    ch.on("player_joined", (msg) => {
      console.log("➕ Oyuncu katıldı:", msg.name);
    });

    ch.on("player_left", (msg) => console.log("🚪 Oyuncu ayrıldı:", msg.name));

    setChannel(ch);

    return () => {
      console.log("🔌 [Socket] Kanal kapatılıyor:", topic);
      ch.leave();
      socket.disconnect();
      setChannel(null);
    };
  }, [player?._id]);

  useEffect(() => {
    if (!channel) return;

    channel.on("table_created", (newTable: TableDoc) => {
      console.log("📡 Yeni masa geldi:", newTable);
      useChessStore.setState((state: any) => ({
        tables: [...state.tables, newTable],
      }));
    });

    channel.on("presence_state", (state: any) => {
      console.log("📦 Güncel state:", state);
    });

    channel.on("presence_count", (data: any) => {
      console.log("👥 Toplam oyuncu:", data.count);
    });

    // 🔹 Başlangıç listesi
    channel.on("presence_state", (state: Record<string, any>) => {
      const playerNames = Object.keys(state);
      setPresenceList(playerNames);
      setPresenceCount(playerNames.length);
    });

    // 🔹 Giren-çıkan farkları
    channel.on("presence_diff", (diff: Record<string, any>) => {
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
      channel.off("table_created");
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
