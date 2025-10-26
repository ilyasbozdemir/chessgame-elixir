defmodule ChessRealtimeServerWeb.ChessChannel do
  use Phoenix.Channel

  def join("game:lobby", %{"name" => name}, socket) do
    IO.puts("✅ #{name} kanala katıldı.")
    socket = assign(socket, :player_name, name)

    send(self(), :after_join)

    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    player = socket.assigns[:player_name]
    IO.puts("📢 Oyuncu yayını gönderiliyor: #{player}")
    broadcast!(socket, "player_joined", %{name: player})
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    player = socket.assigns[:player_name]
    IO.puts("❌ #{player} kanaldan ayrıldı.")
    broadcast!(socket, "player_left", %{name: player})
    :ok
  end
end
