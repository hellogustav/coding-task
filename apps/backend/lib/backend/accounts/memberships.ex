defmodule Enroll.Accounts.Memberships do
  @moduledoc false

  import Ecto.Query

  alias Enroll.Accounts.{Membership, User, Company}
  alias Enroll.Repo

  @allowed_filters [:company_id]

  def get_first_user_membership(%User{id: user_id}, opts \\ []) do
    preloads = Keyword.get(opts, :preload, [])

    query =
      Membership
      |> Membership.by_member_id(user_id)
      |> build_search(opts)
      |> preload(^preloads)

    case Repo.all(query) do
      [%Membership{} = membership] -> {:ok, membership}
      [] -> {:error, {:membership, :not_found}}
    end
  end

  defp build_search(queryable, opts) do
    opts
    |> Keyword.get(:filters, %{})
    |> Enum.reduce(queryable, fn
      {field, val}, query when field in @allowed_filters ->
        where(query, [j], field(j, ^field) == ^val)

      _, query ->
        query
    end)
  end
end
