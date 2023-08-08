defmodule Mix.Tasks.Infra.Start do
  @moduledoc false
  use Mix.Task

  def run(_) do
    Mix.shell().info("Starting enroll infrastructure")
    cmd_path = Path.expand("../../../../scripts/enroll-infra", __DIR__)
    System.cmd(cmd_path, ["start"])
  end
end
