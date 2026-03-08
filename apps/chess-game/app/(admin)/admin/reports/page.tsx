"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MoreVertical, CheckCircle, XCircle, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockReports = [
  {
    id: 1,
    reporter: "Ahmet Yılmaz",
    reported: "Mehmet Demir",
    reason: "Hile kullanımı",
    description: "Oyun sırasında anormal hızlı hamleler yapıyor",
    status: "pending",
    date: "2024-04-15 14:30",
    gameId: 5432,
  },
  {
    id: 2,
    reporter: "Ayşe Kaya",
    reported: "Ali Çelik",
    reason: "Hakaret",
    description: "Sohbette küfür ve hakaret içeren mesajlar",
    status: "under_review",
    date: "2024-04-15 13:20",
    gameId: 5431,
  },
  {
    id: 3,
    reporter: "Fatma Şahin",
    reported: "Can Arslan",
    reason: "Oyunu terk etme",
    description: "Kaybedince sürekli oyunu terk ediyor",
    status: "pending",
    date: "2024-04-15 12:45",
    gameId: 5429,
  },
  {
    id: 4,
    reporter: "Zeynep Yıldız",
    reported: "Burak Koç",
    reason: "Hile kullanımı",
    description: "Bilgisayar yardımı kullanıyor olabilir",
    status: "resolved",
    date: "2024-04-14 18:30",
    gameId: 5420,
    action: "Kullanıcı 7 gün yasaklandı",
  },
  {
    id: 5,
    reporter: "Elif Özkan",
    reported: "Selin Aydın",
    reason: "Spam",
    description: "Sürekli oyun daveti spam'i",
    status: "dismissed",
    date: "2024-04-14 16:20",
    gameId: 5418,
    action: "Yeterli kanıt bulunamadı",
  },
]

export default function AdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reported.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterStatus === "all" || report.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Bekliyor</Badge>
      case "under_review":
        return <Badge variant="default">İnceleniyor</Badge>
      case "resolved":
        return <Badge className="bg-green-600">Çözüldü</Badge>
      case "dismissed":
        return <Badge variant="secondary">Reddedildi</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const pendingCount = mockReports.filter((r) => r.status === "pending").length
  const underReviewCount = mockReports.filter((r) => r.status === "under_review").length
  const resolvedCount = mockReports.filter((r) => r.status === "resolved").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rapor Yönetimi</h1>
        <p className="text-muted-foreground">Kullanıcı raporlarını görüntüleyin ve yönetin</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Raporlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">İşlem gerekiyor</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">İnceleniyor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{underReviewCount}</div>
            <p className="text-xs text-muted-foreground">Aktif inceleme</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Çözülen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{resolvedCount}</div>
            <p className="text-xs text-muted-foreground">Son 7 gün</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle>Raporlar</CardTitle>
              <CardDescription>Toplam {mockReports.length} rapor</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  Tümü
                </Button>
                <Button
                  variant={filterStatus === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("pending")}
                >
                  Bekleyen
                </Button>
                <Button
                  variant={filterStatus === "under_review" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("under_review")}
                >
                  İnceleniyor
                </Button>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rapor ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Raporlayan</TableHead>
                <TableHead>Raporlanan</TableHead>
                <TableHead>Sebep</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">#{report.id}</TableCell>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell className="font-medium">{report.reported}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.reason}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{report.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Detayları Gör
                        </DropdownMenuItem>
                        {report.status !== "resolved" && report.status !== "dismissed" && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Onayla ve İşlem Yap
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="w-4 h-4 mr-2" />
                              Reddet
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
