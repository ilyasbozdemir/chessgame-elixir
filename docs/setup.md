# ⚙️ ChessGame Elixir Setup Guide

Bu doküman, **Elixir Phoenix** tabanlı gerçek zamanlı satranç projesinin kurulumu, altyapısı ve çalıştırma adımlarını anlatır.  
Proje üç ana bileşenden oluşur:

- **Frontend:** Next.js (apps/chess-game)  
- **Backend:** Elixir Phoenix (apps/backend/chess_realtime_server)  
- **Infrastructure:** Pulumi (infra/)

---

## 🚀 1. Gerekli Araçlar

Kurulmadan önce aşağıdaki araçların yüklü olduğundan emin olun:

- [Elixir](https://elixir-lang.org/install.html) `>= 1.16`
- [Node.js](https://nodejs.org/) `>= 20`
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Pulumi](https://www.pulumi.com/docs/install/) `>= 3.0`
- Git & VSCode

---

## 🧩 2. Projeyi Klonla

```bash
git clone https://github.com/ilyasbozdemir/chessgame-elixir.git
cd chessgame-elixir
```

---

## 🧠 3. Kurulum

### 🧱 Backend (Elixir Phoenix)
```bash
cd apps/backend/chess_realtime_server
mix deps.get
mix phx.server
```
➡️ Backend `http://localhost:4000` adresinde çalışır.

### 💻 Frontend (Next.js)
```bash
cd apps/chess-game
pnpm install
pnpm dev
```
➡️ Frontend `http://localhost:3000` adresinde açılır.

---

## ☁️ 4. Altyapı (Pulumi)

Proje, altyapı kaynaklarını **Pulumi** ile yönetir. Pulumi, Postgres, MongoDB ve gelecekteki servisleri otomatik olarak oluşturmak için kullanılır.

### Pulumi'yi kontrol et
```bash
pulumi version
```
Eğer yüklü değilse:
```bash
npm install -g pulumi
```

### Pulumi stack’lerini görüntüle
```bash
cd infra
pulumi stack ls
```

### Stack yoksa oluştur
```bash
pulumi stack init dev
```

### Altyapıyı ayağa kaldır
```bash
pulumi up
```
Bu komut, tanımlı tüm servisleri (Docker network, Postgres, MongoDB, API gateway vb.) otomatik oluşturur.

> 💡 Not: MongoDB bu altyapıya bağlıdır. Pulumi `infra/` altında hem Postgres hem MongoDB container’larını yönetir.

### Durdurmak için
```bash
pulumi destroy
```

---

## 🧮 5. Proje Yapısı

```
chessgame-elixir/
├── apps/
│   ├── chess-game/               # Next.js 15 frontend
│   ├── backend/
│   │   ├── chess_realtime_server/   # Elixir Phoenix backend
│   │   ├── mongodb/                 # MongoDB config
│   │   └── postgres/                # PostgreSQL config
│   └── _/                          # Görsel hizalama klasörü
│
├── infra/                         # ☁️ Pulumi altyapı tanımları
│   ├── Pulumi.yaml
│   ├── Pulumi.dev.yaml
│   ├── Pulumi.prod.yaml
│   └── index.ts
│
├── docs/                          # 📘 Dokümanlar
│   ├── setup.md
│   └── readme-assets/
│
├── tests/                         # 🔬 Testler
└── README.md
```

---

## 🧠 6. Geliştirme Notları

- **MongoDB** veritabanı Pulumi aracılığıyla otomatik olarak bağlanır.  
- **useIdentityStore** kaldırılmıştır, kimlik yönetimi artık tek bir **Zustand store** içinde yürütülmektedir.  
- **useChessStore** oyun mantığı, oyuncu state’i ve Phoenix Channel eventlerini yönetir.  
- Phoenix tarafında `Presence` ve `PubSub` aktif durumdadır.  
- Altyapı düzenlemeleri için `infra/` altındaki Pulumi script’leri kullanılmalıdır.

---

## 🧩 7. Yararlı Komutlar

| Komut | Açıklama |
|-------|-----------|
| `mix phx.server` | Backend'i başlat |
| `pnpm dev` | Frontend'i başlat |
| `pulumi up` | Altyapıyı oluştur |
| `pulumi destroy` | Altyapıyı kaldır |
| `mix ecto.reset` | Veritabanını sıfırla |
| `pnpm build` | Frontend production build |

---

## ✨ 8. Sonraki Adımlar

- [ ] Pulumi stack’lerini CI/CD entegrasyonuna dahil et  
- [ ] Realtime event testlerini tamamla  
- [ ] Dockerfile & docker-compose ekle  
- [ ] README’ye görsel ve demo linki ekle  

---

🧠 **Hazırlayan:** [İlyas Bozdemir](https://github.com/ilyasbozdemir)  
🎯 *Full-Stack Developer — Elixir, Next.js, Pulumi, Docker, CI/CD*

