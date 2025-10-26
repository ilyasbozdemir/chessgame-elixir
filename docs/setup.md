# ⚙️ ChessGame Elixir Setup Guide

Bu döküman, **Elixir Phoenix** tabanlı gerçek zamanlı satranç projesinin kurulumu ve çalıştırılması için temel adımları anlatır.  
Proje iki ana bileşenden oluşur:

- **Frontend:** Next.js (apps/chess-game)
- **Backend:** Elixir Phoenix (apps/realtime_server)

---

## 🚀 1. Gerekli Araçlar

Kurulmadan önce aşağıdaki araçların yüklü olduğundan emin olun:

- [Elixir](https://elixir-lang.org/install.html) `>= 1.16`
- [Node.js](https://nodejs.org/) `>= 20`
- [pnpm](https://pnpm.io/) (önerilen)
- [Docker](https://www.docker.com/) (isteğe bağlı)
- Git & VSCode

---

## 🧩 2. Projeyi Klonla

```bash
git clone https://github.com/ilyasbozdemir/chessgame-elixir.git
cd chessgame-elixir
```

---

## 🧠 3. Kurulum

### Frontend (Next.js)
```bash
cd apps/chess-game
pnpm install
pnpm dev
```
Çalıştırdıktan sonra:  
👉 http://localhost:3000 adresinden satranç lobisine erişebilirsin.

### Backend (Elixir Phoenix)
```bash
cd apps/realtime_server
mix deps.get
mix phx.server
```
Çalıştırdıktan sonra:  
👉 http://localhost:4000 adresi backend API ve WebSocket kanalıdır.

---

## 🧮 4. Yapı (Monorepo)

```
apps/
 ├─ chess-game/         # Next.js frontend (oyun arayüzü)
 └─ realtime_server/    # Elixir Phoenix backend (realtime engine)
lib/
 ├─ chess-store.ts      # Zustand store, oyun mantığı
 └─ chess-types.ts      # Tip tanımları
docs/
 ├─ setup.md            # Bu dosya
 └─ architecture.png     # (ileride eklenecek diyagram)
```

---

## 🧱 5. Geliştirme İpuçları

- `useChessStore` ve `useIdentityStore` state yönetimini sağlar.  
- Oyuncular `sessionStorage` içinde tutulur.  
- Elixir tarafı socket kanalını yönetir (`/topic:chess`).
- İleride testler `tests/` dizininde yer alacaktır.

---

## ✨ 6. Sonraki Adımlar

- [ ] Elixir `channels` bağlantısını aktif et  
- [ ] Oyun durumu senkronizasyonu ekle  
- [ ] Chess logic testleri (`tests/chess-logic.test.ts`) ekle  
- [ ] README’ye görseller ve bağlantılar ekle  

---

🧠 **Hazırlayan:** [İlyas Bozdemir](https://github.com/ilyasbozdemir)  
🎯 Full-Stack Developer — Elixir, Next.js, Docker, CI/CD
