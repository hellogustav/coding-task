defmodule Enroll.Guardian do
  use Guardian, otp_app: :backend

  require Logger

  alias Enroll.Repo
  alias Enroll.Accounts.Membership

  @doc """
  Ecodes the current user and company.

  Accepts for parameter a Membership.
  """

  def subject_for_token({%Membership{} = membership}, _claims) do
    membership = Repo.preload(membership, [:member, :company])

    resources = [
      "Company:#{membership.company_id}",
      "User:#{membership.member_id}",
      "Email:#{URI.encode_www_form(membership.member.email)}",
      "Role:#{membership.role}"
    ]

    {:ok, Enum.join(resources, "+")}
  end

  def subject_for_token(_args, _claims), do: {:error, "Encoding: Unknown resource type"}

  @doc """
  Decodes the current user and company stored in the token.
  """
  def resource_from_claims(claims) do
    from_token(claims["sub"])
  end

  def from_token(token) when is_binary(token) do
    token
    |> String.split("+")
    |> from_token
  end

  def from_token([
        "Company:" <> company_id,
        "User:" <> user_id,
        "Email:" <> email,
        "Role:" <> role
      ]) do
    Logger.metadata(company_id: company_id, user_id: user_id)

    {
      :ok,
      %{
        company_id: company_id,
        user_id: user_id,
        email: URI.decode_www_form(email),
        role: String.to_existing_atom(role)
      }
    }
  end

  def from_token(_), do: {:error, "Decoding: Unknown resource type"}

  def refresh_ttl(token) do
    with {:ok, _resource, claims} <- Enroll.Guardian.resource_from_token(token) do
      Enroll.Guardian.refresh(token, ttl: ttl(claims))
    end
  end

  def build_claims(claims, _resource, opts) do
    opts
    |> Keyword.get(:token_type)
    |> case do
      :timeout ->
        {value, units} = ttl(claims)
        exp = DateTime.utc_now() |> Timex.shift([{units, value}]) |> DateTime.to_unix()
        {:ok, Map.put(claims, "exp", exp)}

      _ ->
        {:ok, claims}
    end
  end

  defp ttl(%{"sub" => sub}) do
    case from_token(sub) do
      _ -> {2, :days}
    end
  end

  def after_encode_and_sign(_resource, %{"typ" => "timeout"}, token, _options) do
    {:ok, token}
  end

  def after_encode_and_sign(resource, claims, token, _options) do
    with {:ok, _} <- Guardian.DB.after_encode_and_sign(resource, claims["typ"], claims, token) do
      {:ok, token}
    end
  end

  def on_verify(%{"typ" => "timeout"} = claims, _token, _options) do
    {:ok, claims}
  end

  def on_verify(claims, token, _options) do
    with {:ok, {claims, _}} <- Guardian.DB.on_verify(claims, token) do
      {:ok, claims}
    end
  end

  def on_refresh(old_token, {_, %{"typ" => "timeout"}} = new_token, _options) do
    {:ok, old_token, new_token}
  end

  def on_refresh({old_token, old_claims}, {new_token, new_claims}, _options) do
    with {:ok, _, _} <- Guardian.DB.on_refresh({old_token, old_claims}, {new_token, new_claims}) do
      {:ok, {old_token, old_claims}, {new_token, new_claims}}
    end
  end

  def on_exchange(old_token, {_, %{"typ" => "timeout"}} = new_token, _options) do
    {:ok, old_token, new_token}
  end

  def on_exchange(old_token, {token, claims} = new_token, _options) do
    with {:ok, _} <- Guardian.DB.after_encode_and_sign(%{}, claims["typ"], claims, token) do
      {:ok, old_token, new_token}
    end
  end

  def on_revoke(%{"typ" => "timeout"} = claims, _token, _options) do
    {:ok, claims}
  end

  def on_revoke(claims, token, _options) do
    with {:ok, _} <- Guardian.DB.on_revoke(claims, token) do
      {:ok, claims}
    end
  end
end
