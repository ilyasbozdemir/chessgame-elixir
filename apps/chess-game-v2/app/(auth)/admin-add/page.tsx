"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Crown } from "lucide-react";
import Link from "next/link";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetch("/api/admin/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch(() =>
        toast({
          title: "Hata",
          description: "Kullanıcılar alınamadı",
          variant: "destructive",
        })
      )
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      toast({ title: "Başarılı", description: "Yeni kullanıcı eklendi." });
      setUsers((prev) => [...prev, data.newUser]);
      setForm({ username: "", email: "", password: "", role: "user" });
    } else {
      toast({
        title: "Hata",
        description: data.error || "İşlem başarısız",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-center">
            <div className="flex justify-center">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold group"
              >
                <div className="p-2 rounded-full bg-primary/15 group-hover:bg-primary/25 transition">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <span className="tracking-tight">
                  <span className="font-bold">Chess</span>
                  <span className="text-primary font-bold">Game</span>
                </span>
              </Link>
            </div>
          </div>
          <CardTitle className="flex justify-center">
            Kullanıcı Yönetimi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Kullanıcı Adı</Label>
              <Input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Şifre</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <select
                className="border rounded p-2 w-full bg-background"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="user" disabled>
                  User
                </option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex justify-end pt-2">
              <Button type="submit">Ekle</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Mevcut Kullanıcılar</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Yükleniyor...</p>
          ) : users.length === 0 ? (
            <p>Henüz kullanıcı yok.</p>
          ) : (
            <ul className="divide-y">
              {users.map((u) => (
                <li
                  key={u._id}
                  className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-muted/40 transition-colors"
                >
                  <div>
                    <p className="font-medium">{u.username}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>

                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      u.role === "admin"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    }`}
                  >
                    {u.role.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
