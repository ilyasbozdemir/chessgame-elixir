import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type VoiceChatProps = {
  className?: string;
};

export function VoiceChat({ className }: VoiceChatProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [opponentMuted, setOpponentMuted] = useState(false);
  const { toast } = useToast();

  const handleToggleConnection = async () => {
    if (!isConnected) {
      try {
        // Request microphone access
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
    <div
      className={cn(
        "fixed left-4 bottom-20 md:left-6 md:bottom-24 z-40 flex flex-col gap-2",
        className
      )}
    >
      {/* Main connection button */}
      <Button
        size="icon"
        onClick={handleToggleConnection}
        className={cn(
          "h-12 w-12 rounded-full shadow-lg transition-all",
          isConnected
            ? "bg-destructive hover:bg-destructive/90"
            : "bg-primary hover:bg-primary/90"
        )}
      >
        {isConnected ? (
          <PhoneOff className="h-5 w-5" />
        ) : (
          <Phone className="h-5 w-5" />
        )}
      </Button>

      {/* Voice controls - show when connected */}
      {isConnected && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-2">
          {/* Microphone toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggleMute}
            className={cn(
              "h-10 w-10 rounded-full shadow-md",
              isMuted && "bg-destructive/20 border-destructive"
            )}
          >
            {isMuted ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>

          {/* Speaker toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggleSpeaker}
            className={cn(
              "h-10 w-10 rounded-full shadow-md",
              isSpeakerOff && "bg-destructive/20 border-destructive"
            )}
          >
            {isSpeakerOff ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>

          {/* Opponent status indicator */}
          <div
            className={cn(
              "h-10 w-10 rounded-full shadow-md border-2 flex items-center justify-center bg-card",
              opponentMuted ? "border-muted" : "border-primary animate-pulse"
            )}
          >
            {opponentMuted ? (
              <MicOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Mic className="h-4 w-4 text-primary" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
