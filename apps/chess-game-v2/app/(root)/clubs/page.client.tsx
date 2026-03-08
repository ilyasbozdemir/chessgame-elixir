"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, MapPin, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// Mock data - gerçekte API'den gelir
const mockClubs = [
  {
    id: 1,
    name: "İstanbul Satranç Kulübü",
    description: "İstanbul'daki en aktif satranç topluluğu",
    members: 1250,
    level: "Profesyonel",
    location: "İstanbul",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
    joined: false,
  },
  {
    id: 2,
    name: "Genç Oyuncular Akademisi",
    description: "Gençler için eğitim ve turnuvalar",
    members: 856,
    level: "Eğitim",
    location: "Ankara",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop",
    joined: false,
  },
  {
    id: 3,
    name: "Blitz Hızı Şampiyonları",
    description: "Blitz ve bullet oyunları için",
    members: 2103,
    level: "Hızlı Oyun",
    location: "İzmir",
    image:
      "https://images.unsplash.com/photo-1555169519-f6c905fbe01b?w=400&h=300&fit=crop",
    joined: true,
  },
];

export default function ClubsPage() {
  const [clubs, setClubs] = useState(mockClubs);
  const [search, setSearch] = useState("");
  const [joinedClubs, setJoinedClubs] = useState(clubs.filter((c) => c.joined));

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoinClub = (clubId: number) => {
    const club = clubs.find((c) => c.id === clubId);
    if (club) {
      setClubs(
        clubs.map((c) => (c.id === clubId ? { ...c, joined: !c.joined } : c))
      );
      setJoinedClubs(
        joinedClubs.filter((c) => c.id !== clubId).length > 0
          ? joinedClubs.filter((c) => c.id !== clubId)
          : [...joinedClubs, club]
      );
    }
  };

  return (
    <div className="container mx-auto p-6 h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold">Satranç Kulüpleri</h1>
          <p className="text-muted-foreground">
            Katılın, öğrenin ve birlikte satrança yükselişin
          </p>
        </div>
        <Link href="/clubs/create">
          <Button size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Kulüp Oluştur
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Kulüp ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10"
        />
      </div>

      {/* Kulüp Bölümleri */}
      {joinedClubs.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Üye Olduğunuz Kulüpler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {joinedClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                onJoin={handleJoinClub}
                isJoined={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Keşfet */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Keşfet & Katıl</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClubs
            .filter((c) => !c.joined)
            .map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                onJoin={handleJoinClub}
                isJoined={false}
              />
            ))}
        </div>
        {filteredClubs.filter((c) => !c.joined).length === 0 && search && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              "<span className="font-semibold">{search}</span>" için kulüp
              bulunamadı
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Club Card Component
function ClubCard({
  club,
  onJoin,
  isJoined,
}: {
  club: (typeof mockClubs)[0];
  onJoin: (id: number) => void;
  isJoined: boolean;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-muted">
        <img
          src={club.image || "/placeholder.svg"}
          alt={club.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
          {club.level}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <Link href={`/clubs/${club.id}`}>
            <h3 className="font-bold text-lg line-clamp-1 hover:text-primary transition-colors cursor-pointer">
              {club.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {club.description}
          </p>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 pt-2 border-t border-border text-sm">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-muted-foreground" />
            <span>{club.members} üye</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{club.location}</span>
          </div>
        </div>

        {/* Button */}
        <Link href={`/clubs/${club.id}`} className="w-full">
          <Button
            variant={isJoined ? "outline" : "default"}
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              onJoin(club.id);
            }}
          >
            {isJoined ? "Çıkış Yap" : "Katıl"}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
