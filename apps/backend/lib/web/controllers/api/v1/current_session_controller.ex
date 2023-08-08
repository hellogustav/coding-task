defmodule Enroll.CurrentSessionController do
  use Enroll.Web, :controller
  use Enroll.Authenticated.Controller

  alias Enroll.Accounts
  alias Enroll.Accounts.Session

  def show(conn, _, session) do
    with {:ok, company} <- Session.get_active_company(session.company_id),
         {:ok, membership} <- Accounts.get_user_membership(session),
         {:ok, user} <- Accounts.get_user(membership.member_id) do
      conn
      |> render("show.json",
        company: company,
        user: user,
        role: session.role
      )
    else
      _ ->
        conn
        |> put_status(:unauthorized)
        |> put_view(Enroll.SessionView)
        |> render(:error, reason: :invalid_credentials)
    end
  end
end
