defmodule Mix.Tasks.Infra.Stop do
  @moduledoc false
  use Mix.Task

  def run(_) do
    Mix.shell().info("Stopping enroll infrastructure")
    cmd_path = Path.expand("../../../../scripts/enroll-infra", __DIR__)
    System.cmd(cmd_path, ["stop"])
  end
end
