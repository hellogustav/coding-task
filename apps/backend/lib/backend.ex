defmodule Enroll do
  use Application
  require Logger

  import Supervisor.Spec, warn: false

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    if Mix.env() == :test do
      Dotenv.load()
      Mix.Task.run("loadconfig")
    end

    children = [
      {Phoenix.PubSub, name: Enroll.PubSub},
      # Start the endpoint when the application starts
      supervisor(Enroll.Endpoint, []),
      # Start the Ecto repository
      worker(Enroll.Repo, []),
      # Here you could define other workers and supervisors as children
      # worker(Enroll.Worker, [arg1, arg2, arg3]),

      # Automatatic GuardianDB stale token sweeper
      worker(Guardian.DB.Token.SweeperServer, [])
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Enroll.Supervisor]

    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Enroll.Endpoint.config_change(changed, removed)
    :ok
  end
end
