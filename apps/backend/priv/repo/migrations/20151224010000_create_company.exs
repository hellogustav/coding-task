defmodule Enroll.Repo.Migrations.CreateCompany do
  use Ecto.Migration

  def change do
    create table(:companies, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:name, :string, null: false)

      timestamps()
    end

    create(unique_index(:companies, [:name]))
  end
end
