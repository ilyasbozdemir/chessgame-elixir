defmodule ChessRealtimeServerWeb.DefaultController do
  use ChessRealtimeServerWeb, :controller

  def index(conn, _params) do
    json(conn, %{status: "ok", message: "Chess Realtime Server is running 🚀"})
  end
end
