defmodule ChessRealtimeServer.ChatServer do
  use GenServer
  require Logger

  # Client API
  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def cast(msg) do
    GenServer.cast(__MODULE__, msg)
  end

  # Server Callbacks
  @impl true
  def init(:ok) do
    Logger.info("💬 ChatServer started")
    {:ok, %{messages: [], active_rooms: []}}
  end

  @impl true
  def handle_cast({event, payload}, state) do
    Logger.debug("💬 ChatServer received event: #{inspect(event)} with payload: #{inspect(payload)}")
    # Burada mesaj loglama, küfür filtresi, oda yönetimi vb. yapılabilir
    {:noreply, state}
  end
end
