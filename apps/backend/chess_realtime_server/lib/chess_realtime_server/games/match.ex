defmodule ChessRealtimeServer.Games.Match do
  use Ecto.Schema
  import Ecto.Changeset

  schema "matches" do
    field :status, :string, default: "playing"
    field :fen, :string, default: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    field :result, :string
    
    belongs_to :table, ChessRealtimeServer.Games.Table
    belongs_to :white_player, ChessRealtimeServer.Accounts.User
    belongs_to :black_player, ChessRealtimeServer.Accounts.User
    has_many :moves, ChessRealtimeServer.Games.Move

    timestamps(type: :utc_datetime)
  end

  def changeset(match, attrs) do
    match
    |> cast(attrs, [:status, :fen, :result, :table_id, :white_player_id, :black_player_id])
    |> validate_required([:table_id, :white_player_id, :black_player_id])
  end
end
