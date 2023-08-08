defmodule Enroll.Guardian.FetchAuthToken do
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

  plug(Guardian.Plug.LoadResource, allow_blank: true, key: :access)
end
