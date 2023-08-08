defmodule Enroll.Accounts.Token do
  use Enroll.Web, :model

  alias Enroll.Accounts

  @required_fields ~w(type user_id)a
  @optional_fields ~w(expires_at expires_in consumed)a
  @default_expires_at ~N[2000-01-01 01:01:01]
  @two_weeks 14 * 24 * 60 * 60

  schema "tokens" do
    field(:token, :string)
    field(:type, TokenTypeEnum)
    field(:expires_at, :naive_datetime, default: @default_expires_at)
    field(:consumed, :boolean, default: false)
    field(:invalidated, :boolean, default: false)

    field(:expires_in, :integer, virtual: true)

    belongs_to(:user, Accounts.User)
    timestamps()
  end

  def changeset(model, params \\ %{}) do
    model
    |> base_changeset(params)
    |> validate_required_by_type()
    |> assoc_constraint(:user)
  end

  def base_changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields ++ @optional_fields)
    |> add_token()
    |> add_expiration()
  end

  def update_changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required_by_type()
    |> cast_expiration()
  end

  defp validate_required_by_type(chs) do
    case get_field(chs, :type) do
      _ -> validate_required(chs, @required_fields)
    end
  end

  defp add_token(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true} ->
        put_change(current_changeset, :token, generate_secure_token())

      _ ->
        current_changeset
    end
  end

  defp generate_secure_token() do
    # FIXME: May throw exception low_entropy in case
    # the random generator failed due to lack of secure "randomness".
    :crypto.strong_rand_bytes(32) |> Base.url_encode64(padding: false)
  end

  defp add_expiration(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{changes: %{expires_at: _expires_at}} ->
        current_changeset

      %Ecto.Changeset{changes: %{expires_in: _expires_in}} ->
        cast_expiration(current_changeset)

      %Ecto.Changeset{valid?: true} ->
        cast(current_changeset, %{expires_at: expiration_to_date(@two_weeks)}, [:expires_at])

      _ ->
        current_changeset
    end
  end

  defp cast_expiration(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{changes: %{expires_in: expires_in}} ->
        cast(current_changeset, %{expires_at: expiration_to_date(expires_in)}, [:expires_at])

      _ ->
        current_changeset
    end
  end

  defp expiration_to_date(expires_in) do
    NaiveDateTime.utc_now()
    |> NaiveDateTime.add(expires_in)
    |> NaiveDateTime.truncate(:second)
  end

  def consume(token), do: change(token, consumed: true)
  def unconsume(token), do: change(token, consumed: false)
  def invalidate(token), do: change(token, invalidated: true)
  def extend_expires_at(token, date_time), do: change(token, expires_at: date_time)

  def valid(query), do: from(t in query, where: t.invalidated == false)
end
