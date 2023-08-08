defmodule Enroll.Repo.Migrations.TrimNameInCompanies do
  use Ecto.Migration

  alias Enroll.Repo

  def up do
    execute("CREATE OR REPLACE FUNCTION g_trim(s TEXT) RETURNS TEXT AS $$
         SELECT trim(regexp_replace(s, '\s+', ' ', 'g'));
       $$
       LANGUAGE SQL
       IMMUTABLE
       RETURNS NULL ON NULL INPUT;")

    flush()

    Ecto.Adapters.SQL.query!(
      Repo,
      "UPDATE companies SET name = g_trim(name);"
    )
  end

  def down do
  end
end
