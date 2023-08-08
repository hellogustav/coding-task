defmodule Enroll.Accounts.Session do
  alias Enroll.Repo
  alias Enroll.Accounts

  alias Enroll.Accounts.{
    Membership,
    Companies,
    Token,
    Tokens,
    Users
  }

  @moduledoc """
  The Session module handles creation and deletion of sessions

  The main method is `authentiate` which creates a new session in
  case the provided credentials and the underlying user are valid.

  We return "Invalid credentials" in most error cases in `authenticate`
  to make user enumeration harder.
  """

  @doc """
  Authenticates an user associated to a company
  using email, password and company name.
  """
  def authenticate(%{email: email, password: password}) do
    with {:ok, user} <- Accounts.find_user_by_email(String.downcase(email)),
         {:ok, user} <- Accounts.validate_user_password(user, password),
         {:ok, membership} <- Accounts.get_first_user_membership(user),
         {:ok, company} <- get_active_company(membership.company_id),
         {:ok, jwt, exp} <- do_authenticate(membership) do
      {:ok, {jwt, exp, company, user}}
    else
      error -> handle_error(error)
    end
  end

  @doc """
  Authorizes a session based on the given authorizations and load the
  authorized resource.
  """
  #
  # Loads the session's company and check its `company_type` against
  # the one passed as authorisations.
  #
  # Returns the authorized company.
  def authorize(%{company_id: company_id}, %{company_type: list_authorized})
      when is_list(list_authorized) do
    with {:ok, %{company_type: type} = company} <- Accounts.get_company(company_id) do
      case Enum.find(list_authorized, &(&1 == type)) do
        nil -> {:error, {type, :forbidden}}
        _type -> {:ok, company}
      end
    end
  end

  def authorize(%{}, %{resource_type: list_authorized})
      when is_list(list_authorized) do
    raise "undefined authorization"
  end

  @doc """
  Revokes the current token stored in the given `conn`.

  Returns `conn`.

  """
  def delete(conn) do
    case Guardian.Plug.current_claims(conn, key: :access) do
      nil ->
        conn

      %{} ->
        conn
        |> Guardian.Plug.current_token(key: :access)
        |> Enroll.Guardian.revoke()

        conn
    end
  end

  def get_membership(session) do
    case Accounts.get_user_membership(session) do
      {:ok, membership} -> {:ok, Repo.preload(membership, :company)}
      error -> error
    end
  end

  def get_active_company(company_id) do
    with {:ok, company} <- Companies.get_company(company_id) do
      {:ok, company}
    else
      err -> err
    end
  end

  defp handle_error({:error, :token_invalid, _error_msg}),
    do: {:error, :invalid_token}

  defp handle_error({:error, :token_expired, _error_msg}),
    do: {:error, :expired_token}

  defp handle_error({:error, :token_consumed, _error_msg}),
    do: {:error, :consumed_token}

  defp handle_error({:error, {:membership, :not_found}}),
    do: {:error, :no_active_membership}

  defp handle_error({:error, {_scope, _reason}}),
    do: {:error, :invalid_credentials}

  defp handle_error({:error, _error_id, _error_msg}),
    do: {:error, :invalid_credentials}

  defp handle_error({:error, :password_too_long}),
    do: {:error, :invalid_credentials}

  defp handle_error({:error, _scope, %Ecto.Changeset{} = changeset, _multi}),
    do: {:error, changeset}

  def do_authenticate(%Membership{} = membership, opt \\ []) do
    encode_with =
      case Keyword.get(opt, :admin_membership_id, nil) do
        nil -> {membership}
        admin_membership_id -> {membership, admin_membership_id}
      end

    encode_with
    |> create_access_token()
    |> create_timeout_token(encode_with)
  end

  defp create_access_token(encode_with) do
    encode_with
    |> Enroll.Guardian.encode_and_sign(%{}, token_type: :access)
    |> format_authenticate()
  end

  defp create_timeout_token({:ok, jwt}, encode_with) do
    encode_with
    |> Enroll.Guardian.encode_and_sign(%{}, token_type: :timeout)
    |> format_authenticate(jwt)
  end

  defp create_timeout_token(to_forward, _), do: to_forward

  defp format_authenticate({:ok, jwt, _claims}), do: {:ok, jwt}

  defp format_authenticate({:error, _reason}),
    do: {:error, :auth_failed, "Could not authenticate user"}

  defp format_authenticate({:ok, exp, _claims}, jwt), do: {:ok, jwt, exp}
end
