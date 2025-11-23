"use client";

import { ChessBoard } from "@/components/chess/chess-board";
import { GameEndDialog } from "@/components/game/game-end-dialog";
import { MoveHistory } from "@/components/game/move-history";
import { PlayerCard } from "@/components/game/player-card";
import { PlayerCard2 } from "@/components/game/player-card-2";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { GameService } from "@/services/game.service";
import { GameControls2 } from "@/components/game/game-controls-2";
import { getAvatarUrl } from "@/lib/utils";

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

  const [winnerPlayer, setWinnerPlayer] = useState<any>({
    name: "Rakip",
    color: "black",
  });
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");
  const [moves, setMoves] = useState<Move[]>([
    { number: 1, white: "e4", black: "e5" },
    { number: 2, white: "Nf3", black: "Nc6" },
    { number: 3, white: "Bb5", black: "a6" },
  ]);

  const [capturedPieces, setCapturedPieces] = useState<{
    white: string[];
    black: string[];
  }>({ white: [], black: [] });

  const [whiteTimeLeft, setWhiteTimeLeft] = useState(600);
  const [blackTimeLeft, setBlackTimeLeft] = useState(600);

  const handleMove = (
    from: string,
    to: string,
    piece: { type: string; color: string }
  ) => {
    //
  };

  useEffect(() => {
    if (!id) return;

    const fetchGame = async () => {
      setLoading(true);
      setError(null);

      try {
        const gameService = new GameService();
        const res = await gameService.getById(id);
        console.log("Fetched game:", res);

        if (res && res.ok && res.game) {
          setGame(res.game);
        } else {
          setGame(null);
          setCurrentTurn(game.currentTurn);
          setError(res?.error || "Game not found");
        }
      } catch (err: any) {
        setGame(null);
        setError(err.message || "Error fetching game");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) {
    return (
      <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  const whiteTimeUsed =
    game.whiteTimeMs != null
      ? Date.parse(game.startedAt) - game.whiteTimeMs
      : 0;

  const blackTimeUsed =
    game.blackTimeMs != null
      ? Date.parse(game.startedAt) - game.blackTimeMs
      : 0;

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col lg:flex-row gap-2 md:gap-4 p-2 md:p-4 overflow-hidden relative">
      {/* Ana Oyun Alanı */}
      <div className="flex-1 flex flex-col gap-2 md:gap-4 max-w-4xl mx-auto w-full min-w-0">
        {/* Mobile View - Satranç Tahtası Odaklı */}
        <div className="lg:hidden flex flex-col h-full">
          {/* Üst Oyuncu - Kompakt */}
          <div className="mb-4">
            <PlayerCard2
              name="Rakip"
              rating={1500}
              capturedPieces={capturedPieces.black}
              isCurrentTurn={currentTurn === game.currentTurn}
              isTop
              timeLeft={blackTimeLeft}
            />
          </div>

          {/* Satranç Tahtası - Tam Ekran */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="w-full max-w-[min(600px,100vh)] aspect-square mx-auto">
              <ChessBoard mode="game" onMove={handleMove} />
            </div>
          </div>

          <div className="mt-2">
            <GameControls2 />
          </div>
        </div>

        {/* Masaüstü Görünüm */}
        <div className="hidden lg:flex flex-col items-center gap-4 w-full max-w-[900px] mx-auto">
          <GameControls2 />

          <PlayerCard
            player={{
              name: game.black.name,
              rating: 1500,
              avatar: getAvatarUrl(game.black.name),
              time: blackTimeLeft,
              isActive: currentTurn === "black",
            }}
            position="top"
          />

          <div className="w-full flex justify-center">
            <div className="w-full max-w-[600px] aspect-square">
              <ChessBoard mode="game" onMove={handleMove} />
            </div>
          </div>

          <PlayerCard
            player={{
              name: game.white.name,
              rating: 1500,
              avatar: getAvatarUrl(game.white.name),
              time: whiteTimeLeft,
              isActive: currentTurn === "white",
            }}
            position="bottom"
          />
        </div>
      </div>

      <GameEndDialog
        isOpen={isGameEnded}
        onClose={() => setIsGameEnded(false)}
        winner={{
          name: winnerPlayer.name,
          color: winnerPlayer.color,
        }}
        totalMoves={moves.length}
        whiteTimeUsed={whiteTimeUsed}
        blackTimeUsed={blackTimeUsed}
        reason="Şah mat"
      />
    </div>
  );
}
