export type PieceType =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "queen"
  | "king";
export type PieceColor = "white" | "black";

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export interface Position {
  row: number;
  col: number;
}

export type Board = (ChessPiece | null)[][];

export interface GameState {
  board: Board;
  currentTurn: PieceColor;
  selectedPiece: Position | null;
  validMoves: Position[];
  capturedPieces: {
    white: ChessPiece[];
    black: ChessPiece[];
  };
  gameStatus: "waiting" | "ready" | "playing" | "finished";
  winner: PieceColor | null;
}
