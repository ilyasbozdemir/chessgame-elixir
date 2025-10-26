"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Player } from "./chess-types";

interface IdentityStore {
  currentPlayer: Player | null;
  ensureIdentity: (name: string) => Player;
  clearIdentity: () => void;
}

export const useIdentityStore = create(
  persist<IdentityStore>(
    (set, get) => ({
      currentPlayer: null,

      ensureIdentity: (name: string) => {
        const existing = get().currentPlayer;
        if (existing && existing.name === name.trim()) return existing;

        const player: Player = {
          id: Math.random().toString(36).slice(2, 11),
          name: name.trim(),
          color: null,
          isReady: false,
        };

        set({ currentPlayer: player });
        return player;
      },

      clearIdentity: () => set({ currentPlayer: null }),
    }),
    {
      name: "chess-session-identity",
      storage: createJSONStorage(() => sessionStorage),

      partialize: ((state: IdentityStore) => ({
        currentPlayer: state.currentPlayer,
      })) as unknown as (state: IdentityStore) => IdentityStore,
    }
  )
);
