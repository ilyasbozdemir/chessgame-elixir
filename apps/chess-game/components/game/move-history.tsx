import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Move = {
  number: number;
  white: string;
  black?: string;
};

type MoveHistoryProps = {
  moves: Move[];
  className?: string;
};

export function MoveHistory({ moves, className }: MoveHistoryProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg overflow-hidden flex flex-col", className)}>
      <div className="p-2 md:p-3 border-b border-border flex-shrink-0">
        <h3 className="font-semibold text-sm md:text-base">Hamle Geçmişi</h3>
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-2 md:p-3 space-y-1">
          {moves.map((move) => (
            <div
              key={move.number}
              className="grid grid-cols-[1.5rem_1fr_1fr] md:grid-cols-[2rem_1fr_1fr] gap-1 md:gap-2 text-xs md:text-sm hover:bg-muted/50 rounded px-1.5 md:px-2 py-1 transition-colors"
            >
              <span className="text-muted-foreground font-mono">
                {move.number}.
              </span>
              <span className="font-medium">{move.white}</span>
              <span className="font-medium">{move.black || "..."}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
