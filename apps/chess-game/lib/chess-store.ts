import { create } from "zustand";
import type { GameState, Position } from "./chess-types";
import { initializeBoard, isValidMove, movePiece } from "./chess-logic";

import type { PlayerDoc } from "@/models/player";
import type { TableDoc } from "@/models/table";
import mongoose from "mongoose";
import { PlayerService } from "@/services/players.service";
import { TableService } from "@/services/tables.service";
import { Logger } from "./utils";

interface ChessStore {
  // Player state
  players: PlayerDoc[];
  currentPlayer: PlayerDoc | null;

  tables: TableDoc[];
  currentTable: TableDoc | null;

  // Game state
  gameState: GameState;

  // Actions
  addPlayer: (name: string, channel?: any) => void;
  setCurrentPlayer: (player: PlayerDoc | null, channel?: any) => void;
  setPlayerReady: (id: string, ready: boolean, channel?: any) => void;
  assignColors: (channel?: any) => void;
  startGame: (channel?: any) => void;
  selectPiece: (position: Position, channel?: any) => void;
  makeMove: (to: Position, channel?: any) => void;
  resetGame: (channel?: any) => void;

  createTable: (
    name: string,
    owner: PlayerDoc,
    channel?: any
  ) => Promise<string>;
  deleteTable: (
    tableId: string,
    player: PlayerDoc,
    channel?: any
  ) => Promise<void>;
  joinTable: (tableId: string, player: PlayerDoc, channel?: any) => void;
  leaveTable: (channel?: any) => void;
}

