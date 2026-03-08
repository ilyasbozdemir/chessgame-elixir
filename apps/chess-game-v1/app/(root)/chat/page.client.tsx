"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Search,
  ImageIcon,
  File,
  Check,
  CheckCheck,
  Loader2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const emojis = [
  "😀",
  "😂",
  "😍",
  "😎",
  "🤔",
  "👍",
  "👎",
  "❤️",
  "🎉",
  "🔥",
  "⚡",
  "🏆",
  "♟️",
  "👑",
  "🎯",
  "💪",
];

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  mine: boolean;
  status?: "sending" | "sent" | "delivered" | "read" | "failed";
  attachment?: { type: "image" | "file"; name: string; url: string };
};

export type Conversation = {
  id: number;
  username: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
};

const mockConversations2: Conversation[] = [
  {
    id: 1,
    username: "ChessMaster",
    lastMessage: "Harika oyundu!",
    timestamp: "10:30",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    username: "TurkeyKnight",
    lastMessage: "Yarın oynar mıyız?",
    timestamp: "09:15",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    username: "IstanbulPro",
    lastMessage: "Teşekkürler!",
    timestamp: "Dün",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    username: "AnkaraChess",
    lastMessage: "Turnuvada görüşürüz",
    timestamp: "Dün",
    unread: 1,
    online: false,
  },
];


const mockConversations: Conversation[] = []



const mockMessages: Message[] = [
  {
    id: 1,
    sender: "ChessMaster",
    content: "Merhaba! Nasılsın?",
    timestamp: "10:25",
    mine: false,
    status: "read",
  },
  {
    id: 2,
    sender: "me",
    content: "İyiyim, sen nasılsın?",
    timestamp: "10:26",
    mine: true,
    status: "read",
  },
  {
    id: 3,
    sender: "ChessMaster",
    content: "Ben de iyiyim. Bugün oyun oynamaya var mısın?",
    timestamp: "10:27",
    mine: false,
    status: "read",
  },
  {
    id: 4,
    sender: "me",
    content: "Evet olur! Saat 8'de müsaitim.",
    timestamp: "10:28",
    mine: true,
    status: "delivered",
  },
  {
    id: 5,
    sender: "ChessMaster",
    content: "Harika oyundu!",
    timestamp: "10:30",
    mine: false,
    status: "delivered",
  },
  {
    id: 6,
    sender: "me",
    content: "Mesaj gitmedi sanırım 😕",
    timestamp: "10:31",
    mine: true,
    status: "failed",
  },
  {
    id: 7,
    sender: "me",
    content: "Mesaj gönderiliyor...",
    timestamp: "10:32",
    mine: true,
    status: "sending",
  },
  {
    id: 8,
    sender: "me",
    content: "Tamamdır, haber verirsin.",
    timestamp: "10:33",
    mine: true,
    status: "sent",
  },
  {
    id: 9,
    sender: "ChessMaster",
    content: "Bu arada şu görsele bak!",
    timestamp: "10:34",
    mine: false,
    status: "delivered",
    attachment: {
      type: "image",
      name: "chess-board.png",
      url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Modern_Fianchetto_Setup._Chess_game_Staunton_No._6.jpg",
    },
  },
  {
    id: 10,
    sender: "me",
    content: "Güzelmiş 😂",
    timestamp: "10:35",
    mine: true,
    status: "read",
  },
];

