defmodule Enroll.TestHelpers do
  import ExUnit.Assertions
  import Mox

  alias Faker.Internet

  @doc """
  Asserts API response for 401 error.

  See Enroll.API.V1.ErrorView for error view definition.
  """
  def assert_payload_for_error(response, 401) do
    assert %{"title" => "Unauthorized", "code" => 401} = response
  end

  @doc """
  Asserts the presence of the given `node` in `response`.
  """
  def assert_presence(response, node) do
    assert response[node]
    response
  end

  @doc """
  Asserts the `response` contains expected resource id.
  """
  def assert_resource(response, expected_resource, location) do
    assert_resource(response[location], expected_resource)
    response
  end

  def assert_resource(response, expected_resource) do
    assert response["id"] == expected_resource.id
    response
  end

  @doc """
  Asserts the `response` contains the given `error_message`.
  """
  def assert_error(response, expected_message) do
    assert response["error"] == expected_message
  end

  @doc """
  Encode a elixir `Map` to param.

  ## Example
      iex> encode_params(%{user: %{password: "12345678", email: "email"}})
      %{"user" => %{"password" => "12345678", "email" => "email"}}
  """
  def encode_params(params), do: Jason.encode!(params)

  @doc """
  serializes an atom key based map to a string key based map.

    ## Example:

      iex> map = %{
      ...>   id: 1,
      ...>   status: :published,
      ...>   list: [
      ...>     %{
                  dog?: true
                }
              ]
      ...> }
      iex>
      iex> serialize(map)
      %{
        "id" => 1,
        "status" => "published",
        "list" => [
          %{
             "dog?" => true
           }
         ]
      }
  """
  def serialize(%NaiveDateTime{} = dt), do: Jason.decode!(Jason.encode!(dt))
  def serialize(%DateTime{} = dt), do: Jason.decode!(Jason.encode!(dt))
  def serialize(%Date{} = date), do: Date.to_iso8601(date)
  def serialize(%Decimal{} = d), do: Jason.decode!(Jason.encode!(d))

  def serialize(%{__struct__: _module} = struct) do
    struct
    |> Map.from_struct()
    |> serialize
  end

  def serialize(%{} = map) do
    Enum.reduce(map, %{}, fn
      {key, val}, acc when is_atom(key) ->
        Map.put(acc, Atom.to_string(key), serialize(val))

      {key, val}, acc ->
        Map.put(acc, key, serialize(val))
    end)
  end

  def serialize(list) when is_list(list), do: Enum.map(list, &serialize(&1))
  def serialize(flag) when flag in [true, false, nil], do: flag
  def serialize(atom) when is_atom(atom), do: Atom.to_string(atom)
  def serialize(value), do: value

  @doc """
  Asserts the equivalence of the `response` and the `expected` lists of
  resource, comparing their ids.

  If a third argument `location` is provided, the assert will be done on
  response[location].
  """
  def assert_ids(response, expected, location) do
    assert_ids(response[location], expected)
    response
  end

  def assert_ids(response, _expected) do
    response
  end

  def refute_ids(response, _expected, _location) do
    response
  end

  def refute_ids(response, _expected) do
    response
  end

  @doc """
  Asserts the `response` contains expected resource id.

  If a third argument `location` is provided, the assert will be done on
  response[location].

  TODO:
    For consistency, Replace all occurences of assert_resource_id
    (defined above, same behaviour) in the project.

  """
  def assert_id(response, expected_resource, location) do
    assert_resource(response[location], expected_resource)
    response
  end

  def assert_id(response, expected_resource) do
    assert response["id"] == expected_resource.id
    response
  end

  # Generate random values
  def rand(:boolean), do: Enum.random([true, false])
  def rand(max), do: rand(0, max)

  def rand(min, max) do
    :rand.uniform(max - min) + min
  end

  @doc "Generate test email addresses"
  def email_address do
    Internet.user_name() <> "@" <> Internet.domain_word() <> ".test"
  end

  # Changesets helpers

  @doc """
  Gets the value under `key` in the given changeset's change.

  An optional third argument `path` can be given, in which case the
  search in the subchangeset pointed by this path.

  """
  def get_change_in(changeset, key, path \\ []) do
    changeset
    |> get_subchangeset(path)
    |> Map.from_struct()
    |> Kernel.get_in([:changes, key])
  end

  # CHANGESET HELPERS

  @doc "Access deeply nested Changesets"
  def get_subchangeset(changeset, path) do
    Enum.reduce(path, changeset, fn assoc, parent_changeset ->
      case parent_changeset do
        %{changes: %{^assoc => changeset}} -> changeset
        _ -> raise "Sub-changeset for `#{assoc}` not found in #{inspect(path)}"
      end
    end)
  end

  def assert_validation_error(%{errors: errors}, expected, validation) do
    Enum.reduce(expected, errors, fn field, errors_acc ->
      case Keyword.pop_first(errors_acc, field, :not_found) do
        {:not_found, _} ->
          refute true, """
          expected validation error: `field :#{field} required` not found
          """

        {{_, [validation: ^validation]}, errors_acc} ->
          errors_acc

        {{_, [validation: mismatched]}, _} ->
          refute true, """
          expected validation error for field :#{field} to be :#{validation},
          got :#{mismatched}
          """
      end
    end)
  end

  # List assertion helpers

  def map_key(list, key) do
    Enum.map(list, &Map.get(&1, key))
  end

  def sort_by(list, key, opts \\ []) do
    case Keyword.get(opts, :order, :asc) do
      :asc ->
        Enum.sort_by(list, &Map.get(&1, key))

      :desc ->
        Enum.sort_by(list, &Map.get(&1, key), &>/2)

      fun when is_function(fun, 2) ->
        Enum.sort_by(list, &Map.get(&1, key), fun)
    end
  end

  def sort_map(list, key, opts \\ []) do
    list |> sort_by(key, opts) |> map_key(key)
  end

  def assert_list_values(key, list_1, list_2) do
    assert map_key(list_1, key) == map_key(list_2, key)
  end

  def assert_sorted_list_values(key, list_1, list_2) do
    assert sort_map(list_1, key) == sort_map(list_2, key)
  end

  def assert_map_list_values(l1, l2, opts \\ []) do
    mapper = if Keyword.get(opts, :drop_nil?, false), do: &drop_nil_field/1

    l1 = map_as_maps(l1, mapper)
    l2 = map_as_maps(l2, mapper)

    sort_by = l1 |> List.first() |> Map.keys() |> List.first()

    assert sort_by(l1, sort_by) == sort_by(l2, sort_by)
  end

  defp map_as_maps(list, mapper) do
    mapper = if mapper, do: mapper, else: & &1

    Enum.map(list, fn
      %{__struct__: _} = el -> mapper.(Map.from_struct(el))
      %{} = el -> mapper.(el)
    end)
  end

  def drop_nil_field(map) do
    map
    |> Enum.reject(fn {_, v} -> is_nil(v) end)
    |> Enum.into(%{})
  end

  # Symbolize all strings in a list
  def symbolize(list) when is_list(list) do
    Enum.map(list, &String.to_atom/1)
  end

  # Symbolize string
  def symbolize(string) when is_binary(string) do
    String.to_atom(string)
  end

  # Symbolize atom
  def symbolize(atom) when is_atom(atom), do: atom

  def assert_map_except(map1, map2, key) do
    assert Map.delete(map1, key) == Map.delete(map2, key)
  end

  def read_fixtures_file(filename) do
    [:code.priv_dir(:backend), "fixtures", filename]
    |> Path.join()
    |> File.read!()
  end

  def wait_until(fun), do: wait_until(1000, fun)

  def wait_until(0, fun), do: fun.()

  def wait_until(timeout, fun) do
    try do
      fun.()
    rescue
      ExUnit.AssertionError ->
        :timer.sleep(10)
        wait_until(max(0, timeout - 10), fun)
    end
  end
end
