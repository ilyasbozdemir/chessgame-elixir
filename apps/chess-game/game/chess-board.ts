import type { Board, ChessPiece, Position, PieceColor } from "./chess-types";
import {
  movePiece,
  indexToCellName,
  cellNameToIndex,
  initializeBoard,
} from "./chess-logic";

export class ChessBoard {
  board: Board;
  moves: { from: Position; to: Position; piece: ChessPiece; fen: string }[] =
    [];
  currentFEN: string = "startpos";
  perspective: PieceColor;
  whiteTimeMs: number | null = null;
  blackTimeMs: number | null = null;

  constructor(perspective: PieceColor = "white", fen?: string) {
    this.perspective = perspective;
    this.board = fen ? this.loadFEN(fen) : initializeBoard();
    this.currentFEN = fen ?? "startpos";
  }

  getCellName(pos: Position) {
    return indexToCellName(pos.row, pos.col, this.perspective);
  }

  getPosition(cellName: string): Position {
    return cellNameToIndex(cellName, this.perspective);
  }

  move(from: Position, to: Position) {
    const piece = this.board[from.row][from.col];
    if (!piece) throw new Error("No piece at source position");

    this.board = movePiece(this.board, from, to);

    const fen = this.generateFEN();
    this.moves.push({ from, to, piece, fen });
    this.currentFEN = fen;
  }

  undo() {
    if (this.moves.length === 0) return;
    this.moves.pop();
    this.rebuildBoardFromMoves();
  }

  redo(moveData: {
    from: Position;
    to: Position;
    piece: ChessPiece;
    fen: string;
  }) {
    this.moves.push(moveData);
    this.board = movePiece(this.board, moveData.from, moveData.to);
    this.currentFEN = moveData.fen;
  }

  rebuildBoardFromMoves() {
    this.board = initializeBoard();
    for (const move of this.moves) {
      this.board = movePiece(this.board, move.from, move.to);
    }
    this.currentFEN =
      this.moves.length > 0
        ? this.moves[this.moves.length - 1].fen
        : "startpos";
  }

  generateFEN(): string {
    return this.board
      .map((row) => {
        let empty = 0;
        let rowFEN = "";
        for (const cell of row) {
          if (!cell) {
            empty++;
          } else {
            if (empty > 0) {
              rowFEN += empty;
              empty = 0;
            }
            const symbol = this.getPieceSymbol(cell);
            rowFEN += symbol;
          }
        }
        if (empty > 0) rowFEN += empty;
        return rowFEN;
      })
      .join("/");
  }

  private getPieceSymbol(piece: ChessPiece): string {
    const map: Record<string, string> = {
      king: "k",
      queen: "q",
      rook: "r",
      bishop: "b",
      knight: "n",
      pawn: "p",
    };
    const symbol = map[piece.type];
    return piece.color === "white" ? symbol.toUpperCase() : symbol;
  }

  loadFEN(fen: string): Board {
    const rows = fen.split("/");
    const board: Board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    rows.forEach((rowStr, rowIdx) => {
      let col = 0;
      for (const char of rowStr) {
        const n = parseInt(char);
        if (!isNaN(n)) {
          col += n; // boş kareler
        } else {
          const piece = this.charToPiece(char);
          board[rowIdx][col] = piece;
          col++;
        }
      }
    });

    return board;
  }

  private charToPiece(char: string): ChessPiece {
    const lower = char.toLowerCase();
    const color: "white" | "black" = char === lower ? "black" : "white";
    const typeMap: Record<string, ChessPiece["type"]> = {
      k: "king",
      q: "queen",
      r: "rook",
      b: "bishop",
      n: "knight",
      p: "pawn",
    };
    return { type: typeMap[lower], color };
  }
}
