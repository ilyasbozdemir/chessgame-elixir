import { create } from "zustand";
import type { GameState, Position } from "./chess-types";
import { initializeBoard, isValidMove, movePiece } from "./chess-logic";

import type { PlayerDoc } from "@/models/player";
import type { TableDoc } from "@/models/table";
import mongoose from "mongoose";

interface ChessStore {
  // Player state
  players: PlayerDoc[];
  currentPlayer: PlayerDoc | null;

  tables: TableDoc[];
  currentTable: TableDoc | null;

  // Game state
  gameState: GameState;

  // Actions
  addPlayer: (name: string) => void;
  setCurrentPlayer: (player: PlayerDoc | null) => void;
  setPlayerReady: (id: string, ready: boolean) => void;
  assignColors: () => void;
  startGame: () => void;
  selectPiece: (position: Position) => void;
  makeMove: (to: Position) => void;
  resetGame: () => void;

  createTable: (name: string, owner: PlayerDoc) => string;
  joinTable: (tableId: string, player: PlayerDoc) => void;
  leaveTable: () => void;
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

  addPlayer: (name: string) => {
    const { players } = get();
    if (players.length >= 2) return;

    const id = new mongoose.Types.ObjectId();

    const newPlayer: PlayerDoc = {
      _id: id,
      name,
      color: "white",
      createdAt: new Date(),
    };

    set({ players: [...players, newPlayer] });

    if (players.length === 0) {
      set({ currentPlayer: newPlayer });
    }
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

  createTable: (name: string, owner: PlayerDoc) => {
    const id = new mongoose.Types.ObjectId();
    const tableId = id.toString();
    const newTable: TableDoc = {
      _id: id,
      name,
      maxPlayers: 2,
      status: "waiting",
      createdAt: new Date(),
      ownerId: owner._id,
      ownerName: owner.name,
    };

    set((state) => ({
      tables: [...state.tables, newTable],
    }));

    return tableId;
  },

  joinTable: (tableId: string, player: PlayerDoc): void => {
    const { tables } = get();

    const table = tables.find((t) => t._id?.toString() === tableId);
    if (!table || (table.players?.length ?? 0) >= table.maxPlayers) return;

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
