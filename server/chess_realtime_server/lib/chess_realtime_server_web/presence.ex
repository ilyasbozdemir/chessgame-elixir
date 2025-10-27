defmodule ChessRealtimeServerWeb.Presence do
  use Phoenix.Presence,
    otp_app: :chess_realtime_server,
    pubsub_server: ChessRealtimeServer.PubSub
end
