defmodule ChessRealtimeServerWeb.ChessChannel do
  use Phoenix.Channel
  alias ChessRealtimeServerWeb.Presence

  # 🔹 Kayıtlı oyuncuların bağlandığı kanal
  def join("game:lobby:players", %{"name" => name}, socket) do
    IO.puts("✅ [PLAYER] #{name} kanala katıldı.")
    socket = assign(socket, :player_name, name)
    send(self(), :after_join)
    {:ok, socket}
  end

  # 🔹 Anonim oyuncuların bağlandığı kanal
  def join("game:lobby:guests", %{"name" => name}, socket) do
    IO.puts("🟡 [GUEST] #{name} kanala katıldı.")
    socket = assign(socket, :player_name, "[Guest] " <> name)
    send(self(), :after_join)
    {:ok, socket}
  end

  # 🔹 Oyuncu ismini güncelleme
  def handle_in("update_player", %{"name" => name}, socket) do
    IO.puts("📢 Oyuncu ismi güncellendi: #{name}")
    broadcast!(socket, "player_joined", %{name: name})
    {:noreply, assign(socket, :player_name, name)}
  end

  # 🔹 join sonrası presence & count bilgisi
  def handle_info(:after_join, socket) do
    player = socket.assigns[:player_name]

    {:ok, _presence} =
      Presence.track(socket, player, %{
        online_at: System.system_time(:second)
      })

    state = Presence.list(socket.topic)
    count = map_size(state)

    # 🟢 İlk state gönderimi
    push(socket, "presence_state", state)

    # 🟢 Güncel toplam sayıyı yayınla
    broadcast!(socket, "presence_count", %{count: count})

    IO.puts("📢 #{player} eklendi — şu anda #{count} aktif oyuncu var")

    {:noreply, socket}
  end

  # 🔹 Oyuncu ayrıldığında
  def terminate(_reason, socket) do
    player = socket.assigns[:player_name]

    # 🔸 Ayrıldıktan sonra count'u güncelle
    Process.send_after(self(), :update_count, 100)

    IO.puts("❌ #{player} kanaldan ayrıldı.")
    broadcast!(socket, "player_left", %{name: player})
    :ok
  end

  # 🔹 Ayrılık sonrası count'u yeniden hesapla
  def handle_info(:update_count, socket) do
    count = Presence.list(socket.topic) |> map_size()
    broadcast!(socket, "presence_count", %{count: count})
    {:noreply, socket}
  end
end
