import { useEffect, useState } from "react";
import { Channel } from "phoenix";

export function usePresenceCount(channel: Channel | null) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!channel) return;

    // 🧮 Güncel aktif oyuncu sayısı event'i
    const handleCount = (msg: any) => {
      console.log("🧮 Güncel aktif oyuncu sayısı:", msg.count);
      setCount(msg.count ?? 0);
    };

    // 📋 Başlangıç state fallback
    const handleState = (state: Record<string, any>) => {
      const playerCount = Object.keys(state).length;
      console.log("📋 Başlangıç oyuncu sayısı:", playerCount);
      setCount(playerCount);
    };

    // 🔗 Eventleri dinle
    channel.on("presence_count", handleCount);
    channel.on("presence_state", handleState);

    // 🧹 Cleanup
    return () => {
      if (!channel) return;
     // channel.off("presence_count", handleCount);
      //channel.off("presence_state", handleState);
    };
  }, [channel]);

  return count;
}
