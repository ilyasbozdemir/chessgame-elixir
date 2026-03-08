"use client";

import React from "react";
import { ChannelProvider } from "@/context/channel-context";
import { UserProvider } from "@/context/user-context";
import { GameProvider } from "@/context/game-context";
import { ChatProvider } from "@/context/chat-context";
import { PresenceProvider } from "@/context/presence-context";

const providers = [
  ChannelProvider,
  UserProvider,
  PresenceProvider,
  ChatProvider,
  GameProvider,
];

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};
