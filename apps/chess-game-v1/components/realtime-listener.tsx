"use client";

import { SOCKET_CHANNELS } from "@/const/elixir-socket-names";
import { useChannel } from "@/context/channel-context";
import { Logger } from "@/lib/utils";
import { useState, useEffect } from "react";

export function RealtimeListener() {
  const logger = new Logger("RealtimeListener-Logger");
  const { socketConnected, getChannel } = useChannel();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1️⃣ Socket bağlanmadıysa hiç kurulum yapma
    if (!socketConnected) {
      logger.warn("⏳ Socket not connected yet — waiting...");
      return;
    }

    // 2️⃣ Lobby kanalı hazır değilse yine bekle
    const lobby = getChannel(SOCKET_CHANNELS.GAME.LOBBY.PLAYERS);
    if (!lobby) {
      logger.warn("⏳ Lobby channel not ready yet — waiting...");
      return;
    }

    logger.log("🟢 Lobby channel ready — RealtimeListener ACTIVE");

    let blurAt: number | null = null;
    let blurTimer: NodeJS.Timeout | null = null;

    const handleFocus = () => {
      const now = Date.now();
      const diff = blurAt ? now - blurAt : 0;

      if (blurTimer) clearTimeout(blurTimer);

      if (diff < 60_000) {
        logger.log("🟢 Sekme geri geldi → refresh_state gönderiliyor");
        setLoading(true);
        lobby.push("refresh_state", {});
        setTimeout(() => setLoading(false), 800);
      } else if (blurAt) {
        logger.warn("⏰ Uzun pasiflik → sayfa yenileniyor");
        window.location.reload();
      }

      blurAt = null;
    };

    const handleBlur = () => {
      blurAt = Date.now();
      logger.log("⚪ Sekme arka plana geçti");

      blurTimer = setTimeout(() => {
        logger.warn("💤 5 dakika pasiflik → otomatik refresh");
        window.location.reload();
      }, 5 * 60_000);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      if (blurTimer) clearTimeout(blurTimer);
    };
  }, [socketConnected, getChannel]);

  return null;
}
