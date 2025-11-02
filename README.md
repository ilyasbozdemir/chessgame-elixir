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
│   ├── chess-game/                  # 🧩 Next.js 15 (frontend)
│   ├── backend/                     # ⚙️ backend layer
│   │   ├── chess_realtime_server/   # Elixir Phoenix (realtime backend)
│   │   ├── mongodb/                 # MongoDB service/config
│   │   └── postgres/                # PostgreSQL service/config
└── README.md
```

**Technologies:**

- ⚡ **Elixir Phoenix** – Realtime server (channel management, WebSocket)
- 🧩 **Next.js 15 (App Router)** – Modern React frontend
- 🧠 **Zustand** – Global state management (game, player, table)
- 💨 **TailwindCSS + shadcn/ui** – UI design and responsive layout
- 🐳 **Docker / Postgres** – Development environment and database layer
- 🔁 **WebSocket Event Bridge** – Data flow between Elixir ↔ Next.js
- ☁️ **Pulumi** – Infrastructure‑as‑Code (IaC) management

---

## 🚀 Features

### 🎮 Lobby System

- Players join the lobby by entering a name.
- They can create a new table or join open tables.
- When both players mark themselves “ready”, the game can start.

### ♟️ Realtime Chess Board

- Valid chess moves according to the rules.
- Turn order and piece positions are tracked in real time.
- Client‑side validation for move legality.
- Captured pieces and turns are displayed live.

### 🌐 Spectate Mode

- Ongoing matches can be watched live (`/spectate/[gameId]`).
- Player states, turn order, and board movements update in real time.

---

## ⚙️ Setup

### 1️⃣ Frontend (Next.js)

```bash
cd apps/chess-game
pnpm install
pnpm dev
```

Frontend: <http://localhost:3000>

### 2️⃣ Backend (Elixir / Phoenix)

```bash
cd apps/backend/chess_realtime_server
mix deps.get
mix phx.server
```

Backend: <http://localhost:4000>

---

## 🧩 Roadmap

- [x] Lobby creation and player management
- [x] Table‑scoped game flow
- [x] Route guards & state management
- [x] Spectator (watch) screen
- [ ] Elixir ↔ Next.js WebSocket bridge
- [ ] Postgres persistence
- [ ] Authentication
- [ ] Game history storage

---

## 👨‍💻 Developer

**İlyas Bozdemir**  
Full‑Stack Developer | React, .NET, Elixir, Docker  
🔗 [GitHub](https://github.com/ilyasbozdemir) • [LinkedIn](https://www.linkedin.com/in/bozdemir-ilyas/)
