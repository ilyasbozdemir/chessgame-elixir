# ♟️ Elixir Realtime Chess Game

This project includes a **real‑time chess server built with Elixir Phoenix**  
and a **modern web client powered by Next.js + Zustand**.

The goal is to let two players join a table via a lobby system and play a chess match  
in real time over a **WebSocket connection**. Spectators can also follow ongoing matches live.

---

[![Elixir CI](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/elixir.yml/badge.svg)](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/elixir.yml)
[![Next.js Deploy](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/deploy.yml/badge.svg)](https://github.com/ilyasbozdemir/chessgame-elixir/actions/workflows/nextjs.yml)

## 🧱 Architecture Overview

```
chessgame-elixir/
├── apps/
│   ├── chess-game-v1/               # 🧩 Legacy Next.js (V1)
│   ├── chess-game-v2/               # 🚀 Modern Dashboard (Next.js 15 + Tailwind v4)
│   ├── backend/
│   │   ├── chess_realtime_server/   # ⚡ Elixir Phoenix (Realtime Logic & Persistence)
└── README.md
```

**Technologies:**

- ⚡ **Elixir Phoenix** – Realtime game server (GenServer, Channels, Presence).
- 🧩 **Next.js 15 (App Router)** – V2 Dashboard with high-premium UI.
- 🔐 **GoTrue (Netlify/Supabase)** – Self-hosted JWT-based Authentication.
- 📦 **MinIO (S3 Compatible)** – Object storage for avatars and game assets.
- 🐘 **PostgreSQL 15** – Relational database for persistence (Users, Matches, Moves).
- 🔁 **Phoenix Channels** – Low-latency WebSocket bridge between Elixir ↔ React.

---

## 🚀 Services & Endpoints (Development)

| Service | Port | Description |
| :--- | :--- | :--- |
| **Frontend (V2)** | `3000` | UI Dashboard & Game Client |
| **Backend (API)** | `4000` | Phoenix Realtime Server |
| **Auth (GoTrue)** | `9999` | User Management & JWT Issuance |
| **Storage (MinIO)** | `9000` | S3 API (Storage) |
| **MinIO Console** | `9001` | Storage Management UI |
| **Postgres** | `5432` | Relational Database |

---

## ⚙️ Quick Start

### 1️⃣ Start Infrastructure (Docker)
```bash
docker compose up -d
```

### 2️⃣ Start Backend (Elixir)
```bash
cd apps/backend/chess_realtime_server
mix deps.get
mix ecto.setup
mix phx.server
```

### 3️⃣ Start Frontend (V2)
```bash
npm run frontend:dev
```

---

## 🧩 Roadmap

- [x] **Lobby System**: Realtime presence with "PRO" license status.
- [x] **Auth Integration**: GoTrue self-hosted authentication.
- [x] **Persistence**: Chess matches and moves saved to Postgres.
- [x] **Storage**: MinIO integration for profile assets.
- [x] **Chess Logic**: Rule validation (Migrated from V1).
- [ ] **Matchmaking**: Elo-based pairing algorithm.
- [ ] **Tournament System**: Swiss-style automated tournaments.

---

## 👨‍💻 Developer

**İlyas Bozdemir**  
Full‑Stack Developer | React, .NET, Elixir, Docker  
🔗 [GitHub](https://github.com/ilyasbozdemir) • [LinkedIn](https://www.linkedin.com/in/bozdemir-ilyas/)

