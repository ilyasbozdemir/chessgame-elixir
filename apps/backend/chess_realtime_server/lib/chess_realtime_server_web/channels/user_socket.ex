defmodule ChessRealtimeServerWeb.UserSocket do
  use Phoenix.Socket

  ## Kanallar
  channel "game:lobby", ChessRealtimeServerWeb.ChessChannel

  @impl true
  def connect(_params, socket, _connect_info), do: {:ok, socket}

  @impl true
  def id(_socket), do: nil
end
