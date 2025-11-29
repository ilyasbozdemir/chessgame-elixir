import { cn } from "@/lib/utils"

export type PieceType = "p" | "n" | "b" | "r" | "q" | "k"
export type PieceColor = "w" | "b"

interface ChessPieceProps {
  type: PieceType
  color: PieceColor
  isDragging?: boolean
  className?: string
}

const pieceSymbols = {
  w: {
    k: "♔",
    q: "♕",
    r: "♖",
    b: "♗",
    n: "♘",
    p: "♙",
  },
  b: {
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟",
  },
}

export const ChessPiece = ({ type, color, isDragging, className }: ChessPieceProps) => {
  const symbol = pieceSymbols[color][type]

  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full cursor-grab active:cursor-grabbing",
        "transition-all duration-200",
        isDragging && "opacity-50 scale-110",
        className,
      )}
    >
      <span
        className={cn(
          "text-5xl md:text-6xl lg:text-7xl leading-none",
          color === "w" ? "text-chess-piece-white" : "text-chess-piece-black",
          "drop-shadow-md select-none",
        )}
      >
        {symbol}
      </span>
    </div>
  )
}
