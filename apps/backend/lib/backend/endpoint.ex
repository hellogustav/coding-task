defmodule Enroll.Endpoint do
  use Phoenix.Endpoint, otp_app: :backend

  if sandbox = Application.get_env(:backend, :sandbox) do
    plug(Phoenix.Ecto.SQL.Sandbox, sandbox: sandbox)
  end

  def init(_type, config) do
    unless config[:secret_key_base] do
      raise "Set SECRET_KEY environment variable!"
    end

    {:ok, config}
  end

  def check_corsica_origin(_conn, origin) do
    true
  end

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug(Plug.Static,
    at: "/",
    from: :backend,
    gzip: false,
    cache_control_for_etags: "public, max-age=31536000"
  )

  # only: ~w(css fonts images js favicon.ico robots.txt)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket("/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket)
    plug(Phoenix.LiveReloader)
    plug(Phoenix.CodeReloader)
  end

  # Corsica Config
  # (Falls back to all origins if not specified)
  plug(Corsica,
    origins: {__MODULE__, :check_corsica_origin, []},
    allow_headers: [
      "accept",
      "content-type",
      "authorization",
      "authorization-exp"
    ],
    expose_headers: [
      "authorization-exp"
    ]
  )

  plug(Plug.RequestId)
  plug(Plug.Logger)

  plug(Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Jason,
    length: 30 * 1024 * 1024
  )

  plug(Plug.MethodOverride)
  plug(Plug.Head)

  plug(Plug.Session,
    store: :cookie,
    key: "key",
    signing_salt: "signing_salt"
  )

  plug(Enroll.Router)
end
