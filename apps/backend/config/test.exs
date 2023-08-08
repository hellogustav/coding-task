use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :backend, Enroll.Endpoint,
  http: [port: 4001],
  server: true,
  secret_key_base: "SECRET_KEY_BASE"

config :backend, Enroll.Web.Plugs.StaticIndex, index_html_path: "fixtures/index.html"

config :backend, namespace: Enroll, ecto_repos: [Enroll.Repo]

config :backend, Enroll.Encryption.AES, encryption_key: "encryption_key"

# Print only warnings and errors during test
config :logger,
  level: :warn

# Configure your database
config :backend, Enroll.Repo,
  username: "postgres",
  password: "postgres",
  database: "enroll-test",
  hostname: "postgres",
  port: 5432,
  ownership_timeout: 240_000,
  queue_target: 5000,
  pool: Ecto.Adapters.SQL.Sandbox

config :backend, :sql_sandbox, true

config :backend, :sandbox, Ecto.Adapters.SQL.Sandbox

# Guardian configuration
config :backend, Enroll.Guardian, secret_key: "SECRET_KEY_GUARDIAN"

# Bcrypt configuration.
# Reduces rounds number to speed up tests.
config :bcrypt_elixir, :log_rounds, 4
