"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Users, Trophy } from "lucide-react";
import { ChessBoard } from "@/components/game/chess-board";
import { GameCard } from "@/components/game/game-card";
import { PlayersList } from "@/components/game/players-list";
import { NewGamePanel } from "@/components/game/new-game-panel";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Center - Chess Board */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex justify-center">
                <div className="space-y-4 w-full max-w-2xl">
                  <ChessBoard />

                  <Button className="w-full" size="lg">
                    <Play className="w-4 h-4 mr-2" />
                    Oyunu Başlat
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Panel - Tabbed Interface */}
            <div className="lg:col-span-4">
              <Tabs defaultValue="newgame" className="w-full">
                {/* Tab Navigation */}
                <TabsList className="w-full grid grid-cols-3 mb-4">
                  <TabsTrigger value="newgame" className="text-xs md:text-sm">
                    <Play className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    <span className="hidden sm:inline">Yeni Oyun</span>
                    <span className="sm:hidden">Oyun</span>
                  </TabsTrigger>
                  <TabsTrigger value="games" className="text-xs md:text-sm">
                    <Trophy className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    <span className="hidden sm:inline">Oyunlar</span>
                    <span className="sm:hidden">Oyun</span>
                  </TabsTrigger>
                  <TabsTrigger value="players" className="text-xs md:text-sm">
                    <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    <span className="hidden sm:inline">Oyuncular</span>
                    <span className="sm:hidden">Oyuncu</span>
                  </TabsTrigger>
                </TabsList>

                {/* New Game Tab */}
                <TabsContent value="newgame">
                  <NewGamePanel />
                </TabsContent>

                {/* Games Tab */}
                <TabsContent value="games">
                  <Card>
                    <CardContent className="p-2 md:p-4">
                      <Tabs defaultValue="daily" className="w-full">
                        <TabsList className="w-full grid grid-cols-3 h-auto mb-4">
                          <TabsTrigger
                            value="daily"
                            className="text-xs md:text-sm py-2"
                          >
                            <Trophy className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            <span className="hidden sm:inline">Günlük</span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="history"
                            className="text-xs md:text-sm py-2"
                          >
                            <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            <span className="hidden sm:inline">Geçmiş</span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="watch"
                            className="text-xs md:text-sm py-2"
                          >
                            <Play className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            <span className="hidden sm:inline">İzle</span>
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="daily" className="space-y-2">
                          <GameCard
                            opponent="Ahmet_K"
                            timeControl="3+0"
                            myTurn
                            rating={1842}
                          />
                          <GameCard
                            opponent="MelikeChess"
                            timeControl="10+5"
                            myTurn={false}
                            rating={1956}
                          />
                          <GameCard
                            opponent="Emre_TR"
                            timeControl="5+0"
                            myTurn
                            rating={1723}
                          />
                        </TabsContent>

                        <TabsContent value="history" className="space-y-2">
                          <GameCard
                            opponent="AyşeGM"
                            timeControl="3+2"
                            rating={2134}
                          />
                          <GameCard
                            opponent="BurakIM"
                            timeControl="5+3"
                            rating={1889}
                          />
                          <GameCard
                            opponent="Emre_TR"
                            timeControl="5+0"
                            rating={1723}
                          />
                        </TabsContent>

                        <TabsContent value="watch">
                          <div className="text-center text-muted-foreground py-8">
                            Şu anda canlı maç yok
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Players Tab */}
                <TabsContent value="players">
                  <PlayersList />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageClient;
