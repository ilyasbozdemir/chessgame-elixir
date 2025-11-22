"use client";

import { useRouter } from "next/navigation";
import ChessBoardUI from "@/components/chess-board";

interface PageClientProps {
  id: string;
}

export default function PageClient({ id }: PageClientProps) {
  return <ChessBoardUI mode="play" gameId={id} />;
}
