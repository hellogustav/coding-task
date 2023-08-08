defmodule Enroll.Guardian.AuthErrorHandler do
  @behaviour Guardian.Plug.ErrorHandler

  @impl Guardian.Plug.ErrorHandler
  def auth_error(conn, {_failure_type, reason}, _opts) do
    conn
    |> Plug.Conn.put_status(:unauthorized)
    |> Phoenix.Controller.put_view(Enroll.SessionView)
    |> Phoenix.Controller.render(:error, reason: returned_reason(reason))
  end

  defp returned_reason(:token_expired), do: :session_expired
  defp returned_reason(_reason), do: :invalid_credentials
end
