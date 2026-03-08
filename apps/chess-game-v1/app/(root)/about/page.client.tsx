"use client";

import { ProjectInfoSection } from "@/components/project-info-section";
import React from "react";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  return (
    <React.Fragment>
      <h1 className="text-4xl font-bold tracking-tight">Hakkında</h1>

      <p className="text-muted-foreground leading-relaxed max-w-2xl">
        Bu proje,{" "}
        <strong>öğrenme, geliştirme ve deneyim kazanma amacıyla</strong>{" "}
        oluşturulmuş açık kaynaklı bir satranç uygulamasıdır. Ticari bir ürün
        değildir ve herhangi bir gelir modeli bulunmamaktadır.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Neler Kullanıldı?</h2>
      <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
        <li>
          ⚡ <strong>Elixir Phoenix</strong> — Gerçek zamanlı websocket
          altyapısı
        </li>
        <li>
          🌐 <strong>Next.js 16</strong> — Modern React App Router yapısı
        </li>
        <li>
          🎨 <strong>TailwindCSS + Shadcn/UI</strong> — UI bileşenleri
        </li>
        <li>
          🧠 <strong>Zustand</strong> — Global state yönetimi
        </li>
        <li>
          📡 <strong>MongoDB & Mongoose</strong> — Veri depolama
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">Proje Durumu</h2>

      <ProjectInfoSection />

      <h2 className="text-2xl font-semibold mt-8">Yasal Bilgilendirme</h2>
      <p className="text-muted-foreground leading-relaxed max-w-2xl">
        Yazılım yalnızca <strong>demo, eğitim ve kişisel kullanım</strong>{" "}
        içindir.
        <strong className="text-foreground">
          {" "}
          İzin alınmadan ticari amaçla kullanılamaz, satılamaz veya yeniden
          dağıtılamaz.
        </strong>
      </p>

      <p className="text-muted-foreground leading-relaxed max-w-2xl">
        Kullanım sonucu doğabilecek maddi, hukuki veya ticari sorumluluklar
        tamamen kullanıcıya aittir. Geliştirici herhangi bir yükümlülük kabul
        etmez.
      </p>

      <h2 className="text-2xl font-semibold mt-8">İletişim & Katkı</h2>
      <p className="text-muted-foreground leading-relaxed max-w-2xl">
        Projeye katkı sağlamak isterseniz GitHub üzerinden PR açabilirsiniz.
        Sorularınız veya iş birliği talepleriniz için iletişime geçmekten
        çekinmeyin.
      </p>

      <p className="pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} – Eğitim & Deneyim Amaçlı Geliştirilmiştir
      </p>
    </React.Fragment>
  );
};

export default PageClient;
