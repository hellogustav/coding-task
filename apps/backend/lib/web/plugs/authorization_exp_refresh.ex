defmodule Enroll.Web.Plugs.AuthorizationExpRefresh do
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _default) do
    conn
    |> Guardian.Plug.current_token(key: :timeout)
    |> Enroll.Guardian.refresh_ttl()
    |> case do
      {:ok, _, {token, _}} ->
        put_resp_header(conn, "authorization-exp", token)

      _ ->
        conn
    end
  end
end
