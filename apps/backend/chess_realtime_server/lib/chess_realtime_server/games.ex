defmodule ChessRealtimeServer.Games do
  import Ecto.Query, warn: false
  alias ChessRealtimeServer.Repo
  alias ChessRealtimeServer.Games.{Table, Match, Move}

  # --- Tables ---
  def list_active_tables do
    Table
    |> where([t], t.status == "waiting")
    |> preload([:creator])
    |> Repo.all()
  end

  def create_table(attrs) do
    %Table{}
    |> Table.changeset(attrs)
    |> Repo.insert()
  end

  def get_table!(id), do: Repo.get!(Table, id)

  # --- Matches ---
  def create_match(attrs) do
    %Match{}
    |> Match.changeset(attrs)
    |> Repo.insert()
  end

  def update_match(match, attrs) do
    match
    |> Match.changeset(attrs)
    |> Repo.update()
  end

  def get_match!(id), do: Repo.get!(Match, id)

  # --- Moves ---
  def create_move(attrs) do
    %Move{}
    |> Move.changeset(attrs)
    |> Repo.insert()
  end
end
