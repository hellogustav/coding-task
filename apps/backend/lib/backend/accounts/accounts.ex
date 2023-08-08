defmodule Enroll.Accounts do
  @moduledoc """
  Interface Module
  """

  import Ecto.Query
  import Ecto.Changeset

  alias Ecto.{Multi, Changeset}
  alias Plug.Conn

  alias Enroll.{Accounts, PaginateHelper,  Repo}

  alias Enroll.Accounts.{
    Companies,
    Company,
    Membership,
    Memberships,
    Policy,
    Session,
    User,
    Users,
    Token,
    Tokens
  }

  alias Enroll.Accounts.Queries.{CompanyQuery, MembershipBy}

  require Logger

  defdelegate get_user(user_id), to: Users
  defdelegate authorize(action, resource_info, session_info), to: Policy
  defdelegate get_company(id, opts \\ []), to: Companies
  defdelegate get_first_user_membership(user), to: Memberships
  defdelegate get_first_user_membership(user, opts), to: Memberships

  defdelegate bump_token_expiration_date(token, date_time_in_seconds),
    to: Tokens,
    as: :bump_expiration_date

  @half_year 60 * 60 * 24 * 30 * 6

  def get_user_by_email(email, preloads \\ []) do
    User
    |> Repo.get_by(email: email)
    |> Repo.preload(preloads)
  end

  ### Membership APIs

  @doc """
  Lists memberships.

  Optional filters and preload can be given.

    * filters can be apply on memberships itself

      `[filters: %{role: :admin}]`

    * filters can be apply on assocs

      `[filters: %{company: {company_type: :administrator}}]`

  """

  def get_membership(search_by, opts \\ []) do
    preload = Keyword.get(opts, :preload, [])

    do_get_membership(search_by)
    |> Repo.preload(preload)
  end

  defp do_get_membership(%{user_id: user_id, company_id: company_id}) do
    Repo.get_by(Membership, company_id: company_id, member_id: user_id)
  end

  defp do_get_membership({company_id, user_id}) do
    Repo.get_by(Membership, company_id: company_id, member_id: user_id)
  end

  defp do_get_membership(membership_id) do
    Repo.get(Membership, membership_id)
  end

  def get_user_membership(%User{id: user_id}, %Company{id: company_id}) do
    get_user_membership(%{member_id: user_id, company_id: company_id})
  end

  def get_user_membership(%{user_id: user_id, company_id: company_id}) do
    get_user_membership(%{member_id: user_id, company_id: company_id})
  end

  def get_user_membership(%{member_id: user_id, company_id: company_id}) do
    Membership
    |> Repo.get_by(member_id: user_id, company_id: company_id)
    |> case do
      nil ->
        {
          :error,
          :member_not_found,
          "A member with member_id #{inspect(user_id)} does not exist for company_id #{inspect(company_id)}"
        }

      membership ->
        {:ok, membership}
    end
  end

  def get_user_membership(%{id: user_id}) do
    Membership
    |> Repo.get_by(member_id: user_id)
    |> case do
      nil -> {:error, {:membership, :not_found}}
      membership -> {:ok, membership}
    end
  end

  def is_member?(company_id, user_id) when is_binary(company_id) and is_binary(user_id),
    do: !!do_get_membership({company_id, user_id})

  def is_member?(_, _), do: false

  @doc """
  Retrieve all members of a company
  """
  @spec get_company_members(map, map) :: [Ecto.Schema.t()] | []
  def get_company_members(%{filters: %{counter: counter_type}} = params, session) do
    {entries, _, pagination} =
      get_company_members(update_in(params[:filters], &Map.delete(&1, :counter)), session)

    {entries, nil, pagination}
  end

  def get_company_members(params, %{company_id: company_id}) do
    token_type = elem(TokenTypeEnum.dump(:signup), 1)
    {:ok, company_shortuuid} = Enroll.EctoShortUUID.cast(company_id)

    data =
      from(cm in Membership,
        join: m in assoc(cm, :member),
        left_lateral_join: t in fragment("
      (SELECT t.consumed FROM tokens as t
      WHERE t.user_id = ?
      AND t.type = ?
      AND metadata->>'company_id' = ?
      ORDER BY t.consumed DESC, t.inserted_at DESC
      LIMIT 1)", m.id, ^token_type, ^company_shortuuid),
        where: cm.company_id == ^company_id,
        select: %{
          id: m.id,
          role: cm.role,
          email: m.email,
          first_name: m.first_name,
          last_name: m.last_name,
          inserted_at: cm.inserted_at,
          invite_pending: is_nil(m.encrypted_password)
        },
        order_by: [desc: is_nil(m.encrypted_password)],
        order_by: [desc: m.inserted_at]
      )
      |> build_company_members_search(params)
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {data.entries, nil, PaginateHelper.prep_paginate(data)}
  end

  defp build_company_members_search(queryable, params) do
    params
    |> Map.get(:filters, %{})
    |> Enum.reduce(queryable, fn
      {:name, val}, query ->
        query
        |> where([_, u], ilike(fragment("? || ' ' || ?", u.first_name, u.last_name), ^"%#{val}%"))

      {:active, "true"}, query ->
        query
        |> where([_, u], not is_nil(u.encrypted_password))

      _, query ->
        query
    end)
  end

  @doc """
  Retrieve all registered members of a company by ID
  """
  @spec get_company_members(map) :: [Ecto.Schema.t()] | []
  def get_company_members(%{"company_id" => company_id} = params) do
    data =
      company_users_query(company_id)
      |> CompanyQuery.member_active()
      |> build_search(params)
      |> build_sort(params)
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {data.entries, PaginateHelper.prep_paginate(data)}
  end

  defp company_users_query(company_id) do
    from(u in User,
      join: m in assoc(u, :membership),
      where: m.company_id == ^company_id
    )
  end

  defp build_search(queryable, params) do
    params
    |> Map.get("filters", %{})
    |> Enum.reduce(queryable, fn
      {"g-query", val}, query ->
        d1 = dynamic([u], ilike(fragment("?||' '||?", u.first_name, u.last_name), ^"%#{val}%"))
        where(query, [u], ^dynamic([u], ^d1))

      _, query ->
        query
    end)
  end

  defp build_sort(query, params) do
    sort = Map.get(params, "sort_by", %{"by" => "inserted_at", "direction" => "desc"})
    field = String.to_existing_atom(Map.get(sort, "by"))
    direction = String.to_existing_atom(Map.get(sort, "direction"))

    case field do
      n when n in [:inserted_at, :email] ->
        order_by(query, [{^direction, ^n}])

      :name ->
        order_by(query, [u], [{^direction, fragment("? || ' ' || ?", u.first_name, u.last_name)}])

      _ ->
        query
    end
  end

  @doc """
  Transaction for the user invite process

  This allows us to treat the whole invite process as a transaction.
  The user is created, associated to a company and sent and invite.

  NOTE multiple membership for a user is currently disabled
  """

  def invite_member(company_id, inviter, user_params, role, _platform) do
    with user_email <- Map.get(user_params, :email, user_params["email"]),
         user <- get_user_by_email(user_email),
         membership_changeset <- invite_member_changeset(user, company_id, user_params, role),
         {:ok, membership} <- Repo.insert(membership_changeset),
         invited_user <- user || membership.member,
         {:ok, company} <- Companies.get_company(company_id),
         {:ok, token} <- create_invite_token(invited_user, inviter, company) do
      {:ok, %{user: user || membership.member}}
    else
      {:error, %Changeset{errors: [{:member, _}]}} ->
        {:error, :user_has_membership}

      {:error, %Changeset{errors: [{:member_id, _}]}} ->
        {:error, :user_has_account}

      _error ->
        {:error, :unprocessable_entity}
    end
  end

  defp invite_member_changeset(nil, company_id, user_params, role) do
    user_changeset = User.invite_changeset(%User{}, user_params)
    membership_params = %{company_id: company_id, role: role}

    Membership.changeset(%Membership{}, membership_params)
    |> put_assoc(:member, user_changeset)
  end

  defp invite_member_changeset(user, company_id, _user_params, role) do
    Membership.changeset(%Membership{}, %{company_id: company_id, member_id: user.id, role: role})
  end

  def resend_invite(%Company{} = company, inviter, %User{} = user, platform) do
    {:ok, user_active_signup_token} =
      Token
      |> where(user_id: ^user.id, type: 1)
      |> order_by(desc: :inserted_at)
      |> limit(1)
      |> Repo.one()
      |> case do
        nil -> create_invite_token(user, inviter, company)
        token -> {:ok, token}
      end

    Multi.new()
    |> Multi.run(:token, fn _, _ ->
      {:ok, Tokens.bump_expiration_date(user_active_signup_token)}
    end)
    |> Multi.run(:invite, fn _, %{token: token} ->
      {:ok, nil}
    end)
    |> Repo.transaction()
  end

  def resend_invite(company_id, user_id, %Token{} = token) do
    with %Membership{} = membership <-
           get_membership(%{company_id: company_id, user_id: user_id},
             preload: [:member, :company]
           ) do
      Multi.new()
      |> Multi.run(:token, fn _, _ ->
        {:ok, Tokens.bump_expiration_date(token)}
      end)
      |> Multi.run(:invite, fn _, %{token: token} ->
        {:ok, nil}
      end)
      |> Repo.transaction()
    end
  end

  def update_membership(%Membership{} = membership, membership_params) do
    Membership.changeset(membership, membership_params)
    |> Repo.update()
  end

  def update_membership(membership_identification, membership_params) do
    membership_identification
    |> get_membership
    |> update_membership(membership_params)
  end

  def update_membership(company_id, user_id, membership_params) do
    update_membership({company_id, user_id}, membership_params)
  end

  def remove_membership(%Membership{} = membership, params \\ %{}) do
    Multi.new()
    |> Multi.run(:membership, fn _, _ -> Repo.delete(membership) end)
    |> Repo.transaction()
  end

  defp create_invite_token(%User{} = user, %{} = inviter, %Company{id: company_id}) do
    opts = []

    Tokens.insert_token(user, "signup", opts)
  end

  def consume_token(token_string, action) do
    with {:ok, token} <- Tokens.get_token_by(token: token_string, type: action) do
      consume_token(token)
    end
  end

  def consume_token(%Token{} = token) do
    case Tokens.validate_token(token) do
      {:ok, token} ->
        Tokens.consume(token)

      {:error, error_id, reason} ->
        Logger.error("#{reason}, token: #{inspect(token)}")
        {:error, error_id, reason}
    end
  end

  def find_user_by_email(email) do
    case Users.get_by(email: email) do
      {:error, :not_found} ->
        {:error, :user_not_found, "User with email #{email} does not exist"}

      {:ok, user} ->
        {:ok, user}
    end
  end

  def validate_user_password(%{encrypted_password: nil}, _pwd) do
    {:error, :password_invalid, "Password invalid"}
  end

  def validate_user_password(user, pwd) do
    with :ok <- validate_password_length(pwd),
         true <- Bcrypt.verify_pass(pwd, user.encrypted_password) do
      {:ok, user}
    else
      _ ->
        {:error, :password_invalid, "Password invalid"}
    end
  end

  defp validate_password_length(password),
    do: if(String.length(password) <= 64, do: :ok, else: {:error, :password_too_long})
end
