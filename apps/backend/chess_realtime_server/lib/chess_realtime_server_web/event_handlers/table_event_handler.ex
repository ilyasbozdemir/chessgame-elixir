defmodule ChessRealtimeServerWeb.TableEventHandler do
  alias ChessRealtimeServer.GameServer

  def handle("table:created", payload, socket), do: GameServer.cast({:table_created, payload})
  def handle("table:updated", payload, socket), do: GameServer.cast({:table_updated, payload})
  def handle("table:player_join", payload, socket), do: GameServer.cast({:player_joined, payload})
  def handle("table:player_leave", payload, socket), do: GameServer.cast({:player_left, payload})
  def handle("table:removed", payload, socket), do: GameServer.cast({:table_removed, payload})

  def handle(_event, _payload, _socket), do: :ok
end
