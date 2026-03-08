defmodule ChessRealtimeServer.Games.Table do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tables" do
    field :name, :string
    field :status, :string, default: "waiting"
    field :password_hash, :string
    field :settings, :map, default: %{}
    
    belongs_to :creator, ChessRealtimeServer.Accounts.User
    has_one :match, ChessRealtimeServer.Games.Match

    timestamps(type: :utc_datetime)
  end

  def changeset(table, attrs) do
    table
    |> cast(attrs, [:name, :status, :password_hash, :settings, :creator_id])
    |> validate_required([:name, :creator_id])
  end
end
