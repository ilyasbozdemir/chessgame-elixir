defmodule ChessRealtimeServerWeb.GenericEventHandler do
alias ChessRealtimeServer.GameServer


def handle("refresh_state", payload, socket), do: GameServer.cast({:refresh_state, payload})


def handle(_event, _payload, _socket), do: :ok
end
