defmodule Enroll.Accounts.Membership do
  use Enroll.Web, :model
  alias Enroll.Accounts

  import Ecto.Query

  @required_fields [:role]

  schema "memberships" do
    field(:role, RoleEnum)

    belongs_to(:member, Accounts.User)
    belongs_to(:company, Accounts.Company)

    timestamps()
  end

  @doc "Build membership changeset"
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ [:member_id, :company_id])
    |> validate_required(@required_fields)
    |> assoc_constraint(:member)
    |> assoc_constraint(:company)
    |> unique_constraint(:member_id)
    |> unique_constraint(:member, name: :unique_company_members)
  end

  def create(company, user, role \\ :none)

  def create(%Accounts.Company{id: company_id}, %Accounts.User{id: user_id}, role) do
    create(company_id, user_id, role)
  end

  def create(company_id, user_id, role) do
    insert(company_id: company_id, member_id: user_id, role: role)
  end

  def by_member_id(query, user_id), do: from(m in query, where: m.member_id == ^user_id)
  def by_company_id(query, company_id), do: from(m in query, where: m.company_id == ^company_id)
end
