defmodule Enroll.Accounts.Company do
  use Enroll.Web, :model

  alias Enroll.Accounts
  alias Enroll.EctoTrimmedString

  @all_fields [:name]

  @derive {Jason.Encoder,
           only: [
             :id,
             :name
           ]}

  schema "companies" do
    field(:name, EctoTrimmedString)

    has_many(:memberships, Accounts.Membership)
    has_many(:members, through: [:memberships, :member])

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @all_fields)
    |> common_changeset(struct)
  end

  defp common_changeset(changeset, struct) do
    changeset
    |> unique_constraint(:name)
  end
end
