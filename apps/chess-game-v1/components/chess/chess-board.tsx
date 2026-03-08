import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { ChessPiece, PieceType, PieceColor } from "./chess-piece";
import { PromotionModal } from "./promotion-modal";
import { cn } from "@/lib/utils";
import { isValidMove, isPawnPromotion, ChessPosition as ValidatorPosition } from "@/lib/chess-validation";

export type ChessTheme = 'classic' | 'modern' | 'emerald';
export type BoardOrientation = 'white' | 'black';
export type GameMode = 'random' | 'game' | 'puzzle';

interface ChessPosition {
  [square: string]: { type: PieceType; color: PieceColor } | null;
}

interface DragState {
  piece: { type: PieceType; color: PieceColor } | null;
  from: string | null;
}

interface ChessBoardProps {
  theme?: ChessTheme;
  orientation?: BoardOrientation;
  mode?: GameMode;
  initialPosition?: string; // FEN notation
  allowedPieces?: PieceType[]; // For puzzle mode
  onMove?: (from: string, to: string, piece: { type: PieceType; color: PieceColor }) => void;
  onPositionChange?: (fen: string) => void;
  onPieceDragStart?: (square: string, piece: { type: PieceType; color: PieceColor }) => void;
  onPieceDragEnd?: (from: string, to: string) => void;
  onSquareClick?: (square: string, piece: { type: PieceType; color: PieceColor } | null) => void;
  onInvalidMove?: (from: string, to: string, reason: string) => void;
  className?: string;
}

export interface ChessBoardRef {
  clearBoard: () => void;
  setStartPosition: () => void;
  setPosition: (fen: string) => void;
  getPosition: () => string;
}

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

const parseFEN = (fen: string): ChessPosition => {
  const position: ChessPosition = {};
  const rows = fen.split('/');
  
  rows.forEach((row, rankIndex) => {
    let fileIndex = 0;
    for (const char of row) {
      if (char >= '1' && char <= '8') {
        fileIndex += parseInt(char);
      } else {
        const file = String.fromCharCode(97 + fileIndex); // 'a' to 'h'
        const rank = (8 - rankIndex).toString();
        const square = file + rank;
        const color = char === char.toUpperCase() ? 'w' : 'b';
        const type = char.toLowerCase() as PieceType;
        position[square] = { type, color };
        fileIndex++;
      }
    }
  });
  
  return position;
};

