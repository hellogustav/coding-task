defmodule Enroll.Accounts.Queries.CompanyQuery do
  @moduledoc false

  import Ecto.Query

  alias Enroll.{Repo, Accounts}
  alias Enroll.Accounts.{Company, User}

  def member_active(query \\ Accounts.User) do
    from(u in query, where: not is_nil(u.encrypted_password))
  end
end
