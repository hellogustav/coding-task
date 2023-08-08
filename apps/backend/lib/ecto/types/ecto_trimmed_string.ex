defmodule Enroll.EctoTrimmedString do
  def type, do: :string

  def cast(binary) when is_binary(binary) do
    {:ok, binary |> String.trim() |> String.replace(~r/\s+/, " ")}
  end

  def cast(other), do: Ecto.Type.cast(:string, other)

  def load(data), do: Ecto.Type.load(:string, data)

  def dump(data), do: Ecto.Type.dump(:string, data)

  def embed_as(_), do: :self

  def equal?(term1, term2), do: term1 == term2
end
