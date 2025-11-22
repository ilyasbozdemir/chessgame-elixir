"use client";

import { useChessStore } from "@/stores/chess-store";
import { getPieceSymbol } from "@/game/chess-logic";
import type { Position } from "@/game/chess-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, RotateCcw } from "lucide-react";
import { useUser } from "@/context/user-context";
interface ChessBoardUIProps {
  mode?: "play" | "spectate" | "replay";
  tableId?: string;
  gameId?: string;
}

const ChessBoardUI: React.FC<ChessBoardUIProps> = ({ mode, tableId }) => {
  const { user, playerUser, loading: userLoading, login, logout } = useUser();

  const { gameState, selectPiece, makeMove, resetGame } = useChessStore();
  const { board, selectedPiece, validMoves, currentTurn, capturedPieces } =
    gameState;

  const tables = useChessStore((s) => s.tables);
  const table = tables.find((t) => t._id?.toString() === tableId);

  
  if (!table) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-muted-foreground">
        Masa bulunamadı veya yükleniyor...
      </div>
    );
  }
  

  const currentPlayerColor = table?.players.find(
    (p) => p.id === playerUser?._id
  )?.color;

  const isMyTurn = currentPlayerColor === currentTurn;

  const handleSquareClick = (row: number, col: number) => {
    if (!isMyTurn) return;

    const position: Position = { row, col };
    const piece = board[row][col];

    // Eğer seçili taş varsa ve geçerli hamle yapılıyorsa
    if (selectedPiece) {
      const isValidMove = validMoves.some(
        (move) => move.row === row && move.col === col
      );

      if (isValidMove) {
        makeMove(position);
        return;
      }

      if (piece && piece.color === currentPlayerColor) {
        selectPiece(position);
        return;
      }

      selectPiece(position);
      return;
    }

    if (piece && piece.color === currentPlayerColor) {
      selectPiece(position);
    }
  };

  const isSquareSelected = (row: number, col: number) => {
    return selectedPiece?.row === row && selectedPiece?.col === col;
  };

  const isValidMoveSquare = (row: number, col: number) => {
    return validMoves.some((move) => move.row === row && move.col === col);
  };

  const getSquareColor = (row: number, col: number) => {
    if (isSquareSelected(row, col)) return "bg-yellow-400 dark:bg-yellow-600";

    if (isValidMoveSquare(row, col)) {
      const hasEnemyPiece = board[row][col] !== null;
      // Düşman taşı varsa kırmızımsı, yoksa yeşilimsi
      return hasEnemyPiece
        ? "bg-red-400/60 dark:bg-red-600/60"
        : "bg-green-400/60 dark:bg-green-600/60";
    }

    return (row + col) % 2 === 0 ? "bg-muted" : "bg-card";
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-6 items-start">
        {mode === "spectate" && (
          <div className="col-span-full flex items-center justify-end text-muted-foreground text-sm mb-2">
            <div className="flex items-center gap-1 bg-muted/40 px-3 py-1 rounded-full">
              <Eye className="w-4 h-4" />

              <span className="font-medium">1 izleyici</span>
            </div>
          </div>
        )}

        <Card className="order-2 lg:order-1">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="flex items-center justify-between text-sm sm:text-base gap-2">
              <span className="truncate">
                {table?.players.find((p) => p.color === "white")?.name ||
                  "PlayWhite"}
              </span>
              <Badge
                variant={currentTurn === "white" ? "default" : "outline"}
                className="shrink-0 text-xs sm:text-sm"
              >
                ⚪ Beyaz
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Alınan Taşlar:
              </p>
              <div className="flex flex-wrap gap-1 min-h-[32px] sm:min-h-[40px]">
                {capturedPieces.black.map((piece, i) => (
                  <span key={i} className="text-lg sm:text-xl lg:text-2xl">
                    {getPieceSymbol(piece)}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

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
                        disabled={!isMyTurn}
                        className={`
                          w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
                          flex items-center justify-center 
                          text-xl xs:text-2xl sm:text-3xl md:text-4xl
                          transition-all duration-200 relative
                          ${getSquareColor(rowIndex, colIndex)}
                          ${
                            isMyTurn
                              ? "hover:brightness-95 active:scale-95 cursor-pointer"
                              : "cursor-not-allowed opacity-60"
                          }
                          ${
                            isSquareSelected(rowIndex, colIndex)
                              ? "ring-2 sm:ring-4 ring-yellow-500"
                              : ""
                          }
                        `}
                      >
                        {piece && getPieceSymbol(piece)}
                        {isValidMoveSquare(rowIndex, colIndex) &&
                          !board[rowIndex][colIndex] && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-600 dark:bg-green-400" />
                            </div>
                          )}
                        {isValidMoveSquare(rowIndex, colIndex) &&
                          board[rowIndex][colIndex] && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-2 sm:border-3 md:border-4 border-red-600 dark:border-red-400" />
                            </div>
                          )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <Badge
              variant="outline"
              className="text-xs sm:text-sm md:text-base px-3 py-2 sm:px-4 sm:py-2 justify-center"
            >
              {isMyTurn
                ? "🎯 Sizin Sıranız!"
                : `Sıra: ${currentTurn === "white" ? "⚪ Beyaz" : "⚫ Siyah"}`}
            </Badge>

            {mode === "play" && (
              <>
                <Button
                  onClick={resetGame}
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Yeni Oyun
                </Button>
              </>
            )}
          </div>
        </div>

        <Card className="order-3">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="flex items-center justify-between text-sm sm:text-base gap-2">
              <span className="truncate">
                {table?.players.find((p) => p.color === "black")?.name ||
                  "PlayBlack"}
              </span>
              <Badge
                variant={currentTurn === "black" ? "default" : "outline"}
                className="shrink-0 text-xs sm:text-sm"
              >
                ⚫ Siyah
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Alınan Taşlar:
              </p>
              <div className="flex flex-wrap gap-1 min-h-[32px] sm:min-h-[40px]">
                {capturedPieces.white.map((piece, i) => (
                  <span key={i} className="text-lg sm:text-xl lg:text-2xl">
                    {getPieceSymbol(piece)}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChessBoardUI;
