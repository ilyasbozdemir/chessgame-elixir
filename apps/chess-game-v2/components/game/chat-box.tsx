import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  sender: "me" | "opponent";
  text: string;
  timestamp: Date;
};

type ChatBoxProps = {
  className?: string;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
};

export function ChatBox({ className, isOpen: controlledIsOpen, onToggle }: ChatBoxProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "opponent",
      text: "İyi oyunlar!",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [lastSeenMessageId, setLastSeenMessageId] = useState("1");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Okunmamış mesaj sayısını hesapla
  const unreadCount = messages.filter(
    (m) => m.sender === "opponent" && m.id > lastSeenMessageId
  ).length;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Sohbet açıldığında tüm mesajları okundu say
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      setLastSeenMessageId(messages[messages.length - 1].id);
    }
  }, [isOpen, messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: inputText,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleToggle = () => {
    const newState = !isOpen;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggle}
        className={cn("h-12 w-12 rounded-full shadow-lg z-50 relative", className)}
      >
        <MessageCircle className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <div className={cn(
      "fixed left-4 bottom-4 md:left-6 md:bottom-6 w-[calc(100vw-2rem)] md:w-80 bg-card border border-border rounded-lg shadow-2xl z-50 flex flex-col",
      "max-w-sm",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">Sohbet</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3 h-60 md:h-80" ref={scrollRef}>
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "me" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                  message.sender === "me"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="break-words">{message.text}</p>
                <span className="text-[10px] opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t border-border flex gap-2">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Mesaj yaz..."
          className="flex-1 text-sm"
        />
        <Button size="icon" onClick={handleSend} disabled={!inputText.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