export const useChessStore = create<ChessStore>((set, get) => ({
  players: [],
  currentPlayer: null,

  tables: [],
  currentTable: null,

  gameState: {
    board: initializeBoard(),
    currentTurn: "white",
    selectedPiece: null,
    validMoves: [],
    capturedPieces: {
      white: [],
      black: [],
    },
    gameStatus: "waiting",
    winner: null,
  },

  addPlayer: async (name: string) => {
    const playerService = new PlayerService();
    const createdPlayer = await playerService.create(name);

    const { players } = get();

    set({ players: [...players, createdPlayer] });

    set({ currentPlayer: createdPlayer });
  },

  setCurrentPlayer: (player: PlayerDoc | null) => {
    set({ currentPlayer: player });
  },

  setPlayerReady: (playerId: string, isReady: boolean) => {
    const { currentTable } = get();
    if (!currentTable || !currentTable.players) return;

    // oyuncu listesini güncelle
    const updatedPlayers = currentTable.players.map((p) =>
      p.id?.toString() === playerId ? { ...p, isReady } : p
    );

    // masayı güncelle
    const updatedTable = {
      ...currentTable,
      players: updatedPlayers,
    };

    // state güncelle
    set((state) => ({
      ...state,
      tables: state.tables.map((t) =>
        t._id?.toString() === currentTable._id?.toString() ? updatedTable : t
      ),
      currentTable: updatedTable,
    }));
  },

  assignColors: () => {
    const { players } = get();
    if (players.length !== 2) return;

    const colors: ("white" | "black")[] =
      Math.random() > 0.5 ? ["white", "black"] : ["black", "white"];

    set((state) => ({
      players: state.players.map((p, i) => ({
        ...p,
        color: colors[i],
      })),
      gameState: {
        ...state.gameState,
        gameStatus: "ready",
      },
    }));
  },

  startGame: () => {
    set((state) => ({
      gameState: {
        ...state.gameState,
        gameStatus: "playing",
      },
    }));
  },

  selectPiece: (position: Position) => {
    const { gameState, players, currentPlayer } = get();
    const { board, currentTurn } = gameState;

    const piece = board[position.row][position.col];

    if (!piece) {
      set((state) => ({
        gameState: {
          ...state.gameState,
          selectedPiece: null,
          validMoves: [],
        },
      }));
      return;
    }

    // Check if it's the current player's turn
    const playerColor = players.find(
      (p) => p._id === currentPlayer?._id
    )?.color;
    if (piece.color !== currentTurn || piece.color !== playerColor) {
      return;
    }

    const validMoves = isValidMove(board, position);

    set((state) => ({
      gameState: {
        ...state.gameState,
        selectedPiece: position,
        validMoves,
      },
    }));
  },

  makeMove: (to: Position) => {
    const { gameState } = get();
    const { board, selectedPiece, validMoves, currentTurn } = gameState;

    if (!selectedPiece) return;

    const isValid = validMoves.some(
      (move) => move.row === to.row && move.col === to.col
    );

    if (!isValid) return;

    const capturedPiece = board[to.row][to.col];
    const newBoard = movePiece(board, selectedPiece, to);

    set((state) => ({
      gameState: {
        ...state.gameState,
        board: newBoard,
        currentTurn: currentTurn === "white" ? "black" : "white",
        selectedPiece: null,
        validMoves: [],
        capturedPieces: capturedPiece
          ? {
              ...state.gameState.capturedPieces,
              [capturedPiece.color]: [
                ...state.gameState.capturedPieces[capturedPiece.color],
                capturedPiece,
              ],
            }
          : state.gameState.capturedPieces,
      },
    }));
  },

  resetGame: () => {
    set({
      players: [],
      currentPlayer: null,
      currentTable: null,
      gameState: {
        board: initializeBoard(),
        currentTurn: "white",
        selectedPiece: null,
        validMoves: [],
        capturedPieces: {
          white: [],
          black: [],
        },
        gameStatus: "waiting",
        winner: null,
      },
    });
  },

  createTable: async (
    name: string,
    owner: PlayerDoc,
    channel?: any
  ): Promise<string> => {
    const tableService = new TableService();

    const logger = new Logger("Zustand-TableService");

    logger.group("[Zustand: createTable]");

    try {
      logger.info("🧩 Masa oluşturma başlatıldı:", { name, owner });

      // 🔹 API üzerinden masa oluştur
      const createdTable = await tableService.create(name, owner);

      logger.success("✅ API'den dönen masa:", createdTable);

      // 🔹 MongoDB'den dönen gerçek ID kullanılsın
      const tableId =
        createdTable._id?.toString() ??
        new mongoose.Types.ObjectId().toString();

      // 🔹 Zustand state'ini güncelle
      const newTable: TableDoc = {
        _id: new mongoose.Types.ObjectId(tableId),
        name: createdTable.name,
        status: createdTable.status ?? "waiting",
        createdAt: new Date(createdTable.createdAt ?? Date.now()),
        ownerId: owner._id,
        ownerName: owner.name,
        players: createdTable.players ?? [],
      };

      set((state) => {
        const exists = state.tables.some(
          (t) => t._id?.toString() === newTable._id?.toString()
        );
        if (exists) return state;

        return {
          tables: [...state.tables, newTable],
          currentTable: newTable,
        };
      });

      channel?.push("table_created", { table: newTable });

      logger.success("🧱 Zustand state güncellendi:", newTable);
      logger.groupEnd();
      return tableId;
    } catch (error: any) {
      logger.error("❌ Masa oluşturulamadı:", error.message);
      logger.groupEnd();
      throw error;
    }
  },

  deleteTable: async (
    tableId: string,
    player: PlayerDoc,
    channel?: any
  ): Promise<void> => {
    //
    //
  },

  joinTable: (tableId: string, player: PlayerDoc): void => {
    const { tables } = get();

    const table = tables.find((t) => t._id?.toString() === tableId);
    if (!table || (table.players?.length ?? 0) >= 2) return;

    // 🧩 normalize + yeni player ekle
    const normalizedPlayers = (table.players ?? []).map((p) => ({
      id: (p as any).id ?? (p as any)._id ?? null,
      name: p.name,
      color: p.color,
      isReady: p.isReady,
    }));

    const tablePlayer = {
      id: player._id ?? null,
      name: player.name,
      color: player.color,
      isReady: false,
    };

    const updatedTable = {
      ...table,
      players: [...normalizedPlayers, tablePlayer],
    };

    // 🧱 state update
    set((state) => ({
      ...state,
      tables: state.tables.map((t) =>
        t._id?.toString() === tableId ? updatedTable : t
      ),
      currentTable: updatedTable,
      currentPlayer: player,
    }));
  },

  leaveTable: () => {
    const { currentPlayer, currentTable } = get();
    if (!currentTable || !currentPlayer) return;

    const updatedPlayers = (currentTable.players ?? []).filter(
      (p) => p.id?.toString() !== currentPlayer._id?.toString()
    );

    const updatedTable = {
      ...currentTable,
      players: updatedPlayers,
    };

    set((state) => ({
      ...state,
      tables: state.tables.map((t) =>
        t._id?.toString() === currentTable._id?.toString() ? updatedTable : t
      ),
      currentTable: null,
      players: [],
    }));
  },
}));
