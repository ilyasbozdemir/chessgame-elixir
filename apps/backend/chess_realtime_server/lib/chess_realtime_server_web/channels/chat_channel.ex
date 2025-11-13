defmodule ChessRealtimeServerWeb.ChatChannel do
  use Phoenix.Channel
  alias ChessRealtimeServerWeb.Presence

  @impl true
  def join("chat:global", params, socket) do
    name = Map.get(params, "name", "guest")

    socket =
      socket
      |> assign(:username, name)
      |> assign(:topic, "chat:global")

    IO.puts("💬 [CHAT JOIN] #{name} joined GLOBAL chat")

    send(self(), :after_join)
    {:ok, %{message: "joined chat:global"}, socket}
  end

  # private chat → chat:private:<userId>
  def join("chat:private:" <> _user_id = topic, params, socket) do
    name = Map.get(params, "name", "guest")

    socket =
      socket
      |> assign(:username, name)
      |> assign(:topic, topic)

    IO.puts("🔐 [PRIVATE JOIN] #{name} joined #{topic}")

    send(self(), :after_join)
    {:ok, %{message: "joined #{topic}"}, socket}
  end

  # invalid topic
  def join(topic, _params, _socket) do
    IO.puts("❌ Invalid chat topic: #{topic}")
    {:error, %{reason: "invalid_topic"}}
  end

  # ------------------------------------------------------------
  # Presence join sonrası
  # ------------------------------------------------------------
  @impl true
  def handle_info(:after_join, socket) do
    topic = socket.assigns.topic
    user = socket.assigns.username

    {:ok, _} =
      Presence.track(socket, user, %{
        online_at: System.system_time(:second)
      })

    push(socket, "presence_state", Presence.list(topic))

    IO.puts("📡 [CHAT PRESENCE] #{user} active in #{topic}")

    {:noreply, socket}
  end

  # ------------------------------------------------------------
  # Chat events
  # ------------------------------------------------------------
  @impl true
  def handle_in("chat:new_message", payload, socket) do
    user = socket.assigns.username
    topic = socket.assigns.topic

    message =
      payload
      |> Map.put("sender", user)
      |> Map.put("ts", System.system_time(:millisecond))

    IO.puts("💬 [MESSAGE] #{topic} from #{user}")

    broadcast!(socket, "chat:new_message", message)
    {:reply, {:ok, %{status: "sent"}}, socket}
  end

  def handle_in("chat:typing", %{typing: is_typing}, socket) do
    broadcast_from!(
      socket,
      "chat:typing",
      %{user: socket.assigns.username, typing: is_typing}
    )

    {:noreply, socket}
  end

  def handle_in("chat:read", payload, socket) do
    broadcast_from!(
      socket,
      "chat:read",
      Map.put(payload, "reader", socket.assigns.username)
    )

    {:noreply, socket}
  end

  # fallback
  def handle_in(event, payload, socket) do
    IO.puts("⚠️ [UNKNOWN CHAT EVENT] #{event}")
    {:noreply, socket}
  end

  # ------------------------------------------------------------
  # Disconnect
  # ------------------------------------------------------------
  @impl true
  def terminate(_reason, socket) do
    topic = socket.assigns.topic
    user = socket.assigns.username

    IO.puts("❌ [CHAT LEAVE] #{user} left #{topic}")

    :ok
  end
end
