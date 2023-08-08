defmodule Enroll.ModelTestHelpers do
  import ExUnit.Assertions

  alias Ecto.Changeset

  @doc """
  Drops the given `field` from the given `attributes` map.

  if the field is not found, the original `attributes` is returned.

  Note that you can deeply drop a field by passing a list representing the
  path to that field.

    ## Example

      attributes = %{path: %{to: %{name_field: "name", password_field: "password"}}}
      attributes |> drop_field([:path, :to, :password_field])
      %{path: %{to: %{:name_field}}}

  """

  def drop_field(attributes, path) when is_list(path) do
    {_removed, new_map} = Kernel.pop_in(attributes, path)
    new_map
  end

  def drop_field(attributes, field) when is_atom(field),
    do: drop_field(attributes, [field])

  @doc """
  Removes all struct related meta data of the given map/struct.

  An use case for this function is when you want to convert a struct
  in params.
  """
  def filter_meta(%{__struct__: _} = struct) do
    struct
    |> Map.drop([:__struct__, :__meta__])
    |> filter_meta
  end

  def filter_meta(%{} = attrs) do
    Enum.reduce(attrs, attrs, fn {key, value}, acc ->
      Map.put(acc, key, filter_meta(value))
    end)
  end

  def filter_meta(value),
    do: value

  @doc """
  Asserts the presence of the given error `message` for the given `field`.

  Note that you can deeply assert by passing a list representing the
  path to that field.

    ## Example

      changeset
      |> assert_error("can't be blank", [:path, :to, :name_field])
      |> assert_error("not safe", [:path, :to, :password_field])

  """
  def assert_error(changeset, message, path_or_field)

  def assert_error(%Changeset{valid?: valid?, changes: changes} = changeset, message, path)
      when is_list(path) do
    refute valid?, ~s(Cannot assert message #{message} because changeset is valid)
    do_assert_error(changes, message, path)
    changeset
  end

  def assert_error(%Changeset{errors: errors} = changeset, message, field) do
    assert errors[field], build_no_match_error(errors, message, field)
    {error_message, _} = errors[field]

    assert error_message == message,
           ~s(expected: `#{inspect(field)} #{message}`, got: `#{inspect(field)} #{error_message}`)

    changeset
  end

  defp do_assert_error(changeset_or_change, message, [field | []]),
    do: assert_error(changeset_or_change, message, field)

  defp do_assert_error(%Changeset{changes: changes}, message, [field | path]),
    do: do_assert_error(changes[field], message, path)

  defp do_assert_error(%{} = changes, message, [field | path]),
    do: do_assert_error(changes[field], message, path)

  def build_no_match_error(errors, message, field) do
    ~s(no match of error: `#{message}` for field: #{inspect(field)}
      reason: #{inspect(field)} not found in changeset's errors
      changeset's errors: #{inspect(errors)})
  end
end
