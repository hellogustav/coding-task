defmodule Enroll.Repo.Migrations.ChangeCompanyNameIndexToNonUnique do
  use Ecto.Migration

  def up do
    drop(index(:companies, [:name]))
    create(index(:companies, [:name], unique: false))
  end

  def down do
    drop(index(:companies, [:name]))
    create(index(:companies, [:name], unique: true))
  end
end
