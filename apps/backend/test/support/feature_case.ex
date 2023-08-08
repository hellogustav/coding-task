defmodule Enroll.FeatureCase do
  use ExUnit.CaseTemplate

  using do
    quote do
      use Wallaby.Feature

      alias Enroll.Repo

      import Enroll.TestHelpers
      import Enroll.FeatureTestHelpers
      import Enroll.Factory
    end
  end

  setup tags do
    {:ok, _} = Application.ensure_all_started(:wallaby)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Enroll.Repo, {:shared, self()})
    end

    if tags[:feature] do
      Application.put_env(:wallaby, :base_url, "http://test.localhost.com:5005/")
    end

    metadata = Phoenix.Ecto.SQL.Sandbox.metadata_for(Enroll.Repo, self())
    {:ok, session} = Wallaby.start_session(metadata: metadata)

    {:ok, session: session}
  end
end
