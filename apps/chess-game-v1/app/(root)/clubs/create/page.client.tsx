"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const clubTypes = [
  {
    value: "profesyonel",
    label: "Profesyonel",
    description: "Turnuvalar ve rekabet",
  },
  { value: "egitim", label: "Eğitim", description: "Öğrenme ve gelişim" },
  { value: "sosyal", label: "Sosyal", description: "Dostça oyunlar" },
  { value: "hizli-oyun", label: "Hızlı Oyun", description: "Blitz ve Bullet" },
  { value: "cozpun", label: "Çözpun", description: "Bulmacalar" },
  { value: "online", label: "Online", description: "İnternet oyunları" },
];

export default function CreateClubPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    type: "sosyal",
    maxMembers: "500",
    rules: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Club created:", formData);
    alert("Kulüp başarıyla oluşturuldu!");
  };

  return (
    <div className="container mx-auto p-6 h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/clubs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Yeni Kulüp Oluştur</h1>
          <p className="text-muted-foreground">
            Kendi satranç topluluğunuzu kurun
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Upload */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            Kulüp Logosu
          </Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium">
              Logo yükleyin veya buraya sürükleyin
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, GIF (Max 5MB)
            </p>
            <input type="file" accept="image/*" className="hidden" />
          </div>
        </Card>

        {/* Temel Bilgiler */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Temel Bilgiler</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Kulüp Adı *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Örn: İstanbul Satranç Akademisi"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama *</Label>
            <textarea
              id="description"
              name="description"
              placeholder="Kulübünüzü kısaca açıklayın"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Konum</Label>
              <Input
                id="location"
                name="location"
                placeholder="İstanbul, Türkiye"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxMembers">Maksimum Üye Sayısı</Label>
              <Input
                id="maxMembers"
                name="maxMembers"
                type="number"
                value={formData.maxMembers}
                onChange={handleChange}
              />
            </div>
          </div>
        </Card>

        {/* Kulüp Türü */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Kulüp Türü</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {clubTypes.map((type) => (
              <label
                key={type.value}
                className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.type === type.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={type.value}
                  checked={formData.type === type.value}
                  onChange={handleChange}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium">{type.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </Card>

        {/* Kurallar */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Kulüp Kuralları</h2>
          <div className="space-y-2">
            <Label htmlFor="rules">Kurallar (İsteğe Bağlı)</Label>
            <textarea
              id="rules"
              name="rules"
              placeholder="Üyeleriniz için kurallar ve beklentiler..."
              value={formData.rules}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
            />
          </div>
        </Card>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Link href="/clubs" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              İptal
            </Button>
          </Link>
          <Button type="submit" className="flex-1">
            Kulübü Oluştur
          </Button>
        </div>
      </form>
    </div>
  );
}
