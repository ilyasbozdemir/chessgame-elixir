"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, RotateCcw } from "lucide-react";
import { useUser } from "@/context/user-context";
import { ChessBoard } from "@/game/chess-board";
import { getPieceSymbol } from "@/game/chess-logic";
import type { Position, ChessPiece } from "@/game/chess-types";

interface ChessBoardUI2Props {
  mode?: "play" | "spectate" | "replay";
  tableId?: string;
  gameId?: string;
  perspective?: "white" | "black";
}

const ChessBoardUI2: React.FC<ChessBoardUI2Props> = ({
  mode,
  tableId,
  perspective = "white",
}) => {
  const { playerUser } = useUser();

  // ChessBoard class instance
  const [chessBoard] = useState(() => new ChessBoard(perspective));
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);

  const board = chessBoard.board;
  const currentTurn = chessBoard.moves.length % 2 === 0 ? "white" : "black";

  // capturedPieces hesaplama
  const capturedPieces = { white: [] as ChessPiece[], black: [] as ChessPiece[] };
  for (const move of chessBoard.moves) {
    if (move.piece.color === "white") capturedPieces.white.push(move.piece);
    else capturedPieces.black.push(move.piece);
  }

  const isMyTurn = perspective === currentTurn;

  const handleSquareClick = (row: number, col: number) => {
    if (!isMyTurn) return;

    const pos: Position = { row, col };
    const piece = board[row][col];

    if (selectedPiece) {
      try {
        chessBoard.move(selectedPiece, pos);
        setSelectedPiece(null);
      } catch {
        if (piece && piece.color === perspective) setSelectedPiece(pos);
      }
    } else if (piece && piece.color === perspective) {
      setSelectedPiece(pos);
    }
  };

  const isSquareSelected = (row: number, col: number) =>
    selectedPiece?.row === row && selectedPiece?.col === col;

  const getSquareColor = (row: number, col: number) => {
    if (isSquareSelected(row, col)) return "bg-yellow-400 dark:bg-yellow-600";
    return (row + col) % 2 === 0 ? "bg-muted" : "bg-card";
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-6 items-start">
        {mode === "spectate" && (
          <div className="col-span-full flex items-center justify-end text-muted-foreground text-sm mb-2">
            <div className="flex items-center gap-1 bg-muted/40 px-3 py-1 rounded-full">
              <Eye className="w-4 h-4" />
              <span className="font-medium">1 izleyici</span>
            </div>
          </div>
        )}

        {/* White Player Panel */}
        <Card className="order-2 lg:order-1">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="flex items-center justify-between text-sm sm:text-base gap-2">
              <span className="truncate">PlayWhite</span>
              <Badge
                variant={currentTurn === "white" ? "default" : "outline"}
                className="shrink-0 text-xs sm:text-sm"
              >
                ⚪ Beyaz
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <p className="text-xs sm:text-sm text-muted-foreground">Alınan Taşlar:</p>
            <div className="flex flex-wrap gap-1 min-h-[32px] sm:min-h-[40px]">
              {capturedPieces.black.map((piece, i) => (
                <span key={i} className="text-lg sm:text-xl lg:text-2xl">
                  {getPieceSymbol(piece)}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chessboard */}
        <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
          <Card>
            <CardContent className="p-2 sm:p-4 lg:p-6">
              <div className="inline-block border-2 sm:border-4 border-secondary rounded-lg overflow-hidden shadow-2xl">
                {board.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex">
                    {row.map((piece, colIndex) => (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                        className={`w-12 h-12 flex items-center justify-center text-2xl
                          ${getSquareColor(rowIndex, colIndex)}
                          ${isSquareSelected(rowIndex, colIndex) ? "ring-2 ring-yellow-500" : ""}
                        `}
                      >
                        {piece && getPieceSymbol(piece)}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {mode === "play" && (
            <div className="flex gap-2 mt-2">
              <Button onClick={() => chessBoard.undo()}>Geri Al</Button>
              <Button onClick={() => chessBoard.redo(chessBoard.moves[chessBoard.moves.length - 1])}>
                İleri
              </Button>
            </div>
          )}
        </div>

        {/* Black Player Panel */}
        <Card className="order-3">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="flex items-center justify-between text-sm sm:text-base gap-2">
              <span className="truncate">PlayBlack</span>
              <Badge
                variant={currentTurn === "black" ? "default" : "outline"}
                className="shrink-0 text-xs sm:text-sm"
              >
                ⚫ Siyah
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <p className="text-xs sm:text-sm text-muted-foreground">Alınan Taşlar:</p>
            <div className="flex flex-wrap gap-1 min-h-[32px] sm:min-h-[40px]">
              {capturedPieces.white.map((piece, i) => (
                <span key={i} className="text-lg sm:text-xl lg:text-2xl">
                  {getPieceSymbol(piece)}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChessBoardUI2;
