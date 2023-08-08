defmodule Enroll.Web.Plugs.StaticIndex do
  @moduledoc false
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  # sobelow_skip ["XSS.SendResp", "Traversal"]
  def call(conn, _opts) do
    index_html =
      index_html_path()
      |> File.read!()

    conn
    |> put_resp_content_type("text/html")
    |> put_resp_header("cache-control", "max-age=0")
    |> delete_resp_header("x-frame-options")
    |> send_resp(200, index_html)
  end

  defp index_html_path() do
    config = Application.get_env(:backend, __MODULE__)

    Path.join(:code.priv_dir(:backend), config[:index_html_path])
  end
end
