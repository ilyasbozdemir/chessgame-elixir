import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type CapturedPiecesProps = {
  className?: string;
};

const mockCapturedPieces = {
  white: ["♟", "♟", "♞", "♝"],
  black: ["♙", "♙", "♙", "♘"],
};

export function CapturedPieces({ className }: CapturedPiecesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const calculateMaterial = (pieces: string[]) => {
    const values: Record<string, number> = {
      "♟": 1, "♙": 1,
      "♞": 3, "♘": 3,
      "♝": 3, "♗": 3,
      "♜": 5, "♖": 5,
      "♛": 9, "♕": 9,
    };
    return pieces.reduce((sum, piece) => sum + (values[piece] || 0), 0);
  };

  const whiteMaterial = calculateMaterial(mockCapturedPieces.white);
  const blackMaterial = calculateMaterial(mockCapturedPieces.black);
  const advantage = whiteMaterial - blackMaterial;

  return (
    <div className={cn("bg-card border border-border rounded-lg overflow-hidden", className)}>
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between p-3 h-auto hover:bg-muted/50"
      >
        <div className="flex items-center gap-3 flex-1">
          <span className="text-xs font-semibold text-muted-foreground">
            Alınan Taşlar
          </span>
          {!isExpanded && (
            <div className="flex items-center gap-1 text-lg">
              {mockCapturedPieces.white.slice(0, 3).map((piece, idx) => (
                <span key={`preview-white-${idx}`} className="opacity-70">
                  {piece}
                </span>
              ))}
              {mockCapturedPieces.white.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{mockCapturedPieces.white.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>

      {isExpanded && (
        <div className="p-3 pt-0 space-y-3 animate-accordion-down">
          {/* White's captured pieces */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Beyaz Aldı
              </span>
              {advantage > 0 && (
                <span className="text-xs font-bold text-primary">
                  +{advantage}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mockCapturedPieces.white.length > 0 ? (
                mockCapturedPieces.white.map((piece, idx) => (
                  <div
                    key={`white-${idx}`}
                    className="text-2xl bg-muted/50 rounded p-1 w-9 h-9 flex items-center justify-center"
                  >
                    {piece}
                  </div>
                ))
              ) : (
                <span className="text-xs text-muted-foreground italic">
                  Henüz yok
                </span>
              )}
            </div>
          </div>

          {/* Black's captured pieces */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Siyah Aldı
              </span>
              {advantage < 0 && (
                <span className="text-xs font-bold text-primary">
                  +{Math.abs(advantage)}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mockCapturedPieces.black.length > 0 ? (
                mockCapturedPieces.black.map((piece, idx) => (
                  <div
                    key={`black-${idx}`}
                    className="text-2xl bg-muted/50 rounded p-1 w-9 h-9 flex items-center justify-center"
                  >
                    {piece}
                  </div>
                ))
              ) : (
                <span className="text-xs text-muted-foreground italic">
                  Henüz yok
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
