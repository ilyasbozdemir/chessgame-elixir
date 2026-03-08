# ♟️ Elixir Realtime Chess Game

This project is a **real‑time chess platform** built with:
- **Elixir Phoenix** — WebSocket game server (GenServer, Channels, Presence)
- **Next.js 15** — Premium game dashboard + SaaS landing page
- **pnpm Workspaces** — Monorepo package management

---

[![Elixir CI](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/elixir.yml/badge.svg)](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/elixir.yml)
[![Next.js Deploy](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/deploy.yml/badge.svg)](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/nextjs.yml)

---

## 🧱 Architecture Overview

```
chessgame-elixir/
├── apps/
│   ├── chess-game/               # 🚀 Ana Uygulama — Game Dashboard (port 3001)
│   ├── chess-game-saas/          # 🎨 SaaS Landing Page (port 3000)
│   ├── chess-game-v1/            # 📦 Legacy (arşiv, port 3002)
│   ├── chess-game-v2/            # 📦 Premium standalone (arşiv, port 3003)
│   └── backend/
│       └── chess_realtime_server/ # ⚡ Elixir Phoenix (port 4000)
├── .devcontainer/                # 🐳 VS Code Dev Container
├── docker-compose.yml            # 🐳 Full stack (6 servis)
└── README.md
```

**Technologies:**

- ⚡ **Elixir Phoenix** — Realtime game server (GenServer, Channels, Presence)
- 🧩 **Next.js 15** — App Router, React 19, Tailwind CSS v4
- 🔐 **GoTrue (Supabase Auth)** — Self-hosted JWT authentication
- 📦 **MinIO (S3 Compatible)** — Object storage for avatars & game assets
- 🐘 **PostgreSQL 15** — Relational database (Users, Matches, Moves)
- 🔁 **Phoenix Presence** — Real-time online player tracking

---

## 🚀 Services & Endpoints (Development)

| Service | Port | Description |
| :--- | :--- | :--- |
| **SaaS Landing** | `3000` | Pazarlama / Landing Page |
| **Chess App** | `3001` | Ana Oyun Uygulaması |
| **Backend (Phoenix)** | `4000` | Realtime WebSocket Server |
| **Auth (GoTrue)** | `9999` | User Management & JWT |
| **Storage (MinIO)** | `9000` | S3 API |
| **MinIO Console** | `9001` | Storage UI |
| **Postgres** | `5432` | Veritabanı |

---

## ⚙️ Quick Start

### Seçenek 1 — Lokal Geliştirme

```bash
# 1. Altyapıyı başlat (DB + Auth + MinIO)
pnpm run infra:up

# 2. Backend (Elixir Phoenix)
pnpm run backend:setup   # ilk kurulumda bir kez
pnpm run backend:dev

# 3. Frontend'ler (ayrı terminallerde)
pnpm run saas:dev        # → http://localhost:3000
pnpm run app:dev         # → http://localhost:3001
```

### Seçenek 2 — Tam Docker Stack

```bash
# Tüm servisleri ayağa kaldır (hot-reload dahil)
pnpm run docker:dev

# Ya da arka planda
pnpm run docker:up
pnpm run docker:logs
```

### Seçenek 3 — VS Code Dev Container

1. **Remote Explorer** → `Dev Containers: Reopen in Container`
2. Tüm portlar otomatik forward edilir
3. `pnpm install` otomatik çalışır

---

## 📜 Tüm Scriptler

| Script | Açıklama |
| :--- | :--- |
| `pnpm run infra:up` | DB + Auth + MinIO başlat |
| `pnpm run infra:down` | Altyapıyı durdur |
| `pnpm run backend:dev` | Elixir Phoenix sunucu |
| `pnpm run saas:dev` | SaaS landing (3000) |
| `pnpm run app:dev` | Ana uygulama (3001) |
| `pnpm run v1:dev` | Legacy arşiv (3002) |
| `pnpm run v2:dev` | Premium arşiv (3003) |
| `pnpm run docker:dev` | Tüm stack Docker'da |
| `pnpm run docker:up` | Stack arka planda |
| `pnpm run docker:down` | Stack durdur |
| `pnpm run docker:logs` | Log akışı |

---

## 🧩 Roadmap

- [x] **Lobby System** — Realtime presence, PRO license badge
- [x] **Auth Integration** — GoTrue self-hosted JWT
- [x] **Persistence** — Matches & moves saved to Postgres
- [x] **Storage** — MinIO for profile assets
- [x] **Chess Logic** — Full rule validation
- [x] **Real-time Chat** — Global lobby chat via Phoenix Channels
- [x] **Mobile Navigation** — Bottom nav with presence counter
- [ ] **Matchmaking** — Elo-based pairing
- [ ] **Tournament System** — Swiss-style brackets
- [ ] **AI Bot** — Chess engine + LLM hybrid

---

## 👨‍💻 Developer

**İlyas Bozdemir**  
Full‑Stack Developer | React, .NET, Elixir, Docker  
🔗 [GitHub](https://github.com/ilyasbozdemir) • [LinkedIn](https://www.linkedin.com/in/bozdemir-ilyas/)
