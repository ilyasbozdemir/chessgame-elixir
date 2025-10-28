# === 1. Builder aşaması ===
FROM hexpm/elixir:1.18.1-erlang-27.0.1-debian-bookworm-20240904 AS builder

# Ortam değişkenleri
ENV MIX_ENV=prod \
    LANG=C.UTF-8

# Sistem bağımlılıkları
RUN apt-get update -y && \
    apt-get install -y build-essential git curl npm && \
    npm install -g yarn

# Uygulama klasörü
WORKDIR /app

# Mix deps ve lock dosyaları kopyalanır
COPY mix.exs mix.lock ./
COPY config config

# Bağımlılıkları indir
RUN mix local.hex --force && \
    mix local.rebar --force && \
    mix deps.get --only $MIX_ENV

# Assets (varsa)
COPY assets assets
RUN cd assets && yarn install && yarn build

# Uygulama kodu
COPY lib lib
COPY priv priv

# Release derlemesi
RUN mix compile && \
    mix assets.deploy && \
    mix release

# === 2. Runner aşaması ===
FROM debian:bookworm-slim AS runner

RUN apt-get update -y && apt-get install -y libssl3 openssl ncurses-bin

WORKDIR /app

ENV MIX_ENV=prod \
    LANG=C.UTF-8 \
    SHELL=/bin/bash

# Builder’dan release kopyala
COPY --from=builder /app/_build/prod/rel ./

# Port
EXPOSE 4000

# Start komutu
CMD ["./chess_realtime_server/bin/chess_realtime_server", "start"]
