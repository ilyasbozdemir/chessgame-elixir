"use client"

import ChessBoard from "@/components/chess-board"

interface PageClientProps {
  gameId: string
}

export default function PageClient({ gameId }: PageClientProps) {
  return <ChessBoard mode="spectate" gameId={gameId} />
}
