import { create } from "zustand";
import type { GameState, Position } from "./chess-types";
import { initializeBoard, isValidMove, movePiece } from "./chess-logic";

import type { PlayerDoc } from "@/models/player";
import type { TableDoc } from "@/models/table";
import mongoose from "mongoose";
import { Logger } from "./utils";

interface ChessStore {
  tables: TableDoc[];

  // Game state
  gameState: GameState;

  // Actions
  addPlayer: (name: string, channel?: any) => void;
  setPlayerReady: (
    table: TableDoc,
    playerId: string,
    ready: boolean,
    channel?: any
  ) => void;
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
  leaveTable: (table: TableDoc, player: PlayerDoc, channel?: any) => void;
}

export const useChessStore = create<ChessStore>((set, get) => ({
  tables: [],

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
    //
  },

  setPlayerReady: (table: TableDoc, playerId: string, isReady: boolean) => {
    if (!table || !table.players) return;

    // oyuncu listesini güncelle
    const updatedPlayers = table.players.map((p) =>
      p.id?.toString() === playerId ? { ...p, isReady } : p
    );

    // masayı güncelle
    const updatedTable = {
      ...table,
      players: updatedPlayers,
    };

    // state güncelle
    set((state) => ({
      ...state,
      tables: state.tables.map((t) =>
        t._id?.toString() === table._id?.toString() ? updatedTable : t
      ),
    }));
  },

  assignColors: () => {
    // const { players } = get();
    //if (players.length !== 2) return;

    const colors: ("white" | "black")[] =
      Math.random() > 0.5 ? ["white", "black"] : ["black", "white"];

    set((state) => ({
      /* players: state.players.map((p, i) => ({
        ...p,
        color: colors[i],
      })),*/
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
    const { gameState } = get();
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

    /*
    const playerColor = players.find(
      (p) => p._id === currentPlayer?._id
    )?.color;
    
    if (piece.color !== currentTurn || piece.color !== playerColor) {
      return;
    }
*/
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
    //TODO
    return "";
  },

  deleteTable: async (
    tableId: string,
    player: PlayerDoc,
    channel?: any
  ): Promise<void> => {
    const { tables } = get();
    const table = tables.find((t) => t._id?.toString() === tableId);

    if (!table) return;

    const logger = new Logger("Zustand-TableService-deleteTable");

    logger.log("table.ownerId?.toString()", table.ownerId?.toString());

    if (table.ownerId?.toString() !== player?._id?.toString()) {
      console.warn("⛔ Silme yetkisi yok!");
      return;
    }

    set((state) => ({
      tables: state.tables.filter((t) => t._id?.toString() !== tableId),
    }));
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

    set((state) => ({
      ...state,
      tables: state.tables.map((t) =>
        t._id?.toString() === tableId ? updatedTable : t
      ),
      currentPlayer: player,
    }));
  },

  leaveTable: (table: TableDoc, player: PlayerDoc, channel?: any) => {
    if (!table || !player) return;

    const updatedPlayers = (table.players ?? []).filter(
      (p) => p.id?.toString() !== player._id?.toString()
    );

    const updatedTable = {
      ...table,
      players: updatedPlayers,
    };

    set((state) => ({
      ...state,
      tables: state.tables.map((t) =>
        t._id?.toString() === table._id?.toString() ? updatedTable : t
      ),
    }));
  },
}));
