"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Crown, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulated login - replace with actual authentication
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Giriş Başarılı",
          description: "Hoş geldiniz!",
        })
        router.push("/")
      } else {
        toast({
          title: "Hata",
          description: "Lütfen tüm alanları doldurun",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

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
            <CardTitle className="text-2xl font-bold">Giriş Yap</CardTitle>
            <CardDescription>Satranç oyununa devam etmek için giriş yapın</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-primary hover:underline">
                Şifremi Unuttum
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">veya</span>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Hesabınız yok mu? </span>
              <Link href="/register" className="text-primary hover:underline font-semibold">
                Kayıt Ol
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
