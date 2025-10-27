import { useEffect, useState } from "react";
import { Channel } from "phoenix";

export function usePresence(channel: Channel | null) {
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    if (!channel) return;

    // 🔹 Başlangıç: tüm oyuncuların durumu
    channel.on("presence_state", (state) => {
      const playerNames = Object.keys(state);
      console.log("📋 Mevcut oyuncular:", playerNames);
      setPlayers(playerNames);
    });

    // 🔹 Farklar: giren/çıkanları güncelle
    channel.on("presence_diff", (diff) => {
      console.log("🔄 Presence diff:", diff);
      setPlayers((prev) => {
        const joined = Object.keys(diff.joins || {});
        const left = Object.keys(diff.leaves || {});
        let next = Array.from(new Set([...prev, ...joined]));
        next = next.filter((p) => !left.includes(p));
        return next;
      });
    });

    return () => {
      channel.off("presence_state");
      channel.off("presence_diff");
    };
  }, [channel]);

  return players;
}
