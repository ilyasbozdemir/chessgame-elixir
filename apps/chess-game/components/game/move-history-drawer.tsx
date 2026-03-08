import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";
import { ChessPiece, PieceType, Position } from "@/game/chess-types";


export interface Move {
  from: Position;
  to: Position;
  piece: ChessPiece;
  captured?: ChessPiece;
  notation: string;
  isCastling?: boolean;
  isPromotion?: boolean;
  promotedTo?: PieceType;
}

type MoveHistoryDrawerProps = {
  moveHistory: Move[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function MoveHistoryDrawer({ 
  moveHistory, 
  open, 
  onOpenChange 
}: MoveHistoryDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="lg" className="flex-col h-auto py-2 px-3 md:px-4">
          <History className="h-5 w-5 mb-1" />
          <span className="text-xs">Hamle</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Hamle Geçmişi</SheetTitle>
          <SheetDescription>
            {moveHistory.length > 0
              ? `${Math.ceil(moveHistory.length / 2)} hamle yapıldı`
              : "Henüz hamle yapılmadı"}
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-3">
          {moveHistory.length > 0 ? (
            <div className="space-y-2">
              {moveHistory.map((move, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-muted-foreground min-w-[30px]">
                    {Math.floor(index / 2) + 1}.
                  </span>
                  <span className={index % 2 === 0 ? 'font-semibold' : ''}>
                    {move.notation}
                  </span>
                  {move.captured && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      Alınan taş
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <History className="h-8 w-8 mb-2" />
              <p className="text-sm">Hamle geçmişi boş</p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
