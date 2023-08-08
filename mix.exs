defmodule GustavEnroll.Mixfile do
  use Mix.Project

  def project do
    [
      apps_path: "apps",
      elixir: "~> 1.11",
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      aliases: aliases(),
      name: "Enroll",
      source_url: "https://github.com/hellogustav/coding-task.git",
      docs: [
        # The main page in the docs
        main: "readme",
        extras: ["README.md"],
        version: "1.0",
        groups_for_modules: []
      ]
    ]
  end

  # Dependencies can be Hex packages:
  #
  #   {:my_dep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:my_dep, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
  #
  # Type "mix help deps" for more examples and options.
  #
  # Dependencies listed here are available only for this project
  # and cannot be accessed from applications inside the apps folder
  defp deps do
    [
      {:dotenv, "~> 3.0", only: [:dev, :test]}
    ]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": [
        "ecto.create",
        "ecto.migrate",
        "run apps/backend/priv/repo/seeds.#{Mix.env() || "prod"}.exs"
      ],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: [
        "ecto.create --quiet",
        "ecto.migrate",
        "run apps/backend/priv/repo/seeds.#{Mix.env() || "prod"}.exs",
        "test"
      ],
      start: ["deps.get", "ecto.create", "ecto.migrate", "phx.server"]
    ]
  end
end
