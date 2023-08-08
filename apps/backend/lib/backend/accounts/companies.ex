defmodule Enroll.Accounts.Companies do
  @moduledoc false

  import Ecto.Query

  alias Enroll.Repo

  alias Enroll.Accounts.{
    Company,
    Membership,
    Memberships,
    Session,
    Token,
    Tokens,
    User,
    Queries
  }

  @sortable_fields ~W[inserted_at]

  defdelegate authorize(action, resource, session), to: Enroll.Accounts.Company.Policy

  def get_company(company_id, opts \\ []) do
    preloads = Keyword.get(opts, :preload, [])

    Company
    |> Repo.get(company_id)
    |> Repo.preload(preloads)
    |> case do
      %Company{} = c -> {:ok, c}
      _ -> {:error, {:company, :not_found}}
    end
  end
end
