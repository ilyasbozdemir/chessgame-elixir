"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import { formatTime } from "@/lib/utils";
import type { TableDoc } from "@/models/table";

interface TableCardProps {
  table: TableDoc;
  label: string;
  disabled: boolean;
  action: () => void;
  showDelete?: React.ReactNode; 
}

export function TableCard({ table, label, disabled, action, showDelete }: TableCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative overflow-hidden">
      <div className="absolute top-2 right-2 text-4xl opacity-10 pointer-events-none">
        {table.status === "waiting" ? "♙" : table.status === "playing" ? "♚" : "♛"}
      </div>

      <CardContent className="p-5 space-y-4 relative z-10">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="font-bold text-lg text-foreground truncate" title={table.name}>
              {table.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{formatTime(table.createdAt)}</span>
            </div>
            {table.ownerName && (
              <p className="text-xs text-muted-foreground">
                Sahibi: {table.ownerName}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant="default"
              className={
                table.status === "playing"
                  ? "bg-chart-1/20 text-chart-1"
                  : "bg-chart-2 text-chart-2-foreground"
              }
            >
              {table.status === "playing" ? "Oyunda" : "Bekliyor"}
            </Badge>

            {showDelete}
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/50">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">
            {(table.players?.length ?? 0)}/ 2 Oyuncu
          </span>
        </div>

        {(table.players?.length ?? 0) > 0 && (
          <div className="flex gap-2 flex-wrap">
            {table.players?.map((player, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {player.name}
              </Badge>
            ))}
          </div>
        )}

        <Button onClick={action} disabled={disabled} className="w-full" size="lg">
          {label}
        </Button>
      </CardContent>
    </Card>
  );
}
