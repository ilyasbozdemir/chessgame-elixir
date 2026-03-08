defmodule ChessRealtimeServer.Games.Move do
  use Ecto.Schema
  import Ecto.Changeset

  schema "moves" do
    field :from_square, :string
    field :to_square, :string
    field :piece, :string
    field :fen_after, :string
    field :move_number, :integer
    
    belongs_to :match, ChessRealtimeServer.Games.Match
    belongs_to :player, ChessRealtimeServer.Accounts.User

    timestamps(type: :utc_datetime)
  end

  def changeset(move, attrs) do
    move
    |> cast(attrs, [:from_square, :to_square, :piece, :fen_after, :move_number, :match_id, :player_id])
    |> validate_required([:from_square, :to_square, :piece, :move_number, :match_id, :player_id])
  end
end
