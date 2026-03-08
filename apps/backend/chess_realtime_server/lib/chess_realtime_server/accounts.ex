defmodule ChessRealtimeServer.Accounts do
  import Ecto.Query, warn: false
  alias ChessRealtimeServer.Repo
  alias ChessRealtimeServer.Accounts.User

  def list_users, do: Repo.all(User)

  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by_email(email), do: Repo.get_by(User, email: email)

  def get_user_by_username(username), do: Repo.get_by(User, username: username)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  # --- License Validation ---
  def is_license_valid?(%User{} = user) do
    # Simple check: is it expired?
    case user.license_expires_at do
      nil -> false
      expires_at -> 
        DateTime.compare(expires_at, DateTime.utc_now()) == :gt
    end
  end

  def is_license_valid?(_), do: false

  # Update license
  def update_license(user, key, days \\ 30) do
    expires_at = DateTime.utc_now() |> DateTime.add(days * 24 * 60 * 60, :second)
    update_user(user, %{license_key: key, license_expires_at: expires_at, is_active: true})
  end
end
