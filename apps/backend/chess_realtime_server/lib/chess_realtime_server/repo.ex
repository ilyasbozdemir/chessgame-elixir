defmodule ChessRealtimeServer.Repo do
  use Ecto.Repo,
    otp_app: :chess_realtime_server,
    adapter: Ecto.Adapters.Postgres
end
