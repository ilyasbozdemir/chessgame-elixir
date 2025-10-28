import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Player, GameState, Position, GameTable } from "./chess-types";
import { initializeBoard, isValidMove, movePiece } from "./chess-logic";
import { Play } from "next/font/google";

interface ChessStore {
  // Player state
  players: Player[];
  currentPlayer: Player | null;

  tables: GameTable[];
  currentTable: GameTable | null;

  // Game state
  gameState: GameState;

  // Actions
  addPlayer: (name: string) => void;
  setCurrentPlayer: (player: Player | null) => void;
  removePlayer: (id: string) => void;
  setPlayerReady: (id: string, ready: boolean) => void;
  assignColors: () => void;
  startGame: () => void;
  selectPiece: (position: Position) => void;
  makeMove: (to: Position) => void;
  resetGame: () => void;

  createTable: (name: string, owner: Player) => string;
  joinTable: (tableId: string, playerName: string) => void;
  leaveTable: () => void;
}

const mockTables: GameTable[] = [
  {
    id: "table-1",
    name: "Başlangıç Masası",
    players: [{ _id: "mock-1", name: "Ahmet", color: "white", isReady: true }],
    maxPlayers: 2,
    status: "waiting",
    createdAt: new Date(Date.now() - 300000),
  },
  {
    id: "table-2",
    name: "Hızlı Oyun",
    players: [],
    maxPlayers: 2,
    status: "waiting",
    createdAt: new Date(Date.now() - 600000),
  },
  {
    id: "table-3",
    name: "Profesyonel Masa",
    players: [
      { _id: "mock-2", name: "Mehmet", color: "white", isReady: false },
      { _id: "mock-3", name: "Ayşe", color: "black", isReady: true },
    ],
    maxPlayers: 2,
    status: "waiting",
    createdAt: new Date(Date.now() - 900000),
  },
  {
    id: "table-4",
    name: "Turnuva Masası",
    players: [
      { _id: "mock-4", name: "Fatma", color: "white", isReady: true },
      { _id: "mock-5", name: "Ali", color: "black", isReady: true },
    ],
    maxPlayers: 2,
    status: "playing",
    createdAt: new Date(Date.now() - 1200000),
  },
];

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

    const newPlayer: Player = {
      _id: Math.random().toString(36).substr(2, 9),
      name,
      color: null,
      isReady: false,
    };

    set({ players: [...players, newPlayer] });

    if (players.length === 0) {
      set({ currentPlayer: newPlayer });
    }
  },

  setCurrentPlayer: (player: Player | null) => {
    set({ currentPlayer: player });
  },

  removePlayer: (id: string) => {
    const { players, currentPlayer } = get();
    const newPlayers = players.filter((p) => p._id !== id);

    set({
      players: newPlayers,
      currentPlayer:
        currentPlayer?._id === id ? newPlayers[0] || null : currentPlayer,
    });
  },

  setPlayerReady: (id: string, ready: boolean) => {
    set((state) => ({
      players: state.players.map((p) =>
        p._id === id ? { ...p, isReady: ready } : p
      ),
    }));

    const { players } = get();
    if (players.length === 2 && players.every((p) => p.isReady)) {
      get().assignColors();
    }
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
    const playerColor = players.find((p) => p._id === currentPlayer?._id)?.color;
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

  createTable: (name: string, owner: Player) => {
    const newTable: GameTable = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      players: [],
      maxPlayers: 2,
      status: "waiting",
      createdAt: new Date(),
      ownerId: owner._id,
      ownerName: owner.name,
    };

    set((state) => ({
      tables: [...state.tables, newTable],
    }));

    return newTable.id;
  },

  joinTable: (tableId: string, playerName: string) => {
    const { tables } = get();
    const table = tables.find((t) => t.id === tableId);

    if (!table || table.players.length >= table.maxPlayers) return;

    const newPlayer: Player = {
      _id: Math.random().toString(36).substr(2, 9),
      name: playerName,
      color: null,
      isReady: false,
    };

    const updatedTable = {
      ...table,
      players: [...table.players, newPlayer],
    };

    set((state) => ({
      tables: state.tables.map((t) => (t.id === tableId ? updatedTable : t)),
      currentTable: updatedTable,
      currentPlayer: newPlayer,
      players: updatedTable.players,
    }));
  },

  leaveTable: () => {
    const { currentPlayer, currentTable } = get();
    if (!currentTable || !currentPlayer) return;

    const updatedPlayers = currentTable.players.filter(
      (p) => p._id !== currentPlayer._id
    );
    const updatedTable = {
      ...currentTable,
      players: updatedPlayers,
    };

    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === currentTable.id ? updatedTable : t
      ),
      currentTable: null,
      //currentPlayer: null,
      players: [],
    }));
  },
}));
