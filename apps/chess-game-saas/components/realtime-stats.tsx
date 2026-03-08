"use client";

import { useEffect, useState } from "react";
import { socketManager } from "@/lib/phoenix-socket";
import { Users } from "lucide-react";

export function RealtimeStats() {
    const [onlineCount, setOnlineCount] = useState<number>(0);

    useEffect(() => {
        socketManager.connect();
        const channel = socketManager.joinChannel("game:lobby:players");

        if (channel) {
            channel.on("presence_state", (state: any) => {
                setOnlineCount(Object.keys(state).length);
            });

            channel.on("presence_diff", () => {
                // Just rely on a quick way to get count if we want, 
                // but Phoenix usually sends presence_state or we sync.
            });

            // Periodic check if needed
        }

        return () => {
            socketManager.leaveChannel("game:lobby:players");
        };
    }, []);

    if (onlineCount === 0) return null;

    return (
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-medium animate-pulse">
            <Users className="w-3 h-3" />
            <span>{onlineCount} Oyuncu Çevrimiçi</span>
        </div>
    );
}
