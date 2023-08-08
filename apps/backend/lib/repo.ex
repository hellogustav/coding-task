defmodule Enroll.Repo do
  use Ecto.Repo,
    otp_app: :backend,
    adapter: Ecto.Adapters.Postgres

  use Scrivener

  def init(_type, config) do
    if System.get_env("MIX_ENV") === "test" do
      :ok = Application.ensure_started(:dotenv)
    end

    {:ok, config}
  end
end
