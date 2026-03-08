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
  alias ChessRealtimeServer.Games
  alias ChessRealtimeServer.Accounts

  # Server Callbacks
  @impl true
  def init(:ok) do
    Logger.info("🎮 GameServer started")
    {:ok, %{active_matches: %{}, lobbies: %{}}}
  end

  @impl true
  def handle_cast({:lobby_player_join, payload}, state) do
    Logger.info("📡 Player joined lobby: #{inspect(payload)}")
    # Check if user exists, sync with database if needed
    name = payload["name"]
    email = payload["email"]
    
    # Simple auto-create if needed
    unless Accounts.get_user_by_email(email) do
       Accounts.create_user(%{email: email, username: name, password_hash: "placeholder"})
    end
    
    {:noreply, state}
  end

  @impl true
  def handle_cast({:match_start, payload}, state) do
     # Save to DB matches
     case Games.create_match(payload) do
        {:ok, match} -> 
           Logger.info("🏁 Match started in DB ID: #{match.id}")
        {:error, _reason} ->
           Logger.error("Failed to start match in DB")
     end
     {:noreply, state}
  end

  @impl true
  def handle_cast({:match_move, payload}, state) do
     # Persist move
     Games.create_move(payload)
     {:noreply, state}
  end

  @impl true
  def handle_cast({event, payload}, state) do
    Logger.debug("🎮 GameServer received generic event: #{inspect(event)} with payload: #{inspect(payload)}")
    {:noreply, state}
  end
end
