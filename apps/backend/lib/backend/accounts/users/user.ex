defmodule Enroll.Accounts.User do
  use Enroll.Web, :model

  import ZXCVBN

  alias Enroll.{
    Accounts,
    Repo.Enums,
    EctoTrimmedString
  }

  @required_fields ~w(first_name last_name email)a
  @optional_fields ~w(
    password encrypted_password
  )a
  @all_fields @required_fields ++ @optional_fields

  @derive {Jason.Encoder,
           only: [
             :id,
             :first_name,
             :last_name,
             :email
           ]}

  schema "users" do
    field(:first_name, EctoTrimmedString)
    field(:last_name, EctoTrimmedString)
    field(:email, :string)

    field(:encrypted_password, :string)
    field(:password, :string, virtual: true)
    field(:old_password, :string, virtual: true)

    has_one(:membership, Accounts.Membership, foreign_key: :member_id)
    has_one(:company, through: [:membership, :company])

    has_many(:tokens, Accounts.Token)

    timestamps()
  end

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @all_fields)
    |> common_changeset()
  end

  def invite_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:first_name, :last_name, :email])
    |> validate_email_change()
  end

  @doc "Check if a user exists"
  def exists?(email) do
    count =
      __MODULE__
      |> Ecto.Query.where([u], u.email == ^email)
      |> Repo.aggregate(:count, :id)

    count > 0
  end

  def add_changeset_error(changeset, field, message), do: add_error(changeset, field, message)

  # Private Helpers

  defp common_changeset(changeset) do
    changeset
    |> validate_required(@required_fields)
    |> validate_email_change()
  end

  defp validate_email_change(%Ecto.Changeset{} = changeset) do
    changeset
    |> cast(changeset.params, [:email])
    |> validate_required([:email])
    |> validate_format(:email, Enroll.Repo.Regex.email())
    |> update_change(:email, &String.downcase/1)
    |> unique_constraint(:email, message: "Email already taken")
  end

  def matches_password?(pwd, user_id) do
    user = Repo.get!(__MODULE__, user_id)

    cond do
      is_nil(user.encrypted_password) ->
        true

      is_nil(pwd) ->
        false

      true ->
        Bcrypt.verify_pass(pwd, user.encrypted_password)
    end
  end


  def from_json(nil), do: nil

  def from_json(data) do
    %__MODULE__{}
    |> cast(data, @all_fields ++ [:id, :inserted_at])
    |> apply_changes()
  end
end
