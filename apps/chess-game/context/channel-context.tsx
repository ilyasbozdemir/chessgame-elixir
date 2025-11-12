"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/lib/socket";

interface ChannelContextType {
  socketConnected: boolean;
  channel: any;
  joinChannel: (topic: string, params?: Record<string, any>) => any;
  leaveChannel: () => void;
}

const ChannelContext = createContext<ChannelContextType>({
  socketConnected: false,
  channel: null,
  joinChannel: () => {},
  leaveChannel: () => {},
});

export const ChannelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    // 🔌 Bağlantı en başta kurulur
    socket.connect();
    setSocketConnected(true);

    console.log("🌐 Socket connected (global ChannelProvider)");

    return () => {
      console.log("🔌 Socket disconnected (unmount)");
      socket.disconnect();
      setSocketConnected(false);
      setChannel(null);
    };
  }, []);

  const joinChannel = (topic: string, params: Record<string, any> = {}) => {
    if (!socketConnected) {
      console.warn("⚠️ Socket not connected yet, delaying join...");
      return null;
    }

    const ch = socket.channel(topic, params);
    ch
      .join()
      .receive("ok", (resp) =>
        console.log(`✅ Joined channel '${topic}'`, resp)
      )
      .receive("error", (err) =>
        console.error(`❌ Failed to join '${topic}'`, err)
      );

    setChannel(ch);
    return ch;
  };

  const leaveChannel = () => {
    if (channel) {
      channel.leave();
      setChannel(null);
      console.log("👋 Left channel");
    }
  };

  return (
    <ChannelContext.Provider
      value={{ socketConnected, channel, joinChannel, leaveChannel }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export function useChannel() {
  return useContext(ChannelContext);
}
