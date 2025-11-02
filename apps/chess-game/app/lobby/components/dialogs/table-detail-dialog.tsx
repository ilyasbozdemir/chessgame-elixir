"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Crown } from "lucide-react";
import { formatTime } from "@/lib/utils";
import type { TableDoc } from "@/models/table";

interface TableDetailDialogProps {
  table: TableDoc;
  trigger?: React.ReactNode;
  onJoin?: (id: string) => void;
  onWatch?: (id: string) => void;
}

export function TableDetailDialog({
  table,
  trigger,
  onJoin,
  onWatch,
}: TableDetailDialogProps) {
  const players = table.players ?? [];

  const handleJoin = () => onJoin?.(table._id!.toString());
  const handleWatch = () => onWatch?.(table._id!.toString());

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{table.name}</DialogTitle>
          <DialogDescription>
            {formatTime(table.createdAt)} - {players.length}/2 oyuncu
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {formatTime(table.createdAt)}
          </div>

          {table.ownerName && (
            <div className="flex items-center gap-2 text-sm">
              <Crown className="w-4 h-4 text-primary" />
              Sahibi: {table.ownerName}
            </div>
          )}

          <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/50">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold">
              {players.length}/2 Oyuncu
            </span>
          </div>

          {players.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {players.map((p, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {p.name}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2 pt-4">
            {table.status === "playing" ? (
              <Button onClick={handleWatch} className="w-full">
                Oyunu İzle
              </Button>
            ) : (
              <Button onClick={handleJoin} className="w-full">
                Masaya Katıl
              </Button>
            )}

            <Button variant="outline" className="w-full" asChild>
              <DialogTrigger>Kapat</DialogTrigger>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
