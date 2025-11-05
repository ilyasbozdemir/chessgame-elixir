"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MoreVertical, Ban, CheckCircle, Mail } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockUsers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    rating: 1850,
    games: 234,
    status: "active",
    joined: "2024-01-15",
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    email: "ayse@example.com",
    rating: 2100,
    games: 567,
    status: "active",
    joined: "2024-02-20",
  },
  {
    id: 3,
    name: "Mehmet Demir",
    email: "mehmet@example.com",
    rating: 1920,
    games: 189,
    status: "banned",
    joined: "2024-03-10",
  },
  {
    id: 4,
    name: "Fatma Şahin",
    email: "fatma@example.com",
    rating: 2050,
    games: 423,
    status: "active",
    joined: "2024-01-05",
  },
  {
    id: 5,
    name: "Ali Çelik",
    email: "ali@example.com",
    rating: 1650,
    games: 156,
    status: "active",
    joined: "2024-04-12",
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
        <p className="text-muted-foreground">Tüm kullanıcıları görüntüleyin ve yönetin</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Kullanıcılar</CardTitle>
              <CardDescription>Toplam {mockUsers.length} kullanıcı</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Kullanıcı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Oyunlar</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Katılma</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.rating}</Badge>
                  </TableCell>
                  <TableCell>{user.games}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "destructive"}>
                      {user.status === "active" ? "Aktif" : "Yasaklı"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          E-posta Gönder
                        </DropdownMenuItem>
                        {user.status === "active" ? (
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="w-4 h-4 mr-2" />
                            Yasakla
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Yasağı Kaldır
                          </DropdownMenuItem>
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
