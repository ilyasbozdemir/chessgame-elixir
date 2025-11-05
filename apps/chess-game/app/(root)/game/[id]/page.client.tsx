"use client";

import { useRouter } from "next/navigation";
import ChessBoard from "@/components/chess-board";

interface PageClientProps {
  id: string;
}

export default function PageClient({ id }: PageClientProps) {
  return <ChessBoard mode="play" gameId={id} />;
}
