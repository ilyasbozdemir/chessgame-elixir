defmodule ChessRealtimeServerWeb.ChessChannel do
  use Phoenix.Channel
  alias ChessRealtimeServerWeb.Presence

  @impl true
  def join(topic, params, socket) do
    # topic: "game:lobby:players" | "game:table:123" | "game:event"
    name = Map.get(params, "name", "guest")

    socket =
      socket
      |> assign(:player_name, name)
      |> assign(:topic, topic)
      |> assign(:params, params)

    IO.puts("✅ [JOIN] #{name} joined #{topic}")

    send(self(), :after_join)
    {:ok, %{message: "joined #{topic}"}, socket}
  end

  # ----------------------------------------
  # join sonrası presence / state yönetimi
  # ----------------------------------------
  @impl true
  def handle_info(:after_join, socket) do
    topic = socket.assigns.topic
    player = socket.assigns.player_name

    # sadece lobby veya table için Presence takibi
    if String.contains?(topic, "lobby") or String.contains?(topic, "table") do
      {:ok, _} = Presence.track(socket, player, %{online_at: System.system_time(:second)})
      state = Presence.list(topic)
      count = map_size(state)

      push(socket, "presence_state", state)
      broadcast!(socket, "presence_count", %{count: count})
      IO.puts("📡 [PRESENCE] #{player} in #{topic} (#{count} online)")
    end

    {:noreply, socket}
  end

  # ----------------------------------------
  # tamamen dinamik event yöneticisi
  # ----------------------------------------
  @impl true
  def handle_in(event, payload, socket) do
    topic = socket.assigns.topic
    player = socket.assigns.player_name

    IO.puts("🎯 [EVENT] #{topic} :: #{event} from #{player}")

    # 1️⃣ event'i doğrudan broadcast et (tüm topic'e)
    broadcast!(socket, event, Map.put(payload, "sender", player))

    # 2️⃣ eğer özel bir handler varsa çağır
    dispatch_custom_handler(topic, event, payload, socket)
  end

  # özel handler varsa çalıştır (yoksa pas geç)
  defp dispatch_custom_handler(topic, event, payload, socket) do
    # örnek: game:table:123  → handler name: "table"
    type =
      topic
      |> String.split(":")
      |> Enum.at(1, "generic")

    module =
      Module.concat([ChessRealtimeServerWeb, String.capitalize(type) <> "EventHandler"])

    if Code.ensure_loaded?(module) and function_exported?(module, :handle, 3) do
      apply(module, :handle, [event, payload, socket])
    end

    {:noreply, socket}
  end

  # ----------------------------------------
  # ayrılma / temizlik
  # ----------------------------------------
  @impl true
  def terminate(_reason, socket) do
    topic = socket.assigns.topic
    player = socket.assigns.player_name
    IO.puts("❌ [LEAVE] #{player} left #{topic}")

    broadcast_from!(socket, "player_left", %{name: player})

    if String.contains?(topic, "lobby") or String.contains?(topic, "table") do
      Process.send_after(self(), :update_presence_count, 100)
    end

    :ok
  end

  @impl true
  def handle_info(:update_presence_count, socket) do
    topic = socket.assigns.topic
    count = Presence.list(topic) |> map_size()
    broadcast!(socket, "presence_count", %{count: count})
    {:noreply, socket}
  end
end
