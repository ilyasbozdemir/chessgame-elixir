import { useState } from "react";
import { cn } from "@/lib/utils";

type Move = {
  number: number;
  white: string;
  black?: string;
};

type ChessBoardProps = {
  onMove?: (move: Move) => void;
};

type Square = {
  piece: string | null;
  isLight: boolean;
  position: string;
};

const initialBoard = (): Square[][] => {
  const board: Square[][] = [];
  const pieces = {
    0: ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    1: Array(8).fill("♟"),
    6: Array(8).fill("♙"),
    7: ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  };

  for (let row = 0; row < 8; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      const isLight = (row + col) % 2 === 0;
      const position = `${String.fromCharCode(97 + col)}${8 - row}`;
      const piece = pieces[row as keyof typeof pieces]?.[col] || null;
      board[row][col] = { piece, isLight, position };
    }
  }
  return board;
};

const isPieceWhite = (piece: string | null) => {
  if (!piece) return null;
  return ['♙', '♖', '♘', '♗', '♕', '♔'].includes(piece);
};

export function ChessBoard({ onMove }: ChessBoardProps) {
  const [board, setBoard] = useState(initialBoard());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [currentTurn, setCurrentTurn] = useState<'white' | 'black'>('white');
  const [moveNumber, setMoveNumber] = useState(1);
  const [lastWhiteMove, setLastWhiteMove] = useState<string>("");

  const handleSquareClick = (square: Square, rowIndex: number, colIndex: number) => {
    // Eğer bir taş seçili değilse
    if (!selectedSquare) {
      // Sadece mevcut sıradaki oyuncunun taşını seçebilir
      if (square.piece) {
        const isWhite = isPieceWhite(square.piece);
        if ((currentTurn === 'white' && isWhite) || (currentTurn === 'black' && isWhite === false)) {
          setSelectedSquare(square.position);
        }
      }
    } else {
      // Taş seçiliyse, hamle yap
      const fromSquare = board.flat().find(s => s.position === selectedSquare);
      
      if (fromSquare && fromSquare.piece) {
        // Aynı kareye tıklandıysa seçimi iptal et
        if (selectedSquare === square.position) {
          setSelectedSquare(null);
          return;
        }

        // Hamleyi gerçekleştir
        const newBoard = board.map(row => row.map(sq => ({...sq})));
        const fromRow = board.findIndex(row => row.some(sq => sq.position === selectedSquare));
        const fromCol = board[fromRow].findIndex(sq => sq.position === selectedSquare);
        
        newBoard[rowIndex][colIndex].piece = fromSquare.piece;
        newBoard[fromRow][fromCol].piece = null;
        
        setBoard(newBoard);
        
        // Hamle notasyonunu oluştur (basit versiyon)
        const moveNotation = `${fromSquare.position}-${square.position}`;
        
        // Hamle geçmişine ekle
        if (currentTurn === 'white') {
          setLastWhiteMove(moveNotation);
        } else {
          // Siyah hamle yaptıysa, beyaz hamle ile birlikte kaydet
          if (onMove) {
            onMove({
              number: moveNumber,
              white: lastWhiteMove,
              black: moveNotation
            });
          }
          setMoveNumber(moveNumber + 1);
        }
        
        // Sıra değiştir
        setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
        setSelectedSquare(null);
      }
    }
  };

  return (
    <div className="relative w-full max-w-[min(95vw,90vh,600px)] aspect-square">
      <div className="w-full h-full rounded-md md:rounded-lg overflow-hidden shadow-2xl border-2 md:border-4 border-border">
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
          {board.map((row, rowIndex) =>
            row.map((square, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleSquareClick(square, rowIndex, colIndex)}
                className={cn(
                  "relative flex items-center justify-center text-3xl sm:text-4xl md:text-5xl transition-all active:scale-95 touch-manipulation",
                  "hover:brightness-110",
                  square.isLight ? "bg-board-light" : "bg-board-dark",
                  selectedSquare === square.position &&
                    "ring-2 md:ring-4 ring-board-highlight ring-inset"
                )}
              >
                {square.piece && (
                  <span className="drop-shadow-lg select-none pointer-events-none">
                    {square.piece}
                  </span>
                )}
                {/* Koordinatlar */}
                {colIndex === 0 && (
                  <span className="absolute left-0.5 md:left-1 top-0.5 md:top-1 text-[8px] md:text-[10px] font-semibold opacity-50">
                    {8 - rowIndex}
                  </span>
                )}
                {rowIndex === 7 && (
                  <span className="absolute right-0.5 md:right-1 bottom-0.5 md:bottom-1 text-[8px] md:text-[10px] font-semibold opacity-50">
                    {String.fromCharCode(97 + colIndex)}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
