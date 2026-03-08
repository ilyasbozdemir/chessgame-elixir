import { Card, CardContent } from "@/components/ui/card";
import { User, Users, Radio } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const players = [
  { name: "Ahmet_K", rating: 1842, online: true },
  { name: "MelikeChess", rating: 1956, online: true },
  { name: "Emre_TR", rating: 1723, online: false },
  { name: "AyşeGM", rating: 2134, online: true },
  { name: "BurakIM", rating: 1889, online: true },
];

export const PlayersList = () => {
  return (
    <Card>
      <CardContent className="p-2 md:p-4">
        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-auto">
            <TabsTrigger value="friends" className="text-xs md:text-sm py-2">
              <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Arkadaşlar</span>
              <span className="sm:hidden">Arkadaş</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="text-xs md:text-sm py-2">
              <User className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Tüm Oyuncular</span>
              <span className="sm:hidden">Tümü</span>
            </TabsTrigger>
            <TabsTrigger value="live" className="text-xs md:text-sm py-2">
              <Radio className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Canlı Yayın</span>
              <span className="sm:hidden">Canlı</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-2 mt-4">
            {players.slice(0, 3).map((player) => (
              <PlayerCard key={player.name} {...player} />
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-2 mt-4">
            {players.map((player) => (
              <PlayerCard key={player.name} {...player} />
            ))}
          </TabsContent>

          <TabsContent value="live" className="mt-4">
            <div className="text-center text-muted-foreground py-8">
              Şu anda canlı yayın yok
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const PlayerCard = ({ name, rating, online }: { name: string; rating: number; online: boolean }) => {
  return (
    <div className="flex items-center justify-between p-2 md:p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
          {online && (
            <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 border-2 border-background rounded-full" />
          )}
        </div>
        <div>
          <div className="font-medium text-sm md:text-base">{name}</div>
          <div className="text-xs md:text-sm text-muted-foreground">{rating}</div>
        </div>
      </div>
    </div>
  );
};
