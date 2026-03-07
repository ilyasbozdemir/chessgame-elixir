defmodule ChessRealtimeServer.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :password_hash, :string
      add :username, :string
      add :avatar_url, :string
      add :is_active, :boolean, default: false, null: false
      add :license_key, :string
      add :license_expires_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end
  end
end
