defmodule Enroll.AuthenticationTestHelpers do
  import Plug.Conn

  alias Enroll.Accounts

  @doc """
  Authenticates a membership with the according permissions.

  1- Fetches membership permission.
  2- Encodes and sign resources + permission.
  3- Puts JWT in header.
  4- Puts EXP in header.

  """
  def authenticate(conn, %{company: company, member: member}) do
    {:ok, membership} = Accounts.get_user_membership(member, company)
    {:ok, jwt, _} = Enroll.Guardian.encode_and_sign({membership}, %{}, token_type: :access)
    {:ok, exp, _} = Enroll.Guardian.encode_and_sign({membership}, %{}, token_type: :timeout)

    conn
    |> put_req_header("authorization", jwt)
    |> put_req_header("authorization-exp", exp)
  end
end
