defmodule Enroll.Mixfile do
  use Mix.Project

  def project do
    [
      app: :backend,
      version: "1.0.1",
      elixir: "~> 1.13",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixirc_paths: elixirc_paths(Mix.env()),
      elixirc_options: [ignore_module_conflict: true],
      compilers: [:phoenix] ++ Mix.compilers(),
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Enroll, []},
      extra_applications: [:ecto_sql, :logger]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(:dev), do: ["lib", "web"] ++ seeds_elixirc_paths()
  defp elixirc_paths(:prod), do: ["lib", "web"] ++ seeds_elixirc_paths()

  defp seeds_elixirc_paths() do
    [
      "test/support/factories/",
      "test/support/factory.ex",
      "test/support/seed_helpers.ex"
    ]
  end

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:ecto_sql, "~> 3.3"},
      {:phoenix, "~> 1.6.0"},
      {:phoenix_pubsub, "~> 2.0"},
      {:phoenix_ecto, "~> 4.3"},
      {:phoenix_html, "~> 3.0"},
      {:phoenix_live_view, "~> 0.18.3"},
      {:phoenix_live_reload, "~> 1.3", only: :dev},
      {:phoenix_swoosh, "~> 1.0"},
      {:postgrex, "~> 0.15", override: true},
      {:gettext, "~> 0.17"},
      {:plug_cowboy, "~> 2.1"},
      {:plug, "~> 1.14.0"},
      {:bcrypt_elixir, "~> 3.0"},
      {:guardian, "~> 2.0"},
      {:guardian_db, "~> 2.0"},
      {:mix_test_watch, "~> 1.1", only: :dev, runtime: false},
      {:ecto_enum, "~> 1.4"},
      {:ex_machina, "~> 2.4"},
      {:hackney, "~> 1.12"},
      {:gen_stage, "~> 1.0", override: true},
      {:faker, "~> 0.13"},
      {:timex, "~> 3.0"},
      {:tzdata, "~> 1.1"},
      {:ecto_rut, "~> 1.2.2"},
      {:ecto_atomized_map,
       github: "kamilbielawski/ecto_atomized_map", branch: "feat/implement-equal"},
      {:better_params, "~> 0.5.0"},
      {:scrivener_ecto, "~> 2.0"},
      {:shortuuid, "~> 2.1"},
      {:httpoison, "~> 1.6", override: true},
      {:corsica, "~> 1.0"},
      {:bodyguard, "~> 2.4"},
      {:fsm, "~> 0.3"},
      {:dotenv, "~> 3.0", only: [:dev, :test]},
      {:mock, "~> 0.3.4", only: :test},
      {:phoenix_token_plug, "~> 0.2"},
      {:p1_utils, "~> 1.0", override: true},
      {:remodel, "~> 0.0.4"},
      {:mox, "~> 1.0", only: :test},
      {:wallaby, "~> 0.30", [runtime: false, only: :test]},
      {:zxcvbn,
       github: "techgaun/zxcvbn-elixir", commit: "d97e6607ea85abc0909830868f31761daeb8f536"},

    ]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  #
  # NOTE:
  # Those aliases won't work run in the root directory if they has been
  # defined in the Umbrella's root mix.exs.
  #
  defp aliases do
    [
      "ecto.seed": ["run priv/repo/seeds.#{System.get_env("MIX_ENV") || "prod"}.exs"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "ecto.seed"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"],
      start: ["infra.seed", "phx.server"]
    ]
  end
end
