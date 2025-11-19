defmodule ChessRealtimeServerWeb.MatchEventHandler do
  alias ChessRealtimeServer.GameServer

  def handle("match:start", payload, socket), do: GameServer.cast({:match_start, payload})
  def handle("match:move", payload, socket), do: GameServer.cast({:match_move, payload})
  def handle("match:reset", payload, socket), do: GameServer.cast({:match_reset, payload})
  def handle("match:finish", payload, socket), do: GameServer.cast({:match_finish, payload})
  def handle("match:resign", payload, socket), do: GameServer.cast({:match_resign, payload})
  def handle("match:offer_draw", payload, socket), do: GameServer.cast({:match_offer_draw, payload})
  def handle("match:accept_draw", payload, socket), do: GameServer.cast({:match_accept_draw, payload})
  def handle("match:decline_draw", payload, socket), do: GameServer.cast({:match_decline_draw, payload})
  def handle("match:timeout", payload, socket), do: GameServer.cast({:match_timeout, payload})

  def handle(_event, _payload, _socket), do: :ok
end
