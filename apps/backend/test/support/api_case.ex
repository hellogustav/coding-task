defmodule Enroll.ApiCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require setting up a connection.

  Such tests rely on `Phoenix.ConnTest` and also
  imports other functionality to make it easier
  to build and query models.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate
  import Plug.Conn
  import Phoenix.ConnTest

  import Enroll.Factory

  @type role ::
          :none
          | :member
          | :admin
          | :owner
          | true
          | nil

  @type membership :: Enroll.Accounts.Membership.t()

  @type conn :: Plug.Conn.t()

  using do
    quote do
      # Import conveniences for testing with connections
      import Plug.Conn
      import Phoenix.ConnTest

      alias Enroll.Repo
      alias Enroll.Router.Helpers, as: Routes

      import Ecto.Query
      import Enroll.Factory
      import Enroll.TestHelpers
      import Enroll.ModelTestHelpers

      # The default endpoint for testing
      @endpoint Enroll.Endpoint
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Enroll.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Enroll.Repo, {:shared, self()})
    end

    {conn, membership} =
      Phoenix.ConnTest.build_conn()
      |> put_req_header("accept", "application/json")
      |> put_req_header("content-type", "application/json")
      |> add_authentication_headers(tags[:authenticated])

    {:ok,
     conn: conn, membership: membership, company: membership.company, user: membership.member}
  end

  @spec add_authentication_headers(conn, role) :: {conn, membership}
  defp add_authentication_headers(conn, nil),
    do: {conn, set_up_membership(nil)}

  defp add_authentication_headers(conn, user_role) do
    membership = set_up_membership(user_role)
    conn = conn |> Enroll.AuthenticationTestHelpers.authenticate(membership)
    {conn, membership}
  end

  # NOTE
  # Builds a membership with the given role `as`.

  # The given `as` can be nil either one of the RoleEnum role:
  # [
  #   :none,
  #   :member,
  #   :admin,
  #   :owner
  # ]

  # Note that if nil or true is given, the resulting membership will be
  # attributed a role of :member.
  @spec set_up_membership(role) :: membership
  defp set_up_membership(role) do
    user = build(:user) |> set_encrypted_password |> insert

    attrs = %{name: "gustav_test"}

    company = insert(:company, attrs)
    insert(:membership, company: company, member: user, role: role(role))
  end

  defp role(nil), do: role(:member)
  defp role(true), do: role(:member)

  defp role(as) do
    {:ok, role} = RoleEnum.cast(as)
    role
  end
end
