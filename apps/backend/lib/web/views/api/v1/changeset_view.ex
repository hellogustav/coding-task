defmodule Enroll.ChangesetView do
  use Enroll.Web, :view

  require Logger

  alias Enroll.ErrorHelpers
  alias Ecto.Changeset

  def render("error.json", %{changeset: changeset}) do
    # Logger.error("Changeset Error:\n" <> inspect(changeset))

    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    %{errors: translate_errors(changeset)}
  end

  # Traverses and translates changeset errors.
  # See `Ecto.Changeset.traverse_errors/2` and
  # `Enroll.ErrorHelpers.translate_error/1` for more details.
  defp translate_errors(changeset) do
    errors =
      changeset
      |> Changeset.traverse_errors(&ErrorHelpers.translate_error/1)
      |> format_errors

    errors
  end

  defp format_errors(%{} = errors, attribute_path \\ []) do
    errors
    |> Map.to_list()
    |> do_format_errors(attribute_path, [])
    |> Enum.flat_map(fn error -> error end)
  end

  defp do_format_errors([], _path, acc), do: acc

  defp do_format_errors([error_tuple | tail], path, acc) do
    formatted_errors = format_attribute_errors(error_tuple, path)
    do_format_errors(tail, path, [formatted_errors | acc])
  end

  defp format_attribute_errors({attribute, %{} = nested_errors}, path),
    do: format_errors(nested_errors, build_IO_path(path, attribute))

  defp format_attribute_errors({attribute, errors}, path) do
    attr_path =
      path
      |> build_IO_path(attribute)
      |> Enum.reverse()

    Enum.map(errors, &create_error(attr_path, &1))
  end

  defp build_IO_path([], attribute), do: ["#{attribute}"]
  defp build_IO_path(path, attribute), do: ["#{attribute}" | ["." | path]]

  defp create_error(attributes, message) do
    %{
      id: "VALIDATION_ERROR",
      source: %{
        pointer: IO.iodata_to_binary(attributes)
      },
      detail: message,
      status: 422
    }
  end
end
