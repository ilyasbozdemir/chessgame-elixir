import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PieceType, PieceColor, ChessPiece } from "./chess-piece";
import { cn } from "@/lib/utils";

interface PromotionModalProps {
  isOpen: boolean;
  color: PieceColor;
  onSelect: (pieceType: PieceType) => void;
  onCancel: () => void;
}

export const PromotionModal = ({ isOpen, color, onSelect, onCancel }: PromotionModalProps) => {
  const promotionPieces: PieceType[] = ['q', 'r', 'b', 'n'];
  const pieceNames: Record<PieceType, string> = {
    'q': 'Queen',
    'r': 'Rook',
    'b': 'Bishop',
    'n': 'Knight',
    'p': 'Pawn',
    'k': 'King'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Promote Pawn</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          {promotionPieces.map((pieceType) => (
            <button
              key={pieceType}
              onClick={() => onSelect(pieceType)}
              className={cn(
                "aspect-square rounded-lg border-2 hover:border-primary transition-all",
                "hover:scale-105 active:scale-95",
                "bg-card hover:bg-accent/10 flex flex-col items-center justify-center gap-2"
              )}
            >
              <div className="w-16 h-16">
                <ChessPiece type={pieceType} color={color} />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {pieceNames[pieceType]}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
