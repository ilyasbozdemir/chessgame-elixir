defmodule ChessRealtimeServer.Repo.Migrations.CreateTablesAndGames do
  use Ecto.Migration

  def change do
    create table(:tables) do
      add :name, :string, null: false
      add :status, :string, default: "waiting"
      add :password_hash, :string
      add :settings, :map
      add :creator_id, references(:users, on_delete: :nilify_all)

      timestamps(type: :utc_datetime)
    end

    create table(:matches) do
      add :status, :string, default: "playing"
      add :fen, :text, default: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      add :result, :string
      add :table_id, references(:tables, on_delete: :delete_all)
      add :white_player_id, references(:users, on_delete: :nilify_all)
      add :black_player_id, references(:users, on_delete: :nilify_all)

      timestamps(type: :utc_datetime)
    end

    create table(:moves) do
      add :match_id, references(:matches, on_delete: :delete_all)
      add :player_id, references(:users, on_delete: :nilify_all)
      add :from_square, :string
      add :to_square, :string
      add :piece, :string
      add :fen_after, :text
      add :move_number, :integer

      timestamps(type: :utc_datetime)
    end

    create index(:tables, [:creator_id])
    create index(:matches, [:table_id])
    create index(:matches, [:white_player_id])
    create index(:matches, [:black_player_id])
    create index(:moves, [:match_id])
    create index(:moves, [:player_id])
  end
end
