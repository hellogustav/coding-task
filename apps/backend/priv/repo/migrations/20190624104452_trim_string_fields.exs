defmodule Enroll.Repo.Migrations.TrimStringFields do
  use Ecto.Migration

  alias Enroll.Repo

  def up do
    execute("CREATE FUNCTION g_trim(s TEXT) RETURNS TEXT AS $$
         SELECT trim(regexp_replace(s, '\s+', ' ', 'g'));
       $$
       LANGUAGE SQL
       IMMUTABLE
       RETURNS NULL ON NULL INPUT;")

    flush()

    Ecto.Adapters.SQL.query!(
      Repo,
      "UPDATE users SET first_name = g_trim(first_name), last_name = g_trim(last_name);"
    )

    execute("DROP FUNCTION g_trim(TEXT);")
  end

  def down do
  end
end
