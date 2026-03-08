"use client";

import React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuthService } from "@/services/auth.service";
import { Logger } from "@/lib/utils";

const logger = new Logger("ChessGame-RegisterPage");

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const auth = new AuthService();
      const registerServiceResult = await auth.register({
        name: formData.displayName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (!registerServiceResult.success) {
        toast({
          title: "Kayıt başarısız ❌",
          description: registerServiceResult.error ?? "Bilinmeyen hata",
          variant: "destructive",
        });
        return;
      }

      router.push("/lobby");

      // success = true → user ve token garanti var
      logger.log(
        "🎉 Kayıt başarılı:",
        registerServiceResult.user,
        registerServiceResult.token
      );

      toast({
        title: "Kayıt başarılı ✅",
        description: "Hesabın oluşturuldu, yönlendiriliyorsun...",
      });
    } catch (err: any) {
      toast({
        title: "Kayıt başarısız ❌",
        description: err.message ?? "Bilinmeyen hata",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
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
          <div>
            <CardTitle className="text-2xl font-bold">Kayıt Ol</CardTitle>
            <CardDescription>
              Yeni bir hesap oluşturun ve oynamaya başlayın
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Görünen İsim</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Ad Soyad veya Takma İsim"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
                className="pl-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="kullaniciadi"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Zaten hesabınız var mı?{" "}
              </span>
              <Link
                href="/login"
                className="text-primary hover:underline font-semibold"
              >
                Giriş Yap
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
