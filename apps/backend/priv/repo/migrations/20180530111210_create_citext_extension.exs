defmodule Enroll.Repo.Migrations.CreateCitextExtension do
  use Ecto.Migration

  def up do
    execute("CREATE EXTENSION IF NOT EXISTS \"citext\";")
  end

  def down do
    execute("DROP EXTENSION IF NOT EXISTS \"citext\";")
  end
end
