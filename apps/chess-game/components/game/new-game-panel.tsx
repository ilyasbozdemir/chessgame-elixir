import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Clock, Trophy, Users, Play } from "lucide-react";

const gameModes = [
  { icon: Zap, name: "Bullet", time: "1 dk", color: "text-yellow-500" },
  { icon: Zap, name: "Blitz", time: "3 | 5 dk", color: "text-orange-500" },
  { icon: Clock, name: "Rapid", time: "10 | 15 dk", color: "text-green-500" },
  { icon: Clock, name: "Classical", time: "30 dk", color: "text-blue-500" },
];

export const NewGamePanel = () => {
  return (
    <div className="space-y-3 md:space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base md:text-lg">Hızlı Oyun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 md:space-y-3">
          {gameModes.map((mode) => (
            <Button
              key={mode.name}
              variant="outline"
              className="w-full justify-start gap-2 md:gap-3 h-auto py-2 md:py-3"
            >
              <mode.icon className={`w-4 h-4 md:w-5 md:h-5 ${mode.color}`} />
              <div className="flex-1 text-left">
                <div className="font-medium text-sm md:text-base">
                  {mode.name}
                </div>
                <div className="text-xs text-muted-foreground">{mode.time}</div>
              </div>
            </Button>
          ))}

          <Button className="w-full" size="lg">
            <Play className="w-4 h-4 mr-2" />
            Oyunu Başlat
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base md:text-lg">
            Diğer Seçenekler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 md:space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-sm md:text-base h-auto py-2 md:py-3"
          >
            <Trophy className="w-4 h-4" />
            Özelleştirilmiş Meydan Okuma
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-sm md:text-base h-auto py-2 md:py-3"
          >
            <Users className="w-4 h-4" />
            Bir Arkadaşa Karşı Oyna
          </Button>
          <Button
            variant="default"
            className="w-full justify-start gap-2 text-sm md:text-base h-auto py-2 md:py-3"
          >
            <Trophy className="w-4 h-4" />
            Turnuvalar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
