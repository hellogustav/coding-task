defmodule Enroll.Accounts.Tokens do
  alias Enroll.Repo
  alias Enroll.Accounts.{Company, Token, User}

  @type token_data :: [user: %User{}, type: String.t(), meta: map]
  @two_weeks 14 * 24 * 60 * 60

  def validate_token(%Token{} = token, type) do
    case token.type == type do
      true ->
        validate_token(token)

      _ ->
        {:error, "Token type does not match"}
    end
  end

  def validate_token(%Token{} = token) do
    cond do
      token.invalidated ->
        {:error, :token_invalid, "Invalid token: Invalidated"}

      token.consumed ->
        {:error, :token_consumed, "Invalid token: Already used"}

      token_expired?(token) ->
        {:error, :token_expired, "Invalid token: Expired"}

      true ->
        {:ok, token}
    end
  end

  def validate_token(_) do
    {:error, :invalid, "Invalid token"}
  end

  defp token_expired?(%Token{} = token) do
    case NaiveDateTime.compare(NaiveDateTime.utc_now(), token.expires_at) do
      :lt ->
        false

      _ ->
        true
    end
  end

  def insert_token(%{id: _id} = user, type, opts) do
    build_token(user, type, opts) |> Repo.insert(returning: true)
  end

  def insert_token(type, params) do
    %Token{type: type}
    |> Token.base_changeset(params)
    |> Repo.insert(returning: true)
  end

  defp build_token(%{id: user_id}, type, opts) do
    params =
      opts
      |> Keyword.take([:expires_in])
      |> Enum.into(%{})
      |> Map.merge(%{
        user_id: user_id
      })

    %Token{type: type}
    |> Token.changeset(params)
  end

  def invalidate(%Token{invalidated: true} = token), do: {:ok, token}

  def invalidate(%Token{invalidated: false} = token),
    do: token |> Token.invalidate() |> Repo.update()

  def invalidate(str_token) when is_binary(str_token) do
    with {:ok, token} <- get_token(str_token), do: invalidate(token)
  end

  def bump_expiration_date(%Token{} = token, date_time_in_seconds \\ @two_weeks) do
    date_time_in_seconds_from_now =
      NaiveDateTime.utc_now()
      |> NaiveDateTime.add(date_time_in_seconds)
      |> NaiveDateTime.truncate(:second)

    token
    |> Token.extend_expires_at(date_time_in_seconds_from_now)
    |> Token.unconsume()
    |> Repo.update!()
  end

  def get_token_by(by) do
    case Repo.get_by(Token, by) do
      nil -> {:error, :not_found}
      token -> {:ok, token}
    end
  end

  def get_token(str_token) when is_binary(str_token) do
    get_token_by(%{token: str_token})
  end

  def get_token(_), do: {:error, :not_provided}

  def get_token(str_token, preload: preload) when is_binary(str_token) do
    with {:ok, token} <- get_token(str_token) do
      {:ok, Repo.preload(token, preload)}
    end
  end

  def get_token(type, str_token) do
    get_token_by(%{token: str_token, type: type})
  end

  def consume(%Token{} = token) do
    token |> Token.consume() |> Repo.update()
  end

  def update(%Token{} = token, params) do
    token
    |> Token.update_changeset(params)
    |> Repo.update()
  end
end
