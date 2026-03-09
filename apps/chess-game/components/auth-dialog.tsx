"use client";

import { useState } from "react";
import { useUser } from "@/context/user-context";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
    const { login, register } = useUser();
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState<"login" | "register">("login");

    // Form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await login(email, password);
        setLoading(false);

        if (error) {
            toast.error(error.message || "Giriş yapılırken bir hata oluştu");
        } else {
            toast.success("Başarıyla giriş yapıldı!");
            onOpenChange(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await register(email, password, username);
        setLoading(false);

        if (error) {
            toast.error(error.message || "Kayıt olurken bir hata oluştu");
        } else {
            toast.success("Kayıt başarılı! Hoş geldiniz.");
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        {tab === "login" ? "Tekrar Hoş Geldin" : "Aramıza Katıl"}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Gerçek zamanlı satranç dünyasına giriş yap.
                    </DialogDescription>
                </DialogHeader>

                <Tabs
                    value={tab}
                    onValueChange={(v) => setTab(v as any)}
                    className="w-full mt-4"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Giriş Yap</TabsTrigger>
                        <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        required
                                        type="email"
                                        placeholder="E-posta"
                                        className="pl-9"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        required
                                        type="password"
                                        placeholder="Şifre"
                                        className="pl-9"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="register">
                        <form onSubmit={handleRegister} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        required
                                        placeholder="Kullanıcı Adı"
                                        className="pl-9"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        required
                                        type="email"
                                        placeholder="E-posta"
                                        className="pl-9"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        required
                                        type="password"
                                        placeholder="Şifre (En az 6 karakter)"
                                        className="pl-9"
                                        minLength={6}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
