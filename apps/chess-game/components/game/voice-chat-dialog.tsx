import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

type VoiceChatDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function VoiceChatDialog({ open, onOpenChange }: VoiceChatDialogProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const { toast } = useToast();

  const handleToggleConnection = async () => {
    if (!isConnected) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsConnected(true);
        toast({
          title: "Sesli sohbet başlatıldı",
          description: "Rakibinizle konuşabilirsiniz",
        });
      } catch (error) {
        toast({
          title: "Mikrofon erişimi reddedildi",
          description: "Sesli sohbet için mikrofon iznine ihtiyaç var",
          variant: "destructive",
        });
      }
    } else {
      setIsConnected(false);
      setIsMuted(false);
      toast({
        title: "Sesli sohbet sonlandırıldı",
      });
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Mikrofon açıldı" : "Mikrofon kapatıldı",
    });
  };

  const handleToggleSpeaker = () => {
    setIsSpeakerOff(!isSpeakerOff);
    toast({
      title: isSpeakerOff ? "Hoparlör açıldı" : "Hoparlör kapatıldı",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sesli Sohbet</DialogTitle>
          <DialogDescription>
            {isConnected 
              ? "Rakibinizle sesli görüşüyorsunuz"
              : "Rakibinizle sesli görüşmeye başlayın"
            }
          </DialogDescription>
        </DialogHeader>

        {/* Educational Info */}
        <Alert className="mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Eğitim İpucu:</strong> Sesli sohbet hamlelerinizi açıklamak, 
            stratejilerinizi paylaşmak ve rakibinizle etkileşimde bulunmak için harika bir yoldur. 
            Özellikle öğrenme aşamasında çok faydalıdır!
          </AlertDescription>
        </Alert>

        <div className="flex flex-col items-center gap-6 py-8">
          {/* Connection Status */}
          <div className="flex flex-col items-center gap-3">
            <Button
              size="lg"
              onClick={handleToggleConnection}
              className={cn(
                "h-16 w-16 rounded-full transition-all",
                isConnected
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {isConnected ? (
                <PhoneOff className="h-6 w-6" />
              ) : (
                <Phone className="h-6 w-6" />
              )}
            </Button>
            <span className="text-sm font-medium">
              {isConnected ? "Aramayı Bitir" : "Aramayı Başlat"}
            </span>
          </div>

          {/* Controls */}
          {isConnected && (
            <div className="flex gap-4 animate-in fade-in-50">
              {/* Microphone */}
              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleMute}
                  className={cn(
                    "h-12 w-12 rounded-full",
                    isMuted && "bg-destructive/20 border-destructive"
                  )}
                >
                  {isMuted ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
                <span className="text-xs text-muted-foreground">
                  {isMuted ? "Kapalı" : "Açık"}
                </span>
              </div>

              {/* Speaker */}
              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleSpeaker}
                  className={cn(
                    "h-12 w-12 rounded-full",
                    isSpeakerOff && "bg-destructive/20 border-destructive"
                  )}
                >
                  {isSpeakerOff ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <span className="text-xs text-muted-foreground">
                  {isSpeakerOff ? "Kapalı" : "Açık"}
                </span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
