import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  sender: "me" | "opponent";
  text: string;
  timestamp: Date;
};

type ChatDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUnreadCountChange?: (count: number) => void;
};

export function ChatDialog({ open, onOpenChange, onUnreadCountChange }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "opponent",
      text: "İyi oyunlar!",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [lastSeenMessageId, setLastSeenMessageId] = useState("0");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && messages.length > 0) {
      setLastSeenMessageId(messages[messages.length - 1].id);
      onUnreadCountChange?.(0);
    }
  }, [open, messages, onUnreadCountChange]);

  useEffect(() => {
    const unreadCount = messages.filter(
      (m) => m.sender === "opponent" && m.id > lastSeenMessageId
    ).length;
    onUnreadCountChange?.(unreadCount);
  }, [messages, lastSeenMessageId, onUnreadCountChange]);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sohbet</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] pr-3" ref={scrollRef}>
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

        <div className="flex gap-2 pt-3 border-t">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesaj yaz..."
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!inputText.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
