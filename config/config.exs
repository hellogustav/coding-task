# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
import Config

# By default, the umbrella project as well as each child
# application will require this configuration file, ensuring
# they all use the same configuration. While one could
# configure all applications here, we prefer to delegate
# back to each application for organization purposes.
# import_config "../apps/*/config/config.exs"

# Choose which configs to load when project is run from root
import_config "../apps/backend/config/config.exs"

# if System.get_env("IN_DOCKER") == "true" do
#  IO.puts("Loading docker specific local config")
#
#  import_config "docker.overides*.exs"
#  import_config "docker.#{Mix.env}*.exs"
# else

# Import local specific config. Settings defined in here will override
# all other settings defined before.
# import_config "local.overrides*.exs"

# Import local environment specific config.
# import_config "local.#{Mix.env}*.exs"
# end

# Sample configuration (overrides the imported configuration above):
#
#     config :logger, :console,
#       level: :info,
#       format: "$date $time [$level] $metadata$message\n",
#       metadata: [:user_id]

if File.exists?(Path.expand("local.overrides.exs", __DIR__)) do
  IO.puts("Importing local overrides")
  import_config "local.overrides.exs"
end
