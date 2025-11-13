// const/elixir-socket-channel-names.ts

/**
 * Phoenix socket channels used by the frontend.
 * Keep topics in a single place to avoid magic strings.
 */

export const SOCKET_CHANNELS = {
  GAME: {
    LOBBY: {
      PLAYERS: "game:lobby:players",
      TABLES: "game:lobby:tables",
      GUESTS: "game:lobby:guests",
    },

    // 🔥 match-specific real-time channel
    MATCH: (matchId: string) => `game:match:${matchId}`,

    // Eğer table mantığı kalacaksa:
    TABLE: (tableId: string) => `game:table:${tableId}`,
  },

  CHAT: {
    GLOBAL: "chat:global",
    PRIVATE: (userId: string) => `chat:private:${userId}`,
  },

  PRESENCE: {
    USER: (userId: string) => `presence:user:${userId}`,
  },
} as const;


/**
 * EVENT NAMES
 * (Push, Receive, Broadcast names)
 */
export const SOCKET_EVENTS = {
  // Global Realtime
  REFRESH_STATE: "refresh_state",

  // Presence
  PRESENCE_STATE: "presence_state",
  PRESENCE_DIFF: "presence_diff",

  // Lobby Events
  LOBBY: {
    PLAYER_JOIN: "lobby:player_join",
    PLAYER_LEAVE: "lobby:player_leave",
    TABLE_CREATED: "lobby:table_created",
    TABLE_UPDATED: "lobby:table_updated",
    TABLE_REMOVED: "lobby:table_removed",
  },

  // Match/Game Events
  GAME: {
    START: "game:start",
    MOVE: "game:move",
    RESET: "game:reset",
    FINISH: "game:finish",
    RESIGN: "game:resign",
    OFFER_DRAW: "game:offer_draw",
    ACCEPT_DRAW: "game:accept_draw",
  },

  // Chat Events
  CHAT: {
    NEW_MESSAGE: "chat:new_message",
    TYPING: "chat:typing",
    READ: "chat:read",
  },
} as const;
