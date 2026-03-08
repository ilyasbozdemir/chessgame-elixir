"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, Lock, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SetupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast({
        title: "Kurulum tamamlandı ✅",
        description: "Admin hesabı oluşturuldu, giriş sayfasına yönlendiriliyorsun...",
      });

      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      toast({
        title: "Kurulum başarısız ❌",
        description: err.message || "Bilinmeyen hata oluştu",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-lg font-semibold group"
          >
            <div className="p-2 rounded-full bg-primary/15 group-hover:bg-primary/25 transition">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <span className="tracking-tight font-bold">
              Chess<span className="text-primary">Game</span>
            </span>
          </Link>
          <div>
            <CardTitle className="text-2xl font-bold">Kurulum Başlat</CardTitle>
            <CardDescription>
              İlk yönetici hesabını oluşturmak için bilgileri girin
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Kullanıcı Adı</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="admin-username"
                  className="pl-10"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="admin@email.com"
                  className="pl-10"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Oluşturuluyor..." : "İlk Admini Oluştur"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
