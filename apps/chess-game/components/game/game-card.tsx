import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User } from "lucide-react";

interface GameCardProps {
  opponent: string;
  timeControl: string;
  myTurn?: boolean;
  rating?: number;
}

export const GameCard = ({ opponent, timeControl, myTurn, rating }: GameCardProps) => {
  return (
    <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-muted rounded-full flex items-center justify-center">
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div>
              <div className="font-medium text-sm md:text-base">{opponent}</div>
              <div className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timeControl}
                {rating && <span className="ml-1 md:ml-2">({rating})</span>}
              </div>
            </div>
          </div>
          {myTurn && (
            <Button variant="default" size="sm" className="text-xs md:text-sm">
              Oyna
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
