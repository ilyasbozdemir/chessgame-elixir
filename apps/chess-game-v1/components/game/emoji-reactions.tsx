import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile } from "lucide-react";
import { cn } from "@/lib/utils";

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
];

type FloatingEmoji = {
  id: string;
  emoji: string;
  x: number;
  y: number;
};

type EmojiReactionsProps = {
  className?: string;
};

export function EmojiReactions({ className }: EmojiReactionsProps) {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  const handleEmojiClick = (emoji: string) => {
    const id = Date.now().toString();
    const x = Math.random() * 60 + 20; // 20-80%
    const y = Math.random() * 40 + 30; // 30-70%

    const newEmoji: FloatingEmoji = { id, emoji, x, y };
    setFloatingEmojis((prev) => [...prev, newEmoji]);

    // Remove after animation
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 3000);
  };

  return (
    <>
      {/* Floating Emojis Overlay */}
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

      {/* Emoji Picker Button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn("h-10 w-10 rounded-full", className)}
          >
            <Smile className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="end">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground mb-3">
              Hızlı Tepki
            </p>
            <div className="grid grid-cols-4 gap-2">
              {quickEmojis.map((item) => (
                <button
                  key={item.emoji}
                  onClick={() => handleEmojiClick(item.emoji)}
                  className="text-3xl hover:scale-125 transition-transform active:scale-110 p-2 rounded-lg hover:bg-muted"
                  title={item.label}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

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
