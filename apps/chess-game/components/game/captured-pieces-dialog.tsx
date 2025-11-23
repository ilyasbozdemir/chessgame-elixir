"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CapturedPieces } from "./captured-pieces";

export function CapturedPiecesDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Mobilde gösterilecek buton */}
      <DialogTrigger asChild>
        <Button className="lg:hidden w-full">Alınan Taşlar</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md w-full">
        <CapturedPieces />
      </DialogContent>
    </Dialog>
  );
}
