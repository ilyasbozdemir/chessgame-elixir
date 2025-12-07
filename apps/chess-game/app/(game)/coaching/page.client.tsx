"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Star,
  Users,
  LifeBuoy,
  Clock
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
  SelectContent,
  SelectLabel
} from "@/components/ui/select"

type Coach = {
  id: string
  name: string
  title: string
  rating: number
  price: number
  specialties: string[]
}

const MOCK_COACHES: Coach[] = [
  {
    id: "c1",
    name: "GM Murat Kaya",
    title: "Grandmaster",
    rating: 2550,
    price: 600,
    specialties: ["Açılışlar", "Orta Oyun", "Strateji"]
  },
  {
    id: "c2",
    name: "FM Ali Yılmaz",
    title: "FIDE Master",
    rating: 2250,
    price: 350,
    specialties: ["Taktik", "Oyun Sonu", "Kombinasyon"]
  },
  {
    id: "c3",
    name: "WIM Elif Demir",
    title: "Woman IM",
    rating: 2150,
    price: 300,
    specialties: ["Pozisyonel Oyun", "Blitz Eğitimi"]
  }
]

export default function CoachingPage() {
  const [search, setSearch] = useState("")
  const [ratingRange, setRatingRange] = useState([1800])

  // dialog states
  const [open, setOpen] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)
  const [notes, setNotes] = useState("")
  const [timeControl, setTimeControl] = useState("")

  const filtered = MOCK_COACHES.filter(
    (c) =>
      c.rating >= ratingRange[0] &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase())))
  )

  const openRequestDialog = (coach: Coach) => {
    setSelectedCoach(coach)
    setOpen(true)
  }

  const handleRequest = () => {
    console.log({
      coach: selectedCoach?.name,
      timeControl,
      notes
    })

    setOpen(false)
    setNotes("")
    setTimeControl("")
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <LifeBuoy className="w-6 h-6" />
          Ders / Koçluk
        </h1>
        <p className="text-muted-foreground">
          Profesyonel satranç eğitmenleriyle birebir çalışma fırsatı.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Eğitmen Ara
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="İsim veya uzmanlık ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Min Rating</span>
              <Badge>≥ {ratingRange[0]}</Badge>
            </div>

            <Slider
              value={ratingRange}
              min={1000}
              max={2600}
              step={50}
              onValueChange={setRatingRange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Coach List */}
      <div className="grid gap-4">
        {filtered.map((coach) => (
          <Card key={coach.id} className="p-4">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                <Users className="w-6 h-6 text-muted-foreground" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{coach.name}</h3>
                <p className="text-sm text-muted-foreground">{coach.title}</p>

                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">
                    <Star className="w-3 h-3 mr-1" />
                    {coach.rating}
                  </Badge>

                  <Badge>{coach.price}₺ / saat</Badge>
                </div>

                <div className="flex gap-2 flex-wrap mt-3">
                  {coach.specialties.map((s, i) => (
                    <Badge key={i} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Request Button */}
              <div>
                <Button size="sm" onClick={() => openRequestDialog(coach)}>
                  Ders Talep Et
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Ders Talep Et
            </DialogTitle>
          </DialogHeader>

          {/* Coach Info */}
          {selectedCoach && (
            <div className="mb-4 p-3 rounded-lg bg-muted">
              <p className="font-semibold">{selectedCoach.name}</p>
              <p className="text-sm text-muted-foreground">{selectedCoach.title}</p>
            </div>
          )}

          {/* Time Control Select */}
          <div className="space-y-2 mb-3">
            <label className="text-sm font-medium">Ders Süresi / Tempo</label>

            <Select value={timeControl} onValueChange={setTimeControl}>
              <SelectTrigger>
                <SelectValue placeholder="Süre seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Bullet</SelectLabel>
                  <SelectItem value="1+0">1 dakika</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Blitz</SelectLabel>
                  <SelectItem value="3+0">3 dakika</SelectItem>
                  <SelectItem value="5+0">5 dakika</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Rapid</SelectLabel>
                  <SelectItem value="10+0">10 dakika</SelectItem>
                  <SelectItem value="15+10">15 dakika</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Classical</SelectLabel>
                  <SelectItem value="30+0">30 dakika</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2 mb-3">
            <label className="text-sm font-medium">Ders Notu (opsiyonel)</label>
            <Textarea
              placeholder="Örn: Açılış hazırlığı yapmak istiyorum…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button className="w-full" onClick={handleRequest}>
              Talebi Gönder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
