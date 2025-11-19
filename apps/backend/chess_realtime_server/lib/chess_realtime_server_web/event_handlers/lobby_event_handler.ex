defmodule ChessRealtimeServerWeb.LobbyEventHandler do
alias ChessRealtimeServer.GameServer


def handle("lobby:player_join", payload, socket), do: GameServer.cast({:lobby_player_join, payload})
def handle("lobby:player_leave", payload, socket), do: GameServer.cast({:lobby_player_leave, payload})
def handle("lobby:table_created", payload, socket), do: GameServer.cast({:lobby_table_created, payload})
def handle("lobby:table_updated", payload, socket), do: GameServer.cast({:lobby_table_updated, payload})
def handle("lobby:table_removed", payload, socket), do: GameServer.cast({:lobby_table_removed, payload})


def handle(_event, _payload, _socket), do: :ok
end
