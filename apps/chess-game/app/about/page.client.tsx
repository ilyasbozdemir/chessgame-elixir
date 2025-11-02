"use client";

import React from "react";

interface PageClientProps {
  //
}

const PageClient: React.FC<PageClientProps> = ({}) => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl space-y-8">
      <h1 className="text-4xl font-bold">Hakkında</h1>

      <p className="text-muted-foreground leading-relaxed">
        Bu proje;{" "}
        <strong>öğrenme, geliştirme ve deneyim kazanma amacıyla</strong>{" "}
        oluşturulmuş açık kaynaklı bir satranç uygulamasıdır. Ticari bir ürün
        değildir ve herhangi bir gelir modeli bulunmamaktadır.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Neler Kullanıldı?</h2>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>
            ⚡ <strong>Elixir Phoenix</strong> — Gerçek zamanlı websocket
            altyapısı
          </li>
          <li>
            🌐 <strong>Next.js 15</strong> — Modern React App Router yapısı
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
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Yasal Bilgilendirme</h2>

        <p className="text-muted-foreground leading-relaxed">
          Bu yazılım yalnızca **demo, eğitim ve kişisel kullanım** içindir.  
          <strong className="text-foreground">
            İzin alınmadan ticari amaçla kullanılamaz, satılamaz veya yeniden
            dağıtılamaz.
          </strong>
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Yazılımın kullanımı sonucu doğabilecek maddi, hukuki veya ticari
          sorumluluklar tamamen kullanıcıya aittir. Geliştirici herhangi bir
          yükümlülük kabul etmez.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Proje ismi, marka kimliği ve yazılım bütünlüğü geliştirici tarafından
          korunmaktadır. Ticari kullanım talebiniz varsa iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">İletişim & Katkı</h2>
        <p className="text-muted-foreground">
          Projeye katkı sağlamak isterseniz GitHub üzerinden PR açabilirsiniz.
          Sorularınız veya iş birliği talepleriniz için iletişime geçmekten
          çekinmeyin.
        </p>
      </div>

      <p className="pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} – Eğitim & Deneyim Amaçlı Geliştirilmiştir
      </p>
    </div>
  );
};

export default PageClient;