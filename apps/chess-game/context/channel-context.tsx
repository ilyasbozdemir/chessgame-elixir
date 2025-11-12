"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket, Channel } from "phoenix";
import { socket } from "@/lib/socket";

interface ChannelContextType {
  socketConnected: boolean;
  channels: Record<string, Channel>;
  joinChannel: (topic: string, params?: Record<string, any>) => Channel | null;
  leaveChannel: (topic: string) => void;
  getChannel: (topic: string) => Channel | null;
}

const ChannelContext = createContext<ChannelContextType>({
  socketConnected: false,
  channels: {},
  joinChannel: () => null,
  leaveChannel: () => {},
  getChannel: () => null,
});

export const ChannelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [channels, setChannels] = useState<Record<string, Channel>>({});

  // 🔌 Socket bağlantısı tek seferlik açılır
  useEffect(() => {
    socket.connect();
    setSocketConnected(true);
    console.log("🌐 Socket connected (global)");

    return () => {
      console.log("🔌 Socket disconnected (unmount)");
      Object.values(channels).forEach((ch) => ch.leave());
      socket.disconnect();
      setChannels({});
      setSocketConnected(false);
    };
  }, []);

  // 🔹 Kanal ekleme
  const joinChannel = (topic: string, params: Record<string, any> = {}) => {
    if (!socketConnected) {
      console.warn("⚠️ Socket not connected yet, delaying join...");
      return null;
    }

    if (channels[topic]) {
      console.log(`⚪ Already joined '${topic}'`);
      return channels[topic];
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

    setChannels((prev) => ({ ...prev, [topic]: ch }));
    return ch;
  };

  // 🔹 Kanal çıkışı
  const leaveChannel = (topic: string) => {
    const ch = channels[topic];
    if (!ch) return;

    console.log(`👋 Leaving channel '${topic}'`);
    ch.leave();

    setChannels((prev) => {
      const copy = { ...prev };
      delete copy[topic];
      return copy;
    });
  };

  // 🔹 Kanal alma (örnek: getChannel("game:lobby:players"))
  const getChannel = (topic: string) => channels[topic] || null;

  return (
    <ChannelContext.Provider
      value={{ socketConnected, channels, joinChannel, leaveChannel, getChannel }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export function useChannel() {
  return useContext(ChannelContext);
}
