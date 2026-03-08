"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockMessages = [
  {
    id: 1,
    user: "ChessMaster",
    message: "Bu turnuva için hazırlıklı mısınız?",
    time: "14:32",
    avatar: "CM",
  },
  {
    id: 2,
    user: "QueenGambit",
    message: "Evet! Sicilian Defence üzerinde çalışıyorum",
    time: "14:33",
    avatar: "QG",
  },
  {
    id: 3,
    user: "RookPlayer",
    message: "Kimse Caro-Kann için ipucu var mı?",
    time: "14:35",
    avatar: "RP",
  },
  {
    id: 4,
    user: "KnightRider",
    message: "Advance Variation çok güçlü, deneyin!",
    time: "14:37",
    avatar: "KR",
  },
]

export function GlobalChat() {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Global Sohbet</h3>
        <p className="text-xs text-muted-foreground">1,247 kişi çevrimiçi</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {mockMessages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="bg-primary/20 text-primary text-xs">{msg.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-sm">{msg.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Mesajınızı yazın..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
