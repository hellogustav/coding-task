defmodule Enroll.Factory do
  @moduledoc """
  This is the base module for all factories
  """

  use ExMachina.Ecto, repo: Enroll.Repo
  use Enroll.AccountsFactory

  # HELPER METHODS
  # --------------

  def short_uuid() do
    Ecto.UUID.generate() |> ShortUUID.encode!()
  end

  defp enum_values(enum) when is_atom(enum) do
    values = enum.__enum_map__()

    case Keyword.keyword?(values) do
      true -> Keyword.keys(values)
      false -> values
    end
  end
end
