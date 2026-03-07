defmodule ChessRealtimeServer.GameServer do
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
    Logger.info("🎮 GameServer started")
    {:ok, %{games: %{}, lobbies: %{}, tables: %{}}}
  end

  @impl true
  def handle_cast({event, payload}, state) do
    Logger.debug("🎮 GameServer received event: #{inspect(event)} with payload: #{inspect(payload)}")
    # Burada oyun mantığı, match-making, table yönetimi gibi işlemler yapılacak
    {:noreply, state}
  end
end
