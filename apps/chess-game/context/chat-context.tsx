"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useChannel } from "@/context/channel-context";
import { SOCKET_CHANNELS, SOCKET_EVENTS } from "@/const/elixir-socket-names";
import { Logger } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  mine?: boolean;
}

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  typing: (isTyping: boolean) => void;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
  typing: () => {},
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const logger = new Logger("ChatContext");

  const { getChannel } = useChannel();

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // 🎯 Global chat kanalını al
  const chatChannel = getChannel(SOCKET_CHANNELS.CHAT.GLOBAL);

  // 🔌 Olayları dinle
  useEffect(() => {
    if (!chatChannel) {
      logger.warn("Chat channel not found…");
      return;
    }

    logger.info("📨 Chat events active");

    // 🆕 Yeni mesaj geldi
    chatChannel.on(SOCKET_EVENTS.CHAT.NEW_MESSAGE, (payload) => {
      logger.log("💬 New chat message:", payload);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: payload.sender,
          content: payload.content,
          timestamp: Date.now(),
          mine: false,
        },
      ]);
    });

    // ✍️ Yazıyor event’i
    chatChannel.on(SOCKET_EVENTS.CHAT.TYPING, (payload) => {
      logger.log("✍️ typing:", payload);
      // typing göstergesi UI'de handle edilir
    });

    return () => {
      chatChannel.off(SOCKET_EVENTS.CHAT.NEW_MESSAGE);
      chatChannel.off(SOCKET_EVENTS.CHAT.TYPING);
    };
  }, [chatChannel]);

  // 📨 Mesaj gönder
  const sendMessage = (content: string) => {
    if (!chatChannel) return;

    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "me",
      content,
      timestamp: Date.now(),
      mine: true,
    };

    setMessages((prev) => [...prev, msg]);

    chatChannel.push(SOCKET_EVENTS.CHAT.NEW_MESSAGE, { content });
  };

  // 🟦 Typing event
  const typing = (isTyping: boolean) => {
    if (!chatChannel) return;
    chatChannel.push(SOCKET_EVENTS.CHAT.TYPING, { typing: isTyping });
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        typing,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChat() {
  return useContext(ChatContext);
}
