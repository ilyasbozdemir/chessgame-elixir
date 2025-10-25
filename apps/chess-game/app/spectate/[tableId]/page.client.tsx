"use client"

import ChessBoard from "@/components/chess-board"

interface PageClientProps {
  tableId: string
}

export default function PageClient({ tableId }: PageClientProps) {
  return <ChessBoard mode="spectate" tableId={tableId} />
}
