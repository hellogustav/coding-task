defmodule Enroll.Repo.Multi do
  @moduledoc "Helper Methods/Macros for Ecto.Multi operations"

  @doc """
  Macro to reduce Multi.run clutter without exposing
  helper methods as public functions
  """
  defmacro run_operation(multi, name, args) when is_atom(name) do
    quote do
      name = unquote(name)
      args = unquote(args)
      multi = unquote(multi)

      Ecto.Multi.run(multi, name, fn _, changes ->
        unquote(name)(changes, args)
      end)
    end
  end

  defmacro run_operation(multi, name, operation, args) when is_atom(operation) do
    quote do
      name = unquote(name)
      operation = unquote(operation)
      args = unquote(args)
      multi = unquote(multi)

      Ecto.Multi.run(multi, name, fn _, changes ->
        unquote(operation)(changes, args)
      end)
    end
  end

  @doc """
  Normalize a Repo.transaction response into simple
  2-item success/error tuple responses
  """
  def normalize({:ok, result}), do: {:ok, result}
  def normalize({:error, value}), do: {:error, value}
  def normalize({:error, _, value, _}), do: {:error, value}
end
