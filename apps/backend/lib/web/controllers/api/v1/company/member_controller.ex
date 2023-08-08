defmodule Enroll.Company.MemberController do
  @moduledoc false
  use Enroll.Web, :controller
  use Enroll.Authenticated.Controller

  alias Enroll.Accounts
  alias Accounts.Membership

  plug(BetterParams)

  action_fallback(Enroll.FallbackController)

  def index(conn, params, session) do
    with :ok <- Bodyguard.permit(Accounts, :list_members, params, session),
         {members, total_counter, paginate} <- Accounts.get_company_members(params, session) do
      render(conn, "index.json",
        members: members,
        total_counter: total_counter,
        paginate: paginate
      )
    end
  end

  def create(conn, %{"user" => user_params, "role" => role} = params, session) do
    with :ok <- Bodyguard.permit(Accounts, :invite_member, role, session),
         {:ok, %{user: user}} <-
           Accounts.invite_member(
             session.company_id,
             session,
             user_params,
             role,
             nil
           ) do
      conn
      |> put_status(:created)
      |> put_view(Enroll.Company.MemberView)
      |> render("created.json", member: user)
    end
  end

  def update(conn, %{"id" => user_id, "role" => role}, %{company_id: company_id} = session) do
    with %Membership{} = membership <- Accounts.get_membership({company_id, user_id}),
         :ok <-
           Bodyguard.permit(Accounts, :update_member, {membership.role, role}, session),
         {:ok, _} <- Accounts.update_membership(company_id, user_id, %{role: role}) do
      json(conn, %{})
    else
      nil -> {:error, :not_found}
    end
  end

  def delete(conn, %{"id" => user_id} = params, %{company_id: company_id} = session) do
    with %Membership{} = membership <- Accounts.get_membership({company_id, user_id}),
         :ok <- Bodyguard.permit(Accounts, :remove_member, membership.role, session),
         {:ok, _} <- Accounts.remove_membership(membership, params) do
      json(conn, %{})
    else
      nil ->
        {:error, :not_found}

      {:error, _failed_operation, _failed_value, _changes_so_far} ->
        {:error, :unprocessable_entity}
    end
  end

  def resend_invite(conn, %{"id" => user_id}, session) do
    with {:ok, company} <- Accounts.get_company(session.company_id),
         {:ok, user} <- Accounts.get_user(user_id),
         {:ok, _} <- Accounts.resend_invite(company, session, user, nil) do
      json(conn, %{})
    else
      {:error, _failed_operation, _changeset, _changes} ->
        conn
        |> put_status(500)
        |> render("error.json", reason: "Could not send invite")

      error ->
        error
    end
  end
end
