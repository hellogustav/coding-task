defmodule Enroll.SessionController do
  use Enroll.Web, :controller
  use Enroll.Authenticated.Controller

  alias Enroll.Accounts
  alias Enroll.Accounts.Session

  plug(BetterParams)

  action_fallback(Enroll.FallbackController)

  def create(conn, %{session: session_params}, _session) do
    with {:ok, {jwt, exp, company, user}} <- Session.authenticate(session_params),
         {:ok, membership} <- Accounts.get_user_membership(user, company) do
      conn
      |> put_status(:created)
      |> render("show.json",
        jwt: jwt,
        exp: exp,
        company: company,
        user: user,
        membership: membership
      )
    end
  end

  def delete(conn, params, _session) do
    with conn <- Session.delete(conn) do
      render(conn, "delete.json")
    end
  end
end
