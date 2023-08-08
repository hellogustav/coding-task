defmodule Enroll.Repo.Migrations.ChangeCompanyNameToCitext do
  use Ecto.Migration

  def up do
    alter table(:companies) do
      modify(:name, :citext, null: false)
    end
  end

  def down do
    alter table(:companies) do
      modify(:name, :string, null: false)
    end
  end
end
