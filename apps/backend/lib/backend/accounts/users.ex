defmodule Enroll.Accounts.Users do
  alias Enroll.Repo
  alias Enroll.Accounts.User

  import Ecto.Query

  def get_user(user_id, preloads \\ []) do
    from(u in User,
      where: u.id == ^user_id,
      preload: ^preloads
    )
    |> Repo.one()
    |> case do
      nil -> {:error, {:user, :not_found}}
      user -> {:ok, user}
    end
  end

  def get_by(attrs) do
    case Repo.get_by(User, attrs) do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end
end
