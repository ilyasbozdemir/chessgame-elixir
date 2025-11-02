"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChessStore } from "@/lib/chess-store";
import ChessBoard from "@/components/chess-board";

interface PageClientProps {
  gameId: string;
}

export default function PageClient({ gameId }: PageClientProps) {
  const router = useRouter();

  return <ChessBoard mode="play" gameId={gameId} />;
}