export const ChessBoard = forwardRef<ChessBoardRef, ChessBoardProps>(({ 
  theme = 'classic', 
  orientation = 'white',
  mode = 'random',
  initialPosition = INITIAL_FEN,
  allowedPieces,
  onMove,
  onPositionChange,
  onPieceDragStart,
  onPieceDragEnd,
  onSquareClick,
  onInvalidMove,
  className 
}, ref) => {
  const [position, setPosition] = useState<ChessPosition>(() => parseFEN(initialPosition));
  const [dragState, setDragState] = useState<DragState>({ piece: null, from: null });
  const [highlightedSquares, setHighlightedSquares] = useState<string[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [promotionState, setPromotionState] = useState<{
    isOpen: boolean;
    from: string;
    to: string;
    color: PieceColor;
  } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const displayFiles = orientation === 'white' ? files : [...files].reverse();
  const displayRanks = orientation === 'white' ? ranks : [...ranks].reverse();

  const getSquareColor = (file: string, rank: string) => {
    const fileIndex = files.indexOf(file);
    const rankIndex = ranks.indexOf(rank);
    const isLight = (fileIndex + rankIndex) % 2 === 0;
    
    const themeColors = {
      classic: isLight ? 'bg-chess-light-classic' : 'bg-chess-dark-classic',
      modern: isLight ? 'bg-chess-light-modern' : 'bg-chess-dark-modern',
      emerald: isLight ? 'bg-chess-light-emerald' : 'bg-chess-dark-emerald',
    };
    
    return themeColors[theme];
  };

  const calculateValidMoves = (fromSquare: string): string[] => {
    if (mode !== 'game') return [];
    
    const piece = position[fromSquare];
    if (!piece) return [];

    const validSquares: string[] = [];

    for (const file of files) {
      for (const rank of ranks) {
        const toSquare = `${file}${rank}`;
        if (isValidMove(fromSquare, toSquare, position as ValidatorPosition, piece)) {
          validSquares.push(toSquare);
        }
      }
    }

    return validSquares;
  };

  const handleSquareClick = (square: string) => {
    const piece = position[square];
    
    // If there's a selected square and we click on a valid move
    if (selectedSquare && validMoves.includes(square)) {
      // Simulate drag and drop
      const selectedPiece = position[selectedSquare];
      if (selectedPiece) {
        setDragState({ piece: selectedPiece, from: selectedSquare });
        handleDrop(square);
      }
      setSelectedSquare(null);
      setValidMoves([]);
      return;
    }
    
    // If clicking on the same square, deselect
    if (selectedSquare === square) {
      setSelectedSquare(null);
      setValidMoves([]);
      return;
    }
    
    // If clicking on a piece in game mode, select it and show valid moves
    if (piece && mode === 'game') {
      setSelectedSquare(square);
      setValidMoves(calculateValidMoves(square));
    } else {
      setSelectedSquare(null);
      setValidMoves([]);
    }
    
    onSquareClick?.(square, piece);
  };

  const handleDragStart = (square: string) => {
    const piece = position[square];
    if (piece) {
      // Puzzle mode: only allow moving specific pieces
      if (mode === 'puzzle' && allowedPieces && !allowedPieces.includes(piece.type)) {
        onInvalidMove?.(square, square, 'This piece cannot be moved in puzzle mode');
        return;
      }
      
      setDragState({ piece, from: square });
      setHighlightedSquares([square]);
      onPieceDragStart?.(square, piece);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const completeMoveWithPromotion = (from: string, to: string, promotedPiece: PieceType) => {
    const newPosition = { ...position };
    const piece = dragState.piece!;
    newPosition[to] = { type: promotedPiece, color: piece.color };
    newPosition[from] = null;
    setPosition(newPosition);

    onMove?.(from, to, { type: promotedPiece, color: piece.color });
    onPieceDragEnd?.(from, to);

    setTimeout(() => {
      const newFEN = getPositionFEN();
      onPositionChange?.(newFEN);
    }, 0);

    setDragState({ piece: null, from: null });
    setHighlightedSquares([]);
  };

  const handleDrop = (toSquare: string) => {
    if (!dragState.from || dragState.from === toSquare) {
      setDragState({ piece: null, from: null });
      setHighlightedSquares([]);
      return;
    }

    const piece = dragState.piece!;

    // Game mode: validate moves
    if (mode === 'game') {
      const isValid = isValidMove(dragState.from, toSquare, position as ValidatorPosition, piece);
      if (!isValid) {
        onInvalidMove?.(dragState.from, toSquare, 'Invalid move according to chess rules');
        setDragState({ piece: null, from: null });
        setHighlightedSquares([]);
        return;
      }
    }

    // Check for pawn promotion
    if (isPawnPromotion(dragState.from, toSquare, piece)) {
      setPromotionState({
        isOpen: true,
        from: dragState.from,
        to: toSquare,
        color: piece.color
      });
      return;
    }

    // Normal move
    const newPosition = { ...position };
    newPosition[toSquare] = dragState.piece;
    newPosition[dragState.from] = null;
    setPosition(newPosition);
    
    onMove?.(dragState.from, toSquare, piece);
    onPieceDragEnd?.(dragState.from, toSquare);
    
    setTimeout(() => {
      const newFEN = getPositionFEN();
      onPositionChange?.(newFEN);
    }, 0);
    
    setDragState({ piece: null, from: null });
    setHighlightedSquares([]);
  };

  const handleTouchStart = (square: string) => {
    handleDragStart(square);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent, square: string) => {
    if (dragState.from) {
      handleDrop(square);
    }
  };

  const clearBoard = () => {
    setPosition({});
    onPositionChange?.('8/8/8/8/8/8/8/8');
  };

  const setStartPosition = () => {
    setPosition(parseFEN(INITIAL_FEN));
    onPositionChange?.(INITIAL_FEN);
  };

  const setPositionFromFEN = (fen: string) => {
    setPosition(parseFEN(fen));
    onPositionChange?.(fen);
  };

  const getPositionFEN = (): string => {
    let fen = '';
    for (let rank = 8; rank >= 1; rank--) {
      let emptyCount = 0;
      for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
        const file = files[fileIndex];
        const square = file + rank;
        const piece = position[square];
        
        if (piece) {
          if (emptyCount > 0) {
            fen += emptyCount;
            emptyCount = 0;
          }
          const char = piece.type.toUpperCase();
          fen += piece.color === 'w' ? char : char.toLowerCase();
        } else {
          emptyCount++;
        }
      }
      if (emptyCount > 0) fen += emptyCount;
      if (rank > 1) fen += '/';
    }
    return fen;
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    clearBoard,
    setStartPosition,
    setPosition: setPositionFromFEN,
    getPosition: getPositionFEN,
  }));

  return (
    <>
      <PromotionModal
        isOpen={promotionState?.isOpen || false}
        color={promotionState?.color || 'w'}
        onSelect={(pieceType) => {
          if (promotionState) {
            completeMoveWithPromotion(promotionState.from, promotionState.to, pieceType);
            setPromotionState(null);
          }
        }}
        onCancel={() => {
          setPromotionState(null);
          setDragState({ piece: null, from: null });
          setHighlightedSquares([]);
        }}
      />
      <div ref={boardRef} className={cn("inline-block", className)}>
      <div className="grid grid-cols-8 gap-0 border-4 border-primary rounded-lg overflow-hidden shadow-2xl">
        {displayRanks.map((rank) =>
          displayFiles.map((file) => {
            const square = file + rank;
            const piece = position[square];
            const isHighlighted = highlightedSquares.includes(square);
            const isSelected = selectedSquare === square;
            const isValidMoveSquare = validMoves.includes(square);
            
              return (
              <div
                key={square}
                className={cn(
                  "aspect-square relative",
                  getSquareColor(file, rank),
                  "transition-all duration-200",
                  isHighlighted && "ring-4 ring-accent ring-inset",
                  isSelected && "ring-4 ring-blue-500 ring-inset",
                  "hover:brightness-95 cursor-pointer"
                )}
                onClick={() => handleSquareClick(square)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(square)}
                onTouchEnd={(e) => handleTouchEnd(e, square)}
              >
                {/* Valid move indicator */}
                {isValidMoveSquare && (
                  <div className={cn(
                    "absolute z-10 rounded-full pointer-events-none",
                    piece 
                      ? "inset-0 border-4 border-green-500/70" 
                      : "inset-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500/60"
                  )} />
                )}
                {/* Coordinate labels */}
                {file === displayFiles[0] && (
                  <span className="absolute top-1 left-1 text-xs font-semibold opacity-50">
                    {rank}
                  </span>
                )}
                {rank === displayRanks[displayRanks.length - 1] && (
                  <span className="absolute bottom-1 right-1 text-xs font-semibold opacity-50">
                    {file}
                  </span>
                )}
                
                {/* Chess piece */}
                {piece && (
                  <div
                    draggable
                    onDragStart={() => handleDragStart(square)}
                    onTouchStart={() => handleTouchStart(square)}
                    onTouchMove={handleTouchMove}
                    className="w-full h-full"
                  >
                    <ChessPiece
                      type={piece.type}
                      color={piece.color}
                      isDragging={dragState.from === square}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
    </>
  );
});

ChessBoard.displayName = "ChessBoard";
