"use client";

import { GameControls } from "@/components/game/game-controls";
import { CapturedPieces } from "@/components/game/captured-pieces";
import { ChatBox } from "@/components/game/chat-box";
import { ChessBoard } from "@/components/game/chess-board";
import { EmojiReactions } from "@/components/game/emoji-reactions";
import { GameEndDialog } from "@/components/game/game-end-dialog";
import { MoveHistory } from "@/components/game/move-history";
import { PlayerCard } from "@/components/game/player-card";
import { VoiceChat } from "@/components/game/voice.chat";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CapturedPiecesDialog } from "@/components/game/captured-pieces-dialog";

interface PageClientProps {
  id: string;
}

type Move = {
  number: number;
  white: string;
  black?: string;
};

export default function PageClient({ id }: PageClientProps) {
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  const [moves, setMoves] = useState<Move[]>([
    { number: 1, white: "e4", black: "e5" },
    { number: 2, white: "Nf3", black: "Nc6" },
    { number: 3, white: "Bb5", black: "a6" },
  ]);

  const gameData = {
    id,
    player1: {
      name: "Magnus Carlsen",
      rating: 2850,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=magnus",
      time: 600, // saniye
      isActive: true,
    },
    player2: {
      name: "Hikaru Nakamura",
      rating: 2820,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hikaru",
      time: 580,
      isActive: false,
    },
  };

  const handleMove = (move: Move) => {
    setMoves([...moves, move]);
  };

  const handleNewMessage = () => {
    toast({
      title: "Yeni mesaj",
      description: "Rakibinizden yeni mesaj geldi",
      onClick: () => setIsChatOpen(true),
      className: "cursor-pointer",
    });
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col lg:flex-row gap-2 md:gap-4 p-2 md:p-4 overflow-hidden relative">
      <GameEndDialog
        isOpen={isGameEnded}
        onClose={() => setIsGameEnded(false)}
        winner={{
          name: gameData.player1.name,
          color: "white",
        }}
        totalMoves={moves.length}
        whiteTimeUsed={600 - gameData.player1.time}
        blackTimeUsed={600 - gameData.player2.time}
        reason="Şah mat"
      />

      {/*
     <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-50">
        <EmojiReactions />
        <ChatBox isOpen={isChatOpen} onToggle={setIsChatOpen} />
        <VoiceChat />
      </div>
  */}

      {/* Ana Oyun Alanı */}
      <div className="flex-1 flex flex-col gap-2 md:gap-4 max-w-4xl mx-auto w-full min-w-0">
        {/* Mobile View - Satranç Tahtası Odaklı */}
        <div className="lg:hidden flex flex-col h-full">
          {/* Üst Oyuncu - Kompakt */}
          <div className="flex-shrink-0 mb-2">
            <PlayerCard
              player={gameData.player2}
              position="top"
              className="p-2"
            />
          </div>

          {/* Satranç Tahtası - Tam Ekran */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <ChessBoard onMove={handleMove} />
          </div>

          {/* Alt Oyuncu - Kompakt */}
          <div className="flex-shrink-0 mt-2">
            <PlayerCard
              player={gameData.player1}
              position="bottom"
              className="p-2"
            />
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex flex-col gap-4 h-full">
          {/* Satranç Tahtası */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <ChessBoard onMove={handleMove} />
            <CapturedPiecesDialog />
          </div>
        </div>
      </div>

      {/* Sağ Panel - Desktop Only */}
      <div className="hidden lg:flex flex-col gap-4 w-80 flex-shrink-0">
        <PlayerCard player={gameData.player2} position="top" />
        <CapturedPieces />
        <MoveHistory moves={moves} className="flex-1 min-h-0" />
        <PlayerCard player={gameData.player1} position="bottom" />
        <GameControls />
      </div>
    </div>
  );
}
