"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Shield,
  Edit2,
  Ban,
  Users,
  MessageSquare,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";

const mockClubData = {
  id: 1,
  name: "İstanbul Satranç Kulübü",
  description: "İstanbul'daki en aktif satranç topluluğu",
  members: 1250,
  level: "Profesyonel",
  location: "İstanbul",
  owner: "Ahmet Yılmaz",
  createdAt: "2023-01-15",
};

const mockMembers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    elo: 2100,
    role: "Kurucu",
    joinedAt: "2023-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    elo: 1950,
    role: "Yönetici",
    joinedAt: "2023-02-01",
    status: "active",
  },
  {
    id: 3,
    name: "Mehmet Demir",
    elo: 1850,
    role: "Moderatör",
    joinedAt: "2023-03-10",
    status: "active",
  },
  {
    id: 4,
    name: "Fatma Şahin",
    elo: 1720,
    role: "Üye",
    joinedAt: "2023-04-05",
    status: "active",
  },
  {
    id: 5,
    name: "Ali Çelik",
    elo: 1680,
    role: "Üye",
    joinedAt: "2023-05-12",
    status: "inactive",
  },
];

const roleOptions = ["Üye", "Moderatör", "Yönetici", "Kurucu"];

export default function ManageClubPage() {
  const { id } = useParams();

  const [members, setMembers] = useState(mockMembers);
  const [searchMember, setSearchMember] = useState("");
  const [editingRole, setEditingRole] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sistem",
      content: "Antrenman Programı Güncellendi",
      targetAudience: "Tüm Üyeler (1250 kişi)",
      time: "2 saat önce",
    },
    {
      id: 2,
      sender: "Sistem",
      content: "Turnya Katılım Çağrısı",
      targetAudience: "Yöneticiler (5 kişi)",
      time: "1 gün önce",
    },
  ]);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [targetAudience, setTargetAudience] = useState("Tüm Üyeler");

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchMember.toLowerCase())
  );

  const handleRoleChange = (memberId: number) => {
    setMembers(
      members.map((m) => (m.id === memberId ? { ...m, role: selectedRole } : m))
    );
    setEditingRole(null);
  };

  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter((m) => m.id !== memberId));
  };

  const handleSendMessage = () => {
    if (messageTitle.trim() && messageContent.trim()) {
      setMessages([
        {
          id: messages.length + 1,
          sender: "Sen",
          content: messageTitle,
          targetAudience: targetAudience,
          time: "Az önce",
        },
        ...messages,
      ]);
      setMessageTitle("");
      setMessageContent("");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href={`/clubs/${id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Kulüp Yönetimi</h1>
            <p className="text-muted-foreground">{mockClubData.name}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Toplam Üyeler</p>
            <p className="text-2xl font-bold">{mockClubData.members}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Aktif Üyeler</p>
            <p className="text-2xl font-bold">
              {members.filter((m) => m.status === "active").length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Ortalama ELO</p>
            <p className="text-2xl font-bold">
              {Math.round(
                members.reduce((sum, m) => sum + m.elo, 0) / members.length
              )}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Kuruluş Tarihi</p>
            <p className="text-sm font-bold">{mockClubData.createdAt}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="members" className="space-y-4">
          <TabsList>
            <TabsTrigger value="members" className="gap-2">
              <Users className="w-4 h-4" />
              Üyeler
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              İletişim
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Edit2 className="w-4 h-4" />
              Ayarlar
            </TabsTrigger>
          </TabsList>

          {/* Üyeler Tab */}
          <TabsContent value="members" className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                {/* Arama */}
                <Input
                  placeholder="Üye ara..."
                  value={searchMember}
                  onChange={(e) => setSearchMember(e.target.value)}
                />

                {/* Tablo */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-3 font-semibold">
                          Ad
                        </th>
                        <th className="text-left py-3 px-3 font-semibold">
                          ELO
                        </th>
                        <th className="text-left py-3 px-3 font-semibold">
                          Rol
                        </th>
                        <th className="text-left py-3 px-3 font-semibold">
                          Katılma Tarihi
                        </th>
                        <th className="text-left py-3 px-3 font-semibold">
                          Durum
                        </th>
                        <th className="text-left py-3 px-3 font-semibold">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map((member) => (
                        <tr
                          key={member.id}
                          className="border-b border-border hover:bg-muted/50"
                        >
                          <td className="py-3 px-3">{member.name}</td>
                          <td className="py-3 px-3 font-semibold">
                            {member.elo}
                          </td>
                          <td className="py-3 px-3">
                            {editingRole === member.id ? (
                              <select
                                value={selectedRole || member.role}
                                onChange={(e) =>
                                  setSelectedRole(e.target.value)
                                }
                                className="px-2 py-1 border border-input rounded text-sm"
                              >
                                {roleOptions.map((role) => (
                                  <option key={role} value={role}>
                                    {role}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                {member.role}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-muted-foreground">
                            {member.joinedAt}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`inline-block w-2 h-2 rounded-full ${
                                member.status === "active"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            />
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex gap-1">
                              {editingRole === member.id ? (
                                <>
                                  <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => handleRoleChange(member.id)}
                                  >
                                    Kaydet
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingRole(null)}
                                  >
                                    İptal
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                      setEditingRole(member.id);
                                      setSelectedRole(member.role);
                                    }}
                                  >
                                    <Shield className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() =>
                                      handleRemoveMember(member.id)
                                    }
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* İletişim Tab */}
          <TabsContent value="messages" className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Mesaj Gönder</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Başlık</label>
                  <Input
                    placeholder="Mesaj başlığı..."
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mesaj İçeriği</label>
                  <Textarea
                    placeholder="Mesajınızı yazın..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="min-h-32"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hedef Kitle</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                  >
                    <option>Tüm Üyeler</option>
                    <option>Yöneticiler</option>
                    <option>Moderatörler</option>
                    <option>Yeni Üyeler</option>
                  </select>
                </div>
                <Button onClick={handleSendMessage} className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Mesajı Gönder
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Gönderilen Mesajlar</h3>
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">{msg.content}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Hedef: {msg.targetAudience}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Ayarlar Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Kulüp Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Adı</label>
                    <Input value={mockClubData.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Konum</label>
                    <Input value={mockClubData.location} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Açıklama</label>
                  <textarea
                    value={mockClubData.description}
                    readOnly
                    className="w-full px-3 py-2 border border-input rounded-md bg-muted min-h-24"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Tehlikeli İşlemler</h3>
                <Button variant="destructive" className="gap-2">
                  <Ban className="w-4 h-4" />
                  Kulübü Kapat
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
