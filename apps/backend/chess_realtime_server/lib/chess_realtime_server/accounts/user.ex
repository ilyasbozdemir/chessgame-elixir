defmodule ChessRealtimeServer.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :password_hash, :string
    field :username, :string
    field :avatar_url, :string
    field :is_active, :boolean, default: false
    field :license_key, :string
    field :license_expires_at, :utc_datetime

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password_hash, :username, :avatar_url, :is_active, :license_key, :license_expires_at])
    |> validate_required([:email, :password_hash, :username, :avatar_url, :is_active, :license_key, :license_expires_at])
  end
end
