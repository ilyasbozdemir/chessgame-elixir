import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChatDialog } from "./chat-dialog";

export function SpectatorBottomNav() {
  const [chatOpen, setChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-4">
            {/* Spectator Badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-full">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                İzleme Modu
              </span>
            </div>

            {/* Chat Button */}
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setChatOpen(true)}
              className="flex-col h-auto py-2 px-4 relative"
            >
              <MessageCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Sohbet</span>
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <ChatDialog
        open={chatOpen}
        onOpenChange={setChatOpen}
        onUnreadCountChange={setUnreadCount}
      />
    </>
  );
}
