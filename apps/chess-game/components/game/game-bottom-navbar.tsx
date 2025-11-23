import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Smile, Settings, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MoveHistoryDrawer } from "./move-history-drawer";
import { ChessPiece, PieceType, Position } from "@/game/chess-types";
import { ChatDialog } from "./chat-dialog";
import { VoiceChatDialog } from "./voice-chat-dialog";
import { EmojiReactionsDialog } from "./emoji-reactions-dialog";
import { SettingsDialog } from "./settings-dialog";
import { GameMenuDrawer } from "./game-menu-drawer";

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

type BottomNavBarProps = {
  boardRotated: boolean;
  onToggleBoardRotation: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  moveHistory: Move[];
  onNewGame?: () => void;
  currentPlayer: {
    name: string;
    avatar?: string;
    rating?: number;
    capturedPieces: string[];
    timeLeft?: number;
  };
  opponent: {
    name: string;
    avatar?: string;
    rating?: number;
    capturedPieces: string[];
    timeLeft?: number;
  };
};

export function BottomNavBar({
  boardRotated,
  onToggleBoardRotation,
  soundEnabled,
  onToggleSound,
  notificationsEnabled,
  onToggleNotifications,
  moveHistory,
  onNewGame,
  currentPlayer,
  opponent,
}: BottomNavBarProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const formatTime = (seconds?: number) => {
    if (seconds === undefined) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-card to-card/95 backdrop-blur-md border-t border-border/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-2 py-2">
          {/* Player Info Bar */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-border/50 px-2">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{currentPlayer.name}</span>
                {currentPlayer.rating && (
                  <Badge variant="secondary" className="text-xs">
                    {currentPlayer.rating}
                  </Badge>
                )}
              </div>
              
              {/* Captured Pieces */}
              <div className="flex flex-wrap gap-0.5">
                {currentPlayer.capturedPieces.map((piece, i) => (
                  <span key={i} className="text-base leading-none">
                    {piece}
                  </span>
                ))}
              </div>
            </div>
            
            {currentPlayer.timeLeft !== undefined && (
              <div className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-sm font-semibold",
                currentPlayer.timeLeft < 60 
                  ? "bg-destructive/20 text-destructive animate-pulse" 
                  : "bg-muted text-foreground"
              )}>
                <Clock className="w-3.5 h-3.5" />
                {formatTime(currentPlayer.timeLeft)}
              </div>
            )}
          </div>

          <div className="flex items-center justify-around">
            {/* Chat Button */}
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setChatOpen(true)}
              className={cn(
                "flex-col h-auto py-2 px-3 relative rounded-xl transition-all hover:bg-primary/10",
                chatOpen && "bg-primary/10"
              )}
            >
              <MessageCircle className="h-5 w-5 mb-1" />
              <span className="text-[10px] font-medium">Sohbet</span>
              {unreadCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-[10px] animate-pulse"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>

            {/* Voice Chat Button */}
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setVoiceOpen(true)}
              className={cn(
                "flex-col h-auto py-2 px-3 rounded-xl transition-all hover:bg-primary/10",
                voiceOpen && "bg-primary/10"
              )}
            >
              <Phone className="h-5 w-5 mb-1" />
              <span className="text-[10px] font-medium">Sesli</span>
            </Button>

            {/* Emoji Button */}
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setEmojiOpen(true)}
              className={cn(
                "flex-col h-auto py-2 px-3 rounded-xl transition-all hover:bg-primary/10",
                emojiOpen && "bg-primary/10"
              )}
            >
              <Smile className="h-5 w-5 mb-1" />
              <span className="text-[10px] font-medium">Tepki</span>
            </Button>

            {/* Game Menu Drawer */}
            <GameMenuDrawer
              open={menuOpen}
              onOpenChange={setMenuOpen}
              moveHistory={moveHistory}
              boardRotated={boardRotated}
              onToggleBoardRotation={onToggleBoardRotation}
              soundEnabled={soundEnabled}
              onToggleSound={onToggleSound}
              notificationsEnabled={notificationsEnabled}
              onToggleNotifications={onToggleNotifications}
              onNewGame={onNewGame}
            />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ChatDialog 
        open={chatOpen} 
        onOpenChange={setChatOpen}
        onUnreadCountChange={setUnreadCount}
      />
      <VoiceChatDialog open={voiceOpen} onOpenChange={setVoiceOpen} />
      <EmojiReactionsDialog open={emojiOpen} onOpenChange={setEmojiOpen} />
    </>
  );
}
