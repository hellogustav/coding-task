# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
import Config

config :backend,
  namespace: Enroll,
  ecto_repos: [Enroll.Repo]

# Configures the endpoint
config :backend, Enroll.Endpoint,
  http: [
    port: 4000
  ],
  url: [
    host: "localhost"
  ],
  root: Path.dirname(__DIR__),
  secret_key_base: "SECRET_KEY_BASE",
  render_errors: [
    accepts: ~w(html json)
  ],
  debug_errors: false

config :backend, Enroll.Web.Plugs.StaticIndex, index_html_path: "static/index.html"

config :backend, Enroll.Encryption.AES, encryption_key: "AES_ENCRYPTION_KEY"

config :backend, Enroll.Repo,
  types: Enroll.PostgrexTypes,
  timeout: 30_000

config :postgrex, :json_library, Jason

config :logger,
  handle_otp_reports: true,
  handle_sasl_reports: false

# Configures Elixir's Logger
config :logger, :console,
  format: "$dateT$time  $metadata[$level] $message\n",
  metadata: [:request_id]

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: true

config :phoenix, :format_encoders, json: Jason

config :phoenix, :json_library, Jason

# Guardian config
#
# Guardian uses it's own config resolver to which we need to adjust to when setting secret_key
# https://github.com/ueberauth/guardian#configuration-values
config :backend, Enroll.Guardian,
  issuer: "Enroll",
  ttl: {90, :days},
  verify_issuer: true,
  secret_key: "GUARDIAN_SECRET_KEY"

# Config guardian_db
config :guardian, Guardian.DB, repo: Enroll.Repo

config :backend, Enroll.Gettext, default_locale: "en"

# Workaround for recaptcha not supporting custom config providers
# We fetch the secret ourselves when needed and provide it as a param to verify/2

config :mime, :types, %{
  "application/xml" => ["xml"]
}

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
