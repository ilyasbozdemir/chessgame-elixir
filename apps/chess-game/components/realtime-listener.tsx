"use client";

import { useChannel } from "@/context/channel-context";
import { Logger } from "@/lib/utils";
import { useState, useEffect } from "react";

interface RealtimeListenerProps {
  //
}

/**
 * RealtimeListener — sekme focus/blur olaylarını yönetir.
 * Kısa süreli pasiflikte `refresh_state` gönderir,
 * uzun süreli pasiflikte (örn. uyku modu) sayfayı yeniler.
 */
export function RealtimeListener({}: RealtimeListenerProps) {
  const logger = new Logger("RealtimeListener-Logger");

  const { channel } = useChannel();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let blurAt: number | null = null;
    let blurTimer: NodeJS.Timeout | null = null;

    const handleFocus = () => {
      const now = Date.now();
      const diff = blurAt ? now - blurAt : 0;

      if (blurTimer) clearTimeout(blurTimer);

      // 🔸 1 dakikadan az pasifse => sadece refresh_state push et
      if (diff < 60_000) {
        logger.log("🟢 Sekme geri geldi — kanalı yeniliyorum");
        setLoading(true);
        channel.push("refresh_state", {});
        setTimeout(() => setLoading(false), 800);
      } else if (blurAt) {
        // 🔸 1 dakikadan fazla pasifse => tam sayfa yenile
        logger.warn("⏰ Uzun süre pasif kaldı, sayfa yenileniyor...");
        window.location.reload();
      }

      blurAt = null;
    };

    const handleBlur = () => {
      logger.log("⚪ Sekme arka plana geçti — eventleri askıya alıyorum");
      blurAt = Date.now();

      // opsiyonel olarak uzun blur süresinde otomatik reload
      blurTimer = setTimeout(() => {
        logger.warn("💤 Sekme uzun süre pasif kaldı, otomatik refresh!");
        window.location.reload();
      }, 5 * 60_000); // 5 dk pasifse garantili refresh
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      if (blurTimer) clearTimeout(blurTimer);
    };
  }, [channel]);

  return (
    <>
      <></>
    </>
  );
}
