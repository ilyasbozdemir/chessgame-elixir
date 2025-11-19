defmodule ChessRealtimeServerWeb.ChatEventHandler do
alias ChessRealtimeServer.ChatServer


def handle("chat:new_message", payload, socket), do: ChatServer.cast({:new_message, payload})
def handle("chat:typing", payload, socket), do: ChatServer.cast({:typing, payload})
def handle("chat:read", payload, socket), do: ChatServer.cast({:read, payload})


def handle(_event, _payload, _socket), do: :ok
end
