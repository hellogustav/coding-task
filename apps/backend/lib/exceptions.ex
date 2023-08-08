defmodule Enroll.InvalidChangesetId do
  @moduledoc """
  Raised when a changeset id is invalid.
  """
  defexception [:message, :value]

  @impl true
  def exception(opts) do
    value = Keyword.fetch!(opts, :value)
    msg = opts[:message] || "invalid changeset id #{inspect(value)}"
    %__MODULE__{message: msg, value: value}
  end
end
