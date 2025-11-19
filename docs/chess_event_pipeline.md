# ChessRealtimeServer Event Pipeline - Notlar

Bu doküman proje root dizininde `docs/chess_event_pipeline.md` olarak tutulabilir. Dosya proje ile birlikte version control altında notları saklamak ve ileride referans almak için idealdir.

---

## 🔥 Eventler topic'e göre

### 1️⃣ Game / Table Eventleri (`game:table:123`)

- `move` → oyuncu hamle yaptı
- `resign` → oyuncu oyundan çekildi
- `offer_draw` → beraberlik teklifi
- `accept_draw` → kabul
- `chat_message` → oyun içi chat
- `timeout` → süre bitti
- `undo_request` → hamle geri isteği

### 2️⃣ Lobby Eventleri (`game:lobby:players`)

- `join_lobby` → kullanıcı katıldı
- `leave_lobby` → kullanıcı ayrıldı
- `ready` → oyun başlatmaya hazır
- `start_game` → oyun başlatıldı
- `cancel_game` → oyun iptal edildi

### 3️⃣ Chat Eventleri (`chat:*`)

- `chat:new_message` → mesaj gönderildi
- `chat:typing` → yazıyor bilgisi
- `chat:read` → okundu bilgisi
- `chat:join` / `chat:leave` → join/leave eventi

### 4️⃣ Generic / Diğer Eventler (`game:event`)

- Loglama, notifications, achievement, leaderboard update vb.

---

## 🔥 EventHandler Kullanımı

- Her topic türü için bir EventHandler modülü tanımlanır.
- `handle(event, payload, socket)` fonksiyonu event bazlı işleme yapılır.
- GenServer ile state yönetimi için `cast` veya `call` kullanılır.
- Fallback eventleri `:ok` ile ignore edilebilir.

### Örnek TableEventHandler

```elixir
defmodule ChessRealtimeServerWeb.TableEventHandler do
  alias ChessRealtimeServer.GameServer

  def handle("move", payload, socket) do
    table_id = get_table_id(socket.assigns.topic)
    GameServer.cast({:move, table_id, payload})
  end

  def handle("resign", payload, socket) do
    table_id = get_table_id(socket.assigns.topic)
    GameServer.cast({:resign, table_id, payload})
  end

  def handle(_event, _payload, _socket) do
    :ok
  end
end
```
