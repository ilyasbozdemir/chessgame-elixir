# ♟️ Elixir Realtime Satranç Oyunu

Bu proje, **Elixir Phoenix** tabanlı bir **gerçek zamanlı satranç sunucusu**  
ve **Next.js + Zustand** altyapılı bir **modern web istemcisi** içerir.

Amaç; iki oyuncunun lobi sistemi üzerinden masaya katılıp  
**WebSocket bağlantısı**yla gerçek zamanlı bir satranç maçı oynamasını sağlamaktır.  
Ayrıca izleyiciler (spectator) devam eden maçları canlı olarak takip edebilir.

---

[![Elixir CI](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/elixir.yml/badge.svg)](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/elixir.yml)
[![Next.js Deploy](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/deploy.yml/badge.svg)](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/nextjs.yml)



## 🧱 Mimari Genel Bakış

```
chessgame-elixir/
├── apps/
│   └── chess-game/              # Next.js 15 (frontend, client)
├── server/
│   └── chess_realtime_server/   # Elixir Phoenix (backend, realtime)
└── README.md
```

**Teknolojiler:**

- ⚡ **Elixir Phoenix** – Realtime server (kanal yönetimi, websocket)
- 🧩 **Next.js 15 (App Router)** – Modern React frontend
- 🧠 **Zustand** – Global state management (oyun, oyuncu, masa)
- 💨 **TailwindCSS + shadcn/ui** – UI tasarımı ve responsive layout
- 🐳 **Docker / Postgres** – Geliştirme ortamı ve veritabanı altyapısı
- 🔁 **WebSocket Event Bridge** – Elixir ↔ Next.js arasında veri akışı
- ☁️ **Pulumi** – Kodla tanımlanabilir altyapı (IaC) yönetimi


---

## 🚀 Özellikler

### 🎮 Lobi Sistemi

- Oyuncular ad girerek lobiye katılır.
- Yeni masa oluşturabilir veya açık masalara katılabilirler.
- Oyuncular “hazırım” durumuna geçtiklerinde oyun başlatılabilir.

### ♟️ Oyun Tahtası

- Gerçek satranç kuralları ile hamle yapılabilir.
- Oyuncuların sırası ve taşların durumu gerçek zamanlı takip edilir.
- Hamle geçerliliği client-side’da kontrol edilir.
- Alınan taşlar ve sıralar anlık olarak görüntülenir.

### 🌐 İzleme (Spectate) Modu

- Devam eden maçlar canlı izlenebilir (`/spectate/[tableId]`).
- Oyuncuların durumları, hamle sırası ve tahtadaki hareketler anlık güncellenir.

### 🔒 Erişim Kontrolü (Route Guard)

- `/game` sayfasına yalnızca oyun başlatıldıysa erişim sağlanır.
- Diğer durumlarda kullanıcı otomatik olarak `/lobby` sayfasına yönlendirilir.

---

## ⚙️ Kurulum

### 1️⃣ Frontend (Next.js)

```bash
cd apps/chess-game
pnpm install
pnpm dev
```

Frontend: [http://localhost:3000](http://localhost:3000)

### 2️⃣ Backend (Elixir / Phoenix)

```bash
cd server/chess_realtime_server
mix deps.get
mix phx.server
```

Backend: [http://localhost:4000](http://localhost:4000)

---

## 🧩 Geliştirme Planı

- [x] Lobi oluşturma ve oyuncu yönetimi
- [x] Masa bazlı oyun akışı
- [x] Route guard & state yönetimi
- [x] Spectator (izleme) ekranı
- [ ] Elixir ↔ Next.js websocket köprüsü
- [ ] Postgres kalıcılığı
- [ ] Kimlik doğrulama
- [ ] Oyun geçmişi kaydı

---

## 👨‍💻 Geliştirici

**İlyas Bozdemir**  
Full-Stack Developer | React, .NET, Elixir, Docker  
🔗 [GitHub](https://github.com/ilyasbozdemir) • [LinkedIn](https://www.linkedin.com/in/bozdemir-ilyas/)
