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
    STATE: "presence_state",
    DIFF: "presence_diff",
  },
} as const;


/**
 * EVENT NAMES (Push, Receive, Broadcast)
 * Her kanalın eventlerini merkezi tutmak için.
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

  // Match Events (game:match:<id> kanalı içindir)
  MATCH: {
    START: "match:start",
    MOVE: "match:move",
    RESET: "match:reset",
    FINISH: "match:finish",
    RESIGN: "match:resign",
    OFFER_DRAW: "match:offer_draw",
    ACCEPT_DRAW: "match:accept_draw",
    DECLINE_DRAW: "match:decline_draw",
    TIMEOUT: "match:timeout",
  },

  // Masa / oda varsa (game:table:<id>)
  TABLE: {
    CREATED: "table:created",
    UPDATED: "table:updated",
    PLAYER_JOIN: "table:player_join",
    PLAYER_LEAVE: "table:player_leave",
    REMOVED: "table:removed",
  },

  // Chat Events
  CHAT: {
    NEW_MESSAGE: "chat:new_message",
    TYPING: "chat:typing",
    READ: "chat:read",
  },
} as const;