export default function ChatPageClient() {
  const searchParams = useSearchParams();
  const userParam = searchParams.get("user");
  const { toast } = useToast();

  const [selectedConversation, setSelectedConversation] = useState(
    userParam || "ChessMaster"
  );
  const [messages, setMessages] = useState<Message[]>([]);

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false);
  const [attachmentType, setAttachmentType] = useState<"image" | "file" | null>(
    null
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  function getViewport(container: HTMLDivElement | null) {
    return container?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement | null;
  }

  // messages değiştiğinde alta kaydır
  useEffect(() => {
    const vp = getViewport(messagesAreaRef.current);
    if (vp) vp.scrollTop = vp.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      sender: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      mine: true,
      status: "sent",
    };

    setMessages([...messages, message]);
    setNewMessage("");

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "delivered" as const } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "read" as const } : msg
        )
      );
    }, 3000);
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
  };

  const handleFileAttachment = (type: "image" | "file") => {
    setAttachmentType(type);
    setShowAttachmentDialog(true);
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const message: Message = {
      id: messages.length + 1,
      sender: "me",
      content:
        attachmentType === "image"
          ? "📷 Resim gönderildi"
          : "📄 Dosya gönderildi",
      timestamp: new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      mine: true,
      status: "sent",
      attachment: {
        type: attachmentType!,
        name: file.name,
        url: URL.createObjectURL(file),
      },
    };

    setMessages([...messages, message]);
    setShowAttachmentDialog(false);
    setAttachmentType(null);

    toast({
      title: "Dosya gönderildi",
      description: `${file.name} başarıyla gönderildi.`,
    });
  };

  const filteredConversations: Conversation[] = mockConversations.filter(
    (conv) => conv.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto p-6 h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Conversations List */}
          <Card className="col-span-12 md:col-span-4 flex flex-col">
            <CardHeader>
              <CardTitle>Mesajlar</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Kişi ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>

            {/* ✅ ScrollBox */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {filteredConversations.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center text-center py-10 text-muted-foreground select-none">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
                      <Search className="h-6 w-6 opacity-60" />
                    </div>
                    <p className="text-sm font-medium">Sonuç bulunamadı</p>
                    <p className="text-xs opacity-75">
                      Farklı bir kullanıcı adı deneyin.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 space-y-2">
                    {filteredConversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConversation === conv.username
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedConversation(conv.username)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage
                              src={`https://ui-avatars.com/api/?name=Ilyas+Bozdemir&background=0D8ABC&color=fff`}
                            />
                            <AvatarFallback>
                              {conv.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {conv.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold truncate">
                              {conv.username}
                            </p>
                            <span className="text-xs opacity-70">
                              {conv.timestamp}
                            </span>
                          </div>
                          <p className="text-sm opacity-80 truncate">
                            {conv.lastMessage}
                          </p>
                        </div>
                        {conv.unread > 0 && (
                          <Badge variant="secondary" className="ml-auto">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>

          {messages.length === 0 ? (
            <div className="col-span-12 md:col-span-8 flex flex-col h-full">
              <div className="flex flex-1 flex-col items-center justify-center text-center select-none">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                  <MessageCircle className="h-10 w-10 text-muted-foreground" />
                </div>

                <h3 className="text-lg font-medium">Henüz mesaj yok</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Sohbeti başlatmak için bir mesaj yazın.
                </p>
              </div>
            </div>
          ) : (
            <Card className="col-span-12 md:col-span-8 flex flex-col h-full">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`https://ui-avatars.com/api/?name=Ilyas+Bozdemir&background=0D8ABC&color=fff`}
                      />
                      <AvatarFallback>
                        {selectedConversation.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {selectedConversation}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Çevrimiçi</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Profili Görüntüle</DropdownMenuItem>
                      <DropdownMenuItem>Sohbeti Temizle</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Engelle
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea ref={messagesAreaRef} className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.mine ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.mine
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {message.attachment && (
                          <div className="mb-2">
                            {message.attachment.type === "image" ? (
                              <div className="rounded overflow-hidden">
                                <img
                                  src={
                                    message.attachment.url || "/placeholder.svg"
                                  }
                                  alt={message.attachment.name}
                                  className="max-w-full h-auto"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 p-2 bg-background/10 rounded">
                                <File className="h-4 w-4" />
                                <span className="text-xs">
                                  {message.attachment.name}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <TooltipProvider delayDuration={100}>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs opacity-70">
                              {message.timestamp}
                            </span>

                            {message.mine && message.status === "sending" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Loader2 className="h-3 w-3 animate-spin opacity-60" />
                                </TooltipTrigger>
                                <TooltipContent>Gönderiliyor...</TooltipContent>
                              </Tooltip>
                            )}

                            {message.mine && message.status === "sent" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Check className="h-3 w-3 opacity-70" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  Sunucuya iletildi
                                </TooltipContent>
                              </Tooltip>
                            )}

                            {message.mine && message.status === "delivered" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <CheckCheck className="h-3 w-3 opacity-70" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  Karşıya teslim edildi
                                </TooltipContent>
                              </Tooltip>
                            )}

                            {message.mine && message.status === "read" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <CheckCheck className="h-3 w-3 opacity-70 text-blue-400" />
                                </TooltipTrigger>
                                <TooltipContent>Görüldü</TooltipContent>
                              </Tooltip>
                            )}

                            {message.mine && message.status === "failed" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <AlertCircle className="h-3 w-3 text-red-500 opacity-80" />
                                </TooltipTrigger>
                                <TooltipContent className="text-red-500">
                                  Gönderilemedi
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <CardContent className="border-t pt-4">
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleFileAttachment("image")}
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Resim Gönder
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleFileAttachment("file")}
                      >
                        <File className="h-4 w-4 mr-2" />
                        Dosya Gönder
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Smile className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid grid-cols-8 gap-2">
                        {emojis.map((emoji, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-lg"
                            onClick={() => handleEmojiSelect(emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Input
                    placeholder="Mesaj yazın..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog
        open={showAttachmentDialog}
        onOpenChange={setShowAttachmentDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {attachmentType === "image" ? "Resim Gönder" : "Dosya Gönder"}
            </DialogTitle>
            <DialogDescription>
              {attachmentType === "image"
                ? "Göndermek istediğiniz resmi seçin."
                : "Göndermek istediğiniz dosyayı seçin."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
            <Button onClick={handleFileUpload}>Dosya Seç</Button>
            <input
              ref={fileInputRef}
              type="file"
              accept={attachmentType === "image" ? "image/*" : "*"}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAttachmentDialog(false)}
            >
              İptal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
