defmodule ChessRealtimeServer.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      ChessRealtimeServerWeb.Telemetry,
      ChessRealtimeServer.Repo,
      {DNSCluster, query: Application.get_env(:chess_realtime_server, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: ChessRealtimeServer.PubSub},
      # Start a worker by calling: ChessRealtimeServer.Worker.start_link(arg)
      # {ChessRealtimeServer.Worker, arg},
      # Start to serve requests, typically the last entry
      ChessRealtimeServerWeb.Endpoint,
       ChessRealtimeServerWeb.Presence
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ChessRealtimeServer.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ChessRealtimeServerWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
