import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Emoji = {
  emoji: string;
  label: string;
};

const quickEmojis: Emoji[] = [
  { emoji: "👍", label: "Güzel hamle" },
  { emoji: "🤔", label: "Düşünüyorum" },
  { emoji: "😮", label: "Şaşırdım" },
  { emoji: "🎉", label: "Harika" },
  { emoji: "😅", label: "Ups" },
  { emoji: "🔥", label: "Ateşli oyun" },
  { emoji: "⚡", label: "Hızlı hamle" },
  { emoji: "🎯", label: "Hedef kilitli" },
  { emoji: "💪", label: "Güçlü" },
  { emoji: "🧠", label: "Zeki hamle" },
  { emoji: "⭐", label: "Mükemmel" },
  { emoji: "👏", label: "Tebrikler" },
];

type FloatingEmoji = {
  id: string;
  emoji: string;
  x: number;
  y: number;
};

type EmojiReactionsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EmojiReactionsDialog({ open, onOpenChange }: EmojiReactionsDialogProps) {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  const handleEmojiClick = (emoji: string) => {
    const id = Date.now().toString();
    const x = Math.random() * 60 + 20;
    const y = Math.random() * 40 + 30;

    const newEmoji: FloatingEmoji = { id, emoji, x, y };
    setFloatingEmojis((prev) => [...prev, newEmoji]);

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 3000);

    onOpenChange(false);
  };

  return (
    <>
      {/* Floating Emojis */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {floatingEmojis.map((item) => (
          <div
            key={item.id}
            className="absolute text-4xl md:text-6xl animate-float-up"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animation: "float-up 3s ease-out forwards",
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hızlı Tepki Gönder</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-4 gap-3 py-4">
            {quickEmojis.map((item) => (
              <button
                key={item.emoji}
                onClick={() => handleEmojiClick(item.emoji)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors active:scale-95"
                title={item.label}
              >
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-[10px] text-muted-foreground text-center leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-100px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px) scale(0.8);
          }
        }
      `}</style>
    </>
  );
}
