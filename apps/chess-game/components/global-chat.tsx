"use client"

import { useState } from "react"
import { Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from "@/context/chat-context"
import { useUser } from "@/context/user-context"

export function GlobalChat() {
  const [message, setMessage] = useState("")
  const { messages, sendMessage } = useChat()
  const { user } = useUser()

  const handleSend = () => {
    if (message.trim() && user) {
      const senderName = user.user_metadata?.username || user.email?.split("@")[0] || "Anonim";
      sendMessage(message, senderName)
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 content-end">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-20">
              <MessageSquare className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-xs">Henüz mesaj yok.</p>
              <p className="text-[10px]">İlk mesajı sen gönder!</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-primary/90">
                  {msg.sender}
                </span>
                <span className="text-[10px] text-muted-foreground opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-foreground/90 bg-secondary/30 p-2 rounded-lg rounded-tl-none border border-border/50">
                {msg.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t bg-card/95 backdrop-blur">
        <div className="flex gap-2">
          <Input
            placeholder={user ? "Mesajınızı yazın..." : "Sohbet etmek için giriş yapın"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
            disabled={!user}
          />
          <Button size="icon" onClick={handleSend} disabled={!user}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
