import Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :backend, Enroll.Endpoint,
  http: [port: System.get_env("PORT") || 4000],
  debug_errors: true,
  code_reloader: true,
  cache_static_lookup: false

# Watch static and templates for browser reloading.
config :backend, Enroll.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{lib/web/views/.*(ex)$},
      ~r{lib/web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  level: :info

config :logger, backends: [:console]

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

config :backend, Enroll.Repo,
  username: "postgres",
  password: "postgres",
  database: "enroll-task",
  hostname: "postgres",
  port: 5432,
  pool_size: 20

config :mix_test_watch,
  clear: true
