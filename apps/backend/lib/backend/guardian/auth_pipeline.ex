defmodule Enroll.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :backend,
    module: Enroll.Guardian,
    error_handler: Enroll.Guardian.AuthErrorHandler

  plug(Guardian.Plug.VerifyHeader,
    scheme: "",
    claims: %{typ: "access"},
    header_name: "authorization",
    key: :access
  )

  plug(Guardian.Plug.LoadResource, ensure: true, key: :access)
  plug(Guardian.Plug.EnsureAuthenticated, key: :access)

  plug(Guardian.Plug.VerifyHeader,
    scheme: "",
    claims: %{typ: "timeout"},
    header_name: "authorization-exp",
    key: :timeout
  )

  plug(Guardian.Plug.LoadResource, ensure: true, key: :timeout)
  plug(Guardian.Plug.EnsureAuthenticated, key: :timeout)
  plug(Enroll.Web.Plugs.AuthorizationExpRefresh)
end
