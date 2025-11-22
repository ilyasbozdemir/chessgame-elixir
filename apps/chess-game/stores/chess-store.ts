import { create } from "zustand";

import type { PlayerDoc } from "@/models/player";
import type { TableDoc } from "@/models/table";
import { GameState, Position } from "@/lib/chess-types";
import { initializeBoard, isValidMove, movePiece } from "@/lib/chess-logic";
import { Logger } from "@/lib/utils";

export interface ChessStore {
  tables: TableDoc[];

  // Game state
  gameState: GameState;

  // Actions

  setPlayerReady: (table: TableDoc, playerId: string, ready: boolean) => void;
  assignColors: () => void;
  startGame: () => void;
  selectPiece: (position: Position) => void;
  makeMove: (to: Position) => void;
  resetGame: () => void;

  deleteTable: (tableId: string, player: PlayerDoc) => Promise<void>;

  leaveTable: (table: TableDoc, player: PlayerDoc) => void;
}

export const useChessStore = create<ChessStore>((set, get) => ({
  tables: get()?.tables ?? [],

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

    const colors: ("white" | "black")[] = Math.random() > 0.5
      ? ["white", "black"]
      : ["black", "white"];

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
      (move) => move.row === to.row && move.col === to.col,
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

  deleteTable: async (tableId: string, player: PlayerDoc): Promise<void> => {
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

  leaveTable: (table: TableDoc, player: PlayerDoc) => {
    if (!table || !player) return;

    const updatedPlayers = (table.players ?? []).filter(
      (p) => p.id?.toString() !== player._id?.toString(),
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
