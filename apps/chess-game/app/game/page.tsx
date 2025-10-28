"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChessStore } from "@/lib/chess-store";
import ChessBoard from "@/components/chess-board";

export default function GamePage() {
  const router = useRouter();
  const { gameState, currentTable } = useChessStore();

  useEffect(() => {
    if (!currentTable || gameState.gameStatus !== "playing") {
      //router.replace("/lobby");
    }
  }, [currentTable, gameState.gameStatus, router]);

  // render guard
  if (!currentTable || gameState.gameStatus !== "playing") {
    return null; 
  }

  return <ChessBoard mode="play" />;
}
