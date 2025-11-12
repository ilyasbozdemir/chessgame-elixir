"use client";

import React from "react";
import { ChannelProvider } from "@/context/channel-context";
import { UserProvider } from "@/context/user-context";
import { PlayerProvider } from "@/context/player-context";
import { GameProvider } from "@/context/game-context";

const providers = [
  ChannelProvider,
  UserProvider,
  PlayerProvider,
  GameProvider,
];

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};
